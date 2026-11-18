const STORAGE_KEY = "garden-before-image";

export const SAMPLE_BEFORE_IMAGE = "/images/before_images/Sample_Before1.png";

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Could not read the photo."));
      }
    };
    reader.onerror = () => {
      reject(reader.error ?? new Error("Could not read the photo."));
    };
    reader.readAsDataURL(file);
  });
}

export async function rememberBeforeImage(file: File) {
  try {
    const dataUrl = await readFileAsDataUrl(file);
    sessionStorage.setItem(STORAGE_KEY, dataUrl);
  } catch (error) {
    console.error("Could not store the original photo", error);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Storage may be unavailable. The thumbnail falls back to the sample.
    }
  }
}

export function readRememberedBeforeImage() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) || SAMPLE_BEFORE_IMAGE;
  } catch {
    return SAMPLE_BEFORE_IMAGE;
  }
}
