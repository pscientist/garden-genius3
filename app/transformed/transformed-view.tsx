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
  const [pageVisible, setPageVisible] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);

  const currentTipImage = tipImages[tipIndex];

  useEffect(() => {
    setBeforeImage(readRememberedBeforeImage());
  }, []);

  useEffect(() => {
    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => setPageVisible(true));
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, []);

  useEffect(() => {
    if (!result) {
      setResultVisible(false);
      return;
    }

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => setResultVisible(true));
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [result]);

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
    <div
      className={`${pageWidth} transition-opacity duration-300 ${
        pageVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {error ? (
        <p role="alert" className="mb-4 text-center font-inter text-sm leading-6 text-main-nav">
          {error}
        </p>
      ) : null}
      {result ? (
        <>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <h2 className="page-title text-[#1f321d]">Your garden, reimagined</h2>
          </div>

          <div
            className={`result_wrapper grid items-start gap-6 transition-opacity duration-[1200ms] lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.85fr)] ${
              resultVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div>
              <BeforeAfterSlider beforeSrc={beforeImage} afterSrc={result} />
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
