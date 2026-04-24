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
          url: "https://kashoai.com/og?plan=Pro&monto=3800000",
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
    <main className="relative min-h-screen bg-kasho-black text-white overflow-hidden">
      {/* Hero gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[700px] -translate-x-1/2 rounded-full opacity-[0.06]"
        style={{
          background:
            "radial-gradient(ellipse at center, #00c48c 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-16 sm:pb-20">
        <Breadcrumb
          items={[{ label: `Ventas WhatsApp · ${data.nombre}`, href: `/ventas-whatsapp/${sector}` }]}
        />

        {/* Header */}
        <div className="mt-4 sm:mt-6 mb-8 sm:mb-12">
          <p className="text-kasho-green text-sm font-semibold tracking-widest uppercase mb-3 font-sans">
            Solución para {data.nombre}
          </p>
          <h1 className="font-heading text-[clamp(32px,5vw,56px)] font-extrabold leading-tight tracking-tight mb-6">
            Ventas WhatsApp con IA
            <br />
            para {data.nombre} en Colombia
          </h1>
          <p className="text-white/50 text-lg leading-relaxed max-w-2xl font-sans">
            {data.descripcion}
          </p>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
          {data.metricas.map((m) => (
            <div
              key={m.label}
              className="bg-white/[0.04] rounded-[20px] border border-white/[0.08] p-6 hover:border-kasho-green/20 transition-colors"
            >
              <div className="font-heading text-3xl font-extrabold text-kasho-green mb-1.5">
                {m.valor}
              </div>
              <div className="text-sm text-white/50 font-sans">{m.label}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <a
            href="https://app.kashoai.com/registro"
            className="inline-block bg-kasho-green font-semibold font-sans text-kasho-black transition-all duration-300 hover:bg-kasho-green-dark px-8 py-4 rounded-xl text-[15px] text-center hover:shadow-[0_8px_24px_rgba(0,196,140,0.35)]"
          >
            {data.cta}
          </a>
          <Link
            href="/precios"
            className="inline-block border border-white/[0.15] hover:border-white/30 transition-colors text-white/70 hover:text-white font-semibold font-sans px-8 py-4 rounded-xl text-[15px] text-center"
          >
            Ver planes y precios
          </Link>
        </div>

        {/* Otros sectores */}
        <div className="border-t border-white/[0.06] pt-12">
          <p className="text-white/30 text-sm mb-5 font-sans">Otros sectores</p>
          <div className="flex flex-wrap gap-3">
            {Object.values(SECTORES)
              .filter((s) => s.slug !== sector)
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/ventas-whatsapp/${s.slug}`}
                  className="text-sm text-kasho-green/70 hover:text-kasho-green transition-colors font-sans underline underline-offset-2"
                >
                  {s.nombre}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
