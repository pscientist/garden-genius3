import OpenAI, { toFile } from "openai";
import prompts from "./prompts.json";
import {
    openai,
    TIMEOUT_MESSAGE,
    readUploadedImage,
    rejectIfNotGarden,
} from "../_lib/garden";

export const maxDuration = 120;

// Garden check and generation run one after the other, so together they must fit within maxDuration.
const GENERATION_TIMEOUT_MS = 100 * 1000;

const img_gen_prompt = prompts.imagePrompt;
const txt_gen_prompt = prompts.textPrompt;

async function generateSuggestions({ beforeImageBase64, mimeType, prompt, signal }) {
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
    }, { timeout: GENERATION_TIMEOUT_MS, signal });

    return response.output_text;
}

async function editGardenImage({beforeImageBuffer, prompt, mimeType, signal}) {
    const startTime = performance.now();

    // OpenAI Image Edit will take the longest time and consume tokens
    const result = await openai.images.edit({
        model: "gpt-image-1.5",
    
        image: await toFile(beforeImageBuffer, `before.${mimeType.split("/")[1]}`, {
          type: mimeType,
        }),
    
        prompt,
        quality: "medium",
        output_format: "jpeg",
    }, { timeout: GENERATION_TIMEOUT_MS, signal });
    
    const elapsedSeconds = (performance.now() - startTime) / 1000;
    console.log(`OpenAI API took ${elapsedSeconds.toFixed(2)} seconds`);

    return result.data[0].b64_json;
}


export async function POST(request) {

    const upload = await readUploadedImage(request);
    if (upload.errorResponse) return upload.errorResponse;

    const { buffer: beforeImageBuffer, mimeType, base64: beforeImageBase64 } = upload;

    // We do a image check to see if it's a garden image
    const notGardenResponse = await rejectIfNotGarden({ beforeImageBase64, mimeType });
    if (notGardenResponse) return notGardenResponse;

    let imageBase64;
    let textTips;

    console.log(`[${new Date().toISOString()}] Image received. Generating garden design...`);

    const generationController = new AbortController();

    try {
        // Once we validate the image is really a garden, 
        // then we will call the 2 APIs
        // - for image transformation (generate the image)
        // - call ResponseAPI to generate text description of suggestions (mulch, trees to plant)
        // We cancel the other one if one is failed to avoid consuming time and token
        [imageBase64, textTips] = await Promise.all([
            editGardenImage({
                beforeImageBuffer,
                prompt: img_gen_prompt,
                mimeType,
                signal: generationController.signal,
            }),  
            generateSuggestions({ 
                beforeImageBase64,
                mimeType,
                prompt: txt_gen_prompt,// with HTML formatting
                signal: generationController.signal,
            })
        ]);

    } catch (error) {
        generationController.abort();
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