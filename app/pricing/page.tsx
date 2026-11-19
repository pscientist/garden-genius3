import Link from "next/link";

const primaryButton =
  "mt-6 inline-flex w-full items-center justify-center rounded-full border border-white/70 bg-[radial-gradient(circle_at_15%_10%,rgba(170,235,180,0.3),transparent_55%),linear-gradient(to_bottom_right,#3f9e5f,#1f6b45_45%,#1c2b24)] px-5 py-2.5 font-inter text-sm font-semibold text-white no-underline shadow-[inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-3px_6px_rgba(0,0,0,0.35),0_6px_14px_rgba(0,0,0,0.45)] [text-shadow:0_1px_3px_rgba(0,0,0,0.85)]";

const outlineButton =
  "mt-6 inline-flex w-full items-center justify-center rounded-full border border-[#0b6b4a] bg-white px-5 py-2.5 font-inter text-sm font-semibold text-[#1f321d]";

const plans = [
  {
    name: "Free previews",
    price: "Free",
    suffix: "",
    detail: "Your first 3 garden previews.",
    action: "Visualise my garden",
  },
  {
    name: "Extra images",
    price: "$5",
    suffix: " / 10 images",
    detail: "Keep exploring after your 3 free previews.",
    action: "Get 10 images",
  },
  {
    name: "PDF download",
    price: "$0.99",
    suffix: " / PDF",
    detail: "Download your garden design to keep or share.",
    action: "Get a PDF",
  },
] as const;

export default function PricingPage() {
  return (
    <section className="py-4">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <h1 className="font-fraunces text-4xl font-semibold leading-[1.05] text-[#1f321d] sm:text-5xl">
            Imagine more for your garden.
          </h1>
          <p className="font-inter mt-4 max-w-md text-base leading-7 text-[#1f321d]">
            Start with 3 free previews. Pay as you go for more images or a PDF.
          </p>
        </div>
        <img
          src="/images/after_images/temperate.png"
          alt="A finished garden with a stone path, grasses, and trees"
          className="aspect-[4/3] w-full rounded-3xl object-cover"
        />
      </div>

      <ul className="mt-10 grid list-none gap-4 p-0 md:grid-cols-3">
        {plans.map((plan) => (
          <li
            key={plan.name}
            className="flex flex-col rounded-2xl border border-[#d9d3c5] bg-[#fffaf0] p-5"
          >
            <h2 className="font-inter text-lg font-semibold text-[#0b6b4a]">
              {plan.name}
            </h2>
            <p className="mt-3 text-[#1f321d]">
              <span className="font-fraunces text-4xl font-semibold">
                {plan.price}
              </span>
              {plan.suffix ? (
                <span className="font-inter text-base">{plan.suffix}</span>
              ) : null}
            </p>
            <p className="font-inter mt-3 flex-1 text-base leading-6 text-[#1f321d]">
              {plan.detail}
            </p>
            {plan.action === "Visualise my garden" ? (
              <Link href="/" className={primaryButton}>
                {plan.action}
              </Link>
            ) : (
              <button type="button" className={outlineButton}>
                {plan.action}
              </button>
            )}
          </li>
        ))}
      </ul>

      <p className="font-inter mt-6 text-center text-sm text-[#1f321d]">
        One-time payments. No subscription.
      </p>
    </section>
  );
}
