"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import { KASHO_EASE } from "@/lib/motion";

gsap.registerPlugin(useGSAP);

const NOISE_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`;

function formatCop(value: number): string {
  return `$${value.toLocaleString("es-CO")}`;
}

function DashboardMockup(): React.ReactElement {
  // Iniciar con el valor real para que el HTML SSR muestre el número (LCP)
  const [displayCount, setDisplayCount] = useState(3_800_000);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reduceMotion) {
        setDisplayCount(3_800_000);
        return;
      }
      const target = { value: 0 };
      const tween = gsap.to(target, {
        value: 3_800_000,
        duration: 2.2,
        delay: 0.8,
        ease: "power3.out",
        onUpdate: () => {
          setDisplayCount(Math.round(target.value));
        },
      });
      return () => {
        tween.kill();
      };
    },
    { dependencies: [reduceMotion], revertOnUpdate: true },
  );

  const chartPoints = [30, 45, 38, 60, 52, 75, 68, 90, 82, 100]
    .map((v, i) => `${i * 44},${120 - v}`)
    .join(" ");

  return (
    <div className="relative w-full max-w-[380px] overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-kasho-navy to-[#0f0f1e] p-6 pb-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_32px_64px_rgba(0,0,0,0.6)]">
      <div className="pointer-events-none absolute -right-10 -top-10 h-[120px] w-[120px] rounded-full bg-kasho-green/12 blur-[32px]" />

      <div className="mb-6 flex items-center justify-between">
        <span className="font-sans text-[13px] font-medium text-[#666]">
          Esta semana
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-kasho-green/12 px-2.5 py-1 font-sans text-xs text-kasho-green">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-kasho-green [animation:kasho-pulse_1.5s_ease-in-out_infinite]" />
          En vivo
        </span>
      </div>

      <div className="mb-1">
        <span className="relative inline-block font-heading text-[clamp(40px,6vw,56px)] font-extrabold leading-none tracking-tight text-kasho-green">
          {formatCop(displayCount)}
          <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-kasho-green to-transparent" />
        </span>
      </div>
      <p className="mb-6 font-sans text-sm text-[#888]">recuperados esta semana</p>

      <svg
        aria-hidden
        className="mb-5 block h-20 w-full"
        height={80}
        viewBox="0 0 396 120"
        width="100%"
      >
        <title>Tendencia semanal</title>
        <defs>
          <linearGradient id="chartGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#00C48C" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00C48C" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          fill="none"
          points={chartPoints}
          stroke="#00C48C"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <polygon
          fill="url(#chartGrad)"
          points={`0,120 ${chartPoints} 396,120`}
        />
      </svg>

      <div className="grid grid-cols-3 gap-3">
        {[
          { color: "#fff", label: "Atendidos", value: "143" },
          { color: "#00C48C", label: "Recuperados", value: "31" },
          { color: "#FFD166", label: "Cerraron", value: "22%" },
        ].map((stat) => (
          <div
            className="rounded-[10px] bg-white/[0.04] px-3 py-2.5"
            key={stat.label}
          >
            <div
              className="font-heading text-lg font-bold"
              style={{ color: stat.color }}
            >
              {stat.value}
            </div>
            <div className="mt-0.5 font-sans text-[11px] leading-snug text-[#555]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.7,
      ease: KASHO_EASE,
    },
  }),
};

export function Hero(): React.ReactElement {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-svh items-center overflow-hidden bg-kasho-black pb-16 pt-0">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: NOISE_BG,
          backgroundRepeat: "repeat",
          backgroundSize: "256px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[5%] top-[20%] h-[60%] w-[60%]"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(0,196,140,0.13), transparent)",
        }}
      />

      <div className="relative z-[1] mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="text-center lg:text-left">
          <motion.div
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-kasho-green/25 bg-kasho-green/12 px-3.5 py-1.5"
            custom={reduceMotion ? 0 : 0.05}
            initial="hidden"
            variants={fadeUp}
            viewport={{ once: true }}
            whileInView="visible"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-kasho-green" />
            <span className="font-sans text-[13px] font-medium tracking-wide text-kasho-green">
              Tu asistente de ventas en WhatsApp
            </span>
          </motion.div>

          <motion.h1
            className="mb-6 font-heading text-[clamp(42px,5.5vw,80px)] font-extrabold leading-[1.05] tracking-tight text-white"
            custom={reduceMotion ? 0 : 0.15}
            initial="hidden"
            variants={fadeUp}
            viewport={{ once: true }}
            whileInView="visible"
          >
            El cliente que no
            <br />
            contestaste hoy
            <br />
            <span className="text-kasho-green">ya compró en otro lado.</span>
          </motion.h1>

          <motion.p
            className="mx-auto mb-9 max-w-[480px] font-sans text-[clamp(16px,1.4vw,19px)] leading-relaxed text-[#888] lg:mx-0"
            custom={reduceMotion ? 0 : 0.25}
            initial="hidden"
            variants={fadeUp}
            viewport={{ once: true }}
            whileInView="visible"
          >
            Kasho responde por ti en segundos, hace el seguimiento cuando el
            cliente no contesta, y te muestra exactamente cuánta plata
            recuperaste esta semana. Sin salir de WhatsApp.
          </motion.p>

          <motion.div
            className="mb-8 flex flex-wrap justify-center gap-3 lg:justify-start"
            custom={reduceMotion ? 0 : 0.35}
            initial="hidden"
            variants={fadeUp}
            viewport={{ once: true }}
            whileInView="visible"
          >
            <a
              className="inline-flex items-center gap-2 rounded-xl bg-kasho-green px-7 py-3.5 font-sans text-[15px] font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-kasho-green-dark hover:shadow-[0_8px_30px_rgba(0,196,140,0.35)] active:scale-[0.98]"
              href="#precios"
            >
              Quiero empezar <span aria-hidden>→</span>
            </a>
            <a
              className="inline-flex items-center rounded-xl border border-white/15 px-7 py-3.5 font-sans text-[15px] font-medium text-white/75 transition-all duration-300 hover:border-kasho-green/50 hover:text-kasho-green"
              href="#como-funciona"
            >
              Ver cómo funciona
            </a>
          </motion.div>

          <motion.div
            className="flex items-center justify-center gap-2.5 lg:justify-start"
            custom={reduceMotion ? 0 : 0.45}
            initial="hidden"
            variants={fadeUp}
            viewport={{ once: true }}
            whileInView="visible"
          >
            <span className="text-[13px] tracking-widest text-kasho-yellow">
              ★★★★★
            </span>
            <span className="font-sans text-[13px] text-[#666]">
              Más de 50 negocios en Colombia ya lo usan
            </span>
          </motion.div>
        </div>

        <motion.div
          className="flex justify-center lg:justify-end"
          initial={
            reduceMotion
              ? false
              : { opacity: 0, x: 40, y: 10 }
          }
          transition={{ delay: 0.55, duration: 0.9, ease: KASHO_EASE }}
          viewport={{ once: true }}
          whileInView={
            reduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }
          }
        >
          <DashboardMockup />
        </motion.div>
      </div>
    </section>
  );
}
