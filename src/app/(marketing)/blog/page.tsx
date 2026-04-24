"use client";

import Link from "next/link";
import { useState } from "react";

import { Breadcrumb } from "@/components/ui/Breadcrumb";

type Category = "all" | "ventas" | "guia" | "caso" | "edu" | "comp";

type Post = {
  cat: Exclude<Category, "all">;
  date: string;
  excerpt: string;
  featured?: boolean;
  icon: string;
  readTime: string;
  title: string;
};

const TAG_STYLES: Record<Exclude<Category, "all">, string> = {
  caso: "bg-[rgba(100,100,255,.1)] text-[#8888ff]",
  comp: "bg-[rgba(200,200,200,.08)] text-[#888]",
  edu: "bg-[rgba(255,120,80,.1)] text-[#ff8860]",
  guia: "bg-[rgba(255,209,102,.1)] text-kasho-yellow",
  ventas: "bg-kasho-green/10 text-kasho-green",
};

const TAG_LABELS: Record<Exclude<Category, "all">, string> = {
  caso: "Casos de éxito",
  comp: "Comparaciones",
  edu: "Educación",
  guia: "Guías",
  ventas: "Ventas",
};

const FEATURED: Post = {
  cat: "ventas",
  date: "Abr 2026",
  excerpt:
    "Estudios muestran que quien responde en los primeros 5 minutos cierra 21 veces más ventas. Analizamos qué pasa minuto a minuto con cada lead que entra a tu WhatsApp y cuánto dinero real representa cada hora de demora.",
  featured: true,
  icon: "21x",
  readTime: "5 min",
  title:
    "El cliente que no contestaste ya compró en otro lado. Esta es la matemática.",
};

const POSTS: Post[] = [
  {
    cat: "guia",
    date: "Abr 2026",
    excerpt:
      "Cómo configurar respuestas automáticas que no suenen a bot. Guía paso a paso para negocios colombianos.",
    icon: "🤖",
    readTime: "4 min",
    title: "Cómo hacer que tu IA suene como tú (y no como un robot)",
  },
  {
    cat: "caso",
    date: "Mar 2026",
    excerpt:
      "Flawless Colombia pasó de perder el 60% de sus leads a recuperar $4.2M COP en el primer mes con Kasho.",
    icon: "🛍️",
    readTime: "3 min",
    title: "Caso: Flawless Colombia recupera $4.2M en leads perdidos",
  },
  {
    cat: "ventas",
    date: "Mar 2026",
    excerpt:
      "El seguimiento es la parte del proceso de ventas que más negocios ignoran. Aquí te explicamos por qué y cómo automatizarlo.",
    icon: "📊",
    readTime: "6 min",
    title: "La técnica de seguimiento que usa el 1% de los vendedores",
  },
  {
    cat: "edu",
    date: "Feb 2026",
    excerpt:
      "WhatsApp Business API vs la app gratuita: qué puedes y qué no puedes hacer con cada una.",
    icon: "📱",
    readTime: "5 min",
    title: "WhatsApp Business vs API: guía para PYMEs colombianas",
  },
  {
    cat: "comp",
    date: "Feb 2026",
    excerpt:
      "Comparamos los 4 principales CRMs de WhatsApp en LATAM para un negocio colombiano con 1-5 personas.",
    icon: "⚖️",
    readTime: "7 min",
    title: "Comparativa 2026: Kasho vs Kommo vs Treble vs Sirena",
  },
  {
    cat: "guia",
    date: "Ene 2026",
    excerpt:
      "Cómo estructurar tu catálogo de productos para que la IA lo entienda y responda correctamente a tus clientes.",
    icon: "📋",
    readTime: "4 min",
    title: "Cómo preparar tu catálogo para la IA en 30 minutos",
  },
];

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "ventas", label: "Ventas" },
  { id: "guia", label: "Guías" },
  { id: "caso", label: "Casos de éxito" },
  { id: "edu", label: "Educación" },
  { id: "comp", label: "Comparaciones" },
];

export default function BlogPage(): React.ReactElement {
  const [active, setActive] = useState<Category>("all");

  const filtered =
    active === "all" ? POSTS : POSTS.filter((p) => p.cat === active);

  return (
    <main className="relative min-h-screen overflow-hidden bg-kasho-black text-white">
      {/* Hero glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[700px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,196,140,.08), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ href: "/blog", label: "Blog" }]} />

        {/* Hero */}
        <div className="mt-6 mb-10 text-center">
          <span className="mb-3.5 inline-block font-sans text-[11px] font-bold uppercase tracking-[.12em] text-kasho-green">
            Recursos
          </span>
          <h1 className="font-heading text-[clamp(32px,5vw,60px)] font-extrabold leading-[1.1] tracking-[-1.5px]">
            Blog Kasho
          </h1>
          <p className="mx-auto mt-3.5 max-w-[520px] font-sans text-[clamp(15px,1.3vw,18px)] leading-[1.65] text-[#666]">
            Guías y estrategias para vender más por WhatsApp con IA — pensadas
            para PYMEs colombianas.
          </p>
        </div>

        {/* Category filter */}
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map(({ id, label }) => (
            <button
              className={`rounded-full border px-4 py-2 font-sans text-[13px] font-semibold transition-all duration-200 ${
                active === id
                  ? "border-kasho-green/30 bg-kasho-green/[0.09] text-kasho-green"
                  : "border-white/[0.07] bg-white/[0.03] text-[#555] hover:border-kasho-green/25 hover:text-[#999]"
              }`}
              key={id}
              onClick={() => setActive(id)}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Featured post */}
        {(active === "all" || active === "ventas") && (
          <article className="mb-12 grid cursor-pointer grid-cols-1 overflow-hidden rounded-[24px] border border-white/[0.07] transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-kasho-green/20 md:grid-cols-2" style={{ background: "linear-gradient(135deg,rgba(0,196,140,.05),rgba(0,196,140,.02))" }}>
            {/* Image col */}
            <div
              className="relative flex min-h-[260px] items-center justify-center overflow-hidden"
              style={{ background: "linear-gradient(135deg,#1a2e1a,#0a1a0a)" }}
            >
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center,rgba(0,196,140,.08),transparent 70%)",
                }}
              />
              <div className="relative z-[1] text-center">
                <div className="font-heading text-[80px] font-extrabold leading-none tracking-[-4px] text-kasho-green/[0.18]">
                  {FEATURED.icon}
                </div>
                <div className="mt-2 font-sans text-[12px] font-semibold uppercase tracking-[.1em] text-kasho-green/50">
                  más ventas · velocidad
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-col justify-center p-10">
              <div className="mb-4 flex items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-0.5 font-sans text-[11px] font-bold uppercase tracking-[.08em] ${TAG_STYLES.ventas}`}
                >
                  Ventas
                </span>
                <span className="font-sans text-[11px] text-[#333]">
                  Destacado
                </span>
              </div>
              <h2 className="mb-3 font-heading text-[clamp(20px,2vw,28px)] font-extrabold leading-[1.25] tracking-[-0.5px] text-white">
                {FEATURED.title}
              </h2>
              <p className="mb-6 font-sans text-[15px] leading-[1.7] text-[#666]">
                {FEATURED.excerpt}
              </p>
              <div className="flex items-center gap-4 font-sans text-[13px] text-[#444]">
                <span>{FEATURED.date}</span>
                <span className="h-[3px] w-[3px] rounded-full bg-[#333]" />
                <span>{FEATURED.readTime} de lectura</span>
                <span className="h-[3px] w-[3px] rounded-full bg-[#333]" />
                <span className="font-semibold text-kasho-green/60">
                  Kasho Editorial
                </span>
              </div>
            </div>
          </article>
        )}

        {/* Posts grid */}
        {filtered.length > 0 ? (
          <div className="mb-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <article
                className="flex cursor-pointer flex-col overflow-hidden rounded-[20px] border border-white/[0.07] bg-white/[0.03] transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-kasho-green/18"
                key={post.title}
              >
                {/* Card image */}
                <div
                  className="relative flex h-[140px] items-center justify-center overflow-hidden"
                  style={{ background: "linear-gradient(135deg,#111,#161616)" }}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 80%,rgba(0,196,140,.07),transparent 70%)",
                    }}
                  />
                  <div className="relative z-[1] flex h-12 w-12 items-center justify-center rounded-[14px] bg-kasho-green/[0.08] text-[24px]">
                    {post.icon}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 font-sans text-[11px] font-bold uppercase tracking-[.08em] ${TAG_STYLES[post.cat]}`}
                    >
                      {TAG_LABELS[post.cat]}
                    </span>
                  </div>
                  <h3 className="mb-2 font-heading text-[17px] font-bold leading-[1.35] tracking-[-0.3px] text-[#ddd]">
                    {post.title}
                  </h3>
                  <p className="mb-4 flex-1 font-sans text-[13px] leading-[1.65] text-[#555]">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-white/[0.04] pt-3.5 font-sans text-[12px]">
                    <span className="text-[#444]">
                      {post.date} · {post.readTime}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-kasho-green transition-[gap] duration-200 hover:gap-1.5">
                      Leer →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mb-16 py-16 text-center font-sans text-[14px] text-[#444]">
            No hay artículos en esta categoría aún.
          </div>
        )}

        {/* Newsletter */}
        <div
          className="mb-16 rounded-[24px] border border-white/[0.07] p-12 text-center"
          style={{
            background:
              "linear-gradient(135deg,rgba(26,26,46,.6),rgba(10,10,20,.8))",
          }}
        >
          <h2 className="font-heading text-[clamp(22px,2.5vw,32px)] font-extrabold tracking-[-0.8px]">
            Recibe nuevas guías cada semana
          </h2>
          <p className="mx-auto mt-2.5 max-w-[400px] font-sans text-[15px] text-[#666]">
            Sin spam. Solo estrategias útiles para vender más en WhatsApp.
          </p>
          <div className="mx-auto mt-7 flex max-w-[460px] flex-wrap gap-2.5">
            <input
              className="min-w-[200px] flex-1 rounded-[10px] border border-white/[0.07] bg-white/[0.05] px-4 py-3.5 font-sans text-[14px] text-white outline-none placeholder:text-[#3a3a3a] focus:border-kasho-green/30"
              placeholder="tu@email.com"
              type="email"
            />
            <button
              className="whitespace-nowrap rounded-[10px] bg-kasho-green px-6 py-3.5 font-sans text-[14px] font-bold text-kasho-black transition-all duration-200 hover:bg-kasho-green-dark hover:shadow-[0_8px_24px_rgba(0,196,140,.3)]"
              type="button"
            >
              Suscribirme
            </button>
          </div>
        </div>

        {/* Internal links */}
        <div className="border-t border-white/[0.05] pt-10 text-center">
          <p className="mb-4 font-sans text-[13px] text-[#333]">
            ¿Buscas Kasho para tu sector?
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {[
              { href: "/ventas-whatsapp/salud-estetica", label: "Salud y Estética" },
              { href: "/ventas-whatsapp/educacion-cursos", label: "Educación" },
              { href: "/ventas-whatsapp/inmobiliaria", label: "Inmobiliaria" },
              { href: "/ventas-whatsapp/agencias-viaje", label: "Agencias de Viaje" },
              { href: "/vs/kommo", label: "Kasho vs Kommo" },
              { href: "/vs/treble", label: "Kasho vs Treble" },
            ].map(({ href, label }) => (
              <Link
                className="rounded-full border border-kasho-green/15 px-3.5 py-1.5 font-sans text-[13px] text-kasho-green/70 transition-all duration-200 hover:border-kasho-green/35 hover:text-kasho-green"
                href={href}
                key={href}
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
