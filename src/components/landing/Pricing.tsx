"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

import { useKashoInView } from "@/hooks/use-kasho-in-view";
import { KASHO_EASE } from "@/lib/motion";

type Plan = {
  dark: boolean;
  features: string[];
  highlight: boolean;
  name: string;
  note: string;
  price: number;
  badge?: string;
};

const plans: Plan[] = [
  {
    badge: undefined,
    dark: false,
    features: [
      "1 número de WhatsApp",
      "Hasta 500 conversaciones al mes",
      "Respuestas automáticas 24/7",
      "Transcripción de mensajes de voz",
      "Panel de resultados básico",
    ],
    highlight: false,
    name: "Starter",
    note: "Con recuperar un solo cliente ya cubriste el mes.",
    price: 199_000,
  },
  {
    badge: "El más elegido",
    dark: true,
    features: [
      "Todo lo del plan Starter",
      "Conversaciones ilimitadas",
      "Seguimiento a clientes que no responden ★",
      "Panel de resultados completo",
      "Cobros por Wompi y Nequi en el chat",
      "Resumen semanal por WhatsApp",
    ],
    highlight: true,
    name: "Pro",
    note: "Retorno promedio de 17 veces la inversión.",
    price: 349_000,
  },
  {
    badge: undefined,
    dark: false,
    features: [
      "3 números de WhatsApp",
      "Varios vendedores conectados",
      "Todo lo del plan Pro",
      "Reportes detallados por vendedor",
      "Atención prioritaria",
    ],
    highlight: false,
    name: "Equipo",
    note: "Para equipos con varios vendedores trabajando al tiempo.",
    price: 599_000,
  },
];

function formatPrice(value: number, discount: number): string {
  return `$${Math.round(value * discount).toLocaleString("es-CO")}`;
}

export function Pricing(): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useKashoInView(ref);
  const [annual, setAnnual] = useState(false);
  const discount = annual ? 0.85 : 1;

  return (
    <section
      className="bg-kasho-gray-light py-16 md:py-24 lg:py-32"
      id="precios"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          animate={inView ? "visible" : "hidden"}
          className="mb-12 text-center md:mb-14"
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
          <h2 className="font-heading text-[clamp(32px,4vw,56px)] font-extrabold leading-tight tracking-tight text-kasho-black">
            Sin contratos. Sin sorpresas.
            <br />
            Solo resultados.
          </h2>
          <p className="mt-3 font-sans text-[17px] text-[#888]">
            Cancela cuando quieras. Precios en pesos colombianos.
          </p>
          <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-kasho-gray-border bg-white py-1.5 pl-4 pr-1.5">
            <span
              className={`font-sans text-sm ${annual ? "text-[#888]" : "font-medium text-kasho-black"}`}
            >
              Mensual
            </span>
            <button
              aria-checked={annual}
              aria-label="Alternar facturación anual"
              className={`relative h-6 w-11 rounded-full border-none transition-colors duration-300 ${annual ? "bg-kasho-green" : "bg-kasho-gray-border"}`}
              onClick={() => setAnnual((value) => !value)}
              role="switch"
              type="button"
            >
              <span
                className="absolute top-[3px] h-[18px] w-[18px] rounded-full bg-white shadow transition-[left] duration-300"
                style={{ left: annual ? 23 : 3 }}
              />
            </button>
            <span
              className={`font-sans text-sm ${annual ? "font-medium text-kasho-black" : "text-[#888]"}`}
            >
              Anual
            </span>
            {annual ? (
              <span className="mr-1 rounded-full bg-kasho-green/10 px-2.5 py-0.5 font-sans text-xs font-semibold text-kasho-green">
                -15%
              </span>
            ) : null}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              animate={inView ? "visible" : "hidden"}
              className="h-full"
              initial="hidden"
              key={plan.name}
              variants={{
                hidden: { opacity: 0, y: 32 },
                visible: {
                  opacity: 1,
                  transition: {
                    delay: 0.1 + index * 0.12,
                    duration: 0.7,
                    ease: KASHO_EASE,
                  },
                  y: plan.highlight ? -8 : 0,
                },
              }}
            >
              <div
                className={`relative h-full overflow-hidden rounded-[22px] p-8 md:p-10 ${
                  plan.dark
                    ? "border border-white/[0.08] bg-gradient-to-br from-kasho-black to-kasho-navy shadow-[0_24px_64px_rgba(0,0,0,0.4)]"
                    : plan.name === "Equipo"
                      ? "border border-kasho-green/20 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
                      : "border border-kasho-gray-border bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
                } ${plan.highlight ? "lg:py-12" : ""}`}
              >
                {plan.dark ? (
                  <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-kasho-green/10 blur-3xl" />
                ) : null}
                {plan.badge ? (
                  <div className="absolute right-5 top-5 rounded-full bg-kasho-yellow px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-wide text-kasho-black">
                    {plan.badge}
                  </div>
                ) : null}
                <div className="mb-1.5">
                  <span
                    className={`font-heading text-[15px] font-bold ${plan.dark ? "text-[#888]" : "text-kasho-gray-text"}`}
                  >
                    {plan.name}
                  </span>
                </div>
                <div className="mb-6 flex items-baseline gap-1">
                  <span
                    className={`font-heading text-[clamp(36px,4vw,48px)] font-extrabold tracking-tight ${plan.dark ? "text-white" : "text-kasho-black"}`}
                  >
                    {formatPrice(plan.price, discount)}
                  </span>
                  <span
                    className={`font-sans text-sm ${plan.dark ? "text-[#666]" : "text-[#888]"}`}
                  >
                    COP/mes
                  </span>
                </div>
                <ul className="mb-6 flex flex-col gap-2.5">
                  {plan.features.map((feature) => {
                    const isHighlight = feature.includes("★");
                    const text = feature.replace(" ★", "");
                    return (
                      <li
                        className={`flex gap-2.5 font-sans text-sm ${
                          plan.dark
                            ? isHighlight
                              ? "font-medium text-kasho-green"
                              : "text-[#bbb]"
                            : "text-kasho-gray-text"
                        }`}
                        key={feature}
                      >
                        <span className="mt-0.5 shrink-0 font-semibold text-kasho-green">
                          ✓
                        </span>
                        <span>
                          {text}
                          {isHighlight ? (
                            <span className="ml-1 text-[11px] text-kasho-green">
                              destacado
                            </span>
                          ) : null}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <a
                  className={`block rounded-xl py-3.5 text-center font-sans text-[15px] font-semibold transition-all duration-300 ${
                    plan.dark
                      ? "bg-kasho-green text-white hover:bg-kasho-green-dark hover:shadow-[0_8px_24px_rgba(0,196,140,0.35)]"
                      : "border-[1.5px] border-kasho-black/25 text-kasho-black hover:border-kasho-green hover:text-kasho-green"
                  }`}
                  href="#precios"
                >
                  Empezar con {plan.name}
                </a>
                <p
                  className={`mt-3.5 text-center font-sans text-xs leading-relaxed ${
                    plan.dark ? "text-kasho-green" : "text-[#999]"
                  }`}
                >
                  {plan.note}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
