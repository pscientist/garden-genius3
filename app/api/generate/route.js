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
    
        image: await toFile(beforeImageBuffer, "before.png", {
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

    if (!image) {
        return new Response("No image provided", {status: 400});
    }

    const beforeImageBuffer = Buffer.from(await image.arrayBuffer());
    const mimeType = image.type || "image/png";

    let imageBase64;
    let textTips;

    console.log(`[${new Date().toISOString()}] Image received. Generating garden design...`);

    try {
        
        // generrate text suggestions
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
        // imageUrl: `/images/after.png?v=${Date.now()}`,
        imageUrl: `data:image/png;base64,${imageBase64}`,
        textTips : textTips
    });

}