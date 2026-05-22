import OpenAI, { toFile } from "openai";
import fs from "fs";
import dotenv from "dotenv";
import path from "node:path";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// const inputFile = path.join(process.cwd(), "public", "images", "messy_garden2.png");
const outputFile = path.join(process.cwd(), "public", "images", "after.png");
const promptFile = path.join(process.cwd(), "app", "api", "generate", "transformed-image.md");
const textPromptFile = path.join(process.cwd(), "app", "api", "generate", "suggestion-text.md");

const img_gen_prompt = fs.readFileSync(promptFile, "utf8").trim();
const txt_gen_prompt = fs.readFileSync(textPromptFile, "utf8").trim();

async function createPrompt({imageBase64, mimeType})  {
    const imageUrl = `data:${mimeType};base64,${imageBase64}`;

    const response = await openai.responses.create({
        model: "gpt-5.5",
        input: [
            {
            role: "user",
            content: [
                {
                type: "input_text",
                text: img_gen_prompt
                },
                {
                type: "input_image",
                image_url: imageUrl
                }
            ]
            }
        ]
    });

    return response.output_text;
}; 

async function generateGardenDesignImage({prompt}) {
    const result = await openai.images.generate({
        model: "gpt-image-2",
        prompt: prompt,
    });

    return result.data[0].b64_json;
};

async function saveAfterImage({afterImageBase64}) {
    const bytes = Buffer.from(afterImageBase64, "base64")

    const outputFilePath = path.join(process.cwd(), "public", "images", "after.png");
    
    fs.writeFileSync(outputFilePath, bytes);

    return "/images/after.png";
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

async function editGardenImage({beforeImageBuffer, after_img, prompt, mimeType}) {
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

    const imageBase64 = result.data[0].b64_json;
    fs.writeFileSync(after_img, Buffer.from(imageBase64, "base64"));
    console.log("Saved edited image to ", after_img);
}


export async function POST(request) {

    const formData = await request.formData();
    const image = formData.get("image");

    if (!image) {
        return new Response("No image provided", {status: 400});
    }

    const beforeImageBuffer = Buffer.from(await image.arrayBuffer());
    const mimeType = image.type || "image/png";

    let textTips;

    console.log(`[${new Date().toISOString()}] Image received. Generating garden design...`);

    try {
        
        // generrate text suggestions
        const beforeImageBase64 = beforeImageBuffer.toString("base64");

        [, textTips] = await Promise.all([
            editGardenImage({
                beforeImageBuffer,
                after_img: outputFile,
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
        imageUrl: `/images/after.png?v=${Date.now()}`,
        textDescription : textTips
    });

}