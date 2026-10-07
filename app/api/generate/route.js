import OpenAI, { toFile } from "openai";
import dotenv from "dotenv";
import prompts from "./prompts.json";

export const maxDuration = 120;

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  maxRetries: 0,
});

// Garden check and generation run one after the other, so together they must fit within maxDuration.
const GARDEN_CHECK_TIMEOUT_MS = 15 * 1000;
const GENERATION_TIMEOUT_MS = 100 * 1000;

const TIMEOUT_MESSAGE = "This is taking longer than usual. Please try again in a moment.";

const img_gen_prompt = prompts.imagePrompt;
const txt_gen_prompt = prompts.textPrompt;

const MAX_IMAGE_BYTES = 25 * 1024 * 1024;

function startsWith(buffer, bytes, offset = 0) {
    return bytes.every((byte, i) => buffer[offset + i] === byte);
}

function detectImageMime(buffer) {
    if (startsWith(buffer, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return "image/png";
    if (startsWith(buffer, [0xff, 0xd8, 0xff])) return "image/jpeg";
    if (startsWith(buffer, [0x52, 0x49, 0x46, 0x46]) && startsWith(buffer, [0x57, 0x45, 0x42, 0x50], 8)) return "image/webp";
    return null;
}

async function checkIsGarden({ beforeImageBase64, mimeType }) {
    const response = await openai.responses.create({
        model: "gpt-5.5",
        input: [
            {
                role: "user",
                content: [
                    {
                        type: "input_text",
                        text: "Is this photo of an outdoor residential space that could be landscaped (garden, backyard, front yard, patio, lawn, courtyard, balcony, or a bare dirt or concrete area)? Answer false for close-ups of objects, food, people, pets, indoor rooms, screenshots, or drawings.",
                    },
                    {
                        type: "input_image",
                        image_url: `data:${mimeType};base64,${beforeImageBase64}`,
                        detail: "low",
                    },
                ],
            },
        ],
        text: {
            format: {
                type: "json_schema",
                name: "garden_check",
                strict: true,
                schema: {
                    type: "object",
                    properties: {
                        isGarden: { type: "boolean" },
                        reason: { type: "string" },
                    },
                    required: ["isGarden", "reason"],
                    additionalProperties: false,
                },
            },
        },
    }, { timeout: GARDEN_CHECK_TIMEOUT_MS });

    return JSON.parse(response.output_text);
}

async function generateSuggestions({ beforeImageBase64, mimeType, prompt }) {
    const imageUrl = `data:${mimeType};base64,${beforeImageBase64}`;

    const response = await openai.responses.create({
        model: "gpt-5.5",
        input: [
            {
                role: "user",
                content: [
                    {
                        type: "input_text",
                        text: prompt,
                    },
                    {
                        type: "input_image",
                        image_url: imageUrl,
                    },
                ],
            },
        ],
    }, { timeout: GENERATION_TIMEOUT_MS });

    return response.output_text;
}

async function editGardenImage({beforeImageBuffer, prompt, mimeType}) {
    const startTime = performance.now();

    const result = await openai.images.edit({
        model: "gpt-image-1.5",
    
        image: await toFile(beforeImageBuffer, `before.${mimeType.split("/")[1]}`, {
          type: mimeType,
        }),
    
        prompt,
        quality: "medium",
        output_format: "jpeg",
    }, { timeout: GENERATION_TIMEOUT_MS });
    
    const elapsedSeconds = (performance.now() - startTime) / 1000;
    console.log(`OpenAI API took ${elapsedSeconds.toFixed(2)} seconds`);

    return result.data[0].b64_json;
}


export async function POST(request) {

    const formData = await request.formData();
    const image = formData.get("image");

    if (!image || typeof image === "string") {
        return new Response("No image provided", {status: 400});
    }

    if (image.size > MAX_IMAGE_BYTES) {
        return new Response("Image is too large. Maximum size is 25MB.", {status: 413});
    }

    const beforeImageBuffer = Buffer.from(await image.arrayBuffer());
    const mimeType = detectImageMime(beforeImageBuffer);

    if (!mimeType) {
        return new Response("Unsupported image format. Use PNG, JPEG, or WebP.", {status: 415});
    }

    const beforeImageBase64 = beforeImageBuffer.toString("base64");

    try {
        const { isGarden, reason } = await checkIsGarden({ beforeImageBase64, mimeType });
        console.log(`Garden check: ${isGarden} (${reason})`);

        if (!isGarden) {
            return new Response(
                "That doesn't look like a garden. Please upload a photo of your outdoor space.",
                {status: 422}
            );
        }
    } catch (error) {
        console.error(error);
        if (error instanceof OpenAI.APIConnectionTimeoutError) {
            return new Response(TIMEOUT_MESSAGE, { status: 504 });
        }

        return new Response("failed", {status: 500});
    }

    let imageBase64;
    let textTips;

    console.log(`[${new Date().toISOString()}] Image received. Generating garden design...`);

    try {
        [imageBase64, textTips] = await Promise.all([
            editGardenImage({
                beforeImageBuffer,
                prompt: img_gen_prompt,
                mimeType,
            }),  
            generateSuggestions({ 
                beforeImageBase64,
                mimeType,
                prompt: txt_gen_prompt,
            })
        ]);

    } catch (error) {
        console.error(error);
        if (error instanceof OpenAI.APIConnectionTimeoutError) {
            return new Response(TIMEOUT_MESSAGE, { status: 504 });
        }

        return new Response("failed", {status: 500});
    }

    return Response.json({
        imageUrl: `data:image/jpeg;base64,${imageBase64}`,
        textTips : textTips
    });

}