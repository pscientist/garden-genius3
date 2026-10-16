import { openai } from "../../../_lib/garden";

export const maxDuration = 15;

const JOB_ID_PATTERN = /^resp_[A-Za-z0-9_-]+$/;

// Called by the browser when it gives up waiting, so an abandoned job stops using tokens.
export async function POST(_request, { params }) {
    const { jobId } = await params;

    if (!JOB_ID_PATTERN.test(jobId)) {
        return new Response("Invalid job id", { status: 400 });
    }

    try {
        await openai.responses.cancel(jobId);
        return Response.json({ status: "cancelled" });
    } catch (error) {
        console.error(error);

        // A job that already finished (or is gone) can't be cancelled; that's fine.
        if (error?.status === 400 || error?.status === 404) {
            return Response.json({ status: "not_cancellable" });
        }

        return new Response("failed", { status: 500 });
    }
}
