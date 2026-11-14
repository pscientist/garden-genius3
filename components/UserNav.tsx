export function UserNav() {
    return (
        <nav id="user_nav" className="flex list-none flex-wrap">
            <ul className="font-inter flex items-center justify-end divide-x divide-neutral-300 text-sm font-normal text-main-nav">

                <li className="pr-5">
                    <button
                        type="button"
                        className="group inline-flex items-center gap-3 text-base font-menu transition hover:opacity-80"
                    >
                        <span className="text-[12px] uppercase">
                            Log in
                        </span>
                    </button>
                </li>

                <li className="pl-5">
                    <button
                        type="button"
                        className="group inline-flex items-center gap-3 text-base font-menu transition hover:opacity-80"
                    >
                        <span className="text-[12px] uppercase">
                            Register
                        </span>
                    </button>
                </li>

            </ul>
        </nav>
    );
}
