"use client";

import { motion } from "framer-motion";
import { Brain, QrCode, StatsUpSquare } from "iconoir-react";
import { useRef } from "react";

import { useKashoInView } from "@/hooks/use-kasho-in-view";
import { KASHO_EASE } from "@/lib/motion";

function WhatsAppGlyph(): React.ReactElement {
  return (
    <svg
      aria-hidden
      className="h-5 w-5 shrink-0"
      fill="#25D366"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const steps = [
  {
    description:
      "Sin instalaciones ni configuraciones complicadas. Escaneas un código con tu celular, autorizas la conexión, y Kasho empieza a trabajar de inmediato en tu número de WhatsApp.",
    icon: QrCode,
    number: "01",
    title: "Lo conectas en 5 minutos",
  },
  {
    description:
      "Le cuentas cómo es tu negocio — tus productos, tus precios, la forma en que atiendes. Kasho lo absorbe todo y desde ese momento responde exactamente como lo harías tú, pero al instante.",
    icon: Brain,
    number: "02",
    title: "Kasho aprende cómo hablas tú",
  },
  {
    description:
      "Kasho atiende los primeros contactos, hace seguimiento a quien no respondió, y te presenta cada semana cuánta plata recuperaste. Tú entras cuando el cliente ya está listo.",
    icon: StatsUpSquare,
    number: "03",
    title: "Tú solo te dedicas a cerrar",
  },
] as const;

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: KASHO_EASE },
  },
};

export function HowItWorks(): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useKashoInView(ref);

  return (
    <section
      className="bg-kasho-gray-light py-16 md:py-24 lg:py-32"
      id="como-funciona"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          animate={inView ? "visible" : "hidden"}
          className="mb-14 text-center md:mb-16"
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
            Conecta. Aprende. Cierra.
          </h2>
          <p className="mt-3 font-sans text-lg text-[#888]">
            Tres pasos. Diez minutos. El resto corre por cuenta de Kasho.
          </p>
        </motion.div>

        <motion.div
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-8 lg:grid-cols-3"
          initial="hidden"
          variants={container}
        >
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div className="relative" key={step.number} variants={item}>
                <div className="group relative h-full rounded-[20px] border border-kasho-gray-border bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.1)]">
                  <div className="pointer-events-none absolute right-6 top-5 font-heading text-[72px] font-extrabold leading-none tracking-tight text-kasho-green/[0.07] select-none">
                    {step.number}
                  </div>
                  <div className="mb-6 flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-kasho-green/[0.08] text-kasho-green">
                    <Icon height={24} strokeWidth={1.5} width={24} />
                  </div>
                  <h3 className="mb-3.5 font-heading text-xl font-bold leading-snug text-kasho-black">
                    {step.title}
                  </h3>
                  <p className="font-sans text-[15px] leading-relaxed text-kasho-gray-text">
                    {step.description}
                  </p>
                  <div className="absolute bottom-0 left-8 right-8 h-0.5 rounded-sm bg-gradient-to-r from-kasho-green to-transparent opacity-25" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          className="mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <span className="inline-flex max-w-full flex-wrap items-center justify-center gap-2.5 rounded-full border border-kasho-gray-border bg-white px-5 py-2.5 font-sans text-sm text-kasho-gray-text">
            <WhatsAppGlyph />
            Funciona completamente dentro de WhatsApp. Sin aplicaciones
            adicionales.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
