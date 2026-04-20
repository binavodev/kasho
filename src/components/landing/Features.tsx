"use client";

import { motion } from "framer-motion";
import {
  CreditCard,
  GraphUp,
  Headset,
  Refresh,
} from "iconoir-react";
import { useRef } from "react";

import { useKashoInView } from "@/hooks/use-kasho-in-view";
import { KASHO_EASE } from "@/lib/motion";

const features = [
  {
    badge: "Atención",
    badgeColor: "#555555",
    description:
      "Kasho atiende a cada persona que te escribe, sin importar si son las 2am o un domingo. Habla con tu tono, conoce tu negocio, y lleva la conversación hacia la venta.",
    icon: Headset,
    stat: "24/7",
    statLabel: "siempre disponible",
    title: "Responde en segundos, a cualquier hora",
  },
  {
    badge: "Seguimiento",
    badgeColor: "#00C48C",
    description:
      "Si alguien muestra interés y luego desaparece, Kasho lo vuelve a contactar con un mensaje diferente. Una vez, dos veces, tres. Ningún cliente interesado se queda sin respuesta.",
    icon: Refresh,
    stat: "3x",
    statLabel: "más ventas cerradas",
    title: "Vuelve a contactar a quien no respondió",
  },
  {
    badge: "Resultados",
    badgeColor: "#FFD166",
    description:
      "Cada semana abres Kasho y lo primero que ves es el número: cuánta plata entró gracias al seguimiento. En pesos colombianos. Sin rodeos.",
    icon: GraphUp,
    stat: "17x",
    statLabel: "retorno promedio",
    title: "Ves exactamente cuánto recuperaste",
  },
  {
    badge: "Pago",
    badgeColor: "#007A5C",
    description:
      "Cuando alguien está listo para comprar, Kasho genera el enlace de pago por Wompi o Nequi dentro del mismo WhatsApp. El cliente paga, tú recibes la confirmación. Sin pasos extra.",
    icon: CreditCard,
    stat: "0",
    statLabel: "pasos adicionales",
    title: "El cliente paga directo desde el chat",
  },
] as const;

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
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

export function Features(): React.ReactElement {
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
            Todo lo que necesitas.
            <br />
            Nada que no necesites.
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-sans text-lg text-[#888]">
            Diseñado para negocios colombianos que quieren vender más sin
            contratar más gente.
          </p>
        </motion.div>

        <motion.div
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          initial="hidden"
          variants={container}
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div className="h-full" key={feature.title} variants={item}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-kasho-green/[0.08] bg-gradient-to-br from-white to-[#f8fffe] p-7 pb-7 shadow-[0_2px_4px_rgba(0,196,140,0.03),0_8px_32px_rgba(0,0,0,0.05)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,196,140,0.1)]">
                  <div className="pointer-events-none absolute -right-5 -top-5 h-20 w-20 rounded-full bg-kasho-green/[0.05] blur-xl" />
                  <div className="mb-5">
                    <span
                      className="inline-block rounded-full px-2.5 py-0.5 font-sans text-[11px] font-semibold uppercase tracking-widest"
                      style={{
                        backgroundColor: `${feature.badgeColor}18`,
                        color: feature.badgeColor,
                      }}
                    >
                      {feature.badge}
                    </span>
                  </div>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-kasho-green/[0.08] text-kasho-green">
                    <Icon height={22} strokeWidth={1.5} width={22} />
                  </div>
                  <h3 className="mb-3 font-heading text-[19px] font-bold leading-snug text-kasho-black">
                    {feature.title}
                  </h3>
                  <p className="mb-6 flex-1 font-sans text-[15px] leading-relaxed text-kasho-gray-text">
                    {feature.description}
                  </p>
                  <div className="flex items-baseline gap-2 border-t border-[#f0f0f0] pt-4">
                    <span className="font-heading text-[32px] font-extrabold tracking-tight text-kasho-green">
                      {feature.stat}
                    </span>
                    <span className="font-sans text-[13px] text-[#888]">
                      {feature.statLabel}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
