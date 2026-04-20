import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumb } from "@/components/ui/Breadcrumb";

import { PricingSection } from "./PricingSection";

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
    images: [
      {
        url: "https://kashoai.com/og?plan=Pro&monto=3800000",
        width: 1200,
        height: 630,
        alt: "Precios Kasho — Desde $199.000 COP/mes",
      },
    ],
  },
};

export default function PreciosPage(): React.ReactElement {
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

      {/* FAQ + links — de vuelta al fondo oscuro */}
      <div className="relative z-10 mx-auto max-w-5xl py-16 pb-20">
        <section className="max-w-2xl mx-auto mb-16">
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
                <p className="font-sans text-sm text-white/50 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center border-t border-white/[0.06] pt-10">
          <p className="font-sans text-sm text-white/30 mb-5">¿Buscas Kasho para tu sector?</p>
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
                className="font-sans text-sm text-kasho-green/70 hover:text-kasho-green transition-colors underline underline-offset-2"
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
