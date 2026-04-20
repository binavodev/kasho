import { Check } from "iconoir-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const revalidate = 86400; // 24h

export const metadata: Metadata = {
  title: "Precios — Planes Kasho desde $199.000 COP/mes",
  description:
    "Kasho tiene 3 planes en pesos colombianos: Starter $199.000 COP/mes, Pro $349.000 COP/mes y Equipo $599.000 COP/mes. Sin contratos, cancela cuando quieras. El ROI promedio del plan Pro es 17x.",
  alternates: {
    canonical: "https://kashoai.com/precios",
    languages: { "es-CO": "https://kashoai.com/precios" },
  },
  openGraph: {
    title: "Precios Kasho — Desde $199.000 COP/mes",
    description:
      "Kasho tiene 3 planes: Starter $199.000, Pro $349.000 y Equipo $599.000 COP/mes. Sin contratos anuales.",
    url: "https://kashoai.com/precios",
    locale: "es_CO",
    type: "website",
  },
};

type Plan = {
  nombre: string;
  precio: number;
  nota: string;
  features: string[];
  badge?: string;
  destacado?: boolean;
};

const PLANES: Plan[] = [
  {
    nombre: "Starter",
    precio: 199_000,
    nota: "Con recuperar un solo cliente ya cubriste el mes.",
    features: [
      "1 número de WhatsApp",
      "Hasta 500 conversaciones al mes",
      "Respuestas automáticas 24/7",
      "Transcripción de mensajes de voz",
      "Panel de resultados básico",
    ],
  },
  {
    nombre: "Pro",
    precio: 349_000,
    nota: "Retorno promedio de 17 veces la inversión.",
    features: [
      "Todo lo del plan Starter",
      "Conversaciones ilimitadas",
      "Recovery automático de leads fríos",
      "Panel de resultados completo",
      "Cobros por Wompi y Nequi en el chat",
      "Resumen semanal de ingresos por WhatsApp",
    ],
    badge: "El más elegido",
    destacado: true,
  },
  {
    nombre: "Equipo",
    precio: 599_000,
    nota: "Para equipos con varios vendedores trabajando al tiempo.",
    features: [
      "3 números de WhatsApp",
      "Multi-agente — varios vendedores conectados",
      "Todo lo del plan Pro",
      "Reportes avanzados por vendedor",
      "Soporte prioritario",
    ],
  },
];

function formatCop(value: number): string {
  return `$${value.toLocaleString("es-CO")}`;
}

export default function PreciosPage(): React.ReactElement {
  return (
    <main className="relative min-h-screen bg-kasho-black text-white overflow-hidden">
      {/* Hero gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[800px] -translate-x-1/2 rounded-full opacity-[0.07]"
        style={{
          background:
            "radial-gradient(ellipse at center, #00c48c 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-20">
        <Breadcrumb items={[{ label: "Precios", href: "/precios" }]} />

        {/* Header */}
        <div className="text-center mt-10 mb-16">
          <p className="text-kasho-green text-sm font-semibold tracking-widest uppercase mb-3 font-sans">
            Sin contratos. Sin letra chica.
          </p>
          <h1 className="font-heading text-[clamp(32px,5vw,56px)] font-extrabold leading-tight tracking-tight mb-4">
            Planes Kasho en pesos colombianos
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-sans">
            Cancela cuando quieras. El plan Pro tiene un retorno promedio de{" "}
            <strong className="text-white">17x la inversión</strong> mensual.
          </p>
        </div>

        {/* Planes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 items-start">
          {PLANES.map((plan) => (
            <div
              key={plan.nombre}
              className={`relative rounded-[22px] p-8 flex flex-col h-full transition-all duration-300 ${
                plan.destacado
                  ? "bg-gradient-to-br from-kasho-black to-kasho-navy border border-white/[0.12] shadow-[0_24px_64px_rgba(0,0,0,0.5)] md:-translate-y-2"
                  : "bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15]"
              }`}
            >
              {/* Green glow on featured */}
              {plan.destacado && (
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-kasho-green/10 blur-3xl" />
              )}

              {plan.badge && (
                <div className="absolute right-5 top-5 rounded-full bg-kasho-yellow px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-wide text-kasho-black">
                  {plan.badge}
                </div>
              )}

              <div className="mb-1.5">
                <span className="font-heading text-[15px] font-bold text-white/40">
                  {plan.nombre}
                </span>
              </div>

              <div className="mb-6 flex items-baseline gap-1">
                <span className="font-heading text-[clamp(36px,4vw,48px)] font-extrabold tracking-tight text-white">
                  {formatCop(plan.precio)}
                </span>
                <span className="font-sans text-sm text-white/40">COP/mes</span>
              </div>

              <ul className="flex-1 space-y-2.5 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2.5 text-sm font-sans">
                    <Check
                      aria-hidden
                      className="mt-0.5 shrink-0 text-kasho-green"
                      height={16}
                      strokeWidth={2}
                      width={16}
                    />
                    <span className="text-white/70">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://app.kashoai.com/registro"
                className={`block text-center font-sans font-semibold py-3.5 rounded-xl transition-all duration-300 text-[15px] ${
                  plan.destacado
                    ? "bg-kasho-green text-white hover:bg-kasho-green-dark hover:shadow-[0_8px_24px_rgba(0,196,140,0.35)]"
                    : "border border-white/[0.15] text-white/80 hover:border-kasho-green hover:text-kasho-green"
                }`}
              >
                Empezar con {plan.nombre}
              </a>
              <p className="mt-3.5 text-center font-sans text-xs text-white/30">
                {plan.nota}
              </p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <section className="max-w-2xl mx-auto mb-20">
          <h2 className="font-heading text-2xl font-bold mb-10 text-center">
            Preguntas frecuentes
          </h2>
          <div className="space-y-0">
            {[
              {
                q: "¿Puedo cambiar de plan cuando quiera?",
                a: "Sí. Subes o bajas de plan en cualquier momento desde tu panel. El cambio aplica en el siguiente ciclo de facturación.",
              },
              {
                q: "¿Hay contratos de permanencia?",
                a: "No. Kasho es mes a mes. Cancelas cuando quieras desde el panel, sin llamadas ni formularios.",
              },
              {
                q: "¿La prueba gratuita requiere tarjeta de crédito?",
                a: "No. Los 14 días de prueba son completamente gratuitos y sin necesidad de ingresar datos de pago.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="border-b border-white/[0.08] py-6">
                <h3 className="font-heading font-semibold text-white mb-2">{q}</h3>
                <p className="text-white/50 text-sm leading-relaxed font-sans">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal links */}
        <div className="text-center border-t border-white/[0.06] pt-12">
          <p className="text-white/30 text-sm mb-5 font-sans">¿Buscas Kasho para tu sector?</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { label: "Salud y Estética", href: "/ventas-whatsapp/salud-estetica" },
              { label: "Inmobiliaria", href: "/ventas-whatsapp/inmobiliaria" },
              { label: "Educación", href: "/ventas-whatsapp/educacion-cursos" },
              { label: "Agencias de Viaje", href: "/ventas-whatsapp/agencias-viaje" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-kasho-green/70 hover:text-kasho-green transition-colors font-sans underline underline-offset-2"
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
