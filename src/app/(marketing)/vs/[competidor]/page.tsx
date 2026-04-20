import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const revalidate = 2592000; // 30 días

type Fila = { feature: string; kasho: string; rival: string };

type Competidor = {
  slug: string;
  nombre: string;
  descripcion: string;
  tabla: Fila[];
};

const COMPETIDORES: Record<string, Competidor> = {
  kommo: {
    slug: "kommo",
    nombre: "Kommo",
    descripcion:
      "Kommo (ex amoCRM) es un CRM conversacional popular en LATAM. Pero sus planes arrancan en USD 15/usuario/mes, requieren configuración técnica y no tienen IA generativa nativa para WhatsApp. Kasho es 100% en COP, se configura en 10 minutos y viene con IA lista.",
    tabla: [
      { feature: "Precio base", kasho: "$199.000 COP/mes", rival: "~$60.000 COP/usuario/mes" },
      { feature: "Configuración", kasho: "10 minutos, sin código", rival: "Días, requiere técnico" },
      { feature: "IA generativa en WhatsApp", kasho: "Incluida", rival: "No incluida (add-on)" },
      { feature: "Recovery automático de leads", kasho: "Sí, automático", rival: "Manual" },
      { feature: "Pagos Nequi / Wompi", kasho: "Integrado", rival: "No integrado" },
      { feature: "Soporte en Colombia", kasho: "Sí, horario COP", rival: "Global, inglés" },
    ],
  },
  treble: {
    slug: "treble",
    nombre: "Treble",
    descripcion:
      "Treble es una plataforma de WhatsApp marketing para equipos de ventas enterprise. Sus precios están en USD y están orientados a empresas grandes. Kasho está diseñado específicamente para PYMEs colombianas, con precios en COP y sin contratos anuales.",
    tabla: [
      { feature: "Precio base", kasho: "$199.000 COP/mes", rival: "Desde USD 300/mes" },
      { feature: "Contrato mínimo", kasho: "Mes a mes", rival: "Anual" },
      { feature: "IA conversacional", kasho: "Incluida", rival: "Configurable (técnico)" },
      { feature: "Recovery automático", kasho: "Sí", rival: "No nativo" },
      { feature: "Pagos integrados Colombia", kasho: "Sí (Wompi/Nequi)", rival: "No" },
      { feature: "Orientado a PYMEs", kasho: "Sí, 100%", rival: "No (enterprise)" },
    ],
  },
  sirena: {
    slug: "sirena",
    nombre: "Sirena",
    descripcion:
      "Sirena es una herramienta de WhatsApp para equipos de ventas con foco en Argentina y México. Kasho está construido para el mercado colombiano con integración de pagos locales (Wompi, Nequi) y soporte en horario colombiano.",
    tabla: [
      { feature: "Precio base", kasho: "$199.000 COP/mes", rival: "Desde USD 39/mes" },
      { feature: "Mercado principal", kasho: "Colombia", rival: "Argentina / México" },
      { feature: "IA generativa", kasho: "Sí, GPT-4o", rival: "Básica" },
      { feature: "Pagos Colombia (Nequi/PSE)", kasho: "Integrado", rival: "No" },
      { feature: "Recovery automático de leads", kasho: "Sí", rival: "No" },
      { feature: "Soporte en Colombia", kasho: "Sí", rival: "No (ARG/MX timezone)" },
    ],
  },
  leadsales: {
    slug: "leadsales",
    nombre: "Leadsales",
    descripcion:
      "Leadsales es un CRM de WhatsApp orientado a pequeños equipos en México y Colombia. Kasho va más allá siendo un motor de ventas con IA que responde, hace seguimiento y genera reportes de plata recuperada — sin que el vendedor tenga que hacer nada manualmente.",
    tabla: [
      { feature: "Precio base", kasho: "$199.000 COP/mes", rival: "Desde USD 83/mes" },
      { feature: "IA responde automáticamente", kasho: "Sí, 24/7", rival: "No (solo CRM)" },
      { feature: "Recovery de leads frío", kasho: "Automático", rival: "Manual" },
      { feature: "Reporte semanal de ingresos", kasho: "Sí, por WhatsApp", rival: "No" },
      { feature: "Pagos integrados", kasho: "Wompi / Nequi", rival: "No" },
      { feature: "Onboarding", kasho: "10 min, sin técnico", rival: "Requiere configuración" },
    ],
  },
};

export function generateStaticParams(): { competidor: string }[] {
  return Object.keys(COMPETIDORES).map((competidor) => ({ competidor }));
}

type Props = {
  params: Promise<{ competidor: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { competidor } = await params;
  const data = COMPETIDORES[competidor];
  if (!data) return {};

  const title = `Kasho vs ${data.nombre} — Comparación para PYMEs en Colombia`;
  const description = data.descripcion.slice(0, 155);
  const canonical = `https://kashoai.com/vs/${competidor}`;

  return {
    title,
    description,
    alternates: { canonical, languages: { "es-CO": canonical } },
    openGraph: {
      title,
      description,
      url: canonical,
      locale: "es_CO",
      type: "website",
      images: [
        {
          url: "https://kashoai.com/og?plan=Pro&monto=3800000",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

export default async function CompetidorPage({ params }: Props): Promise<React.ReactElement> {
  const { competidor } = await params;
  const data = COMPETIDORES[competidor];
  if (!data) notFound();

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumb
          items={[
            { label: "Comparaciones", href: "/" },
            { label: `Kasho vs ${data.nombre}`, href: `/vs/${competidor}` },
          ]}
        />

        <div className="mt-8">
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Comparación
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
            Kasho vs {data.nombre}
          </h1>
          <p className="text-gray-400 text-xl leading-relaxed max-w-2xl mb-10">
            {data.descripcion}
          </p>

          {/* Tabla de comparación */}
          <div className="overflow-x-auto rounded-2xl border border-white/10 mb-12">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-gray-400 font-medium">Característica</th>
                  <th className="text-left p-4 text-indigo-400 font-semibold">Kasho</th>
                  <th className="text-left p-4 text-gray-400 font-medium">{data.nombre}</th>
                </tr>
              </thead>
              <tbody>
                {data.tabla.map((fila, i) => (
                  <tr
                    key={fila.feature}
                    className={`border-b border-white/5 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
                  >
                    <td className="p-4 text-gray-300">{fila.feature}</td>
                    <td className="p-4 text-white font-medium">{fila.kasho}</td>
                    <td className="p-4 text-gray-500">{fila.rival}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://app.kashoai.com/registro"
              className="inline-block bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-bold px-8 py-4 rounded-xl text-base text-center"
            >
              Prueba Kasho gratis 14 días
            </a>
            <Link
              href="/precios"
              className="inline-block border border-white/20 hover:border-white/40 transition-colors text-gray-300 font-semibold px-8 py-4 rounded-xl text-base text-center"
            >
              Ver planes
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
