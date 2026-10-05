import Link from "next/link";

const steps: { title: string; detail: string; href?: string }[] = [
  {
    title: "Browse",
    detail:
      "Look through makeover ideas. Each card shows cost, skill, and maintenance.",
  },
  {
    title: "Prepare",
    detail: "Find a photo of your own yard.",
  },
  {
    title: "Get a plan",
    detail:
      "See a suggested design, plus short notes on layout, plants, and budget.",
    href: "/visualise",
  },
];

export default function HowItWorksPage() {
  return (
    <section className="py-4">
      <h1 className="page-title">How It Works</h1>
      <ol className="mt-8 flex list-none flex-col gap-6 p-0">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="rounded-xl border border-main-nav/20 p-5"
          >
            <p className="font-inter text-sm font-semibold tracking-[0.18em] text-main-nav uppercase">
              Step {index + 1}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <h2 className="font-fraunces text-2xl font-semibold text-[#1f321d]">
                {step.title}
              </h2>
              {step.href ? (
                <Link
                  href={step.href}
                  aria-label="Go to Visualize My Garden"
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-main-nav no-underline transition hover:bg-main-nav/10 hover:text-hover-active"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="h-4 w-4"
                  >
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </Link>
              ) : null}
            </div>
            <p className="font-inter mt-3 text-sm leading-6 text-main-nav">
              {step.detail}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
