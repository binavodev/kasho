import type { Metadata } from "next";

import { LegalNav } from "@/components/legal/LegalNav";
import { LegalPageFooter } from "@/components/legal/LegalPageFooter";
import { TerminosBody } from "@/components/legal/TerminosBody";

export const metadata: Metadata = {
  title: "Términos de Uso",
  description:
    "Términos de uso del servicio Kasho: condiciones de la cuenta, planes, garantía y ley aplicable en Colombia.",
  alternates: { canonical: "https://kashoai.com/terminos" },
  openGraph: {
    title: "Términos de Uso — Kasho",
    description:
      "Condiciones de uso de Kasho para negocios en Colombia.",
    locale: "es_CO",
    type: "website",
    url: "https://kashoai.com/terminos",
  },
  robots: { index: true, follow: true },
};

export default function TerminosPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-white text-kasho-black">
      <LegalNav />
      <main className="kasho-legal-container mx-auto max-w-[740px] px-4 pb-24 pt-12 sm:px-6 sm:pb-28 sm:pt-16">
        <TerminosBody />
      </main>
      <LegalPageFooter linkHref="/privacidad" linkLabel="Política de privacidad" />
    </div>
  );
}
