"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { useWaitlist } from "@/contexts/waitlist-context";
import { KASHO_EASE } from "@/lib/motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const NOISE_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`;

const CYCLE_WORDS = [
  "barberías",
  "tiendas de ropa",
  "fotógrafos",
  "nutricionistas",
  "pet shops",
  "estéticas",
  "coaches",
];

type ChatMsg = { side: "cli" | "bot"; text: string; note?: string };

const HERO_MSGS: ChatMsg[] = [
  { side: "cli", text: "Hola! Tienen turno para corte mañana?" },
  {
    note: "2 segundos después",
    side: "bot",
    text: "¡Hola Carlos! ✂️ Sí, tenemos mañana. A las 10am o 3pm con Juan. ¿Cuál te viene bien?",
  },
  { side: "cli", text: "Las 3pm perfecto!" },
  {
    note: "Kasho",
    side: "bot",
    text: "✅ ¡Agendado! Mañana 3pm con Juan. Te mando recordatorio 2h antes 💈",
  },
];

function formatCop(value: number): string {
  return `$${value.toLocaleString("es-CO")}`;
}

function PhoneMockup(): React.ReactElement {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [typing, setTyping] = useState(false);
  const [counterVal, setCounterVal] = useState(3_800_000);
  const reduceMotion = useReducedMotion();
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) {
      setMessages(HERO_MSGS);
      return;
    }

    let cancelled = false;

    async function runSequence() {
      setMessages([]);
      setTyping(false);
      await delay(600);

      for (const msg of HERO_MSGS) {
        if (cancelled) return;
        if (msg.side === "bot") {
          setTyping(true);
          await delay(1100);
          if (cancelled) return;
          setTyping(false);
          setMessages((prev) => [...prev, msg]);
          await delay(900);
        } else {
          setMessages((prev) => [...prev, msg]);
          await delay(900);
        }
      }
      await delay(3500);
      if (!cancelled) runSequence();
    }

    runSequence();
    return () => {
      cancelled = true;
    };
  }, [reduceMotion]);

  // Scroll only the phone chat panel — never use scrollIntoView here or the
  // main document scrolls to "reveal" the anchor (overflow-hidden has no scroller).
  useEffect(() => {
    const body = chatBodyRef.current;
    if (!body) return;
    body.scrollTop = body.scrollHeight;
  }, [messages, typing]);

  // GSAP counter for floating dash card
  const counterTarget = useRef({ value: 0 });
  useGSAP(
    () => {
      if (reduceMotion) {
        setCounterVal(3_800_000);
        return;
      }
      const tween = gsap.to(counterTarget.current, {
        delay: 0.8,
        duration: 2.4,
        ease: "power3.out",
        onUpdate: () => {
          setCounterVal(Math.round(counterTarget.current.value));
        },
        value: 3_800_000,
      });
      return () => {
        tween.kill();
      };
    },
    { dependencies: [reduceMotion] },
  );

  return (
    <div className="relative flex justify-end">
      {/* Phone */}
      <div
        className="phone-wrap relative"
        style={{ width: 290 }}
      >
        <div
          className="overflow-hidden rounded-[38px] border-[7px] border-[#1e1e1e] bg-[#111] shadow-[0_40px_80px_rgba(0,0,0,.65),0_0_0_1px_rgba(255,255,255,.04)]"
          style={{ width: 290 }}
        >
          {/* Notch */}
          <div className="relative z-[2] mx-auto h-6 w-[72px] rounded-b-[18px] bg-[#111]" />

          {/* WA Header */}
          <div className="flex items-center gap-2.5 border-b border-white/[0.05] bg-[#141414] px-3.5 py-2.5">
            <div className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full bg-kasho-green text-[15px]">
              💼
            </div>
            <div>
              <div className="font-sans text-[13px] font-semibold text-white">
                Kasho · Tu negocio
              </div>
              <div className="font-sans text-[10px] text-kasho-green">
                ● en línea ahora
              </div>
            </div>
          </div>

          {/* Chat body — overflow-y-auto so we scroll inside the phone, not the page */}
          <div
            className="flex min-h-0 flex-col gap-1.5 overflow-y-auto overflow-x-hidden bg-[#0a0a0a] p-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            ref={chatBodyRef}
            style={{ height: 370 }}
          >
            {messages.map((msg, i) => (
              <div
                className={`max-w-[82%] rounded-[14px] px-2.5 py-2 font-sans text-[12.5px] leading-[1.55] ${
                  msg.side === "cli"
                    ? "self-start rounded-bl-[3px] bg-white/[0.07] text-[#ccc]"
                    : "self-end rounded-br-[3px] border border-kasho-green/20 bg-kasho-green/[0.13] text-[#dffff5]"
                }`}
                key={i}
              >
                {msg.text}
                {msg.note ? (
                  <div className="mt-0.5 font-sans text-[10px] text-[#3d3d3d]">
                    {msg.note}
                  </div>
                ) : null}
              </div>
            ))}
            {typing ? (
              <div className="flex items-center gap-1.5 self-start rounded-[14px] bg-white/[0.06] px-3.5 py-2.5">
                {[0, 150, 300].map((delay) => (
                  <span
                    className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-[#444]"
                    key={delay}
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {/* Floating dash card */}
        <div
          className="dash-float absolute -right-[90px] bottom-[-10px] w-[196px] rounded-[18px] border border-white/[0.08] p-4 shadow-[0_20px_40px_rgba(0,0,0,.55)]"
          style={{
            background: "linear-gradient(135deg,#1c1c30,#10101e)",
          }}
        >
          <div className="mb-1 font-sans text-[11px] font-medium text-[#444]">
            Esta semana
          </div>
          <div className="font-heading text-[28px] font-extrabold leading-none tracking-tight text-kasho-green">
            {formatCop(counterVal)}
          </div>
          <div className="mt-0.5 font-sans text-[11px] text-[#3a3a3a]">
            recuperados
          </div>
          <div className="mt-2.5 flex items-center gap-1.5 border-t border-white/[0.04] pt-2.5 font-sans text-[11px] font-medium text-kasho-green">
            <svg fill="none" height={8} viewBox="0 0 12 8" width={12}>
              <path
                d="M1 7L4.2 3.8L6.5 6.2L11 1"
                stroke="#00c48c"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
            +32% vs semana anterior
          </div>
        </div>
      </div>
    </div>
  );
}

function delay(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (d: number) => ({
    opacity: 1,
    transition: { delay: d, duration: 0.7, ease: KASHO_EASE },
    y: 0,
  }),
};

export function Hero(): React.ReactElement {
  const { openWaitlist } = useWaitlist();
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  // Cycling word
  const [wordIdx, setWordIdx] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIdx((i) => (i + 1) % CYCLE_WORDS.length);
        setWordVisible(true);
      }, 300);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  // GSAP parallax on desktop
  useGSAP(
    () => {
      if (reduceMotion) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const phoneWrap = heroRef.current?.querySelector(".phone-wrap");
        const dashFloat = heroRef.current?.querySelector(".dash-float");
        const heroLeft = heroRef.current?.querySelector(".hero-left");

        if (phoneWrap) {
          gsap.to(phoneWrap, {
            ease: "none",
            scrollTrigger: {
              end: "bottom top",
              scrub: 1.8,
              start: "top top",
              trigger: heroRef.current,
            },
            y: -110,
          });
        }
        if (dashFloat) {
          gsap.to(dashFloat, {
            ease: "none",
            scrollTrigger: {
              end: "bottom top",
              scrub: 2.5,
              start: "top top",
              trigger: heroRef.current,
            },
            x: -18,
            y: 70,
          });
        }
        if (heroLeft) {
          gsap.to(heroLeft, {
            ease: "none",
            opacity: 0,
            scrollTrigger: {
              end: "bottom top",
              scrub: 1,
              start: "55% top",
              trigger: heroRef.current,
            },
            y: -70,
          });
        }
      });

      gsap.to(".hero-glow", {
        ease: "none",
        scale: 1.25,
        scrollTrigger: {
          end: "bottom top",
          scrub: 2,
          start: "top top",
          trigger: heroRef.current,
        },
        y: -140,
      });

      return () => mm.revert();
    },
    { dependencies: [reduceMotion], scope: heroRef },
  );

  return (
    <section
      className="relative -mt-16 flex min-h-svh items-center overflow-hidden bg-kasho-black pb-16 pt-16"
      ref={heroRef}
    >
      {/* Noise */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.032]"
        style={{
          backgroundImage: NOISE_BG,
          backgroundRepeat: "repeat",
          backgroundSize: "256px",
        }}
      />
      {/* Dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      {/* Green radial glow */}
      <div
        aria-hidden
        className="hero-glow pointer-events-none absolute"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 70% 45%, rgba(0,196,140,0.11), transparent)",
          height: "85%",
          right: "-5%",
          top: "5%",
          width: "65%",
        }}
      />

      <div className="relative z-[1] mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-[56px] lg:px-8">
        {/* Left */}
        <div className="hero-left text-center lg:text-left">
          {/* Pill with cycling word */}
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-kasho-green/22 bg-kasho-green/[0.08] px-4 py-1.5"
            custom={reduceMotion ? 0 : 0.1}
            initial="hidden"
            variants={fadeUp}
            viewport={{ once: true }}
            whileInView="visible"
          >
            <span className="inline-block h-1.5 w-1.5 animate-[kasho-pulse_1.5s_ease-in-out_infinite] rounded-full bg-kasho-green" />
            <span className="font-sans text-[13px] font-semibold text-kasho-green">
              Para{" "}
              <span
                style={{
                  display: "inline-block",
                  fontStyle: "italic",
                  opacity: wordVisible ? 1 : 0,
                  transform: wordVisible ? "none" : "translateY(8px)",
                  transition: "opacity .35s, transform .35s",
                  willChange: "transform",
                }}
              >
                {CYCLE_WORDS[wordIdx]}
              </span>{" "}
              y más
            </span>
          </motion.div>

          <motion.h1
            className="mb-5 font-heading text-[clamp(34px,4.2vw,58px)] font-extrabold leading-[1.08] tracking-[-1.5px] text-white"
            custom={reduceMotion ? 0 : 0.2}
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
            className="mx-auto mb-8 max-w-[460px] font-sans text-[clamp(16px,1.35vw,18px)] leading-[1.7] text-[#888] lg:mx-0"
            custom={reduceMotion ? 0 : 0.35}
            initial="hidden"
            variants={fadeUp}
            viewport={{ once: true }}
            whileInView="visible"
          >
            Kasho responde por ti en segundos, hace seguimiento cuando el
            cliente desaparece, y te muestra cuánta plata recuperaste esta
            semana. Todo dentro de WhatsApp.
          </motion.p>

          <motion.div
            className="mb-7 flex flex-wrap justify-center gap-3 lg:justify-start"
            custom={reduceMotion ? 0 : 0.45}
            initial="hidden"
            variants={fadeUp}
            viewport={{ once: true }}
            whileInView="visible"
          >
            <button
              className="inline-flex items-center gap-2 rounded-xl bg-kasho-green px-7 py-3.5 font-sans text-[15px] font-bold text-kasho-black transition-all duration-300 hover:scale-[1.02] hover:bg-kasho-green-dark hover:shadow-[0_12px_32px_rgba(0,196,140,.35)] active:scale-[0.98]"
              onClick={openWaitlist}
              type="button"
            >
              Unirme a la lista de espera →
            </button>
            <a
              className="inline-flex items-center rounded-xl border border-white/15 px-7 py-3.5 font-sans text-[15px] font-medium text-white/70 transition-all duration-300 hover:border-kasho-green/40 hover:text-kasho-green"
              href="#como-funciona"
            >
              Ver cómo funciona
            </a>
          </motion.div>

          <motion.div
            className="flex items-center justify-center gap-2 lg:justify-start"
            custom={reduceMotion ? 0 : 0.55}
            initial="hidden"
            variants={fadeUp}
            viewport={{ once: true }}
            whileInView="visible"
          >
            <span className="font-sans text-[13px] tracking-[1px] text-kasho-yellow">
              ★★★★★
            </span>
            <span className="font-sans text-[13px] text-[#666]">
              Más de 50 negocios en Colombia ya lo usan
            </span>
          </motion.div>
        </div>

        {/* Right — phone */}
        <motion.div
          className="hidden justify-end lg:flex"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          ref={phoneRef}
          transition={{ delay: 0.5, duration: 0.9, ease: KASHO_EASE }}
          viewport={{ once: true }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        >
          <PhoneMockup />
        </motion.div>
      </div>
    </section>
  );
}
