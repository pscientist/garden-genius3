import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateSuggestions({ beforeImageBase64, mimeType, prompt }) {
  const imageUrl = `data:${mimeType};base64,${beforeImageBase64}`;

  const response = await openai.responses.create({
    model: "gpt-5.5",
    input: [
      {
        role: "user",
        content: [
          { type: "input_text", text: prompt },
          { type: "input_image", image_url: imageUrl },
        ],
      },
    ],
  });

  return response.output_text;
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is missing. Add it to your .env file.");
  }

  const imagePath = path.join(
    process.cwd(),
    "public/images/example_before1.jpg",
  );
  const promptPath = path.join(
    process.cwd(),
    "app/api/generate/suggestion-text.md",
  );

  if (!fs.existsSync(imagePath)) {
    throw new Error(`Test image not found: ${imagePath}`);
  }

  const beforeImageBuffer = fs.readFileSync(imagePath);
  const beforeImageBase64 = beforeImageBuffer.toString("base64");
  const mimeType = "image/jpeg";
  const prompt = fs.readFileSync(promptPath, "utf8").trim();

  console.log("Calling generateSuggestions...");
  console.log("Image:", imagePath);
  console.log("Prompt length:", prompt.length);

  const result = await generateSuggestions({
    beforeImageBase64,
    mimeType,
    prompt,
  });

  console.log("\n--- RESULT ---\n");
  console.log(result ?? "(empty result)");
}

main().catch((err) => {
  console.error("Test failed:");
  console.error(err);
  process.exit(1);
});
