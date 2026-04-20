import type { Metadata } from "next";
import Link from "next/link";

import { KashoLogo } from "@/components/brand/KashoLogo";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "La página que buscas no existe. Vuelve al inicio de Kasho.",
  robots: { index: false, follow: false },
};

export default function NotFound(): React.ReactElement {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white px-4">
      <div className="text-center max-w-lg">
        <Link className="mb-10 inline-flex justify-center" href="/">
          <KashoLogo background="dark" height={36} priority />
        </Link>
        <p className="text-kasho-green font-semibold text-sm tracking-widest uppercase mb-4">
          Error 404
        </p>
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">
          Página no encontrada
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          Este link ya no existe o nunca existió. No pierdas más tiempo
          buscando — vuelve y empieza a recuperar tus leads.
        </p>
        <Link
          href="/"
          className="inline-block bg-kasho-green font-bold text-kasho-black transition-colors hover:bg-kasho-green-dark px-8 py-4 rounded-xl text-base"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
