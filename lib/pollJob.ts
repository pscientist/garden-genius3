export class PollTimeoutError extends Error {
  constructor(message = "This is taking longer than usual. Please try again in a moment.") {
    super(message);
    this.name = "PollTimeoutError";
  }
}

type PollOptions = {
  intervalMs?: number;
  timeoutMs?: number;
  // Abort to stop polling early (e.g. the other job already failed). The job is cancelled too.
  signal?: AbortSignal;
};

type JobStatus = {
  status: string;
  output?: string;
  error?: string;
};

const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

async function cancelJob(jobId: string) {
  try {
    await fetch(`/api/visualise/${jobId}/cancel`, { method: "POST" });
  } catch {
    // Best effort: the job just keeps running on OpenAI's side if this fails.
  }
}

/**
 * Polls /api/visualise/[jobId] until the job completes and returns its output
 * (an image data URL or text, depending on the job).
 */
export async function pollJob(
  jobId: string,
  { intervalMs = 2000, timeoutMs = 150_000, signal }: PollOptions = {},
): Promise<string> {
  const deadline = Date.now() + timeoutMs;

  // 1. Browser polls every `intervalMs`
  while (Date.now() < deadline) {
    await sleep(intervalMs);// sleep for a few secondds

    if (signal?.aborted) {
      await cancelJob(jobId);
      throw new DOMException("Polling aborted", "AbortError");
    }

    const res = await fetch(`/api/visualise/${jobId}`);
    if (!res.ok) throw new Error(`Status request failed (${res.status})`);

    const result: JobStatus = await res.json();

    if (result.status === "completed" && result.output) {
      return result.output;
    }

    // error if not still in progress or queued
    if (!["queued", "in_progress"].includes(result.status)) {
      throw new Error(result.error ?? `Job ended: ${result.status}`);
    }
  }// after while loop

  // 2. Browser requests cancellation
  await cancelJob(jobId);

  throw new PollTimeoutError();
}
