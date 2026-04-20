"use client";

import { Check } from "iconoir-react";
import { useState } from "react";

type Plan = {
  dark: boolean;
  features: string[];
  highlight: boolean;
  name: string;
  note: string;
  price: number;
  badge?: string;
};

const PLANES: Plan[] = [
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

export function PricingSection(): React.ReactElement {
  const [annual, setAnnual] = useState(false);
  const discount = annual ? 0.85 : 1;

  return (
    <section className="relative z-10 -mx-5 bg-kasho-gray-light py-14 pb-20 sm:-mx-6 lg:-mx-8">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Toggle mensual / anual */}
        <div className="mb-10 flex max-w-full flex-wrap justify-center gap-y-2">
          <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-full border border-kasho-gray-border bg-white py-1.5 pl-3 pr-1.5 sm:pl-4">
            <span
              className={`font-sans text-sm ${annual ? "text-[#888]" : "font-medium text-kasho-black"}`}
            >
              Mensual
            </span>
            <button
              aria-checked={annual}
              aria-label="Alternar facturación anual"
              className={`relative h-6 w-11 rounded-full border-none transition-colors duration-300 ${
                annual ? "bg-kasho-green" : "bg-kasho-gray-border"
              }`}
              onClick={() => setAnnual((v) => !v)}
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
                −15%
              </span>
            ) : null}
          </div>
        </div>

        {/* Grid de planes */}
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-3">
          {PLANES.map((plan) => (
            <div
              key={plan.name}
              className={`h-full ${plan.highlight ? "-translate-y-2" : ""}`}
            >
              <div
                className={`relative flex h-full flex-col overflow-hidden rounded-[22px] p-8 md:p-10 ${
                  plan.dark
                    ? "border border-white/[0.08] bg-gradient-to-br from-kasho-black to-kasho-navy shadow-[0_24px_64px_rgba(0,0,0,0.4)]"
                    : plan.name === "Equipo"
                      ? "border border-kasho-green/20 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
                      : "border border-kasho-gray-border bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
                } ${plan.highlight ? "lg:py-12" : ""}`}
              >
                {/* Glow ambiental card Pro */}
                {plan.dark ? (
                  <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-kasho-green/10 blur-3xl" />
                ) : null}

                {/* Badge */}
                {plan.badge ? (
                  <div className="absolute right-5 top-5 rounded-full bg-kasho-yellow px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-wide text-kasho-black">
                    {plan.badge}
                  </div>
                ) : null}

                {/* Nombre */}
                <div className="mb-1.5">
                  <span
                    className={`font-heading text-[15px] font-bold ${
                      plan.dark ? "text-[#888]" : "text-kasho-gray-text"
                    }`}
                  >
                    {plan.name}
                  </span>
                </div>

                {/* Precio */}
                <div className="mb-6 flex items-baseline gap-1">
                  <span
                    className={`font-heading text-[clamp(36px,4vw,48px)] font-extrabold tracking-tight ${
                      plan.dark ? "text-white" : "text-kasho-black"
                    }`}
                  >
                    {formatPrice(plan.price, discount)}
                  </span>
                  <span
                    className={`font-sans text-sm ${plan.dark ? "text-[#666]" : "text-[#888]"}`}
                  >
                    COP/mes
                  </span>
                </div>

                {/* Features */}
                <ul className="mb-6 flex flex-1 flex-col gap-2.5">
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
                        <Check
                          aria-hidden
                          className="mt-0.5 shrink-0 text-kasho-green"
                          height={16}
                          strokeWidth={2}
                          width={16}
                        />
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

                {/* CTA */}
                <a
                  href="https://app.kashoai.com/registro"
                  className={`block rounded-xl py-3.5 text-center font-sans text-[15px] font-semibold transition-all duration-300 ${
                    plan.dark
                      ? "bg-kasho-green text-kasho-black hover:bg-kasho-green-dark hover:shadow-[0_8px_24px_rgba(0,196,140,0.35)]"
                      : "border-[1.5px] border-kasho-black/25 text-kasho-black hover:border-kasho-green hover:text-kasho-green"
                  }`}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
