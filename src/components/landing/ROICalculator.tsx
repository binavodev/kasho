"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";

import { useKashoInView } from "@/hooks/use-kasho-in-view";
import { KASHO_EASE } from "@/lib/motion";

gsap.registerPlugin(useGSAP);

function formatCop(value: number): string {
  return `$${Math.round(value).toLocaleString("es-CO")}`;
}

type RangeSliderProps = {
  formatValue: (value: number) => string;
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  step: number;
  value: number;
};

function RangeSlider({
  formatValue,
  label,
  max,
  min,
  onChange,
  step,
  value,
}: RangeSliderProps): React.ReactElement {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="mb-9">
      <div className="mb-3 flex justify-between">
        <label className="font-sans text-[15px] text-[#aaa]" htmlFor={label}>
          {label}
        </label>
        <span className="font-heading text-lg font-bold text-kasho-green">
          {formatValue(value)}
        </span>
      </div>
      <div className="relative h-1.5 rounded bg-white/10">
        <div
          className="absolute left-0 top-0 h-full rounded bg-gradient-to-r from-kasho-green-dark to-kasho-green"
          style={{ width: `${percent}%` }}
        />
        <input
          aria-label={label}
          className="kasho-range absolute inset-0 h-full w-full cursor-pointer opacity-0"
          id={label}
          max={max}
          min={min}
          onChange={(event) => {
            onChange(Number(event.target.value));
          }}
          step={step}
          type="range"
          value={value}
        />
        <div
          className="pointer-events-none absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-kasho-green shadow-[0_0_0_3px_rgba(0,196,140,0.25),0_2px_8px_rgba(0,0,0,0.4)]"
          style={{ left: `${percent}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between font-sans text-xs text-[#555]">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  );
}

export function ROICalculator(): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const animatedMoney = useRef(0);
  const inView = useKashoInView(ref);
  const reduceMotion = useReducedMotion();
  const [ticket, setTicket] = useState(500_000);
  const [leads, setLeads] = useState(100);
  const [displayMoney, setDisplayMoney] = useState(0);

  const leadsLost = Math.round(leads * 0.85);
  const salesLost = Math.round(leadsLost * 0.08);
  const moneyLost = salesLost * ticket;
  const roi = Math.round(moneyLost / 349_000);

  useGSAP(
    () => {
      if (reduceMotion) {
        animatedMoney.current = moneyLost;
        setDisplayMoney(moneyLost);
        return;
      }
      const proxy = { value: animatedMoney.current };
      const tween = gsap.to(proxy, {
        value: moneyLost,
        duration: 0.45,
        ease: "power2.out",
        onUpdate: () => {
          animatedMoney.current = proxy.value;
          setDisplayMoney(Math.round(proxy.value));
        },
        onComplete: () => {
          animatedMoney.current = moneyLost;
        },
      });
      return () => {
        tween.kill();
      };
    },
    { dependencies: [moneyLost, reduceMotion] },
  );

  return (
    <section className="relative overflow-hidden bg-kasho-black py-16 md:py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[30%] h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,196,140,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-[1] mx-auto max-w-[960px] px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          animate={inView ? "visible" : "hidden"}
          className="mb-12 text-center md:mb-16"
          initial="hidden"
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: KASHO_EASE },
            },
          }}
        >
          <h2 className="font-heading text-[clamp(32px,4vw,56px)] font-extrabold leading-tight tracking-tight text-white">
            ¿Cuánto se te va cada mes
            <br />
            por no responder a tiempo?
          </h2>
          <p className="mt-4 font-sans text-[17px] text-[#666]">
            Mueve los controles y mira el número real.
          </p>
        </motion.div>

        <motion.div
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12"
          initial="hidden"
          variants={{
            hidden: { opacity: 0, y: 32 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.15,
                duration: 0.7,
                ease: KASHO_EASE,
              },
            },
          }}
        >
          <div className="rounded-3xl border border-white/[0.06] bg-gradient-to-br from-kasho-navy to-[#111120] p-8 md:p-9">
            <h3 className="mb-8 font-heading text-lg font-bold text-white">
              Tu negocio
            </h3>
            <RangeSlider
              formatValue={(n) => `$${n.toLocaleString("es-CO")}`}
              label="¿Cuánto vale cada venta?"
              max={5_000_000}
              min={50_000}
              onChange={setTicket}
              step={50_000}
              value={ticket}
            />
            <RangeSlider
              formatValue={(n) => `${n} personas`}
              label="¿Cuántos clientes te escriben al mes?"
              max={500}
              min={10}
              onChange={setLeads}
              step={10}
              value={leads}
            />
            <div className="space-y-2.5 border-t border-white/[0.06] pt-4">
              {[
                { label: "Personas sin respuesta rápida", value: leadsLost },
                { label: "Ventas que no se cierran", value: salesLost },
              ].map((row) => (
                <div
                  className="flex items-center justify-between"
                  key={row.label}
                >
                  <span className="font-sans text-[13px] text-[#666]">
                    {row.label}
                  </span>
                  <span className="font-heading text-[15px] font-bold text-[#888]">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className="mb-3 font-sans text-[13px] uppercase tracking-[0.1em] text-[#555]">
              Dejas ir cada mes
            </p>
            <div className="relative mb-2 inline-block">
              <span className="font-heading text-[clamp(44px,5.5vw,76px)] font-extrabold leading-none tracking-tight text-kasho-green">
                {formatCop(displayMoney)}
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-sm bg-gradient-to-r from-transparent via-kasho-green to-transparent" />
            </div>
            <p className="mb-7 mt-5 font-sans text-sm text-[#555]">
              en clientes que no atendiste a tiempo
            </p>

            <div className="mb-8 inline-flex flex-wrap items-center justify-center gap-3 rounded-xl border border-kasho-yellow/20 bg-kasho-yellow/10 px-5 py-3.5">
              <span className="font-heading text-[32px] font-extrabold text-kasho-yellow">
                {roi}x
              </span>
              <div className="text-left">
                <div className="font-sans text-[13px] font-medium text-kasho-yellow">
                  lo que recuperarías con Kasho
                </div>
                <div className="font-sans text-xs text-[#666]">
                  vs $349.000 al mes
                </div>
              </div>
            </div>

            <a
              className="inline-flex items-center gap-2 rounded-xl bg-kasho-green px-8 py-3.5 font-sans text-base font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:bg-kasho-green-dark hover:shadow-[0_8px_30px_rgba(0,196,140,0.4)]"
              href="#precios"
            >
              Quiero recuperar ese dinero →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
