"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ResultPanel } from "@/components/ResultPanel";
import { pollJob, PollTimeoutError } from "@/lib/pollJob";

const tipImages = [
  "/images/tip_annual.png",
  "/images/tip_autumn_leaves.png",
  "/images/tip4_people.png",
  "/images/tip5_people.png",
  "/images/tip6_people.png",
  "/images/tip7_people.png",
  "/images/tip8_people.png",
  "/images/tip9_people.png",
  "/images/tip10_people.png",
  "/images/tip13_solar.png",
  "/images/tip14_gravel.png",
  "/images/tip15_people.jpeg",
];

function getRandomTipIndex(excludeIndex?: number) {
  if (tipImages.length <= 1) return 0;

  const allowedIndexes = Array.from({ length: tipImages.length }, (_, i) => i).filter(
    (n) => n !== excludeIndex,
  );

  const randomPos = Math.floor(Math.random() * allowedIndexes.length);

  return allowedIndexes[randomPos];
}

export function TransformedView() {
  const searchParams = useSearchParams();
  const imageJobId = searchParams.get("image");
  const textJobId = searchParams.get("tips");
  const hasJobs = Boolean(imageJobId && textJobId);

  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(hasJobs);
  const [tipVisible, setTipVisible] = useState(false);
  const [textTips, setTextTips] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tipIndex, setTipIndex] = useState(() => getRandomTipIndex());

  const currentTipImage = tipImages[tipIndex];

  useEffect(() => {
    if (!loading) return;

    setTipVisible(true);
    let timeoutId: number | undefined;

    const intervalId = window.setInterval(() => {
      setTipVisible(false);

      timeoutId = window.setTimeout(() => {
        setTipIndex((prevIndex) => getRandomTipIndex(prevIndex));
        setTipVisible(true);
      }, 500);
    }, 7000);

    return () => {
      window.clearInterval(intervalId);

      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [loading]);

  useEffect(() => {
    if (!imageJobId || !textJobId) return;

    const imageId = imageJobId;
    const textId = textJobId;

    // Ignore late results after leaving the page. Do not abort: pollJob
    // cancels the OpenAI job when its signal is aborted.
    let ignore = false;
    const pollController = new AbortController();

    setLoading(true);
    setResult(null);
    setTextTips(null);
    setError(null);

    async function pollJobs() {
      try {
        await Promise.all([
          pollJob(imageId, { signal: pollController.signal }).then((output) => {
            if (!ignore) setResult(output);
          }),
          pollJob(textId, { signal: pollController.signal })
            .then((output) => {
              if (!ignore) setTextTips(output);
            })
            .catch((tipsError) => console.error("Tips job failed", tipsError)),
        ]);
      } catch (pollError) {
        if (ignore) return;

        // The image job failed or timed out, so stop the tips job too.
        pollController.abort();
        console.error("Polling failed", pollError);
        setError(
          pollError instanceof PollTimeoutError
            ? pollError.message
            : "Something went wrong. Please try again.",
        );
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    void pollJobs();

    return () => {
      ignore = true;
    };
  }, [imageJobId, textJobId]);

  return (
    <div className="mx-auto w-full max-w-3xl">
      {error ? (
        <p role="alert" className="mb-4 text-center font-inter text-sm leading-6 text-main-nav">
          {error}
        </p>
      ) : null}
      <ResultPanel
        result={result}
        loading={loading}
        currentTipImage={currentTipImage}
        tipVisible={tipVisible}
        textTips={textTips}
      />
    </div>
  );
}
