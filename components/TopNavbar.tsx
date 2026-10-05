"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function TopNavbar() {
  const pathname = usePathname();
  const onInspiration = pathname === "/";
  const onHowItWorks = pathname === "/how-it-works";
  const onPricing = pathname === "/pricing";
  const onAbout = pathname === "/about";

  return (
    <nav aria-label="Main">
      <ul className="font-inter flex list-none flex-wrap items-center gap-6 text-sm font-medium text-main-nav sm:gap-8">
        <li>
          <Link
            href="/"
            aria-current={onInspiration ? "page" : undefined}
            className={
              onInspiration
                ? "border-b border-hover-active pb-0.5 text-hover-active no-underline hover:opacity-80"
                : "no-underline hover:text-hover-active hover:opacity-80"
            }
          >
            Inspiration
          </Link>
        </li>
        <li>
          <Link
            href="/how-it-works"
            aria-current={onHowItWorks ? "page" : undefined}
            className={
              onHowItWorks
                ? "border-b border-hover-active pb-0.5 text-hover-active no-underline hover:opacity-80"
                : "no-underline hover:text-hover-active hover:opacity-80"
            }
          >
            How It Works
          </Link>
        </li>
        <li>
          <Link
            href="/pricing"
            aria-current={onPricing ? "page" : undefined}
            className={
              onPricing
                ? "border-b border-hover-active pb-0.5 text-hover-active no-underline hover:opacity-80"
                : "no-underline hover:text-hover-active hover:opacity-80"
            }
          >
            Pricing
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            aria-current={onAbout ? "page" : undefined}
            className={
              onAbout
                ? "border-b border-hover-active pb-0.5 text-hover-active no-underline hover:opacity-80"
                : "no-underline hover:text-hover-active hover:opacity-80"
            }
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}
