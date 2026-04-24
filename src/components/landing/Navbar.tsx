"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import { KashoLogo } from "@/components/brand/KashoLogo";
import { useWaitlist } from "@/contexts/waitlist-context";

export function Navbar(): React.ReactElement {
  const { openWaitlist } = useWaitlist();
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (value: number) => {
    setScrolled(value > 40);
  });

  const navLinks = [
    { href: "/#negocios", label: "Para tu negocio" },
    { href: "/#como-funciona", label: "Cómo funciona" },
    { href: "/precios", label: "Precios" },
    { href: "/blog", label: "Blog" },
    { href: "/vs/kommo", label: "Comparaciones" },
  ];

  return (
    <motion.nav
      animate={{
        backgroundColor: scrolled
          ? "rgba(13,13,13,0.88)"
          : "rgba(13,13,13,0)",
        borderColor: scrolled
          ? "rgba(255,255,255,0.07)"
          : "rgba(255,255,255,0)",
      }}
      className="fixed inset-x-0 top-0 z-[100] border-b transition-none"
      style={{
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
      }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <div className="relative mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <Link
          className="relative z-20 flex shrink-0 items-center"
          href="/"
        >
          <KashoLogo background="dark" height={30} priority />
        </Link>

        <div className="pointer-events-none absolute inset-0 z-10 hidden items-center justify-center md:flex">
          <nav
            aria-label="Principal"
            className="pointer-events-auto flex items-center gap-6 lg:gap-7"
          >
            {navLinks.map(({ href, label }) => (
              <Link
                className="font-sans text-[14px] font-medium text-[#666] transition-colors duration-200 hover:text-white"
                href={href}
                key={href}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="relative z-20 ml-auto flex shrink-0 items-center">
          <button
            className="hidden items-center gap-1.5 rounded-[10px] bg-kasho-green px-5 py-2.5 font-sans text-[14px] font-bold text-kasho-black transition-all duration-200 hover:scale-[1.02] hover:bg-kasho-green-dark hover:shadow-[0_8px_24px_rgba(0,196,140,0.3)] md:inline-flex"
            onClick={openWaitlist}
            type="button"
          >
            Empezar →
          </button>
          <button
            aria-expanded={menuOpen}
            aria-label="Abrir menú"
            className="flex flex-col gap-1.5 p-2 md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            <span className="h-0.5 w-[22px] bg-white" />
            <span className="h-0.5 w-[22px] bg-white" />
            <span className="h-0.5 w-[22px] bg-white" />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-white/[0.07] bg-[#111] px-6 pb-6 pt-4 md:hidden">
          {navLinks.map(({ href, label }) => (
            <Link
              className="block border-b border-white/[0.06] py-3 font-sans text-[15px] text-[#888] transition-colors hover:text-white"
              href={href}
              key={href}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <button
            className="mt-4 w-full rounded-[10px] bg-kasho-green py-3 font-sans font-bold text-kasho-black"
            onClick={() => {
              setMenuOpen(false);
              openWaitlist();
            }}
            type="button"
          >
            Empezar →
          </button>
        </div>
      ) : null}
    </motion.nav>
  );
}
