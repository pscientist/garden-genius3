import OpenAI, { toFile } from "openai";
import dotenv from "dotenv";
import prompts from "./prompts.json";

export const maxDuration = 60;

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
    });

    return response.output_text;
}

async function editGardenImage({beforeImageBuffer, prompt, mimeType}) {
    const startTime = performance.now();

    const result = await openai.images.edit({
        model: "gpt-image-1.5",
    
        image: await toFile(beforeImageBuffer, `before.${mimeType.split("/")[1]}`, {
          type: mimeType,
        }),
    
        prompt: prompt,
    }); 
    
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

    let imageBase64;
    let textTips;

    console.log(`[${new Date().toISOString()}] Image received. Generating garden design...`);

    try {
        
        const beforeImageBase64 = beforeImageBuffer.toString("base64");

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
        return new Response("failed", {status: 500})

    }

    return Response.json({
        imageUrl: `data:image/png;base64,${imageBase64}`,
        textTips : textTips
    });

}