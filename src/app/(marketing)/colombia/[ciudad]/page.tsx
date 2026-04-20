import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const revalidate = 2592000; // 30 días

type Ciudad = {
  slug: string;
  nombre: string;
  nombreCompleto: string;
  descripcion: string;
  sectoresLocales: string[];
};

const CIUDADES: Record<string, Ciudad> = {
  bogota: {
    slug: "bogota",
    nombre: "Bogotá",
    nombreCompleto: "Bogotá D.C.",
    descripcion:
      "En Bogotá, la competencia entre PYMEs es brutal. El vendedor que responde primero se lleva el cliente. Kasho responde tus leads de WhatsApp en menos de 2 segundos — a las 2am si es necesario — mientras tu equipo duerme.",
    sectoresLocales: ["Salud y estética", "Educación", "Inmobiliaria", "Agencias de viaje", "Servicios premium"],
  },
  medellin: {
    slug: "medellin",
    nombre: "Medellín",
    nombreCompleto: "Medellín, Antioquia",
    descripcion:
      "Medellín es la ciudad de los negocios que crecen rápido. Las PYMEs paisa que usan Kasho cierran más negocios porque nunca dejan un lead sin atender — ni fines de semana, ni festivos.",
    sectoresLocales: ["Tecnología y servicios", "Moda y retail", "Construcción", "Salud y bienestar", "Educación"],
  },
  cali: {
    slug: "cali",
    nombre: "Cali",
    nombreCompleto: "Cali, Valle del Cauca",
    descripcion:
      "Los negocios en Cali que venden por WhatsApp pierden leads por no tener respuesta inmediata. Kasho es el vendedor digital que nunca para — responde, califica y hace seguimiento automáticamente.",
    sectoresLocales: ["Gastronomía", "Salud y estética", "Entretenimiento", "Retail", "Servicios financieros"],
  },
  barranquilla: {
    slug: "barranquilla",
    nombre: "Barranquilla",
    nombreCompleto: "Barranquilla, Atlántico",
    descripcion:
      "Barranquilla es la puerta de Colombia al mundo. Las empresas de la Costa que crecen con Kasho tienen un vendedor de IA que responde en segundos y nunca deja ir un lead.",
    sectoresLocales: ["Logística y transporte", "Comercio exterior", "Retail", "Servicios", "Construcción"],
  },
};

const BENEFICIOS = [
  { titulo: "Respuesta en < 2 segundos", desc: "Kasho contesta antes que tu competencia." },
  { titulo: "Recovery automático", desc: "Reactiva leads fríos sin que el vendedor haga nada." },
  { titulo: "Pagos Nequi y Wompi", desc: "El cliente paga sin salir de WhatsApp." },
  { titulo: "Desde $199.000 COP/mes", desc: "Sin contratos, cancela cuando quieras." },
];

export function generateStaticParams(): { ciudad: string }[] {
  return Object.keys(CIUDADES).map((ciudad) => ({ ciudad }));
}

type Props = {
  params: Promise<{ ciudad: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ciudad } = await params;
  const data = CIUDADES[ciudad];
  if (!data) return {};

  const title = `Kasho en ${data.nombre} — Ventas WhatsApp con IA para PYMEs`;
  const description = data.descripcion.slice(0, 155);
  const canonical = `https://kashoai.com/colombia/${ciudad}`;

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

export default async function CiudadPage({ params }: Props): Promise<React.ReactElement> {
  const { ciudad } = await params;
  const data = CIUDADES[ciudad];
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
          items={[
            { label: "Colombia", href: "/colombia/bogota" },
            { label: data.nombre, href: `/colombia/${ciudad}` },
          ]}
        />

        {/* Header */}
        <div className="mt-4 sm:mt-6 mb-8 sm:mb-12">
          <p className="text-kasho-green text-sm font-semibold tracking-widest uppercase mb-3 font-sans">
            {data.nombreCompleto}
          </p>
          <h1 className="font-heading text-[clamp(32px,5vw,56px)] font-extrabold leading-tight tracking-tight mb-6">
            Ventas con IA para PYMEs
            <br />
            en {data.nombre}
          </h1>
          <p className="text-white/50 text-lg leading-relaxed max-w-2xl font-sans">
            {data.descripcion}
          </p>
        </div>

        {/* Sectores locales */}
        <div className="mb-14">
          <h2 className="font-heading text-xl font-bold mb-5">
            Sectores en {data.nombre} que usan Kasho
          </h2>
          <div className="flex flex-wrap gap-3">
            {data.sectoresLocales.map((sector) => (
              <span
                key={sector}
                className="bg-white/[0.05] border border-white/[0.08] rounded-full px-4 py-2 text-sm text-white/60 font-sans"
              >
                {sector}
              </span>
            ))}
          </div>
        </div>

        {/* Beneficios clave */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
          {BENEFICIOS.map((item) => (
            <div
              key={item.titulo}
              className="bg-white/[0.04] rounded-[20px] border border-white/[0.08] p-6 hover:border-white/[0.15] transition-colors"
            >
              <div className="font-heading font-bold text-white mb-1.5">{item.titulo}</div>
              <div className="text-sm text-white/50 font-sans">{item.desc}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <a
            href="https://app.kashoai.com/registro"
            className="inline-block bg-kasho-green font-semibold font-sans text-kasho-black transition-all duration-300 hover:bg-kasho-green-dark px-8 py-4 rounded-xl text-[15px] text-center hover:shadow-[0_8px_24px_rgba(0,196,140,0.35)]"
          >
            Empieza gratis en {data.nombre}
          </a>
          <Link
            href="/precios"
            className="inline-block border border-white/[0.15] hover:border-white/30 transition-colors text-white/70 hover:text-white font-semibold font-sans px-8 py-4 rounded-xl text-[15px] text-center"
          >
            Ver planes y precios
          </Link>
        </div>

        {/* Otras ciudades */}
        <div className="border-t border-white/[0.06] pt-12">
          <p className="text-white/30 text-sm mb-5 font-sans">Otras ciudades</p>
          <div className="flex flex-wrap gap-3">
            {Object.values(CIUDADES)
              .filter((c) => c.slug !== ciudad)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/colombia/${c.slug}`}
                  className="text-sm text-kasho-green/70 hover:text-kasho-green transition-colors font-sans underline underline-offset-2"
                >
                  Kasho en {c.nombre}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
