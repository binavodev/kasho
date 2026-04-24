"use client";

import { Check } from "iconoir-react";
import { useState } from "react";

type Plan = {
  dark: boolean;
  desc: string;
  features: string[];
  highlight: boolean;
  name: string;
  note: string;
  noteGreen?: boolean;
  price: number;
  badge?: string;
};

const PLANES: Plan[] = [
  {
    badge: undefined,
    dark: false,
    desc: "Ideal para comenzar a automatizar sin compromiso.",
    features: [
      "1 número de WhatsApp",
      "Hasta 500 conversaciones al mes",
      "Respuestas automáticas 24/7",
      "Transcripción de mensajes de voz",
      "Panel de resultados básico",
      "Onboarding por tipo de negocio",
    ],
    highlight: false,
    name: "Starter",
    note: "Con recuperar un solo cliente ya cubriste el mes.",
    price: 199_000,
  },
  {
    badge: "El más elegido",
    dark: true,
    desc: "El ROI promedio es de 17x la inversión mensual.",
    features: [
      "Todo lo del plan Starter",
      "Conversaciones ilimitadas",
      "Seguimiento automático a leads fríos ★",
      "Panel de resultados completo",
      "Cobros Wompi y Nequi en el chat ★",
      "Resumen semanal por WhatsApp",
      "Configuración por tipo de negocio",
    ],
    highlight: true,
    name: "Pro",
    note: "Retorno promedio de 17x la inversión.",
    noteGreen: true,
    price: 349_000,
  },
  {
    badge: undefined,
    dark: false,
    desc: "Para negocios con varios vendedores operando al tiempo.",
    features: [
      "3 números de WhatsApp",
      "Varios vendedores conectados",
      "Todo lo del plan Pro",
      "Reportes detallados por vendedor",
      "Atención prioritaria",
      "Acceso anticipado a nuevas funciones",
    ],
    highlight: false,
    name: "Equipo",
    note: "Para equipos con varios vendedores al tiempo.",
    price: 599_000,
  },
];

const VALUE_PROPS = [
  { label: "Retorno promedio plan Pro", value: "17x" },
  { label: "Días de prueba gratis", value: "14" },
  { label: "Para estar activo desde el primer día", value: "10'" },
  { label: "Contratos de permanencia", value: "0" },
];

const COMP_ROWS = [
  { feature: "Precio base", kasho: "$199.000 COP/mes", others: "USD 39–300/mes" },
  { feature: "IA generativa nativa", kasho: "✓ Incluida", others: "✗ Add-on o no disponible" },
  { feature: "Configuración", kasho: "10 min, sin técnico", others: "Días, requiere técnico" },
  { feature: "Pagos Nequi / Wompi", kasho: "✓ Integrado", others: "✗ No disponible" },
  { feature: "Recovery automático", kasho: "✓ Automático", others: "Manual" },
  { feature: "Contratos de permanencia", kasho: "✗ Ninguno", others: "Anual en muchos casos" },
];

function formatPrice(value: number, discount: number): string {
  return `$${Math.round(value * discount).toLocaleString("es-CO")}`;
}

export function PricingSection(): React.ReactElement {
  const [annual, setAnnual] = useState(false);
  const discount = annual ? 0.85 : 1;

  return (
    <>
      {/* Plans band */}
      <section className="relative z-10 -mx-5 bg-kasho-gray-light py-14 sm:-mx-6 lg:-mx-8">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          {/* Billing toggle */}
          <div className="mb-10 flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-kasho-gray-border bg-white py-1.5 pl-4 pr-1.5">
              <span className={`font-sans text-sm ${annual ? "text-[#888]" : "font-medium text-kasho-black"}`}>
                Mensual
              </span>
              <button
                aria-checked={annual}
                aria-label="Alternar facturación anual"
                className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${annual ? "bg-kasho-green" : "bg-kasho-gray-border"}`}
                onClick={() => setAnnual((v) => !v)}
                role="switch"
                type="button"
              >
                <span
                  className="absolute top-[3px] h-[18px] w-[18px] rounded-full bg-white shadow transition-[left] duration-300"
                  style={{ left: annual ? 23 : 3 }}
                />
              </button>
              <span className={`font-sans text-sm ${annual ? "font-medium text-kasho-black" : "text-[#888]"}`}>
                Anual
              </span>
              {annual ? (
                <span className="mr-1 rounded-full bg-kasho-green/10 px-2.5 py-0.5 font-sans text-xs font-semibold text-kasho-green">
                  −15%
                </span>
              ) : null}
            </div>
          </div>

          {/* Plans grid */}
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-3">
            {PLANES.map((plan) => (
              <div className={`h-full ${plan.highlight ? "-translate-y-2" : ""}`} key={plan.name}>
                <div
                  className={`relative flex h-full flex-col overflow-hidden rounded-[22px] p-8 md:p-10 ${
                    plan.dark
                      ? "border border-white/[0.08] bg-gradient-to-br from-kasho-black to-kasho-navy shadow-[0_24px_64px_rgba(0,0,0,0.4)]"
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

                  <div className={`mb-1 font-heading text-[13px] font-bold ${plan.dark ? "text-[#666]" : "text-kasho-gray-text"}`}>
                    {plan.name}
                  </div>
                  <div className="mb-1.5 flex items-baseline gap-1">
                    <span className={`font-heading text-[clamp(34px,4vw,46px)] font-extrabold tracking-tight ${plan.dark ? "text-white" : "text-kasho-black"}`}>
                      {formatPrice(plan.price, discount)}
                    </span>
                    <span className={`font-sans text-sm ${plan.dark ? "text-[#555]" : "text-[#888]"}`}>
                      COP/mes
                    </span>
                  </div>
                  <p className={`mb-6 font-sans text-[13px] leading-[1.55] ${plan.dark ? "text-[#555]" : "text-[#777]"}`}>
                    {plan.desc}
                  </p>

                  <ul className="mb-6 flex flex-1 flex-col gap-2.5">
                    {plan.features.map((feature) => {
                      const isHighlight = feature.includes("★");
                      const text = feature.replace(" ★", "");
                      return (
                        <li
                          className={`flex gap-2.5 font-sans text-sm ${
                            plan.dark
                              ? isHighlight ? "font-medium text-kasho-green" : "text-[#888]"
                              : "text-kasho-gray-text"
                          }`}
                          key={feature}
                        >
                          <Check aria-hidden className="mt-0.5 shrink-0 text-kasho-green" height={16} strokeWidth={2} width={16} />
                          {text}
                        </li>
                      );
                    })}
                  </ul>

                  <a
                    className={`block rounded-xl py-3.5 text-center font-sans text-[15px] font-bold transition-all duration-300 ${
                      plan.dark
                        ? "bg-kasho-green text-kasho-black hover:bg-kasho-green-dark hover:shadow-[0_8px_24px_rgba(0,196,140,0.35)]"
                        : "border-[1.5px] border-black/20 text-kasho-black hover:border-kasho-green hover:text-kasho-green"
                    }`}
                    href="https://app.kashoai.com/registro"
                  >
                    Empezar con {plan.name}
                  </a>
                  <p className={`mt-3.5 text-center font-sans text-xs leading-relaxed ${plan.noteGreen ? "text-kasho-green/70" : "text-[#999]"}`}>
                    {plan.note}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Value props row */}
          <div className="mt-14 grid grid-cols-2 gap-4 border-t border-kasho-gray-border pt-10 md:grid-cols-4">
            {VALUE_PROPS.map(({ value, label }) => (
              <div className="px-3 py-4 text-center" key={label}>
                <div className="font-heading text-[clamp(28px,3.5vw,44px)] font-extrabold tracking-[-1.5px] text-kasho-green">
                  {value}
                </div>
                <div className="mt-1.5 font-sans text-[13px] leading-[1.5] text-[#888]">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="relative z-10 -mx-5 overflow-x-auto bg-kasho-black py-16 sm:-mx-6 lg:-mx-8">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          <h2 className="mb-3 text-center font-heading text-[clamp(22px,3vw,32px)] font-extrabold tracking-[-1px] text-white">
            Kasho vs la competencia
          </h2>
          <p className="mb-10 text-center font-sans text-[15px] text-[#555]">
            Por qué las PYMEs colombianas eligen Kasho sobre herramientas internacionales.
          </p>
          <div className="overflow-x-auto rounded-[16px] border border-white/[0.07]">
            <table className="w-full min-w-[560px] border-collapse">
              <thead>
                <tr className="border-b border-white/[0.07] bg-white/[0.02]">
                  <th className="px-5 py-3.5 text-left font-sans text-[13px] font-bold text-[#555]">Característica</th>
                  <th className="px-5 py-3.5 text-left font-sans text-[13px] font-bold text-kasho-green">Kasho</th>
                  <th className="px-5 py-3.5 text-left font-sans text-[13px] font-bold text-[#444]">Competidores</th>
                </tr>
              </thead>
              <tbody>
                {COMP_ROWS.map((row) => (
                  <tr className="border-b border-white/[0.04] transition-colors last:border-0 hover:bg-white/[0.01]" key={row.feature}>
                    <td className="px-5 py-3.5 font-sans text-[13px] text-[#666]">{row.feature}</td>
                    <td className="px-5 py-3.5 font-sans text-[14px] font-medium text-white">{row.kasho}</td>
                    <td className="px-5 py-3.5 font-sans text-[14px] text-[#333]">{row.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA card */}
      <section className="relative z-10 -mx-5 bg-kasho-black pb-16 sm:-mx-6 lg:-mx-8">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          <div
            className="relative overflow-hidden rounded-[28px] px-8 py-16 text-center md:px-20"
            style={{ background: "#00c48c" }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(0,0,0,.06) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <h2 className="relative z-[1] font-heading text-[clamp(26px,4vw,44px)] font-extrabold tracking-[-1.5px] text-kasho-black">
              14 días gratis. Sin tarjeta.
            </h2>
            <p className="relative z-[1] mt-3 font-sans text-[16px] text-black/50">
              Conecta tu WhatsApp hoy y empieza a recuperar clientes desde mañana.
            </p>
            <a
              className="relative z-[1] mt-8 inline-flex items-center gap-2 rounded-[13px] bg-kasho-black px-9 py-4 font-sans text-[16px] font-bold text-white transition-all duration-300 hover:bg-kasho-navy hover:shadow-[0_14px_36px_rgba(0,0,0,.3)]"
              href="https://app.kashoai.com/registro"
            >
              Empezar gratis →
            </a>
            <div className="relative z-[1] mt-7 flex flex-wrap justify-center gap-5">
              {["Sin tarjeta de crédito", "Cancela cuando quieras", "En pesos colombianos"].map((t) => (
                <span className="flex items-center gap-1.5 font-sans text-[13px] font-medium text-black/40" key={t}>
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-black/10 text-[9px] text-black/50">
                    ✓
                  </span>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
