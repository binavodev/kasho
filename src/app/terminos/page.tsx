import type { Metadata } from "next";

import { LegalMain } from "@/components/legal/LegalMain";
import { LegalNav } from "@/components/legal/LegalNav";
import { LegalPageFooter } from "@/components/legal/LegalPageFooter";
import { LegalSubnav } from "@/components/legal/LegalSubnav";
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
    <div className="kasho-legal-page relative min-h-screen overflow-x-hidden text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[min(100%,600px)] -translate-x-1/2 opacity-[0.08]"
        style={{
          background:
            "radial-gradient(ellipse at center, #00c48c 0%, transparent 70%)",
        }}
      />
      <LegalNav />
      <LegalSubnav current="terminos" />
      <LegalMain className="kasho-legal-container relative z-10 mx-auto max-w-[740px] px-4 pb-24 pt-8 sm:px-6 sm:pb-28 sm:pt-12">
        <TerminosBody />
      </LegalMain>
      <LegalPageFooter />
    </div>
  );
}
