import { openai } from "../../_lib/garden";

// Polled by the browser every couple of seconds. Each call is a quick lookup,
// so no serverless function ever waits on the slow image generation.
export const maxDuration = 15;

const JOB_ID_PATTERN = /^resp_[A-Za-z0-9_-]+$/;

// Image jobs finish with an image_generation_call item (base64 in `result`);
// text jobs finish with plain output text.
function extractOutput(response) {
    const imageCall = response.output?.find(
        (item) => item.type === "image_generation_call" && item.result,
    );

    if (imageCall) {
        return `data:image/jpeg;base64,${imageCall.result}`;
    }

    return response.output_text;
}

export async function GET(_request, { params }) {
    const { jobId } = await params;

    // validate the format
    if (!JOB_ID_PATTERN.test(jobId)) {
        return new Response("Invalid job id", { status: 400 });
    }

    try {
        const response = await openai.responses.retrieve(jobId);

        if (response.status === "completed") {
            const output = extractOutput(response);

            if (!output) {
                return Response.json({ status: "failed", error: "No output was produced" });
            }

            return Response.json({ status: "completed", output });
        }

        if (response.status === "failed") {
            console.error("Background job failed:", jobId, response.error);
            return Response.json({ status: "failed", error: response.error?.message ?? "failed" });
        }

        // queued, in_progress, cancelled or incomplete
        return Response.json({ status: response.status });
    } catch (error) {
        console.error(error);

        if (error?.status === 404) { // not found
            return new Response("Job not found", { status: 404 });
        }

        return new Response("failed", { status: 500 }); // error
    }
}
