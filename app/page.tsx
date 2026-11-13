"use client";

import { useEffect, useMemo, useState } from "react";
import { ImageUploadPanel } from "@/components/ImageUploadPanel";
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

  const allowedIndexes = Array.from({ length: tipImages.length }, (_, i) => i)
    .filter((n) => n !== excludeIndex);

  const randomPos = Math.floor(Math.random() * allowedIndexes.length);

  return allowedIndexes[randomPos];
}


export default function Visualizer()
{
    const [file, setFile] = useState<File | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [tipVisible, setTipVisible] = useState(false);
    const [textTips, setTextTips] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
  
    const beforeImgUrl = useMemo(
      () => (file ? URL.createObjectURL(file) : null),
      [file],
    );
  
    const [tipIndex, setTipIndex] = useState(0);
  
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
  
    async function handleSubmit() {
      setResult(null);
      setTextTips(null);
      setError(null);
  
      if (!file) return;
  
      setTipIndex(getRandomTipIndex());
      setTipVisible(false);
  
      setLoading(true);
  
      const formData = new FormData();
      formData.append("image", file);
  
      const pollController = new AbortController();

      try {
        // 1. Start the background jobs. This returns quickly with job ids.
        const response = await fetch("/api/visualise", {
          method: "POST",
          body: formData,
        });

        // if not ok, then we check the error message
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Failure API call : ", response.status, errorText);
          setError(
            response.status === 422 || response.status === 504
              ? errorText
              : "Something went wrong. Please try again.",
          );
          return;
        }

        // started OPenAI job IDs
        const { imageJobId, textJobId } = await response.json();

        // 2. Poll both jobs. Each one is shown as soon as it arrives.
        // The tips are a bonus, so a failed tips job doesn't throw away the image.
        // run in parallel to check every 2 secs our started jobs
        await Promise.all([ // concurrent processing 
          pollJob(imageJobId, { signal: pollController.signal }).then(setResult),
          pollJob(textJobId, { signal: pollController.signal })
            .then(setTextTips)
            .catch((tipsError) => console.error("Tips job failed", tipsError)),
        ]);
      } catch (pollError) {
        // If the image job fails or times out, stop (and cancel) the tips job too.
        pollController.abort();// abort (AbortController)
        console.error("Polling failed", pollError);
        setError(
          pollError instanceof PollTimeoutError
            ? pollError.message
            : "Something went wrong. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    }
  
    useEffect(() => {
      if (!beforeImgUrl) return;
  
      return () => URL.revokeObjectURL(beforeImgUrl);
    }, [beforeImgUrl]);
  
    return (
        <div className="transformation_wrapper mx-auto grid w-[min(100%-2rem,72rem)] flex-1 items-start gap-6 sm:w-[min(100%-3rem,72rem)] md:grid-cols-2 lg:w-[min(100%-4rem,72rem)]">
            <ImageUploadPanel
            beforeImgUrl={beforeImgUrl}
            file={file}
            loading={loading}
            error={error}
            onFileChange={(newFile) => {
              setFile(newFile);
              setError(null);
            }}
            onSubmit={handleSubmit}
            />

            <ResultPanel
            result={result}
            loading={loading}
            currentTipImage={currentTipImage}
            tipVisible={tipVisible}
            textTips={textTips}
            />
        </div>
    )

}
