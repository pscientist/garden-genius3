"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function UserNav() {
    const onVisualise = usePathname() === "/visualise";

    return (
        <nav id="user_nav" className="flex w-full list-none flex-wrap">
            <ul className="font-inter flex w-full items-center justify-end gap-4 text-sm font-normal text-main-nav">
                
                <li>
                    <Link
                        href="/visualise"
                        aria-current={onVisualise ? "page" : undefined}
                        className={
                            onVisualise
                                ? "inline-block rounded-xl bg-[#1b3b24] px-5 py-2.5 text-sm font-semibold text-white no-underline shadow-md ring-2 ring-[#1b3b24] ring-offset-2 ring-offset-[#eef4df]"
                                : "inline-block rounded-xl bg-[#1b3b24] px-5 py-2.5 text-sm font-semibold text-white no-underline shadow-md shadow-[#1b3b24]/20 transition hover:bg-[#224229] hover:shadow-lg hover:shadow-[#1b3b24]/25"
                        }
                    >
                        Visualize My Garden
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
