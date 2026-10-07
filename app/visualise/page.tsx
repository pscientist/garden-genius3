"use client";

import { useEffect, useMemo, useState } from "react";
import { ImageUploadPanel } from "@/components/ImageUploadPanel";
import { ResultPanel } from "@/components/ResultPanel";


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
  
      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          body: formData,
        });
  
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
  
        const returnedData = await response.json();
  
        setResult(returnedData.imageUrl);
        setTextTips(returnedData.textTips ?? null);
      } finally {
        setLoading(false);
      }
    }
  
    useEffect(() => {
      if (!beforeImgUrl) return;
  
      return () => URL.revokeObjectURL(beforeImgUrl);
    }, [beforeImgUrl]);
  
    return (
        <div className="transformation_wrapper mx-auto grid w-[min(100%-2rem,72rem)] flex-1 items-start gap-5 rounded-2xl sm:w-[min(100%-3rem,72rem)] md:grid-cols-[3fr_7fr] lg:w-[min(100%-4rem,72rem)]">
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
