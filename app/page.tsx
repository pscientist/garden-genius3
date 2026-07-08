"use client";

import { useEffect, useMemo, useState } from "react";
import { LogoTitle } from "@/components/LogoTitle";
import { ImageUploadPanel } from "@/components/ImageUploadPanel";
import { ResultPanel } from "@/components/ResultPanel";
import { SiteBackground } from "@/components/SiteBackground";
import { TopNavbar } from "@/components/TopNavbar";
import { UserNav } from "@/components/UserNav";

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

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [tipVisible, setTipVisible] = useState(false);
  const [textTips, setTextTips] = useState<string | null>(null);

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
        return;
      }

      const returnedData = await response.json();

      console.log(returnedData);

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
    <main className="min-h-screen overflow-hidden bg-[#eef4df] text-[#21351f]">
      <section className="relative isolate min-h-screen px-6 py-10 sm:px-10 lg:px-16">
        <SiteBackground />

        <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:min-h-[calc(100vh-5rem)]">
          
          <div className="flex w-full flex-col gap-4 md:flex-row md:items-center">
            <div className="flex w-full flex-1 justify-start">
              <LogoTitle />
            </div>
            <div className="shrink-0 self-center md:self-auto">
              <TopNavbar />
            </div>
            <div className="flex w-full flex-1 justify-end">
              <UserNav />
            </div>
          </div>

          {/* Main before/after garden preview layout */}
          <div className="grid flex-1 items-start gap-5 md:grid-cols-[3fr_7fr]">
            <ImageUploadPanel
              beforeImgUrl={beforeImgUrl}
              file={file}
              loading={loading}
              onFileChange={setFile}
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
        </div>
      </section>
    </main>
  );
}
