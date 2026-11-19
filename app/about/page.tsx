import Link from "next/link";
import type { ReactNode } from "react";

const goldButton =
  "inline-flex items-center justify-center rounded-md bg-[radial-gradient(circle_at_30%_0%,#fff8d0,transparent_58%),linear-gradient(to_bottom,#fff1b8,#f6d365_48%,#e8b423)] px-5 py-2.5 font-inter text-sm font-semibold text-[#4a3410] no-underline shadow-[0_0_18px_rgba(255,196,70,0.55)]";

const photos = [
  {
    src: "/images/before_images/Sample_Before1.png",
    alt: "A lawn and fence before a garden design",
    label: "Before",
  },
  {
    src: "/images/after_images/Sample_After1.png",
    alt: "The same garden after an AI preview",
    label: "AI preview",
  },
] as const;

function PictureIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-8 w-8">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="1.5" />
      <path d="m21 16-4.5-4.5a1.5 1.5 0 0 0-2.1 0L7 19" />
    </svg>
  );
}

function SproutIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-8 w-8">
      <path d="M12 21V11" />
      <path d="M12 13c0-4 3-7 8-7-1 5-4 7-8 7Z" />
      <path d="M12 15c0-3-2.5-6-7-6 1 4 3.5 6 7 6Z" />
    </svg>
  );
}

function ChecklistIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-8 w-8">
      <rect x="6" y="3" width="12" height="18" rx="2" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </svg>
  );
}

const reasons: { title: string; detail: string; icon: ReactNode }[] = [
  {
    title: "Picture it at your place",
    detail: "Upload a photo to explore ideas in your own space.",
    icon: <PictureIcon />,
  },
  {
    title: "Work with your budget",
    detail: "Choose a budget and explore options that suit your climate.",
    icon: <SproutIcon />,
  },
  {
    title: "Know where to start",
    detail: "Use your garden plan and shopping list to take the first step.",
    icon: <ChecklistIcon />,
  },
];

export default function AboutPage() {
  return (
    <section className="py-4">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <h1 className="font-fraunces text-4xl font-semibold leading-[1.05] text-[#1f321d] sm:text-5xl">
            See what your garden could become.
          </h1>
          <p className="font-inter mt-4 max-w-md text-base leading-7 text-[#1f321d]">
            GardenViz helps you picture changes to your own outdoor space and decide what to do first.
          </p>
          <Link href="/" className={`${goldButton} mt-6`}>
            Visualise my garden
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {photos.map((photo) => (
            <div key={photo.label} className="relative">
              <img
                src={photo.src}
                alt={photo.alt}
                className="aspect-[3/4] w-full rounded-2xl object-cover"
              />
              <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-[#1f321d]/70 px-3 py-1 font-inter text-xs font-semibold whitespace-nowrap text-white">
                {photo.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="font-fraunces text-3xl font-semibold text-[#1f321d] sm:text-4xl">
          Why we built GardenViz
        </h2>
        <p className="font-inter mx-auto mt-4 max-w-xl text-base leading-7 text-[#1f321d]">
          It&apos;s hard to tell how a garden idea will look at your place, what it might cost, and how much work it will take to keep it looking good.
        </p>
        <ul className="mt-10 grid list-none gap-8 p-0 md:grid-cols-3">
          {reasons.map((reason) => (
            <li key={reason.title} className="text-[#0b6b4a]">
              <div className="flex justify-center">{reason.icon}</div>
              <h3 className="font-inter mt-3 text-lg font-semibold text-[#1f321d]">
                {reason.title}
              </h3>
              <p className="font-inter mt-2 text-base leading-6 text-[#1f321d]">
                {reason.detail}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-16 rounded-3xl bg-[#1f321d] px-6 py-14 text-center">
        <h2 className="font-fraunces text-3xl font-semibold text-[#fbf5e8] sm:text-4xl">
          Start with a photo of your garden
        </h2>
        <Link href="/" className={`${goldButton} mt-6`}>
          Visualise my garden
        </Link>
      </div>
    </section>
  );
}
