import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const revalidate = 2592000; // 30 días

type Fila = { feature: string; kasho: string; rival: string };

type ScoreItem = { kasho: number; label: string; rival: number };

type Competidor = {
  descripcion: string;
  nombre: string;
  precioKasho: string;
  precioRival: string;
  scores: ScoreItem[];
  slug: string;
  tabla: Fila[];
  taglineKasho: string;
  taglineRival: string;
  veredicto: string;
  verdictBadges: string[];
};

const COMPETIDORES: Record<string, Competidor> = {
  kommo: {
    descripcion:
      "Kommo (ex amoCRM) es un CRM conversacional popular en LATAM. Pero sus planes arrancan en USD 15/usuario/mes, requieren configuración técnica y no tienen IA generativa nativa para WhatsApp. Kasho es 100% en COP, se configura en 10 minutos y viene con IA lista.",
    nombre: "Kommo",
    precioKasho: "Desde $199.000 COP/mes",
    precioRival: "Desde ~$60.000 COP/usuario/mes",
    scores: [
      { kasho: 95, label: "Facilidad de uso", rival: 45 },
      { kasho: 98, label: "IA conversacional nativa", rival: 30 },
      { kasho: 90, label: "Precio para PYMEs Colombia", rival: 40 },
      { kasho: 92, label: "Integración de pagos CO", rival: 15 },
    ],
    slug: "kommo",
    tabla: [
      { feature: "Precio base", kasho: "$199.000 COP/mes", rival: "~$60.000 COP/usuario/mes" },
      { feature: "Configuración", kasho: "10 minutos, sin código", rival: "Días, requiere técnico" },
      { feature: "IA generativa en WhatsApp", kasho: "Incluida", rival: "No incluida (add-on)" },
      { feature: "Recovery automático de leads", kasho: "Sí, automático", rival: "Manual" },
      { feature: "Pagos Nequi / Wompi", kasho: "Integrado", rival: "No integrado" },
      { feature: "Soporte en Colombia", kasho: "Sí, horario COP", rival: "Global, inglés" },
    ],
    taglineKasho: "IA lista, precios en COP, sin configuración técnica.",
    taglineRival: "CRM potente, pero para enterprise. Sin IA nativa y en USD.",
    veredicto:
      "Kommo es una herramienta sólida para equipos de ventas enterprise con presupuesto en USD. Para una PYME colombiana de 1-5 personas, el costo total (configuración + mensual en USD) puede ser 4-5x más alto que Kasho. Además, la IA de Kommo no está integrada — es un add-on que requiere configuración técnica. **Kasho gana en precio, velocidad de implementación e IA nativa.**",
    verdictBadges: [
      "Precios en COP, sin markup de dólar",
      "IA lista en 10 minutos",
      "Recovery automático incluido",
      "Pagos Wompi y Nequi nativos",
    ],
  },
  leadsales: {
    descripcion:
      "Leadsales es un CRM de WhatsApp orientado a pequeños equipos en México y Colombia. Kasho va más allá siendo un motor de ventas con IA que responde, hace seguimiento y genera reportes de plata recuperada — sin que el vendedor tenga que hacer nada manualmente.",
    nombre: "Leadsales",
    precioKasho: "Desde $199.000 COP/mes",
    precioRival: "Desde USD 83/mes",
    scores: [
      { kasho: 95, label: "Automatización de ventas", rival: 40 },
      { kasho: 98, label: "IA responde automáticamente", rival: 10 },
      { kasho: 90, label: "Precio para PYMEs Colombia", rival: 35 },
      { kasho: 88, label: "Reportes de ingresos", rival: 30 },
    ],
    slug: "leadsales",
    tabla: [
      { feature: "Precio base", kasho: "$199.000 COP/mes", rival: "Desde USD 83/mes" },
      { feature: "IA responde automáticamente", kasho: "Sí, 24/7", rival: "No (solo CRM)" },
      { feature: "Recovery de leads frío", kasho: "Automático", rival: "Manual" },
      { feature: "Reporte semanal de ingresos", kasho: "Sí, por WhatsApp", rival: "No" },
      { feature: "Pagos integrados", kasho: "Wompi / Nequi", rival: "No" },
      { feature: "Onboarding", kasho: "10 min, sin técnico", rival: "Requiere configuración" },
    ],
    taglineKasho: "Motor de ventas con IA que responde, sigue y reporta.",
    taglineRival: "CRM básico para equipos pequeños. Sin IA, sin recovery.",
    veredicto:
      "Leadsales es un CRM sencillo útil para organizar conversaciones, pero no automatiza nada: el vendedor sigue teniendo que responder manualmente, hacer seguimiento manualmente y calcular resultados a mano. **Kasho reemplaza al vendedor en las tareas repetitivas** — respuesta inicial, seguimiento y reporte semanal — liberando tiempo para cerrar los negocios que ya están listos.",
    verdictBadges: [
      "IA responde en 2 segundos 24/7",
      "Follow-up automático a leads fríos",
      "Reporte de plata recuperada semanal",
      "Sin configuración técnica",
    ],
  },
  sirena: {
    descripcion:
      "Sirena es una herramienta de WhatsApp para equipos de ventas con foco en Argentina y México. Kasho está construido para el mercado colombiano con integración de pagos locales (Wompi, Nequi) y soporte en horario colombiano.",
    nombre: "Sirena",
    precioKasho: "Desde $199.000 COP/mes",
    precioRival: "Desde USD 39/mes",
    scores: [
      { kasho: 95, label: "Mercado colombiano", rival: 40 },
      { kasho: 98, label: "IA generativa WhatsApp", rival: 35 },
      { kasho: 90, label: "Precio mensual en COP", rival: 45 },
      { kasho: 92, label: "Pagos locales Colombia", rival: 5 },
    ],
    slug: "sirena",
    tabla: [
      { feature: "Precio base", kasho: "$199.000 COP/mes", rival: "Desde USD 39/mes" },
      { feature: "Mercado principal", kasho: "Colombia", rival: "Argentina / México" },
      { feature: "IA generativa", kasho: "Sí, GPT-4o", rival: "Básica" },
      { feature: "Pagos Colombia (Nequi/PSE)", kasho: "Integrado", rival: "No" },
      { feature: "Recovery automático de leads", kasho: "Sí", rival: "No" },
      { feature: "Soporte en Colombia", kasho: "Sí", rival: "No (ARG/MX timezone)" },
    ],
    taglineKasho: "100% construido para el mercado colombiano.",
    taglineRival: "Bueno para ARG/MX, pero no localizado para Colombia.",
    veredicto:
      "Sirena es funcional para equipos de ventas en Argentina y México, pero no está localizado para Colombia: no tiene pagos Nequi/Wompi, el soporte opera en otra zona horaria y el precio en USD puede triplicarse si la tasa de cambio sube. **Kasho está construido de cero para Colombia** — precios en COP, pagos locales y IA con contexto del mercado colombiano.",
    verdictBadges: [
      "Construido para Colombia",
      "Pagos Nequi, Wompi y PSE",
      "Soporte en horario COP",
      "IA con contexto local",
    ],
  },
  treble: {
    descripcion:
      "Treble es una plataforma de WhatsApp marketing para equipos de ventas enterprise. Sus precios están en USD y están orientados a empresas grandes. Kasho está diseñado específicamente para PYMEs colombianas, con precios en COP y sin contratos anuales.",
    nombre: "Treble",
    precioKasho: "Desde $199.000 COP/mes",
    precioRival: "Desde USD 300/mes",
    scores: [
      { kasho: 92, label: "Precio para PYMEs", rival: 15 },
      { kasho: 95, label: "Facilidad de implementación", rival: 30 },
      { kasho: 98, label: "IA conversacional nativa", rival: 45 },
      { kasho: 90, label: "Sin contrato anual", rival: 10 },
    ],
    slug: "treble",
    tabla: [
      { feature: "Precio base", kasho: "$199.000 COP/mes", rival: "Desde USD 300/mes" },
      { feature: "Contrato mínimo", kasho: "Mes a mes", rival: "Anual" },
      { feature: "IA conversacional", kasho: "Incluida", rival: "Configurable (técnico)" },
      { feature: "Recovery automático", kasho: "Sí", rival: "No nativo" },
      { feature: "Pagos integrados Colombia", kasho: "Sí (Wompi/Nequi)", rival: "No" },
      { feature: "Orientado a PYMEs", kasho: "Sí, 100%", rival: "No (enterprise)" },
    ],
    taglineKasho: "Mes a mes, para PYMEs, con IA incluida desde el día 1.",
    taglineRival: "Enterprise. USD 300+/mes con contrato anual.",
    veredicto:
      "Treble está diseñado para grandes empresas con equipos de marketing que pueden invertir USD 300+ al mes con contratos anuales. Para una PYME colombiana, eso representa más de $1.2M COP mensuales — sin garantía de ROI en los primeros meses. **Kasho ofrece el 80% de las funcionalidades de Treble a una fracción del precio**, sin contratos, y con onboarding en 10 minutos.",
    verdictBadges: [
      "Sin contratos anuales",
      "Precio 15x menor que Treble",
      "Onboarding en 10 minutos",
      "IA incluida sin configuración",
    ],
  },
};

export function generateStaticParams(): { competidor: string }[] {
  return Object.keys(COMPETIDORES).map((competidor) => ({ competidor }));
}

type Props = {
  params: Promise<{ competidor: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { competidor } = await params;
  const data = COMPETIDORES[competidor];
  if (!data) return {};

  const title = `Kasho vs ${data.nombre} — Comparación para PYMEs en Colombia`;
  const description = data.descripcion.slice(0, 155);
  const canonical = `https://kashoai.com/vs/${competidor}`;

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

export default async function CompetidorPage({ params }: Props): Promise<React.ReactElement> {
  const { competidor } = await params;
  const data = COMPETIDORES[competidor];
  if (!data) notFound();

  const others = Object.values(COMPETIDORES).filter((c) => c.slug !== competidor);

  return (
    <main className="relative min-h-screen bg-kasho-black text-white overflow-hidden">
      {/* Hero glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[700px] -translate-x-1/2"
        style={{ background: "radial-gradient(ellipse at center,rgba(0,196,140,.08),transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-6 pb-20">
        <Breadcrumb
          items={[
            { label: `Kasho vs ${data.nombre}`, href: `/vs/${competidor}` },
          ]}
        />

        {/* Header */}
        <div className="mt-6 mb-12">
          <span className="mb-3.5 inline-block font-sans text-[11px] font-bold uppercase tracking-[.12em] text-kasho-green">
            Comparación directa
          </span>
          <h1 className="font-heading text-[clamp(32px,5vw,60px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-3.5">
            Kasho vs {data.nombre}
          </h1>
          <p className="font-sans text-[clamp(15px,1.3vw,18px)] leading-[1.65] text-[#666] max-w-[660px]">
            {data.descripcion}
          </p>
        </div>

        {/* Competitor tabs */}
        <div className="mb-12 flex flex-wrap gap-2">
          {Object.values(COMPETIDORES).map((c) => (
            <Link
              className={`flex items-center gap-2 rounded-xl border px-5 py-2.5 font-sans text-[14px] font-semibold transition-all duration-200 ${
                c.slug === competidor
                  ? "border-kasho-green/30 bg-kasho-green/[0.09] text-kasho-green"
                  : "border-white/[0.07] bg-white/[0.03] text-[#555] hover:border-kasho-green/25 hover:text-[#999]"
              }`}
              href={`/vs/${c.slug}`}
              key={c.slug}
            >
              Kasho vs{" "}
              <span
                className={`rounded-[6px] px-1.5 py-0.5 font-sans text-[12px] font-medium ${
                  c.slug === competidor
                    ? "bg-kasho-green/[0.08] text-kasho-green/60"
                    : "bg-white/[0.05] text-[#555]"
                }`}
              >
                {c.nombre}
              </span>
            </Link>
          ))}
        </div>

        {/* Panel header: 2-col pricing cards */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-[20px] border border-kasho-green/12 bg-kasho-green/[0.04] p-7">
            <div className="mb-2.5 font-sans text-[11px] font-bold uppercase tracking-[.1em] text-kasho-green">
              Kasho
            </div>
            <div className="font-heading text-[36px] font-extrabold tracking-[-1.5px] text-white mb-1">
              {data.precioKasho}
            </div>
            <div className="font-sans text-[15px] leading-[1.65] text-[#777]">
              {data.taglineKasho}
            </div>
          </div>
          <div className="rounded-[20px] border border-white/[0.05] bg-white/[0.02] p-7">
            <div className="mb-2.5 font-sans text-[11px] font-bold uppercase tracking-[.1em] text-[#444]">
              {data.nombre}
            </div>
            <div className="font-heading text-[36px] font-extrabold tracking-[-1.5px] text-[#555] mb-1">
              {data.precioRival}
            </div>
            <div className="font-sans text-[15px] leading-[1.65] text-[#444]">
              {data.taglineRival}
            </div>
          </div>
        </div>

        {/* Verdict badges */}
        <div className="mb-12 flex flex-wrap gap-3">
          {data.verdictBadges.map((badge) => (
            <div
              className="flex items-center gap-2 rounded-xl border border-kasho-green/12 bg-kasho-green/[0.06] px-4 py-2.5 font-sans text-[13px] font-semibold text-kasho-green/80"
              key={badge}
            >
              <svg fill="none" height={14} viewBox="0 0 14 14" width={14}>
                <polyline
                  points="2 7 5.5 10.5 12 3"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              {badge}
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="mb-12 overflow-x-auto rounded-[18px] border border-white/[0.07]">
          <table className="w-full min-w-[520px] border-collapse">
            <thead>
              <tr className="border-b border-white/[0.07] bg-white/[0.02]">
                <th className="px-5 py-3.5 text-left font-heading text-[12px] font-bold uppercase tracking-[.06em] text-[#444]">
                  Característica
                </th>
                <th className="px-5 py-3.5 text-left font-heading text-[12px] font-bold uppercase tracking-[.06em] text-kasho-green">
                  Kasho
                </th>
                <th className="px-5 py-3.5 text-left font-heading text-[12px] font-bold uppercase tracking-[.06em] text-[#444]">
                  {data.nombre}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.tabla.map((fila) => (
                <tr
                  className="border-b border-white/[0.04] transition-colors hover:bg-white/[0.01]"
                  key={fila.feature}
                >
                  <td className="px-5 py-3.5 font-sans text-[13px] text-[#555]">
                    {fila.feature}
                  </td>
                  <td className="px-5 py-3.5 font-sans text-[14px] font-medium text-white">
                    {fila.kasho}
                  </td>
                  <td className="px-5 py-3.5 font-sans text-[14px] text-[#333]">
                    {fila.rival}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Score bars */}
        <div className="mb-12">
          <h3 className="mb-6 font-heading text-[18px] font-bold tracking-[-0.3px]">
            Comparación por dimensión
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {data.scores.map((score) => (
              <div
                className="rounded-[14px] border border-white/[0.07] bg-white/[0.03] p-5"
                key={score.label}
              >
                <div className="mb-3 font-sans text-[13px] font-medium text-[#666]">
                  {score.label}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-[52px] flex-shrink-0 font-sans text-[12px] font-semibold text-kasho-green">
                      Kasho
                    </span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.05]">
                      <div
                        className="h-full rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg,#007a5c,#00c48c)",
                          width: `${score.kasho}%`,
                        }}
                      />
                    </div>
                    <span className="w-7 flex-shrink-0 text-right font-heading text-[12px] font-bold text-kasho-green">
                      {score.kasho}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-[52px] flex-shrink-0 font-sans text-[12px] font-semibold text-[#3a3a3a]">
                      {data.nombre}
                    </span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.05]">
                      <div
                        className="h-full rounded-full bg-[#2a2a2a]"
                        style={{ width: `${score.rival}%` }}
                      />
                    </div>
                    <span className="w-7 flex-shrink-0 text-right font-heading text-[12px] font-bold text-[#333]">
                      {score.rival}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verdict narrative */}
        <div
          className="mb-12 rounded-[20px] border border-kasho-green/10 p-9"
          style={{
            background:
              "linear-gradient(135deg,rgba(0,196,140,.04),rgba(0,196,140,.02))",
          }}
        >
          <h3 className="mb-3 font-heading text-[20px] font-extrabold tracking-[-0.5px]">
            Veredicto: Kasho vs {data.nombre}
          </h3>
          <p className="font-sans text-[15px] leading-[1.75] text-[#666]">
            {data.veredicto.split("**").map((part, i) =>
              i % 2 === 1 ? (
                <strong className="font-semibold text-[#ccc]" key={i}>
                  {part}
                </strong>
              ) : (
                part
              ),
            )}
          </p>
        </div>

        {/* CTAs */}
        <div className="mb-16 flex flex-wrap gap-3.5">
          <a
            className="inline-flex items-center gap-2 rounded-xl bg-kasho-green px-7 py-3.5 font-sans text-[15px] font-bold text-kasho-black transition-all duration-300 hover:bg-kasho-green-dark hover:shadow-[0_10px_28px_rgba(0,196,140,.35)]"
            href="https://app.kashoai.com/registro"
          >
            Prueba Kasho gratis 14 días
          </a>
          <Link
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.13] px-7 py-3.5 font-sans text-[15px] font-medium text-white/60 transition-all duration-300 hover:border-kasho-green/40 hover:text-kasho-green"
            href="/precios"
          >
            Ver planes y precios
          </Link>
        </div>

        {/* Other comparisons */}
        <div className="border-t border-white/[0.05] pt-10">
          <p className="mb-4 font-sans text-[13px] text-[#333]">
            Otras comparaciones
          </p>
          <div className="flex flex-wrap gap-2.5">
            {others.map((c) => (
              <Link
                className="rounded-full border border-kasho-green/15 px-3.5 py-1.5 font-sans text-[13px] font-semibold text-kasho-green/65 transition-all duration-200 hover:border-kasho-green/35 hover:text-kasho-green"
                href={`/vs/${c.slug}`}
                key={c.slug}
              >
                Kasho vs {c.nombre}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
