import fs from "fs";
import path from "path";
import { parseArgs } from "node:util";
import dotenv from "dotenv";
import OpenAI, { toFile } from "openai";

dotenv.config();

const DEFAULT_IMAGE = path.join(
  process.cwd(),
  "public/images/example_before1.jpg",
);
const DEFAULT_PROMPT = path.join(
  process.cwd(),
  "scripts/prompts/transformed-image.md",
);
const DEFAULT_OUTPUT_DIR = path.join(process.cwd(), "scripts/output");

const MIME_BY_EXT = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

function printHelp() {
  console.log(`Usage: npm run test:image-edit -- [options]

Test the OpenAI Image Edit API with a before photo and prompt file.

Options:
  -i, --image     Input image path (default: public/images/example_before1.jpg)
  -p, --prompt    Prompt markdown file (default: app/api/generate/transformed-image.md)
  -o, --output    Output image path (default: scripts/output/edit-<timestamp>.png)
  -m, --model     OpenAI image model (default: gpt-image-1.5)
      --positive  Optional style reference image filename or path (2nd input image)
      --negative  Optional negative example image filename or path (avoid this look)
  -h, --help      Show this help text

Examples:
  npm run test:image-edit
  npm run test:image-edit -- -i public/images/messy_garden3.jpg
  npm run test:image-edit -- --positive scripts/output/positive.jpeg
  npm run test:image-edit -- --negative negative.jpeg
  npm run test:image-edit -- -i public/images/messy_garden3.jpg --positive scripts/output/positive.jpeg --negative negative.jpeg -o scripts/output/try-1.png
`);
}

function resolveMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_BY_EXT[ext] ?? "image/png";
}

function filenameForMime(mimeType, basename = "before") {
  if (mimeType === "image/jpeg") return `${basename}.jpg`;
  if (mimeType === "image/webp") return `${basename}.webp`;
  return `${basename}.png`;
}

function resolveReferenceImagePath(value, label) {
  const directPath = path.resolve(value);

  if (fs.existsSync(directPath)) {
    return directPath;
  }

  const publicImagesPath = path.join(
    process.cwd(),
    "public/images",
    path.basename(value),
  );

  if (fs.existsSync(publicImagesPath)) {
    return publicImagesPath;
  }

  throw new Error(
    `${label} image not found: ${value} (also checked public/images/)`,
  );
}

function ordinal(n) {
  const suffixes = ["th", "st", "nd", "rd"];
  const remainder = n % 100;
  const suffix =
    suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0];
  return `${n}${suffix}`;
}

const POSITIVE_REFERENCE_NOTE = `Use it as a style guide, eg the realism style, 
    the lawns (restricted and tidy), the sunlight, the homeliness, 
    and simple yet elegant furniture. Not expensive. And not gardening magazine fantasy.`;

const NEGATIVE_REFERENCE_NOTE = `Do not match its 
    unrealistic look, expensive furniture, perfect edges, storybook like texture. `

function buildPrompt(prompt, { hasPositiveReference, hasNegativeReference }) {
  const notes = [];
  let imageIndex = 2;

  if (hasPositiveReference) {
    notes.push(
      `The ${ordinal(imageIndex)} provided input image is the positive style reference. ${POSITIVE_REFERENCE_NOTE}`,
    );
    imageIndex += 1;
  }

  if (hasNegativeReference) {
    notes.push(
      `The ${ordinal(imageIndex)} provided input image is a negative example. ${NEGATIVE_REFERENCE_NOTE}`,
    );
  }

  if (notes.length === 0) {
    return prompt;
  }

  return `${prompt.trim()}\n\n${notes.join("\n\n")}`;
}

async function buildImageInput({
  beforeImageBuffer,
  positiveImageBuffer,
  negativeImageBuffer,
  mimeType,
  positiveMimeType,
  negativeMimeType,
}) {
  const beforeFile = await toFile(
    beforeImageBuffer,
    filenameForMime(mimeType, "before"),
    { type: mimeType },
  );

  const imageFiles = [beforeFile];

  if (positiveImageBuffer) {
    imageFiles.push(
      await toFile(
        positiveImageBuffer,
        filenameForMime(positiveMimeType, "positive"),
        { type: positiveMimeType },
      ),
    );
  }

  if (negativeImageBuffer) {
    imageFiles.push(
      await toFile(
        negativeImageBuffer,
        filenameForMime(negativeMimeType, "negative"),
        { type: negativeMimeType },
      ),
    );
  }

  return imageFiles.length === 1 ? imageFiles[0] : imageFiles;
}

async function editGardenImage({
  openai,
  beforeImageBuffer,
  positiveImageBuffer,
  negativeImageBuffer,
  prompt,
  mimeType,
  positiveMimeType,
  negativeMimeType,
  model,
  outputPath,
}) {
  const startTime = performance.now();
  const hasPositiveReference = Boolean(positiveImageBuffer);
  const hasNegativeReference = Boolean(negativeImageBuffer);
  const image = await buildImageInput({
    beforeImageBuffer,
    positiveImageBuffer,
    negativeImageBuffer,
    mimeType,
    positiveMimeType,
    negativeMimeType,
  });

  const result = await openai.images.edit({
    model,
    image,
    prompt: buildPrompt(prompt, { hasPositiveReference, hasNegativeReference }),
  });


  console.log("------ whole API call ----------")
  console.log(image);
  console.log(prompt);
  console.log("------ end whole API call ----------")
  

  const elapsedSeconds = (performance.now() - startTime) / 1000;
  const imageBase64 = result.data[0]?.b64_json;

  if (!imageBase64) {
    throw new Error("Image Edit API returned no image data.");
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, Buffer.from(imageBase64, "base64"));

  return { elapsedSeconds, outputPath };
}

async function main() {
  const { values } = parseArgs({
    options: {
      image: { type: "string", short: "i" },
      prompt: { type: "string", short: "p" },
      output: { type: "string", short: "o" },
      model: { type: "string", short: "m", default: "gpt-image-1.5" },
      positive: { type: "string" },
      negative: { type: "string" },
      help: { type: "boolean", short: "h", default: false },
    },
    allowPositionals: false,
  });

  if (values.help) {
    printHelp();
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is missing. Add it to your .env file.");
  }

  const imagePath = path.resolve(values.image ?? DEFAULT_IMAGE);
  const promptPath = path.resolve(values.prompt ?? DEFAULT_PROMPT);
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outputPath = path.resolve(
    values.output ?? path.join(DEFAULT_OUTPUT_DIR, `edit-${timestamp}.png`),
  );

  if (!fs.existsSync(imagePath)) {
    throw new Error(`Test image not found: ${imagePath}`);
  }

  if (!fs.existsSync(promptPath)) {
    throw new Error(`Prompt file not found: ${promptPath}`);
  }

  const positivePath = values.positive
    ? resolveReferenceImagePath(values.positive, "Positive reference")
    : null;

  const negativePath = values.negative
    ? resolveReferenceImagePath(values.negative, "Negative reference")
    : null;

  const beforeImageBuffer = fs.readFileSync(imagePath);
  const mimeType = resolveMimeType(imagePath);
  const positiveImageBuffer = positivePath
    ? fs.readFileSync(positivePath)
    : null;
  const positiveMimeType = positivePath
    ? resolveMimeType(positivePath)
    : null;
  const negativeImageBuffer = negativePath
    ? fs.readFileSync(negativePath)
    : null;
  const negativeMimeType = negativePath
    ? resolveMimeType(negativePath)
    : null;
  const prompt = fs.readFileSync(promptPath, "utf8").trim();
  const finalPrompt = buildPrompt(prompt, {
    hasPositiveReference: Boolean(positiveImageBuffer),
    hasNegativeReference: Boolean(negativeImageBuffer),
  });

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  console.log("Calling OpenAI Image Edit API...");
  console.log("Model:", values.model);
  console.log("Image:", imagePath);
  console.log("Positive reference:", positivePath ?? "(none)");
  console.log("Negative reference:", negativePath ?? "(none)");
  console.log("Prompt file:", promptPath);
  console.log("Prompt length:", finalPrompt.length);
  console.log("Output:", outputPath);
  console.log("\n--- PROMPT PREVIEW ---\n");
  console.log(finalPrompt);
  console.log("\n--- END PROMPT PREVIEW ---\n");

  const { elapsedSeconds, outputPath: savedPath } = await editGardenImage({
    openai,
    beforeImageBuffer,
    positiveImageBuffer,
    negativeImageBuffer,
    prompt,
    mimeType,
    positiveMimeType,
    negativeMimeType,
    model: values.model,
    outputPath,
  });

  console.log(`Done in ${elapsedSeconds.toFixed(2)} seconds`);
  console.log("Saved edited image to:", savedPath);
}

main().catch((err) => {
  console.error("Test failed:");
  console.error(err);
  process.exit(1);
});
