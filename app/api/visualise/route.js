import OpenAI from "openai";
import prompts from "../generate/prompts.json";
import {
    openai,
    TIMEOUT_MESSAGE,
    readUploadedImage,
    rejectIfNotGarden,
} from "../_lib/garden";

// Client polling: this route only validates the photo and *starts* the OpenAI jobs.
// It returns job ids straight away; the browser then polls GET /api/visualise/[jobId].
// Only the garden check is awaited here, so the request stays short.
export const maxDuration = 60;

function startImageJob({ imageUrl }) {
    return openai.responses.create({
        model: "gpt-5.5",
        background: true,
        input: [
            {
                role: "user",
                content: [
                    { type: "input_text", text: prompts.imagePrompt },
                    { type: "input_image", image_url: imageUrl },
                ],
            },
        ],
        // images.edit has no background mode, so the edit runs through the
        // Responses API image_generation tool instead.
        tools: [
            {
                type: "image_generation",
                action: "edit",
                model: "gpt-image-1.5",
                quality: "medium",
                output_format: "jpeg",
            },
        ],
        tool_choice: { type: "image_generation" },
    });
}

function startTextJob({ imageUrl }) {
    return openai.responses.create({
        model: "gpt-5.5",
        background: true,
        input: [
            {
                role: "user",
                content: [
                    { type: "input_text", text: prompts.textPrompt },
                    { type: "input_image", image_url: imageUrl },
                ],
            },
        ],
    });
}

export async function POST(request) {
    const upload = await readUploadedImage(request);
    if (upload.errorResponse) return upload.errorResponse;

    const { mimeType, base64: beforeImageBase64 } = upload;

    const notGardenResponse = await rejectIfNotGarden({ beforeImageBase64, mimeType });
    if (notGardenResponse) return notGardenResponse;

    const imageUrl = `data:${mimeType};base64,${beforeImageBase64}`;

    console.log(`[${new Date().toISOString()}] Image received. Starting background jobs...`);

    try {
        const [imageJob, textJob] = await Promise.all([
            startImageJob({ imageUrl }),// just retrieve job IDs, so short duration
            startTextJob({ imageUrl }),
        ]);

        return Response.json({
            imageJobId: imageJob.id,
            textJobId: textJob.id,
        });
    } catch (error) {
        console.error(error);

        if (error instanceof OpenAI.APIConnectionTimeoutError) {
            return new Response(TIMEOUT_MESSAGE, { status: 504 });
        }

        return new Response("failed", { status: 500 });
    }
}
