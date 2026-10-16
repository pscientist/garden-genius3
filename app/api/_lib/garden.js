import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// Shared by /api/generate (single long request) and /api/visualise (client polling),
// so both routes validate uploads and check for gardens in exactly the same way.

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    maxRetries: 0,
});

export const GARDEN_CHECK_TIMEOUT_MS = 15 * 1000;

export const TIMEOUT_MESSAGE = "This is taking longer than usual. Please try again in a moment.";

export const MAX_IMAGE_BYTES = 25 * 1024 * 1024;

function startsWith(buffer, bytes, offset = 0) {
    return bytes.every((byte, i) => buffer[offset + i] === byte);
}

export function detectImageMime(buffer) {
    if (startsWith(buffer, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return "image/png";
    if (startsWith(buffer, [0xff, 0xd8, 0xff])) return "image/jpeg";
    if (startsWith(buffer, [0x52, 0x49, 0x46, 0x46]) && startsWith(buffer, [0x57, 0x45, 0x42, 0x50], 8)) return "image/webp";
    return null;
}

/**
 * Reads and validates the uploaded "image" field.
 * Returns { buffer, mimeType, base64 } on success, or { errorResponse } to return straight away.
 */
export async function readUploadedImage(request) {
    const formData = await request.formData();
    const image = formData.get("image");

    if (!image || typeof image === "string") {
        return { errorResponse: new Response("No image provided", { status: 400 }) };
    }

    if (image.size > MAX_IMAGE_BYTES) {
        return { errorResponse: new Response("Image is too large. Maximum size is 25MB.", { status: 413 }) };
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    const mimeType = detectImageMime(buffer);

    if (!mimeType) {
        return { errorResponse: new Response("Unsupported image format. Use PNG, JPEG, or WebP.", { status: 415 }) };
    }

    return { buffer, mimeType, base64: buffer.toString("base64") };
}

export async function checkIsGarden({ beforeImageBase64, mimeType }) {
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

/**
 * Runs the garden check and maps the outcome to an error Response.
 * Returns null when the photo is a garden and generation can continue.
 */
export async function rejectIfNotGarden({ beforeImageBase64, mimeType }) {
    try {
        const { isGarden, reason } = await checkIsGarden({ beforeImageBase64, mimeType });
        console.log(`Garden check: ${isGarden} (${reason})`);

        if (!isGarden) {
            return new Response(
                "That doesn't look like a garden. Please upload a photo of your outdoor space.",
                { status: 422 }
            );
        }
    } catch (error) {
        console.error(error);

        if (error instanceof OpenAI.APIConnectionTimeoutError) {
            return new Response(TIMEOUT_MESSAGE, { status: 504 });
        }

        return new Response("failed", { status: 500 });
    }

    return null;
}
