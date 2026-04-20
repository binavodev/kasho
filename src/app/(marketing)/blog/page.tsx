import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const revalidate = 3600; // 1h

export const metadata: Metadata = {
  title: "Blog — Estrategias de ventas WhatsApp para PYMEs en Colombia",
  description:
    "Artículos, guías y casos de éxito sobre ventas con IA en WhatsApp para negocios colombianos. Aprende cómo recuperar leads, automatizar seguimientos y cerrar más negocios.",
  alternates: {
    canonical: "https://kashoai.com/blog",
    languages: { "es-CO": "https://kashoai.com/blog" },
  },
  openGraph: {
    title: "Blog Kasho — Estrategias de ventas WhatsApp para PYMEs",
    description:
      "Guías y casos de éxito sobre ventas con IA en WhatsApp para negocios colombianos.",
    url: "https://kashoai.com/blog",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "https://kashoai.com/og?plan=Pro&monto=3800000",
        width: 1200,
        height: 630,
        alt: "Blog Kasho — Estrategias de ventas WhatsApp",
      },
    ],
  },
};

export default function BlogPage(): React.ReactElement {
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

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-16 sm:pb-20">
        <Breadcrumb items={[{ label: "Blog", href: "/blog" }]} />

        {/* Header */}
        <div className="mt-4 sm:mt-6 mb-8 sm:mb-12 text-center">
          <p className="text-kasho-green text-sm font-semibold tracking-widest uppercase mb-3 font-sans">
            Recursos
          </p>
          <h1 className="font-heading text-[clamp(32px,5vw,56px)] font-extrabold leading-tight tracking-tight mb-4">
            Blog Kasho
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-sans">
            Guías y estrategias para vender más por WhatsApp con IA —
            pensadas para PYMEs colombianas.
          </p>
        </div>

        {/* Placeholder — próximamente */}
        <div className="max-w-xl mx-auto">
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-[22px] p-12 text-center hover:border-white/[0.15] transition-colors">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-kasho-green/10 text-kasho-green">
              <svg
                aria-hidden
                fill="none"
                height={32}
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                viewBox="0 0 24 24"
                width={32}
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </div>
            <h2 className="font-heading text-xl font-bold text-white mb-3">
              Próximamente
            </h2>
            <p className="text-white/50 font-sans text-sm leading-relaxed mb-8 max-w-sm mx-auto">
              Estamos escribiendo guías y casos de éxito para ayudarte a
              cerrar más ventas con WhatsApp en Colombia.
            </p>
            <Link
              href="/"
              className="inline-block bg-kasho-green font-semibold font-sans text-kasho-black transition-all duration-300 hover:bg-kasho-green-dark px-7 py-3.5 rounded-xl text-[15px] hover:shadow-[0_8px_24px_rgba(0,196,140,0.35)]"
            >
              Volver al inicio
            </Link>
          </div>
        </div>

        {/* Internal links */}
        <div className="text-center border-t border-white/[0.06] pt-12 mt-20">
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
