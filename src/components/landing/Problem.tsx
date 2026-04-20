"use client";

import { motion } from "framer-motion";
import {
  ChatLines,
  ClockRotateRight,
  MoneySquare,
} from "iconoir-react";
import { useRef } from "react";

import { useKashoInView } from "@/hooks/use-kasho-in-view";
import { KASHO_EASE } from "@/lib/motion";

const cards = [
  {
    description:
      "Los estudios son claros: quien responde en los primeros 5 minutos cierra 21 veces más ventas. Cada minuto que pasa, tus chances bajan.",
    icon: ChatLines,
    number: "21x",
    title: "El primero en responder se lleva al cliente.",
  },
  {
    description:
      "Más de la mitad de los clientes interesados se enfrían porque nadie los volvió a contactar a tiempo. No es falta de ganas — es falta de tiempo.",
    icon: ClockRotateRight,
    number: "60%",
    title: "El seguimiento que nunca llegó a hacer.",
  },
  {
    description:
      "Sientes que pierdes clientes, pero sin ver el número exacto, es difícil tomar acción. Kasho pone ese número en pantalla, todos los días.",
    icon: MoneySquare,
    number: "?",
    title: "No sabes cuánto se te está yendo.",
  },
] as const;

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: KASHO_EASE },
  },
};

export function Problem(): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useKashoInView(ref);

  return (
    <section className="bg-white py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          animate={inView ? "visible" : "hidden"}
          className="mb-12 text-center md:mb-16"
          initial="hidden"
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: KASHO_EASE },
            },
          }}
        >
          <h2 className="font-heading text-[clamp(32px,4vw,56px)] font-extrabold leading-tight tracking-tight text-kasho-black">
            Cada minuto sin responder
            <br />
            es plata que se va.
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-sans text-lg text-[#888]">
            No es un problema de ventas. Es un problema de velocidad.
          </p>
        </motion.div>

        <motion.div
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
          initial="hidden"
          variants={container}
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                className="h-full"
                key={card.title}
                variants={item}
              >
                <div className="group relative h-full overflow-hidden rounded-[20px] border border-kasho-green/10 bg-gradient-to-br from-white to-[#f8fffe] p-7 shadow-[0_2px_4px_rgba(0,196,140,0.04),0_8px_32px_rgba(0,0,0,0.06)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-kasho-green/25 hover:shadow-[0_16px_48px_rgba(0,196,140,0.12)]">
                  <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-kasho-green/[0.06] blur-2xl" />
                  <div className="mb-5 text-kasho-green">
                    <Icon height={28} strokeWidth={1.5} width={28} />
                  </div>
                  <div className="mb-3 font-heading text-[clamp(48px,5vw,64px)] font-extrabold leading-none tracking-tight text-kasho-yellow">
                    {card.number}
                  </div>
                  <h3 className="mb-3 font-heading text-[19px] font-bold leading-snug text-kasho-black">
                    {card.title}
                  </h3>
                  <p className="font-sans text-[15px] leading-relaxed text-kasho-gray-text">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
