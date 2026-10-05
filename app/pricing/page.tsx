const plans: { name: string; price: string; detail: string; className?: string }[] = [
  {
    name: "Browse",
    price: "Free",
    detail: "Look through makeover ideas, with cost, skill, and maintenance on each card.",
  },
  {
    name: "Weekend",
    price: "$9",
    detail: "Three visualisations of your own yard, plus short layout, plant, and budget notes.",
    className:
      "bg-[radial-gradient(circle_at_top_left,rgba(157,187,122,0.35),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(234,215,187,0.8),transparent_50%),linear-gradient(135deg,#fffaf0,#f4f8ea)]",
  },
  {
    name: "Season",
    price: "$24",
    detail: "A month of designs you can save and come back to.",
  },
];

export default function PricingPage() {
  return (
    <section className="py-4">
      <h1 className="page-title">Pricing</h1>
      <ul className="mt-8 flex list-none flex-col gap-6 p-0">
        {plans.map((plan) => (
          <li
            key={plan.name}
            className={`rounded-xl border border-main-nav/20 p-5 ${plan.className ?? ""}`}
          >
            <p className="font-inter text-sm font-semibold tracking-[0.18em] text-main-nav uppercase">
              {plan.price}
            </p>
            <h2 className="mt-2 font-fraunces text-2xl font-semibold text-[#1f321d]">
              {plan.name}
            </h2>
            <p className="font-inter mt-3 text-sm leading-6 text-main-nav">
              {plan.detail}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
