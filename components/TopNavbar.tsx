export function TopNavbar() {
  return (
    <nav aria-label="Main">
      <ul className="font-inter flex list-none flex-wrap items-center gap-6 text-sm font-normal text-[#3a4f35] sm:gap-8">
        <li>
          <a
            href="#"
            aria-current="page"
            className="border-b border-[#1f321d] pb-0.5 text-[#1f321d] no-underline hover:opacity-80"
          >
            Inspiration
          </a>
        </li>
        <li>
          <a
            href="#"
            className="no-underline hover:text-[#1f321d] hover:opacity-80"
          >
            How It Works
          </a>
        </li>
        <li>
          <a
            href="#"
            className="no-underline hover:text-[#1f321d] hover:opacity-80"
          >
            Pricing
          </a>
        </li>
        <li>
          <a
            href="#"
            className="no-underline hover:text-[#1f321d] hover:opacity-80"
          >
            About
          </a>
        </li>
      </ul>
    </nav>
  );
}
