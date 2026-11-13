export function UserNav() {
    return (
        <nav id="user_nav" className="flex w-full list-none flex-wrap">
            <ul className="font-inter flex w-full items-center justify-end gap-4 text-sm font-normal text-main-nav">

                <li>
                    {/* Placeholder: there is no authentication yet. */}
                    <button
                        type="button"
                        className="group inline-flex items-center gap-3 text-base font-semibold text-neutral-900 transition hover:opacity-80"
                    >
                        {/* Placeholder avatar: circle with a person silhouette */}
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 40 40"
                            className="h-10 w-10 shrink-0"
                        >
                            <defs>
                                <clipPath id="avatar_clip">
                                    <circle cx="20" cy="20" r="20" />
                                </clipPath>
                            </defs>
                            <circle cx="20" cy="20" r="20" className="fill-neutral-200" />
                            <g clipPath="url(#avatar_clip)" className="fill-neutral-600">
                                <circle cx="20" cy="15" r="7" />
                                <ellipse cx="20" cy="38" rx="14" ry="11" />
                            </g>
                            {/* Thin outline, drawn last so the silhouette can't paint over it */}
                            <circle
                                cx="20"
                                cy="20"
                                r="19.25"
                                fill="none"
                                strokeWidth="1.5"
                                className="stroke-neutral-700 transition group-hover:stroke-brand"
                            />
                        </svg>
                        Log in
                    </button>
                </li>
            </ul>
        </nav>
    );
}
