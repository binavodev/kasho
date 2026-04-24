"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChatLines, ClockRotateRight, MoneySquare } from "iconoir-react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Card = {
  animTarget: number | null;
  animSuffix: string;
  description: string;
  Icon: React.FC<{ height: number; strokeWidth: number; width: number }>;
  number: string;
  title: string;
};

const CARDS: Card[] = [
  {
    animSuffix: "x",
    animTarget: 21,
    description:
      "Quien responde en los primeros 5 minutos cierra 21 veces más ventas. Cada minuto que pasa, tus chances bajan.",
    Icon: ChatLines,
    number: "21x",
    title: "El primero en responder se lleva al cliente.",
  },
  {
    animSuffix: "%",
    animTarget: 60,
    description:
      "Más de la mitad de los clientes interesados se enfrían porque nadie los volvió a contactar a tiempo. No es falta de ganas — es falta de tiempo.",
    Icon: ClockRotateRight,
    number: "60%",
    title: "El seguimiento que nunca llegó a hacer.",
  },
  {
    animSuffix: "",
    animTarget: null,
    description:
      "Sin ver el número exacto, es difícil tomar acción. Kasho pone ese número en pantalla, todos los días, en pesos colombianos.",
    Icon: MoneySquare,
    number: "?",
    title: "No sabes cuánto se te está yendo.",
  },
];

export function Problem(): React.ReactElement {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = sectionRef.current?.querySelectorAll(".prob-card");
      const nums = sectionRef.current?.querySelectorAll<HTMLElement>(
        ".prob-num[data-target]",
      );

      // Clip-path reveal per card
      if (cards?.length) {
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { clipPath: "inset(0 0 100% 0)" },
            {
              clipPath: "inset(0 0 0% 0)",
              delay: i * 0.16,
              duration: 0.82,
              ease: "power3.out",
              scrollTrigger: {
                once: true,
                start: "top 74%",
                trigger: sectionRef.current,
              },
            },
          );
        });
      }

      // Number counter per stat
      if (nums?.length) {
        nums.forEach((el) => {
          const target = Number(el.dataset.target);
          const suffix = el.dataset.suffix ?? "";
          const obj = { v: 0 };
          gsap.to(obj, {
            duration: 1.9,
            ease: "power2.out",
            onUpdate() {
              el.textContent = `${Math.round(obj.v)}${suffix}`;
            },
            scrollTrigger: { once: true, start: "top 80%", trigger: el },
            v: target,
          });
        });
      }

      // 3D tilt on hover
      const allCards = sectionRef.current?.querySelectorAll(".prob-card");
      allCards?.forEach((card) => {
        const el = card as HTMLElement;
        el.style.willChange = "transform";
        el.addEventListener("mousemove", (e) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - r.left - r.width / 2) / r.width;
          const y = (e.clientY - r.top - r.height / 2) / r.height;
          gsap.to(el, {
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
            rotationX: -y * 8,
            rotationY: x * 8,
            transformPerspective: 800,
          });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(el, {
            duration: 0.7,
            ease: "elastic.out(1,0.32)",
            overwrite: "auto",
            rotationX: 0,
            rotationY: 0,
          });
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      className="bg-kasho-black py-16 md:py-24 lg:py-32"
      id="problema"
      ref={sectionRef}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-15 text-center">
          <span className="mb-3.5 inline-block font-sans text-[11px] font-bold uppercase tracking-[.12em] text-kasho-green">
            El problema
          </span>
          <h2 className="font-heading text-[clamp(30px,3.8vw,54px)] font-extrabold leading-[1.1] tracking-[-1.5px] text-white">
            Cada minuto sin responder
            <br />
            es plata que se va.
          </h2>
          <p className="mx-auto mt-3.5 max-w-[540px] font-sans text-[clamp(15px,1.25vw,17px)] leading-[1.65] text-[#888]">
            No es un problema de ventas. Es un problema de velocidad y
            seguimiento.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card) => {
            const Icon = card.Icon;
            return (
              <div
                className="prob-card group relative overflow-hidden rounded-[20px] border border-white/[0.07] bg-white/[0.03] p-7 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-kasho-green/20"
                key={card.title}
                style={{ perspective: "1200px" }}
              >
                {/* Glow */}
                <div className="pointer-events-none absolute -right-5 -top-5 h-20 w-20 rounded-full bg-kasho-green/[0.05] blur-[20px]" />

                {/* Icon */}
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-kasho-green/[0.08] text-kasho-green">
                  <Icon height={20} strokeWidth={1.8} width={20} />
                </div>

                {/* Number */}
                {card.animTarget !== null ? (
                  <div
                    className="prob-num mb-3 font-heading text-[clamp(52px,5.5vw,76px)] font-extrabold leading-none tracking-[-3px] text-kasho-yellow"
                    data-suffix={card.animSuffix}
                    data-target={card.animTarget}
                  >
                    {card.number}
                  </div>
                ) : (
                  <div className="prob-num mb-3 font-heading text-[clamp(52px,5.5vw,76px)] font-extrabold leading-none tracking-[-3px] text-kasho-green">
                    {card.number}
                  </div>
                )}

                <h3 className="mb-2.5 font-heading text-[18px] font-bold leading-[1.3] text-white">
                  {card.title}
                </h3>
                <p className="font-sans text-[14px] leading-[1.65] text-[#888]">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
