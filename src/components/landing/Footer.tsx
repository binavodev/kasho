"use client";

import Link from "next/link";

import { KashoLogo } from "@/components/brand/KashoLogo";
import { useWaitlist } from "@/contexts/waitlist-context";

const productLinks: { href: string; label: string }[] = [
  { href: "/#como-funciona", label: "Cómo funciona" },
  { href: "/precios", label: "Precios" },
  { href: "/blog", label: "Blog" },
];

const sectorLinks: { href: string; label: string }[] = [
  { href: "/ventas-whatsapp/salud-estetica", label: "Salud y estética" },
  { href: "/ventas-whatsapp/educacion-cursos", label: "Educación y cursos" },
  { href: "/ventas-whatsapp/inmobiliaria", label: "Inmobiliaria" },
  { href: "/ventas-whatsapp/agencias-viaje", label: "Agencias de viaje" },
  { href: "/ventas-whatsapp/talleres-premium", label: "Talleres premium" },
];

const cityLinks: { href: string; label: string }[] = [
  { href: "/colombia/bogota", label: "Bogotá" },
  { href: "/colombia/medellin", label: "Medellín" },
  { href: "/colombia/cali", label: "Cali" },
  { href: "/colombia/barranquilla", label: "Barranquilla" },
];

const compareLinks: { href: string; label: string }[] = [
  { href: "/vs/kommo", label: "Kasho vs Kommo" },
  { href: "/vs/treble", label: "Kasho vs Treble" },
  { href: "/vs/sirena", label: "Kasho vs Sirena" },
  { href: "/vs/leadsales", label: "Kasho vs Leadsales" },
];

const legalLinks: { href: string; label: string }[] = [
  { href: "/terminos", label: "Términos de uso" },
  { href: "/privacidad", label: "Política de privacidad" },
];

const linkMuted =
  "mb-3 block font-sans text-sm text-neutral-400 transition-colors duration-200 hover:text-kasho-green";
const headingMuted =
  "mb-5 font-heading text-[13px] font-bold uppercase tracking-widest text-neutral-300";

export function Footer(): React.ReactElement {
  const { openWaitlist } = useWaitlist();

  return (
    <footer className="bg-kasho-black px-4 py-16 pb-8 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link className="mb-4 inline-flex" href="/">
              <KashoLogo background="dark" height={34} />
            </Link>
            <p className="mb-5 max-w-sm font-sans text-sm leading-relaxed text-neutral-400">
              Tu asistente de ventas en WhatsApp. Responde, hace seguimiento y
              te muestra los resultados.
            </p>
            <a
              className="font-sans text-sm text-kasho-green no-underline hover:underline"
              href="mailto:hola@kashoai.com"
            >
              hola@kashoai.com
            </a>
          </div>
          <div>
            <div className={headingMuted}>Producto</div>
            {productLinks.map((link) => (
              <Link className={linkMuted} href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
            <button
              className="mt-1 block w-full text-left font-sans text-sm font-semibold text-kasho-green transition-colors duration-200 hover:text-white"
              onClick={openWaitlist}
              type="button"
            >
              Unirse a la lista de espera →
            </button>
          </div>
          <div>
            <div className={headingMuted}>Ventas WhatsApp</div>
            {sectorLinks.map((link) => (
              <Link className={linkMuted} href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
          <div>
            <div className={headingMuted}>Colombia</div>
            {cityLinks.map((link) => (
              <Link className={linkMuted} href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
          <div>
            <div className={headingMuted}>Comparativas</div>
            {compareLinks.map((link) => (
              <Link className={linkMuted} href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
            <div className="mt-6 mb-5 font-heading text-[13px] font-bold uppercase tracking-widest text-neutral-300">
              Legal
            </div>
            {legalLinks.map((link) => (
              <Link className={linkMuted} href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-7">
          <span className="font-sans text-[13px] text-neutral-500">
            © 2026 Kasho. Colombia.
          </span>
          <span className="font-sans text-[13px] text-neutral-400">
            kashoai.com
          </span>
        </div>
      </div>
    </footer>
  );
}
