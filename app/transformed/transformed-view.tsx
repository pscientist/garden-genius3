"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { GardenPlanPanel } from "@/components/GardenPlanPanel";
import { ResultPanel } from "@/components/ResultPanel";
import { readRememberedBeforeImage, SAMPLE_BEFORE_IMAGE } from "@/lib/beforeImage";
import { pollJob, PollTimeoutError } from "@/lib/pollJob";

const pageWidth =
  "mx-auto w-[min(100%-2rem,72rem)] sm:w-[min(100%-3rem,72rem)] lg:w-[min(100%-4rem,72rem)]";

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
  const [tipsStarted, setTipsStarted] = useState(false);
  const [, setTextTips] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tipIndex, setTipIndex] = useState(() => getRandomTipIndex());
  const [beforeImage, setBeforeImage] = useState(SAMPLE_BEFORE_IMAGE);

  const currentTipImage = tipImages[tipIndex];

  useEffect(() => {
    setBeforeImage(readRememberedBeforeImage());
  }, []);

  useEffect(() => {
    if (!loading) {
      setTipsStarted(false);
      setTipVisible(false);
      return;
    }

    let intervalId: number | undefined;
    let swapTimeoutId: number | undefined;

    const startId = window.setTimeout(() => {
      setTipsStarted(true);
      setTipVisible(true);

      // show a different tip image every 7 seconds
      intervalId = window.setInterval(() => {
        setTipVisible(false);

        swapTimeoutId = window.setTimeout(() => {
          setTipIndex((prevIndex) => getRandomTipIndex(prevIndex));
          setTipVisible(true);
        }, 500); // 500ms fade in

      }, 7000);// swap tip image every 7 secs

    }, 3000);// tips starts 3 secs this loads

    return () => {
      window.clearTimeout(startId);

      if (intervalId) {
        window.clearInterval(intervalId);
      }

      if (swapTimeoutId) {
        window.clearTimeout(swapTimeoutId);
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
    <div className={pageWidth}>
      {error ? (
        <p role="alert" className="mb-4 text-center font-inter text-sm leading-6 text-main-nav">
          {error}
        </p>
      ) : null}
      {result ? (
        <>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <h2 className="page-title text-[#1f321d]">Your garden, reimagined</h2>
            <span className="inline-flex items-center gap-1.5 font-inter text-sm font-semibold text-brand">
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M8.5 12.5l2.2 2.2 4.8-5.2" />
              </svg>
              Design ready
            </span>
          </div>
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.85fr)]">
            <div>
              <BeforeAfterSlider beforeSrc={beforeImage} afterSrc={result} />
              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <img
                    alt="Original garden photo"
                    className="h-32 w-40 rounded-lg object-cover"
                    src={beforeImage}
                  />
                  <div>
                    <p className="font-inter text-sm font-semibold text-[#1f321d]">Before</p>
                    <button
                      type="button"
                      className="font-inter text-sm font-medium text-brand underline underline-offset-2"
                    >
                      View original
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-[#c9c3b4] bg-white px-4 py-2 font-inter text-sm font-medium text-[#1f321d]"
                  >
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 4v10" />
                      <path d="M8 10l4 4 4-4" />
                      <path d="M5 19h14" />
                    </svg>
                    Download image
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-[#c9c3b4] bg-white px-4 py-2 font-inter text-sm font-medium text-[#1f321d]"
                  >
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 12a8 8 0 1 1-2.3-5.7" />
                      <path d="M20 5v5h-5" />
                    </svg>
                    Try another design
                  </button>
                </div>
              </div>
            </div>
            <GardenPlanPanel />
          </div>
        </>
      ) : (
        <div className="mx-auto w-full max-w-3xl">
          <ResultPanel
            result={result}
            loading={loading}
            currentTipImage={currentTipImage}
            tipVisible={tipVisible}
            tipsStarted={tipsStarted}
            textTips={null}
          />
        </div>
      )}
    </div>
  );
}
