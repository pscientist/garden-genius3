import Link from "next/link";

const steps: {
  title: string;
  points: string[];
  accent: string;
  href?: string;
}[] = [
  {
    title: "Browse",
    points: [
      "Look through makeover ideas.",
      "Each card shows cost, skill, and maintenance.",
    ],
    accent: "#6b4423",
  },
  {
    title: "Prepare",
    points: ["Find a photo of your own yard."],
    accent: "#6f7d3a",
  },
  {
    title: "Get a plan",
    points: [
      "See a suggested design.",
      "Short notes on layout, plants, and budget.",
    ],
    accent: "#1f3d24",
    href: "/visualise",
  },
];

function StepArrow({ color, direction }: { color: string; direction: "right" | "down" }) {
  const horizontal = direction === "right";

  return (
    <div
      aria-hidden
      className={
        horizontal
          ? "pointer-events-none absolute top-16 left-full z-20 hidden w-14 -translate-x-1/2 -translate-y-1/2 items-center sm:top-[4.5rem] md:flex lg:top-20"
          : "flex items-center justify-center py-2 md:hidden"
      }
    >
      <span
        className={horizontal ? "h-0.5 flex-1 bg-neutral-300" : "h-6 w-0.5 bg-neutral-300"}
      />
      <svg
        viewBox="0 0 16 16"
        className={horizontal ? "h-4 w-4 shrink-0" : "h-4 w-4 shrink-0 -rotate-90"}
        fill={color}
      >
        <path d="M4 2.5 12 8 4 13.5V2.5Z" />
      </svg>
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <section className="py-4">
      <h1 className="page-title">How It Works</h1>
      <ol className="mt-10 flex list-none flex-col items-center gap-2 p-0 md:flex-row md:items-start md:gap-0">
        {steps.map((step, index) => {
          const label = (
            <>
              {step.title}
              {step.href ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className="h-4 w-4"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              ) : null}
            </>
          );

          return (
            <li
              key={step.title}
              className="relative flex w-full max-w-xs flex-1 flex-col items-center md:max-w-none md:px-3"
            >
              <div
                className="flex h-36 w-36 flex-col items-center justify-center rounded-full border-[9px] bg-white sm:h-40 sm:w-40 lg:h-44 lg:w-44"
                style={{ borderColor: step.accent, color: step.accent }}
              >
                <span className="font-inter text-base font-bold tracking-[0.14em] sm:text-lg">
                  STEP
                </span>
                <span className="font-inter text-3xl font-bold leading-none sm:text-4xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {step.href ? (
                <Link
                  href={step.href}
                  aria-label={`${step.title}. Go to Visualize My Garden`}
                  className="relative z-10 -mt-5 inline-flex min-w-44 items-center justify-center gap-2 px-6 py-2.5 text-center font-inter text-base font-bold text-white no-underline transition hover:brightness-110 sm:min-w-48 sm:text-lg"
                  style={{
                    backgroundColor: step.accent,
                    clipPath: "polygon(7% 0, 93% 0, 100% 100%, 0 100%)",
                  }}
                >
                  {label}
                </Link>
              ) : (
                <div
                  className="relative z-10 -mt-5 inline-flex min-w-44 items-center justify-center px-6 py-2.5 text-center font-inter text-base font-bold text-white sm:min-w-48 sm:text-lg"
                  style={{
                    backgroundColor: step.accent,
                    clipPath: "polygon(7% 0, 93% 0, 100% 100%, 0 100%)",
                  }}
                >
                  {label}
                </div>
              )}

              <ul className="mt-4 w-full max-w-[16rem] list-disc space-y-1 pl-5 text-left font-inter text-sm leading-6 text-[#2a2a2a]">
                {step.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              {index < steps.length - 1 ? (
                <>
                  <StepArrow color={step.accent} direction="right" />
                  <StepArrow color={step.accent} direction="down" />
                </>
              ) : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
