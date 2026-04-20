"use client";

import Link from "next/link";
import { useEffect } from "react";

import { KashoLogo } from "@/components/brand/KashoLogo";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps): React.ReactElement {
  useEffect(() => {
    // Aquí se puede integrar Sentry u otro servicio de error tracking
    console.error("[Kasho] Unhandled error:", error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white px-4">
      <div className="text-center max-w-lg">
        <Link className="mb-10 inline-flex justify-center" href="/">
          <KashoLogo background="dark" height={36} priority />
        </Link>
        <p className="text-red-400 font-semibold text-sm tracking-widest uppercase mb-4">
          Error inesperado
        </p>
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">
          Algo salió mal
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          Ocurrió un error inesperado. Nuestro equipo ya fue notificado.
          Intenta de nuevo o vuelve al inicio.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-kasho-green hover:bg-kasho-green-dark transition-colors text-white font-bold px-8 py-4 rounded-xl text-base"
          >
            Intentar de nuevo
          </button>
          <a
            href="/"
            className="border border-white/20 hover:border-white/40 transition-colors text-gray-300 font-semibold px-8 py-4 rounded-xl text-base"
          >
            Ir al inicio
          </a>
        </div>
      </div>
    </main>
  );
}
