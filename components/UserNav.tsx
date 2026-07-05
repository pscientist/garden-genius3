export function UserNav() {
    return (
        <nav id="user_nav" className="flex w-full list-none flex-wrap">
            <ul className="font-inter flex w-full items-center justify-between gap-4 text-sm font-normal text-[#1f321d]">
                <li className="flex items-center gap-1.5 hover:opacity-80">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                    </svg>
                    Saved (12)
                </li>
                <li>
                    <a
                        href="#"
                        className="inline-block rounded-xl bg-[#1b3b24] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#1b3b24]/20 transition hover:bg-[#224229] hover:shadow-lg hover:shadow-[#1b3b24]/25"
                    >
                        Visualize My Garden
                    </a>
                </li>
            </ul>
        </nav>
    );
}
