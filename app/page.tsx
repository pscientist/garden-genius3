"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUploadPanel } from "@/components/ImageUploadPanel";
import { ResultPanel } from "@/components/ResultPanel";


export default function Visualizer()
{
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const beforeImgUrl = useMemo(
      () => (file ? URL.createObjectURL(file) : null),
      [file],
    );
  
    async function handleSubmit() {
      setError(null);
  
      if (!file) return;
  
      setSubmitting(true);
  
      const formData = new FormData();
      formData.append("image", file);

      try {
        // Start the background jobs. This returns quickly with job ids.
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
          setSubmitting(false);
          return;
        }

        const { imageJobId, textJobId } = await response.json();

        if (!imageJobId || !textJobId) {
          setError("Something went wrong. Please try again.");
          setSubmitting(false);
          return;
        }

        router.push(
          `/transformed?image=${encodeURIComponent(imageJobId)}&tips=${encodeURIComponent(textJobId)}`,
        );
      } catch (submitError) {
        console.error("Failure API call : ", submitError);
        setError("Something went wrong. Please try again.");
        setSubmitting(false);
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
            loading={submitting}
            error={error}
            onFileChange={(newFile) => {
              setFile(newFile);
              setError(null);
            }}
            onSubmit={handleSubmit}
            />

            <ResultPanel
            result={null}
            loading={false}
            currentTipImage="/images/tip_annual.png"
            tipVisible={false}
            textTips={null}
            />
        </div>
    )

}
