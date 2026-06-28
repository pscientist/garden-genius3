export function TopNavbar() {
  return (
    <nav aria-label="Main">
      <ul className="flex list-none flex-wrap items-center gap-8 sm:gap-10">
        <li>
          <a
            href="#"
            aria-current="page"
            className="font-fraunces border-b-2 border-[#1f321d] pb-1 text-sm font-medium text-[#1f321d] no-underline hover:opacity-80 sm:text-base"
          >
            Inspiration
          </a>
        </li>
        <li>
          <a
            href="#"
            className="font-fraunces text-sm font-medium text-[#1f321d] no-underline hover:opacity-80 sm:text-base"
          >
            How It Works
          </a>
        </li>
        <li>
          <a
            href="#"
            className="font-fraunces text-sm font-medium text-[#1f321d] no-underline hover:opacity-80 sm:text-base"
          >
            Pricing
          </a>
        </li>
        <li>
          <a
            href="#"
            className="font-fraunces text-sm font-medium text-[#1f321d] no-underline hover:opacity-80 sm:text-base"
          >
            About
          </a>
        </li>
      </ul>
    </nav>
  );
}
