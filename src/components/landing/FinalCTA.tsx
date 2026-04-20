"use client";

import { motion } from "framer-motion";
import { Check } from "iconoir-react";
import { useRef } from "react";

import { useKashoInView } from "@/hooks/use-kasho-in-view";
import { KASHO_EASE } from "@/lib/motion";

export function FinalCTA(): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useKashoInView(ref);

  return (
    <section className="relative overflow-hidden bg-kasho-green py-20 md:py-24 lg:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.7) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="pointer-events-none absolute -right-24 -top-24 h-[400px] w-[400px] rounded-full bg-black/[0.05]" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-black/[0.04]" />

      <div
        className="relative z-[1] mx-auto max-w-[760px] px-4 text-center sm:px-6"
        ref={ref}
      >
        <motion.div
          animate={inView ? "visible" : "hidden"}
          initial="hidden"
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: KASHO_EASE },
            },
          }}
        >
          <h2 className="font-heading text-[clamp(32px,5vw,60px)] font-extrabold leading-tight tracking-tight text-kasho-black">
            Kasho trabaja mientras tú descansas.
            <br />
            <span className="text-black/45">
              ¿Cuántos clientes vas a perder esta noche?
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-sans text-[17px] leading-relaxed text-black/55">
            Sin contratos. Cancela cuando quieras.
            <br />
            Si no ves resultados en el primer mes, te devolvemos el dinero.
          </p>
          <div className="mt-11 flex flex-col items-center gap-4">
            <a
              className="inline-flex items-center gap-2.5 rounded-[14px] bg-kasho-black px-10 py-4 font-sans text-[17px] font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:bg-kasho-navy hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
              href="#precios"
            >
              Empezar ahora <span aria-hidden>→</span>
            </a>
            <a
              className="font-sans text-sm text-black/50 transition-colors duration-200 hover:text-kasho-black"
              href="https://wa.me/573000000000"
              rel="noopener noreferrer"
              target="_blank"
            >
              O escríbenos directo por WhatsApp →
            </a>
          </div>
          <div className="mt-14 flex flex-wrap justify-center gap-x-10 gap-y-3">
            {[
              "Sin contratos",
              "Garantía 30 días",
              "Listo en 10 minutos",
              "Solo WhatsApp",
            ].map((label) => (
              <div
                className="flex items-center gap-1.5 font-sans text-[13px] font-medium text-black/50"
                key={label}
              >
                <Check
                  aria-hidden
                  className="shrink-0 text-black/70"
                  height={15}
                  strokeWidth={2.5}
                  width={15}
                />
                {label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
