import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const revalidate = 2592000; // 30 días

type Sector = {
  slug: string;
  nombre: string;
  descripcion: string;
  metricas: { label: string; valor: string }[];
  cta: string;
};

const SECTORES: Record<string, Sector> = {
  "salud-estetica": {
    slug: "salud-estetica",
    nombre: "Salud y Estética",
    descripcion:
      "Clínicas, centros de estética, spas y consultorios médicos pierden hasta el 70% de sus leads porque responden tarde en WhatsApp. Kasho responde en segundos y agenda citas automáticamente.",
    metricas: [
      { label: "Tiempo de respuesta", valor: "< 2 seg" },
      { label: "Citas agendadas por mes", valor: "+180" },
      { label: "Leads recuperados", valor: "73%" },
    ],
    cta: "Agenda más citas con IA",
  },
  "educacion-cursos": {
    slug: "educacion-cursos",
    nombre: "Educación y Cursos",
    descripcion:
      "Academias, institutos y creadores de cursos que venden por WhatsApp pierden matrículas por responder tarde. Kasho califica al estudiante, resuelve dudas y cierra la matrícula.",
    metricas: [
      { label: "Tasa de matrícula", valor: "+45%" },
      { label: "Consultas resueltas auto", valor: "80%" },
      { label: "Tiempo promedio de cierre", valor: "< 4 horas" },
    ],
    cta: "Matricula más estudiantes con IA",
  },
  inmobiliaria: {
    slug: "inmobiliaria",
    nombre: "Inmobiliaria",
    descripcion:
      "Inmobiliarias y agentes independientes en Colombia que reciben consultas de arriendos y ventas pierden compradores por no contestar rápido. Kasho filtra, califica y agenda visitas.",
    metricas: [
      { label: "Visitas agendadas/mes", valor: "+60" },
      { label: "Leads calificados auto", valor: "85%" },
      { label: "Tiempo respuesta", valor: "< 2 seg" },
    ],
    cta: "Agenda más visitas con IA",
  },
  "agencias-viaje": {
    slug: "agencias-viaje",
    nombre: "Agencias de Viaje",
    descripcion:
      "Agencias de viaje en Colombia reciben docenas de consultas diarias por WhatsApp. Kasho cotiza, hace seguimiento y cierra reservas — incluso a las 11pm.",
    metricas: [
      { label: "Cotizaciones enviadas auto", valor: "95%" },
      { label: "Reservas cerradas 24/7", valor: "Sí" },
      { label: "Leads recuperados", valor: "68%" },
    ],
    cta: "Cierra más reservas con IA",
  },
  "talleres-premium": {
    slug: "talleres-premium",
    nombre: "Talleres y Servicios Premium",
    descripcion:
      "Talleres mecánicos, servicios de mantenimiento y empresas de reparación premium no pueden perder un lead por no contestar. Kasho agenda diagnósticos y hace seguimiento post-visita.",
    metricas: [
      { label: "Diagnósticos agendados auto", valor: "+90" },
      { label: "Follow-up post-servicio", valor: "Automático" },
      { label: "Leads recuperados", valor: "61%" },
    ],
    cta: "Agenda más diagnósticos con IA",
  },
};

export function generateStaticParams(): { sector: string }[] {
  return Object.keys(SECTORES).map((sector) => ({ sector }));
}

type Props = {
  params: Promise<{ sector: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sector } = await params;
  const data = SECTORES[sector];
  if (!data) return {};

  const title = `Kasho para ${data.nombre} — Ventas WhatsApp con IA en Colombia`;
  const description = data.descripcion;
  const canonical = `https://kashoai.com/ventas-whatsapp/${sector}`;

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
          url: `https://kashoai.com/og?plan=Pro&monto=3.800.000`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

export default async function SectorPage({ params }: Props): Promise<React.ReactElement> {
  const { sector } = await params;
  const data = SECTORES[sector];
  if (!data) notFound();

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumb
          items={[
            { label: "Ventas WhatsApp", href: "/" },
            { label: data.nombre, href: `/ventas-whatsapp/${sector}` },
          ]}
        />

        <div className="mt-8">
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Solución para {data.nombre}
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
            Ventas WhatsApp con IA<br />para {data.nombre} en Colombia
          </h1>
          <p className="text-gray-400 text-xl leading-relaxed max-w-2xl mb-10">
            {data.descripcion}
          </p>

          {/* Métricas */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {data.metricas.map((m) => (
              <div
                key={m.label}
                className="bg-white/5 rounded-2xl border border-white/10 p-6"
              >
                <div className="text-3xl font-bold text-white mb-1">{m.valor}</div>
                <div className="text-sm text-gray-400">{m.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://app.kashoai.com/registro"
              className="inline-block bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-bold px-8 py-4 rounded-xl text-base text-center"
            >
              {data.cta}
            </a>
            <Link
              href="/precios"
              className="inline-block border border-white/20 hover:border-white/40 transition-colors text-gray-300 font-semibold px-8 py-4 rounded-xl text-base text-center"
            >
              Ver planes y precios
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
