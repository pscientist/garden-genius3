const loadingBarStyles = [
  { color: "#6f8a55", height: "1.75rem", delay: "0ms" },
  { color: "#7d9458", height: "2rem", delay: "100ms" },
  { color: "#8a9a52", height: "2.25rem", delay: "200ms" },
  { color: "#98944c", height: "2.5rem", delay: "300ms" },
  { color: "#a68848", height: "2.75rem", delay: "400ms" },
  { color: "#9a7340", height: "3rem", delay: "500ms" },
  { color: "#7b5a36", height: "3.25rem", delay: "600ms" },
] as const;

function LoadingBars() {
  return (
    <div
      aria-label="Garden generation in progress"
      className="loading-bars"
      role="status"
    >
      {loadingBarStyles.map((bar, index) => (
        <span
          key={index}
          className="loading-bar"
          style={{
            animationDelay: bar.delay,
            backgroundColor: bar.color,
            height: bar.height,
          }}
        />
      ))}
    </div>
  );
}

export type ResultPanelProps = {
  result: string | null;
  loading: boolean;
  currentTipImage: string;
  tipVisible: boolean;
  textTips: string | null;
};

export function ResultPanel({
  result,
  loading,
  currentTipImage,
  tipVisible,
  textTips,
}: ResultPanelProps) {
  return (
    <div>
        <div className="relative">
          {result ? (
            <img
              alt="Generated garden design concept"
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-xl shadow-[#4d5a35]/30"
              src={result}
            />
          ) : loading ? (
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#2f281e] shadow-xl shadow-[#4d5a35]/30">
              <img
                src={currentTipImage}
                alt="Current tip"
                className={`h-full w-full object-contain transition-opacity duration-500 ${
                  tipVisible ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          ) : (
            <div className="@container relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#2f281e] shadow-xl shadow-[#4d5a35]/30">
              {/* Example "after" photo, blurred like a dream waiting to come into focus */}
              <img
                alt=""
                aria-hidden="true"
                className="h-full w-full scale-110 object-cover blur-[3px] brightness-95"
                src="/images/after_images/Sample_After1.png"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1f321d]/80 via-[#1f321d]/35 to-[#fbf5e8]/10" />

              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-5 pt-6 text-center text-[#fbf5e8] @md:gap-3 @md:px-8 @md:pt-0">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fbf5e8]/15 ring-1 ring-[#fbf5e8]/50 backdrop-blur-sm @md:h-14 @md:w-14">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 @md:h-7 @md:w-7"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3Z" />
                    <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" />
                  </svg>
                </span>
                <p className="font-fraunces text-xl font-semibold leading-tight @md:text-3xl">
                  Your dream garden awaits
                </p>
                <p className="max-w-xs text-xs leading-5 text-[#fbf5e8]/85 @md:text-sm @md:leading-6">
                  Upload a photo, press Generate, and watch your space bloom
                  into something beautiful.
                </p>
              </div>

              <span className="absolute bottom-3 right-4 hidden text-xs @md:block font-medium tracking-wide text-[#fbf5e8]/70">
                Example result
              </span>
            </div>
          )}
        </div>

        {loading ? (
          <div className="mt-5 flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-[#253d21]">
              Got it! While you&apos;re waiting, here are some tips...
            </h2>
            <LoadingBars />
          </div>
        ) : null}

        {textTips && (
          <div className="mt-4 rounded-2xl border border-[#c9b38d] bg-[#fffaf0]/90 p-5">
            <p className="font-fraunces text-sm font-semibold tracking-[0.18em] text-[#7b5a36] uppercase">
              Design suggestions
            </p>
            <div
              className="suggestion-html mt-3 max-h-96 overflow-y-auto pr-1"
              dangerouslySetInnerHTML={{ __html: textTips }}
            />
          </div>
        )}
    </div>
  );
}
