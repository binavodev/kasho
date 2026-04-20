import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";

import { dmSans, plusJakartaSans } from "@/lib/fonts";
import "./globals.css";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const SITE_URL = "https://kashoai.com";

// Esquema JSON-LD completo para Kasho
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Kasho",
      url: SITE_URL,
      email: "hola@kashoai.com",
      areaServed: {
        "@type": "Country",
        name: "Colombia",
      },
      sameAs: [
        "https://www.linkedin.com/company/kashoai",
        "https://www.instagram.com/kashoai",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Kasho",
      url: SITE_URL,
      inLanguage: "es-CO",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#app`,
      name: "Kasho",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, WhatsApp",
      inLanguage: "es-CO",
      url: SITE_URL,
      description:
        "Motor de ventas conversacional con IA para PYMEs en Colombia. Responde leads en WhatsApp en menos de 2 segundos, recupera leads fríos automáticamente y muestra cuánta plata recuperó el negocio en COP.",
      offers: [
        {
          "@type": "Offer",
          name: "Starter",
          price: 199000,
          priceCurrency: "COP",
          description:
            "1 número WhatsApp, hasta 500 conversaciones al mes, AI 24/7, transcripción de audios, panel básico.",
          url: `${SITE_URL}/precios`,
        },
        {
          "@type": "Offer",
          name: "Pro",
          price: 349000,
          priceCurrency: "COP",
          description:
            "Conversaciones ilimitadas, recovery automático de leads, panel completo, link de pago Wompi/Nequi, reporte semanal por WhatsApp.",
          url: `${SITE_URL}/precios`,
        },
        {
          "@type": "Offer",
          name: "Equipo",
          price: 599000,
          priceCurrency: "COP",
          description:
            "3 números WhatsApp, multi-agente, todo del plan Pro más reportes avanzados y soporte prioritario.",
          url: `${SITE_URL}/precios`,
        },
      ],
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Kasho cumple con la política de Meta 2026?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sí. Desde el 15 de enero de 2026, Meta prohibió los chatbots de IA de propósito general en WhatsApp Business API. Kasho opera como un bot anciliar de ventas para negocios específicos —soporte al cliente, seguimiento de leads y cierre de ventas— lo cual está explícitamente permitido por la política de Meta. Cada cuenta de Kasho está vinculada a un negocio concreto con su catálogo y contexto propio.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuánto cuesta Kasho en pesos colombianos?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Kasho tiene tres planes en COP: Starter a $199.000 COP/mes (1 número, hasta 500 conversaciones), Pro a $349.000 COP/mes (el más elegido — conversaciones ilimitadas, recovery automático, pagos Wompi/Nequi), y Equipo a $599.000 COP/mes (3 números, multi-agente). Sin contratos. Cancela cuando quieras. El ROI promedio del plan Pro es 17x el costo mensual.",
          },
        },
        {
          "@type": "Question",
          name: "¿Kasho funciona con Nequi y Daviplata?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sí. Kasho integra Wompi (del Grupo Bancolombia) para generar links de pago directamente en la conversación de WhatsApp. Acepta Nequi, Daviplata, PSE, tarjetas de crédito y débito, Bancolombia y corresponsales bancarios. El cliente paga sin salir de WhatsApp y el vendedor recibe la confirmación automáticamente.",
          },
        },
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    apple: [{ sizes: "180x180", type: "image/svg+xml", url: "/icons/kasho-icon.svg" }],
    icon: [
      { sizes: "any", type: "image/svg+xml", url: "/icons/kasho-favicon.svg" },
    ],
    shortcut: "/icons/kasho-favicon.svg",
  },
  title: {
    default: "Kasho — Motor de ventas con IA para WhatsApp | Colombia",
    template: "%s | Kasho",
  },
  description:
    "Kasho responde tus leads en WhatsApp en menos de 2 segundos, recupera leads fríos automáticamente y te muestra cuánta plata recuperaste esta semana. Desde $199.000 COP/mes.",
  keywords: [
    "ventas whatsapp colombia",
    "ia para vendedores",
    "recuperar leads whatsapp",
    "chatbot ventas colombia",
    "automatizacion ventas colombia",
    "motor ventas whatsapp",
    "Kasho",
    "kashoai",
  ],
  alternates: {
    canonical: SITE_URL,
    languages: {
      "es-CO": SITE_URL,
    },
  },
  openGraph: {
    title: "Kasho — Motor de ventas con IA para WhatsApp | Colombia",
    description:
      "Kasho responde tus leads en WhatsApp en menos de 2 segundos, recupera leads fríos automáticamente y te muestra cuánta plata recuperaste esta semana. Desde $199.000 COP/mes.",
    url: SITE_URL,
    siteName: "Kasho",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og?monto=3.800.000&plan=Pro`,
        width: 1200,
        height: 630,
        alt: "Kasho — Esta semana recuperaste $3.800.000 en leads que ibas a perder.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kasho — Motor de ventas con IA para WhatsApp | Colombia",
    description:
      "Kasho responde tus leads en WhatsApp en menos de 2 segundos y te muestra cuánta plata recuperaste. Desde $199.000 COP/mes.",
    images: [`${SITE_URL}/og?monto=3.800.000&plan=Pro`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${plusJakartaSans.variable} ${dmSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Esquema JSON-LD global — Organization + SoftwareApplication + FAQPage */}
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          type="application/ld+json"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
