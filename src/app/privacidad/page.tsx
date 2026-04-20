import type { Metadata } from "next";

import { LegalNav } from "@/components/legal/LegalNav";
import { LegalPageFooter } from "@/components/legal/LegalPageFooter";
import { PrivacidadBody } from "@/components/legal/PrivacidadBody";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de privacidad de Kasho: tratamiento de datos personales, derechos del titular y contacto según la Ley 1581 de Colombia.",
  alternates: { canonical: "https://kashoai.com/privacidad" },
  openGraph: {
    title: "Política de Privacidad — Kasho",
    description:
      "Cómo Kasho trata tus datos personales y cómo ejercer tus derechos en Colombia.",
    locale: "es_CO",
    type: "website",
    url: "https://kashoai.com/privacidad",
  },
  robots: { index: true, follow: true },
};

export default function PrivacidadPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-white text-kasho-black">
      <LegalNav />
      <main className="kasho-legal-container mx-auto max-w-[740px] px-4 pb-24 pt-12 sm:px-6 sm:pb-28 sm:pt-16">
        <PrivacidadBody />
      </main>
      <LegalPageFooter linkHref="/terminos" linkLabel="Términos de uso" />
    </div>
  );
}
