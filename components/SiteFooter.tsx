import Link from "next/link";
import type { ReactNode } from "react";

function SocialIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      {children}
    </svg>
  );
}

const socials: { label: string; icon: ReactNode }[] = [
  {
    label: "Instagram",
    icon: (
      <SocialIcon>
        <rect width="18" height="18" x="3" y="3" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </SocialIcon>
    ),
  },
  {
    label: "Facebook",
    icon: (
      <SocialIcon>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </SocialIcon>
    ),
  },
  {
    label: "Pinterest",
    icon: (
      <SocialIcon>
        <path d="M12 2a7 7 0 0 0-2.4 13.6L12 22l2.4-6.4A7 7 0 0 0 12 2z" />
        <circle cx="12" cy="9" r="2" />
      </SocialIcon>
    ),
  },
  {
    label: "YouTube",
    icon: (
      <SocialIcon>
        <rect width="20" height="14" x="2" y="5" rx="3" />
        <path d="m10 9 6 3-6 3z" />
      </SocialIcon>
    ),
  },
  {
    label: "TikTok",
    icon: (
      <SocialIcon>
        <path d="M9 18a3 3 0 1 0 0-6" />
        <path d="M12 15V4c1.5 2.5 3.5 4 6 4" />
        <path d="M12 12a3 3 0 1 1-3 3" />
      </SocialIcon>
    ),
  },
];

const footerLinks = ["About", "Privacy", "Contact"];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-main-nav/20 pt-8 pb-6">
      <ul className="flex list-none items-center justify-center gap-5">
        {socials.map((social) => (
          <li key={social.label}>
            <button
              type="button"
              aria-label={social.label}
              className="text-brand transition hover:opacity-80"
            >
              {social.icon}
            </button>
          </li>
        ))}
      </ul>

      <ul className="font-menu mt-5 flex list-none items-center justify-center divide-x divide-neutral-300 text-[12px] uppercase text-brand">
        {footerLinks.map((label) => (
          <li key={label} className="px-5">
            {label === "About" ? (
              <Link href="/about" className="uppercase no-underline transition hover:opacity-80">
                {label}
              </Link>
            ) : (
              <button type="button" className="uppercase transition hover:opacity-80">
                {label}
              </button>
            )}
          </li>
        ))}
      </ul>

      <p className="font-inter mt-4 text-center text-xs text-brand">© 2026 GardenViz</p>
    </footer>
  );
}
