"use client";

import { useRef, useState, type PointerEvent, type KeyboardEvent } from "react";

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
};

const STEP = 5;

export function BeforeAfterSlider({ beforeSrc, afterSrc }: BeforeAfterSliderProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);

  function positionFromClientX(clientX: number) {
    const frame = frameRef.current;
    if (!frame) return;

    const rect = frame.getBoundingClientRect();
    if (rect.width <= 0) return;

    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    positionFromClientX(event.clientX);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    positionFromClientX(event.clientX);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPosition((value) => Math.max(0, value - STEP));
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      setPosition((value) => Math.min(100, value + STEP));
    }
  }

  return (
    <div
      ref={frameRef}
      className="relative aspect-[4/3] w-full touch-none overflow-hidden rounded-2xl shadow-xl shadow-[#4d5a35]/30 select-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
    >
      <img
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
        src={beforeSrc}
      />
      <img
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        draggable={false}
        src={afterSrc}
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
      />

      <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-[#1f321d]/70 px-3 py-1 font-inter text-xs font-semibold text-white">
        Before
      </span>
      <span className="pointer-events-none absolute top-3 right-3 rounded-full bg-[#1f321d]/70 px-3 py-1 font-inter text-xs font-semibold text-white">
        After
      </span>

      <div
        role="slider"
        tabIndex={0}
        aria-label="Reveal more of the original or the new design"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={Math.round(position)}
        aria-valuetext={`${Math.round(position)} percent original`}
        className="absolute inset-y-0 z-10 flex w-11 -translate-x-1/2 cursor-ew-resize items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        style={{ left: `${position}%` }}
        onKeyDown={onKeyDown}
      >
        <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(31,50,29,0.25)]" />
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white text-[#1f321d] shadow-md">
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <path d="M9 7l-4 5 4 5" />
            <path d="M15 7l4 5-4 5" />
          </svg>
        </span>
      </div>
    </div>
  );
}
