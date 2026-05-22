"use client";

import { useEffect, useMemo, useState } from "react";


const tipImages = [
  "/images/tip1_people.png",
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
  "/images/tip15_people.png",
  
];

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
        setTipIndex((prevIndex) => (prevIndex + 1) % tipImages.length);
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

    setTipIndex(0);
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
  };

  useEffect(() => {
    if (!beforeImgUrl) return;

    return () => URL.revokeObjectURL(beforeImgUrl);

  }, [beforeImgUrl]);


  return (
    <main className="min-h-screen overflow-hidden bg-[#eef4df] text-[#21351f]">
      <section className="relative isolate min-h-screen px-6 py-10 sm:px-10 lg:px-16">
        {/* Background garden-themed color shapes */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(90,126,71,0.34),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(138,93,53,0.22),_transparent_30%),linear-gradient(135deg,_#eef4df_0%,_#f7efe2_48%,_#d9c5a6_100%)]" />
        <div className="absolute left-8 top-10 -z-10 h-56 w-56 rounded-full bg-[#78935b]/24 blur-3xl" />
        <div className="absolute right-20 top-24 -z-10 h-32 w-52 rounded-[55%_45%_65%_35%] bg-[#9dbb7a]/24 blur-2xl" />
        <div className="absolute bottom-20 left-20 -z-10 h-24 w-44 rotate-[-12deg] rounded-[65%_35%_45%_55%] bg-[#6f8a55]/20 blur-2xl" />
        <div className="absolute bottom-8 right-8 -z-10 h-72 w-72 rounded-full bg-[#8a5d35]/18 blur-3xl" />

        <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:min-h-[calc(100vh-5rem)]">
          {/* Page title and short description */}
          <header>
            <h1 className="text-5xl leading-[0.95] font-semibold tracking-tight text-[#1f321d] sm:text-6xl">
              Garden Genius
            </h1>
            <p className="mt-3 max-w-2xl text-lg leading-7 text-[#526144]">
              Prototype your garden to perfection: beautiful, affordable, and
              easy to maintain.
            </p>
          </header>

          {/* Main before/after garden preview layout */}
          <div className="grid flex-1 items-start gap-5 md:grid-cols-[3fr_7fr]">
            <div className="flex flex-col gap-4">
              {/* Before image panel */}
              <div className="rounded-[2rem] border border-[#d8c7a9]/70 bg-[#fffaf0]/80 p-4 shadow-2xl shadow-[#4d5a35]/20 backdrop-blur md:p-5">
                <div className="flex min-h-[28rem] flex-col rounded-[1.5rem] border border-[#c9b38d] bg-gradient-to-br from-[#fffaf0] via-[#edf3df] to-[#ead7bb] p-5">
                  <div className="mb-4">
                    <p className="text-sm font-semibold tracking-[0.18em] text-[#7b5a36] uppercase">
                      Before
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-[#253d21]">
                      Your garden photo
                    </h2>
                  </div>

                  <div className="flex flex-1 items-center justify-center overflow-hidden rounded-3xl border border-[#c9b38d] bg-[#2f281e] p-2 shadow-inner">
                    {beforeImgUrl ? (
                      <img
                        alt="Before garden photo"
                        className="h-full min-h-[20rem] w-full rounded-[1.25rem] object-cover"
                        src={beforeImgUrl}
                      />
                    ) : (
                      <div className="flex min-h-[20rem] w-full items-center justify-center rounded-[1.25rem] bg-[#fbf5e8]/10 px-8 text-center text-sm leading-6 text-[#fbf5e8]/75">
                        Upload a garden photo to see your before image here.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Generation progress indicator */}
              {/* {loading && (
                <div className="flex justify-center">
                  <img
                    alt="Garden generation in progress"
                    className="h-8 w-full max-w-xs object-contain"
                    src="/images/progress_bar.gif"
                  />
                </div>
              )} */}


              {/* Upload and generate controls */}
              <div className="rounded-[1.5rem] border border-[#d8c7a9]/70 bg-[#fffaf0]/80 p-4 shadow-xl shadow-[#4d5a35]/12 backdrop-blur">
                <label className="group flex min-h-20 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#8ea56e] bg-white/55 px-5 py-4 text-center transition hover:border-[#8a5d35] hover:bg-white/75">
                  <input
                    className="sr-only"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  />
                  <span className="rounded-full bg-[#2f4f29] px-4 py-2 text-sm font-semibold text-[#fbf5e8] shadow-lg shadow-[#2f4f29]/20 transition group-hover:bg-[#45663a]">
                    Choose image
                  </span>
                  <span className="mt-2 text-sm text-[#536246]">
                    {file ? file.name : "PNG, JPG, or HEIC garden photo"}
                  </span>
                </label>

                <button
                  className="mt-3 w-full rounded-full bg-[#294823] px-6 py-3 text-base font-semibold text-[#fbf5e8] shadow-xl shadow-[#2f4f29]/25 transition hover:-translate-y-0.5 hover:bg-[#3d6535] disabled:cursor-not-allowed disabled:bg-[#9baa8b] disabled:shadow-none"
                  disabled={!file || loading}
                  onClick={handleSubmit}
                >
                  {loading ? "Composing your garden..." : "Generate Garden"}
                </button>
              </div>
            </div>

            {/* After image panel */}
            <div className="rounded-[2rem] border border-[#d8c7a9]/70 bg-[#fffaf0]/80 p-4 shadow-2xl shadow-[#4d5a35]/20 backdrop-blur md:p-5">
              <div className="flex min-h-[28rem] flex-col rounded-[1.5rem] border border-[#c9b38d] bg-gradient-to-br from-[#fffaf0] via-[#edf3df] to-[#ead7bb] p-5">
                <div className="mb-4">
                  <p className="text-sm font-semibold tracking-[0.18em] text-[#7b5a36] uppercase">
                    After
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-[#253d21]">
                    {result ? (
                      "Suggested Design for You"
                    ) : loading ? (
                      <span className="flex items-center gap-4">
                        <span>Generating...</span>
                        <img
                          alt="Garden generation in progress"
                          className="h-12 w-48 object-contain"
                          src="/images/progress_bar.gif"
                        />
                      </span>
                    ) : (
                      ""
                    )}
                  </h2>
                </div>

                <div className="flex flex-1 items-center justify-center overflow-hidden rounded-3xl border border-[#c9b38d] bg-[#2f281e] p-2 shadow-inner">
                  {result ? (
                    <img
                      alt="Generated garden design concept"
                      className="h-full min-h-[20rem] w-full rounded-[1.25rem] object-cover"
                      src={result}
                    />
                  ) : loading ? (
                    <div className="flex h-full min-h-[20rem] w-full items-center justify-center">
                      <img
                        src={currentTipImage}
                        alt="Current tip"
                        className={`h-full w-full rounded-[1.25rem] object-contain transition-opacity duration-500 ${
                          tipVisible ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </div>
                  ) : (
                    <div className="flex min-h-[20rem] w-full items-center justify-center rounded-[1.25rem] bg-[#fbf5e8]/10 px-8 text-center text-sm leading-6 text-[#fbf5e8]/75">
                      Generate your design to see the after image here.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* text tips */}      
            <div>
              <p> Suggestions
                {textTips}
              </p>
            </div>

            </div>
        </div>
      </section>
    </main>
  );
}