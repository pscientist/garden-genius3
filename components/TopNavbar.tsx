"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

function NavIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 shrink-0 text-neutral-900 drop-shadow-[0_2px_2px_rgba(31,50,29,0.3)]"
    >
      {children}
    </svg>
  );
}

const navItems: { href: string; label: string; icon: ReactNode }[] = [
  {
    href: "/inspiration",
    label: "Gallery",
    // framed picture
    icon: (
      <NavIcon>
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      </NavIcon>
    ),
  },
  {
    href: "/how-it-works",
    label: "How It Works",
    // clipboard with checkmark
    icon: (
      <NavIcon>
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <path d="m9 14 2 2 4-4" />
      </NavIcon>
    ),
  },
  {
    href: "/pricing",
    label: "Pricing",
    // price tag
    icon: (
      <NavIcon>
        <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
        <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
      </NavIcon>
    ),
  },
  {
    href: "/about",
    label: "About",
    // info circle
    icon: (
      <NavIcon>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </NavIcon>
    ),
  },
];

export function TopNavbar() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main">
      <ul className="font-menu flex list-none flex-wrap items-center divide-x divide-neutral-300 text-sm font-medium uppercase tracking-[0.09em] text-brand">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.href} className="px-5">
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "flex items-center gap-2 border-b border-hover-active pb-0.5 text-hover-active no-underline hover:opacity-80"
                    : "flex items-center gap-2 no-underline hover:text-hover-active hover:opacity-80"
                }
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
