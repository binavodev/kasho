"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import { useWaitlist } from "@/contexts/waitlist-context";

export function Navbar(): React.ReactElement {
  const { openWaitlist } = useWaitlist();
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (value: number) => {
    setScrolled(value > 40);
  });

  // Arriba: transparente para que se vea el mismo fondo del hero (ruido + gradiente).
  // Al hacer scroll: barra blanca como antes.
  const backgroundColor = useTransform(
    scrollY,
    [0, 88],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.97)"],
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, 32, 88],
    ["blur(0px)", "blur(12px)", "blur(18px)"],
  );

  const linkColor = scrolled ? "text-kasho-black" : "text-white/90";
  const linkHover = "hover:text-kasho-green";
  const barColor = scrolled ? "bg-kasho-black" : "bg-white";

  return (
    <motion.nav
      className="fixed inset-x-0 top-0 z-[100] border-b border-transparent shadow-none transition-[box-shadow,border-color] duration-300 data-[scrolled=true]:border-kasho-gray-border/70 data-[scrolled=true]:shadow-[0_1px_0_rgba(0,0,0,0.07)]"
      data-scrolled={scrolled}
      style={{
        WebkitBackdropFilter: backdropBlur,
        backdropFilter: backdropBlur,
        backgroundColor,
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          className="font-heading text-[22px] font-extrabold tracking-tight text-kasho-green"
          href="/"
        >
          Kasho
        </Link>

        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          <Link
            className={`font-sans text-[15px] font-normal transition-colors duration-200 ${linkColor} ${linkHover}`}
            href="/#como-funciona"
          >
            Cómo funciona
          </Link>
          <Link
            className={`font-sans text-[15px] font-normal transition-colors duration-200 ${linkColor} ${linkHover}`}
            href="/precios"
          >
            Precios
          </Link>
          <Link
            className={`font-sans text-[15px] font-normal transition-colors duration-200 ${linkColor} ${linkHover}`}
            href="/blog"
          >
            Blog
          </Link>
          <button
            className="rounded-[10px] bg-kasho-green px-5 py-2.5 font-sans text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-kasho-green-dark"
            onClick={openWaitlist}
            type="button"
          >
            Unirse a la lista de espera
          </button>
        </div>

        <button
          aria-expanded={menuOpen}
          aria-label="Abrir menú"
          className="flex flex-col gap-1.5 p-2 md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <span className={`h-0.5 w-[22px] ${barColor}`} />
          <span className={`h-0.5 w-[22px] ${barColor}`} />
          <span className={`h-0.5 w-[22px] ${barColor}`} />
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-kasho-gray-border bg-white px-6 pb-6 pt-4 md:hidden">
          <Link
            className="block border-b border-kasho-gray-light py-3 font-sans text-base text-kasho-black no-underline"
            href="/#como-funciona"
            onClick={() => setMenuOpen(false)}
          >
            Cómo funciona
          </Link>
          <Link
            className="block border-b border-kasho-gray-light py-3 font-sans text-base text-kasho-black no-underline"
            href="/precios"
            onClick={() => setMenuOpen(false)}
          >
            Precios
          </Link>
          <Link
            className="block border-b border-kasho-gray-light py-3 font-sans text-base text-kasho-black no-underline"
            href="/blog"
            onClick={() => setMenuOpen(false)}
          >
            Blog
          </Link>
          <button
            className="mt-4 w-full rounded-[10px] bg-kasho-green py-3 text-center font-sans font-semibold text-white no-underline"
            onClick={() => {
              setMenuOpen(false);
              openWaitlist();
            }}
            type="button"
          >
            Unirse a la lista de espera
          </button>
        </div>
      ) : null}
    </motion.nav>
  );
}
