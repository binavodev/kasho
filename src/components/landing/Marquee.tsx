"use client";

import { useReducedMotion } from "framer-motion";
import { Sparks } from "iconoir-react";

const ITEMS = [
  "Barberías",
  "Tiendas de ropa",
  "Fotógrafos",
  "Nutricionistas",
  "Salones de belleza",
  "Pet shops",
  "Coaches",
  "Contadores",
  "Estéticas médicas",
  "Mecánicos",
] as const;

/** Two identical runs: translate3d(-50%) loops without a jump. */
const TRACK_ITEMS = [...ITEMS, ...ITEMS];

const DURATION_SECONDS = 42;

export function Marquee(): React.ReactElement {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div
        className="border-y border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent px-4 py-3.5 text-center"
      >
        <p className="font-sans text-[13px] leading-relaxed text-white/40">
          {ITEMS.join(" · ")}
        </p>
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="group relative select-none border-y border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent py-1"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-kasho-green/30 to-transparent"
      />

      <div
        className="pointer-events-none relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]"
      >
        <div
          className="flex w-max will-change-transform"
          style={{
            animation: `kashoMarqueeX ${DURATION_SECONDS}s linear infinite`,
          }}
        >
          {TRACK_ITEMS.map((item, i) => (
            <div
              className="inline-flex items-center gap-2.5 whitespace-nowrap px-8 py-3.5 sm:px-10"
              key={`${item}-${i}`}
            >
              <span className="text-kasho-green/45">
                <Sparks
                  className="shrink-0"
                  height={14}
                  strokeWidth={1.75}
                  width={14}
                />
              </span>
              <span className="font-sans text-[13px] font-medium tracking-[0.06em] text-white/38 sm:text-sm sm:tracking-wide">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-8 bg-gradient-to-r from-kasho-black sm:w-14"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-8 bg-gradient-to-l from-kasho-black sm:w-14"
      />

      <style>{`
        @keyframes kashoMarqueeX {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>
    </div>
  );
}
