"use client";

import Link from "next/link";
import { useState } from "react";

import { Breadcrumb } from "@/components/ui/Breadcrumb";

import { PricingSection } from "./PricingSection";

const FAQS = [
  {
    a: "Sí. Subes o bajas de plan en cualquier momento desde tu panel. El cambio aplica en el siguiente ciclo de facturación. Sin penalizaciones ni trámites.",
    q: "¿Puedo cambiar de plan cuando quiera?",
  },
  {
    a: "No. Kasho es mes a mes. Cancelas cuando quieras desde el panel, sin llamadas ni formularios. Sin letra chica.",
    q: "¿Hay contratos de permanencia?",
  },
  {
    a: "No. Los 14 días de prueba son completamente gratuitos y no requieres ingresar datos de pago. Solo conectas tu WhatsApp y empiezas.",
    q: "¿La prueba gratuita requiere tarjeta de crédito?",
  },
  {
    a: "En pesos colombianos (COP), sin markup de dólar. El precio que ves es lo que pagas, sin sorpresas por tasa de cambio.",
    q: "¿En qué moneda se cobra?",
  },
  {
    a: "Te avisamos cuando te acercas al límite y puedes subir al plan Pro con un click. Las conversaciones activas no se interrumpen.",
    q: "¿Qué pasa si supero las conversaciones del plan Starter?",
  },
  {
    a: "Kasho usa la API oficial de WhatsApp Business (Meta). Conectas tu número existente en el proceso de onboarding. Tú conservas tu número y tus contactos.",
    q: "¿Kasho funciona con WhatsApp Business normal?",
  },
];

export default function PreciosPage(): React.ReactElement {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <main className="relative bg-kasho-black px-5 text-white overflow-x-hidden sm:px-6 lg:px-8">
      {/* Hero gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[800px] -translate-x-1/2 rounded-full opacity-[0.07]"
        style={{
          background:
            "radial-gradient(ellipse at center, #00c48c 0%, transparent 70%)",
        }}
      />

      {/* Header oscuro — breadcrumb + título */}
      <div className="relative z-10 mx-auto max-w-5xl pt-6 sm:pt-8 pb-10">
        <Breadcrumb items={[{ label: "Precios", href: "/precios" }]} />
        <div className="mt-4 sm:mt-6 text-center">
          <p className="font-sans text-sm font-semibold tracking-widest text-kasho-green uppercase mb-3">
            Sin contratos. Sin letra chica.
          </p>
          <h1 className="font-heading text-[clamp(32px,5vw,56px)] font-extrabold leading-tight tracking-tight mb-4">
            Planes en pesos colombianos
          </h1>
          <p className="font-sans text-lg text-white/50 max-w-2xl mx-auto">
            Cancela cuando quieras. El plan Pro tiene un retorno promedio de{" "}
            <strong className="font-semibold text-white">17x la inversión</strong> mensual.
          </p>
        </div>
      </div>

      {/* Cards — fondo claro, ancho completo, igual que el home */}
      <PricingSection />

      {/* FAQ accordion */}
      <div className="relative z-10 mx-auto max-w-[720px] px-4 sm:px-6 py-16 pb-20 lg:px-8">
        <h2 className="mb-10 text-center font-heading text-[clamp(22px,3vw,32px)] font-extrabold tracking-[-1px]">
          Preguntas frecuentes
        </h2>
        <div>
          {FAQS.map(({ q, a }, i) => (
            <div className="border-b border-white/[0.06] overflow-hidden" key={q}>
              <button
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-heading text-[16px] font-semibold text-[#ddd] transition-colors hover:text-white"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                type="button"
              >
                {q}
                <span
                  className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                    openFaq === i
                      ? "border-kasho-green bg-kasho-green text-kasho-black rotate-45"
                      : "border-white/15 text-[#555]"
                  }`}
                >
                  <svg fill="none" height={12} viewBox="0 0 12 12" width={12}>
                    <line stroke="currentColor" strokeLinecap="round" strokeWidth="2" x1="6" x2="6" y1="2" y2="10" />
                    <line stroke="currentColor" strokeLinecap="round" strokeWidth="2" x1="2" x2="10" y1="6" y2="6" />
                  </svg>
                </span>
              </button>
              <div
                className="overflow-hidden transition-[max-height,padding] duration-300"
                style={{ maxHeight: openFaq === i ? 200 : 0, paddingBottom: openFaq === i ? 18 : 0 }}
              >
                <p className="font-sans text-[14px] leading-[1.75] text-[#666]">{a}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-white/[0.06] pt-10 text-center">
          <p className="mb-5 font-sans text-sm text-white/30">¿Buscas Kasho para tu sector?</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { href: "/ventas-whatsapp/salud-estetica", label: "Salud y Estética" },
              { href: "/ventas-whatsapp/inmobiliaria", label: "Inmobiliaria" },
              { href: "/ventas-whatsapp/educacion-cursos", label: "Educación" },
              { href: "/ventas-whatsapp/agencias-viaje", label: "Agencias de Viaje" },
            ].map(({ label, href }) => (
              <Link
                className="rounded-full border border-kasho-green/15 px-3.5 py-1.5 font-sans text-sm text-kasho-green/70 transition-all duration-200 hover:border-kasho-green/35 hover:text-kasho-green"
                href={href}
                key={href}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
