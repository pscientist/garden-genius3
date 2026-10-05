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
    <div className="rounded-[2rem] border border-[#d8c7a9]/70 bg-[#fffaf0]/80 p-4 shadow-2xl shadow-[#4d5a35]/20 backdrop-blur md:p-5">
      {/* <div className="flex min-h-[28rem] flex-col rounded-[1.5rem] border border-[#c9b38d] bg-gradient-to-br from-[#fffaf0] via-[#edf3df] to-[#ead7bb] p-5"> */}
        <div className="mb-4">
          {result ? (
            <h2 className="mt-2 text-2xl font-semibold text-[#253d21]">
              Suggested Design for You
            </h2>
          ) : loading ? (
            <div className="mt-2 flex flex-col gap-4">
              <h2 className="text-2xl font-semibold text-[#253d21]">
                Got it! While you&apos;re waiting, here are some tips...
              </h2>
              <LoadingBars />
            </div>
          ) : null}
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
              See your garden transformation here
            </div>
          )}
        </div>

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
      {/* </div> */}
    </div>
  );
}
