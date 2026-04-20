import { Check } from "iconoir-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const revalidate = 86400; // 24h — precios cambian poco

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
  descripcion: string;
  features: string[];
  badge?: string;
  destacado?: boolean;
};

const PLANES: Plan[] = [
  {
    nombre: "Starter",
    precio: 199_000,
    descripcion: "Para negocios que quieren probar la IA de ventas con WhatsApp.",
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
    descripcion: "El plan completo para negocios que quieren vender más sin contratar más vendedores.",
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
    descripcion: "Para equipos de ventas con múltiples vendedores y números de WhatsApp.",
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
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumb items={[{ label: "Precios", href: "/precios" }]} />

        <div className="text-center mt-8 mb-14">
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Sin contratos. Sin letra chica.
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Planes Kasho en pesos colombianos
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Cancela cuando quieras. El plan Pro tiene un retorno promedio de{" "}
            <strong className="text-white">17x la inversión</strong> mensual.
          </p>
        </div>

        {/* Tabla de planes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {PLANES.map((plan) => (
            <div
              key={plan.nombre}
              className={`relative rounded-2xl border p-8 flex flex-col ${
                plan.destacado
                  ? "bg-indigo-600 border-indigo-500"
                  : "bg-white/5 border-white/10"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-indigo-700 text-xs font-bold px-4 py-1 rounded-full">
                  {plan.badge}
                </span>
              )}
              <div className="mb-6">
                <div className="text-lg font-bold mb-1">{plan.nombre}</div>
                <div className="text-4xl font-extrabold tracking-tight">
                  {formatCop(plan.precio)}
                  <span className={`text-base font-normal ml-1 ${plan.destacado ? "text-indigo-200" : "text-gray-400"}`}>
                    COP/mes
                  </span>
                </div>
                <p className={`text-sm mt-2 ${plan.destacado ? "text-indigo-200" : "text-gray-400"}`}>
                  {plan.descripcion}
                </p>
              </div>

              <ul className="flex-1 space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm">
                    <Check
                      aria-hidden
                      className={`mt-0.5 shrink-0 ${plan.destacado ? "text-indigo-200" : "text-indigo-400"}`}
                      height={16}
                      strokeWidth={2}
                      width={16}
                    />
                    <span className={plan.destacado ? "text-indigo-100" : "text-gray-300"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="https://app.kashoai.com/registro"
                className={`block text-center font-bold py-3 rounded-xl transition-colors ${
                  plan.destacado
                    ? "bg-white text-indigo-700 hover:bg-indigo-50"
                    : "bg-indigo-600 text-white hover:bg-indigo-500"
                }`}
              >
                Empezar gratis 14 días
              </a>
            </div>
          ))}
        </div>

        {/* FAQ precios */}
        <section className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Preguntas frecuentes</h2>
          <div className="space-y-6">
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
              <div key={q} className="border-b border-white/10 pb-6">
                <h3 className="font-semibold text-white mb-2">{q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal links */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm mb-4">¿Buscas Kasho para tu sector?</p>
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
                className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-2"
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
