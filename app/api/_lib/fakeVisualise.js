const FAKE_WAIT_MS = 24000;

// In-memory clocks for the current dev server. A fresh Generate gets new ids.
const jobs = new Map();

const FAKE_TEXT =
  "<p>Clear the beds, edge the lawn, and pick up mulch and a few shrubs this weekend.</p>";

export function fakeVisualiseEnabled() {
  return process.env.NODE_ENV === "development" && process.env.VISUALISE_FAKE === "1";
}

export function createFakeJobs() {
  const stamp = Date.now().toString(36);
  const startedAt = Date.now();
  const imageJobId = `resp_fake_image_${stamp}`;
  const textJobId = `resp_fake_text_${stamp}`;

  jobs.set(imageJobId, { kind: "image", startedAt });
  jobs.set(textJobId, { kind: "text", startedAt });

  return { imageJobId, textJobId };
}

// Returns a poll payload for a fake id, or null when this id should hit OpenAI.
export function readFakeJob(jobId) {
  if (!jobId.startsWith("resp_fake_")) return null;

  let job = jobs.get(jobId);

  if (!job) {
    // The dev server restarted, or the page was opened from a saved URL.
    job = {
      kind: jobId.includes("_text_") ? "text" : "image",
      startedAt: Date.now(),
    };
    jobs.set(jobId, job);
  }

  if (Date.now() - job.startedAt < FAKE_WAIT_MS) {
    return { status: "in_progress" };
  }

  if (job.kind === "text") {
    return { status: "completed", output: FAKE_TEXT };
  }

  return {
    status: "completed",
    output: "/images/after_images/Sample_After1.png",
  };
}
