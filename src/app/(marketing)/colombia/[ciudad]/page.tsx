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
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumb
          items={[
            { label: "Colombia", href: "/" },
            { label: data.nombre, href: `/colombia/${ciudad}` },
          ]}
        />

        <div className="mt-8">
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
            {data.nombreCompleto}
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
            Ventas con IA para PYMEs<br />en {data.nombre}
          </h1>
          <p className="text-gray-400 text-xl leading-relaxed max-w-2xl mb-10">
            {data.descripcion}
          </p>

          {/* Sectores locales */}
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-4">
              Sectores en {data.nombre} que usan Kasho
            </h2>
            <div className="flex flex-wrap gap-3">
              {data.sectoresLocales.map((sector) => (
                <span
                  key={sector}
                  className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-gray-300"
                >
                  {sector}
                </span>
              ))}
            </div>
          </div>

          {/* Beneficios clave */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {[
              { titulo: "Respuesta en < 2 segundos", desc: "Kasho contesta antes que tu competencia." },
              { titulo: "Recovery automático", desc: "Reactiva leads fríos sin que el vendedor haga nada." },
              { titulo: "Pagos Nequi y Wompi", desc: "El cliente paga sin salir de WhatsApp." },
              { titulo: "Desde $199.000 COP/mes", desc: "Sin contratos, cancela cuando quieras." },
            ].map((item) => (
              <div
                key={item.titulo}
                className="bg-white/5 rounded-2xl border border-white/10 p-6"
              >
                <div className="font-bold text-white mb-1">{item.titulo}</div>
                <div className="text-sm text-gray-400">{item.desc}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://app.kashoai.com/registro"
              className="inline-block bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-bold px-8 py-4 rounded-xl text-base text-center"
            >
              Empieza gratis en {data.nombre}
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
