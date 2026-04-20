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
};

export default function BlogPage(): React.ReactElement {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumb items={[{ label: "Blog", href: "/blog" }]} />

        <div className="mt-8 text-center">
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Recursos
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Blog Kasho
          </h1>
          <p className="text-gray-400 text-xl max-w-xl mx-auto mb-12">
            Guías y estrategias para vender más por WhatsApp con IA —
            pensadas para PYMEs colombianas.
          </p>

          {/* Placeholder — contenido próximamente */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-12">
            <div className="text-5xl mb-4">✍️</div>
            <h2 className="text-xl font-bold mb-2">Próximamente</h2>
            <p className="text-gray-400 mb-6">
              Estamos escribiendo guías y casos de estudio para ayudarte a
              cerrar más ventas con WhatsApp.
            </p>
            <Link
              href="/"
              className="inline-block bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-bold px-6 py-3 rounded-xl text-sm"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
