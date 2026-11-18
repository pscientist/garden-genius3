"use client";

import { useState } from "react";

const PLAN_STEPS = [
  {
    title: "Prepare the space",
    detail: "Clear weeds and mark out the new garden beds.",
    category: "Preparation",
  },
  {
    title: "Shape the borders",
    detail: "Create curved bed edges around the lawn.",
    category: "Layout",
  },
  {
    title: "Refresh the soil",
    detail: "Work compost into the planting areas.",
    category: "Soil",
  },
  {
    title: "Add your plants",
    detail: "Arrange shrubs first, then fill gaps with grasses.",
    category: "Planting",
  },
  {
    title: "Finish and settle in",
    detail: "Add mulch, water well and style the seating corner.",
    category: "Finishing",
  },
] as const;

const SHOPPING_ITEMS = ["Mulch", "Shrubs", "Ornamental grasses", "Compost", "Edging"] as const;

export function GardenPlanPanel() {
  const [tab, setTab] = useState<"plan" | "list">("plan");

  return (
    <section className="rounded-2xl border border-[#d9d3c5] bg-white p-5 shadow-sm">
      <h2 className="font-inter text-lg font-bold text-[#1f321d]">Bring this garden to life</h2>
      <p className="mt-1 font-inter text-sm text-[#5c6b58]">
        A practical starting point for your makeover
      </p>

      <div className="mt-4 grid grid-cols-2 gap-1 rounded-xl bg-[#f3f1ea] p-1">
        <button
          type="button"
          className={`rounded-lg px-3 py-2 font-inter text-sm font-semibold ${
            tab === "plan" ? "bg-[#2c2c2c] text-white" : "text-[#5c6b58]"
          }`}
          onClick={() => setTab("plan")}
        >
          Garden Plan
        </button>
        <button
          type="button"
          className={`rounded-lg px-3 py-2 font-inter text-sm font-semibold ${
            tab === "list" ? "bg-[#2c2c2c] text-white" : "text-[#5c6b58]"
          }`}
          onClick={() => setTab("list")}
        >
          Shopping List
        </button>
      </div>

      {tab === "plan" ? (
        <>
          <p className="mt-4 font-inter text-sm text-[#6b7280]">0 of 5 steps complete</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e6e2d8]">
            <div className="h-full w-0 bg-brand" />
          </div>
          <ol className="mt-2">
            {PLAN_STEPS.map((step, index) => (
              <li
                key={step.title}
                className="flex items-start gap-3 border-b border-[#eeeae2] py-3 last:border-b-0"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border border-[#c5c0b4] bg-white"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-inter text-sm font-semibold text-[#1f321d]">
                    {index + 1}. {step.title}
                  </p>
                  <p className="mt-0.5 font-inter text-sm leading-5 text-[#5c6b58]">{step.detail}</p>
                </div>
                <span className="shrink-0 pt-0.5 font-inter text-xs text-[#8a9086]">
                  {step.category}
                </span>
              </li>
            ))}
          </ol>
        </>
      ) : (
        <ul className="mt-4">
          {SHOPPING_ITEMS.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 border-b border-[#eeeae2] py-3 last:border-b-0"
            >
              <span
                aria-hidden="true"
                className="h-4 w-4 shrink-0 rounded border border-[#c5c0b4] bg-white"
              />
              <span className="font-inter text-sm text-[#1f321d]">{item}</span>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-4 font-inter text-xs text-[#8a9086]">
        Suggested steps — adapt to your site conditions.
      </p>
    </section>
  );
}
