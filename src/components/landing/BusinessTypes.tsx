"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";

import { KASHO_EASE } from "@/lib/motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type BizMsg = { side: "cli" | "bot"; text: string };
type BizStat = { label: string; value: string };
type BizTab = {
  emoji: string;
  id: string;
  label: string;
  messages: BizMsg[];
  pain: string;
  solve: string;
  solveHighlight: string;
  stats: BizStat[];
  subtitle: string;
  tag: string;
};

const TABS: BizTab[] = [
  {
    emoji: "🛍️",
    id: "ecom",
    label: "Tienda online",
    messages: [
      { side: "cli", text: "Hola! Tienen el sérum vitamina C disponible? 🙏" },
      {
        side: "bot",
        text: "¡Hola Andrea! 👋 Sí, lo tenemos en stock. Precio: $85.000 COP. ¿Lo enviamos hoy o mañana?",
      },
      { side: "cli", text: "Para hoy estaría perfecto, Bogotá norte" },
      {
        side: "bot",
        text: "¡Perfecto! 🛍️ kasho.co/p/flawless-abc — Envío Bogotá norte: gratis ✅ Llega esta tarde.",
      },
    ],
    pain: '"La dueña de Flawless recibe 80 mensajes al día desde su celular personal. Cuando está ocupada, los leads se van a la competencia. No tiene sistema de seguimiento. No sabe cuántas ventas perdió esta semana."',
    solve:
      "responde en 2 segundos, califica al lead, envía la foto del producto con precio, y genera el link de pago por Wompi o Nequi sin salir de WhatsApp.",
    solveHighlight: "Kasho",
    stats: [
      { label: "recovery automático", value: "24h" },
      { label: "leads sin respuesta", value: "0" },
      { label: "link de pago en el chat", value: "Wompi" },
    ],
    subtitle: "40-80 mensajes al día.\nLa dueña responde sola.",
    tag: "Tienda online / E-commerce PYME",
  },
  {
    emoji: "📅",
    id: "cita",
    label: "Servicios con cita",
    messages: [
      { side: "cli", text: "Buenas! Tienen turno para corte mañana miércoles?" },
      {
        side: "bot",
        text: "¡Buenas Carlos! ✂️ Sí, tenemos mañana. Disponible a las 10am o 3pm con Juan. ¿Cuál te viene bien?",
      },
      { side: "cli", text: "Las 3pm perfecto" },
      {
        side: "bot",
        text: "✅ ¡Agendado! Mañana miércoles 3pm con Juan. Te mando recordatorio 2 horas antes por acá. ¡Nos vemos! 💈",
      },
    ],
    pain: '"La estilista tiene 8 horas de servicio al día. Mientras hace un tinte de 3 horas, entran 10 mensajes de nuevas clientas. Cuando termina y contesta, 7 ya fueron a otro salón."',
    solve:
      "agenda la cita en segundos, verifica disponibilidad real, pide anticipo si quieres, y envía recordatorio automático 24h y 2h antes. Nunca más un turno vacío por olvido.",
    solveHighlight: "Kasho",
    stats: [
      { label: "reducción no-show", value: "−80%" },
      { label: "recovery sin confirmar", value: "6h" },
      { label: "recordatorio previo", value: "2x" },
    ],
    subtitle: "Mientras atiendes,\nlos leads se van a otro salón.",
    tag: "Servicios con cita previa",
  },
  {
    emoji: "💼",
    id: "prof",
    label: "Profesionales",
    messages: [
      { side: "cli", text: "Hola! Vi tu Instagram, ¿haces fotos de grado?" },
      {
        side: "bot",
        text: "¡Hola María! Claro que sí 📸 Para grado tengo 2 paquetes: Básico $350K · Premium $580K. ¿Para cuándo sería el evento?",
      },
      { side: "cli", text: "Para el 15 de mayo. Voy a pensarlo" },
      {
        side: "bot",
        text: "Hola María 👋 El 15 de mayo ya tiene 2 solicitudes. ¿Separamos la fecha sin compromiso?",
      },
    ],
    pain:
      "La fotógrafa envía la cotización por WhatsApp. El cliente dice que lo va a pensar. Ella no sabe si hacer seguimiento. Al tercer día ya le compró a otra fotógrafa.",
    solve:
      "hace el seguimiento que tú no te atreves a hacer. A las 48h escribe con un ángulo distinto: no pregunta si ya decidió, sino algo que agrega valor. Gana los contratos que ibas a perder.",
    solveHighlight: "Kasho",
    stats: [
      { label: "más contratos cerrados", value: "3x" },
      { label: "follow-up inteligente", value: "48h" },
      { label: "sin parecer insistente", value: "100%" },
    ],
    subtitle: "Enviaste la cotizaci\u00f3n.\nEl cliente lo piensa y desaparece.",
    tag: "Servicios profesionales independientes",
  },
  {
    emoji: "🌿",
    id: "salud",
    label: "Salud y bienestar",
    messages: [
      {
        side: "cli",
        text: "Hola, quiero información sobre tu programa de nutrición",
      },
      {
        side: "bot",
        text: "¡Hola! Con gusto 🌿 Tengo un programa de 4 semanas. La primera sesión es gratuita (30 min). ¿Presencial u online?",
      },
      { side: "cli", text: "Online si es posible" },
      {
        side: "bot",
        text: "Perfecto ✅ Tengo viernes disponibles. ¿Te agendo el próximo viernes a las 4pm? Es sin costo y sin compromiso.",
      },
    ],
    pain: '"La nutricionista tiene 5 mensajes de personas interesadas. Responde cuando puede entre consultas. Al día siguiente solo 2 siguen interesadas. Los otros 3 ya contrataron a alguien más rápido."',
    solve:
      "agenda la consulta inicial gratuita en segundos, envía recordatorio doble, y tiene una regla crítica: cualquier señal de urgencia médica transfiere la conversación a ti de inmediato.",
    solveHighlight: "Kasho",
    stats: [
      { label: "respuesta inicial", value: "2s" },
      { label: "recovery sin agendar", value: "12h" },
      { label: "handoff de emergencia", value: "SOS" },
    ],
    subtitle: "5 interesados llegan.\n2 siguen ahí cuando puedes responder.",
    tag: "Salud y bienestar boutique",
  },
  {
    emoji: "🏪",
    id: "cat",
    label: "Comercio catálogo",
    messages: [
      { side: "cli", text: "Tienen Royal Canin mediano de 15kg?" },
      {
        side: "bot",
        text: "¡Hola! 🐾 Sí, tenemos en stock. Royal Canin Adult Medium 15kg: $142.000. ¿Lo retiras en tienda o con domicilio?",
      },
      { side: "cli", text: "Con domicilio a Suba por favor" },
      {
        side: "bot",
        text: "Perfecto 🐕 Domicilio a Suba: $8.000. Total: $150.000. ¿Te genero el link de pago por Nequi o Wompi?",
      },
    ],
    pain: '"El dueño del pet shop recibe 30 mensajes al día preguntando por productos. Tiene que ir a la bodega a verificar stock antes de contestar. Con Kasho, el agente consulta el catálogo y responde en 2 segundos."',
    solve:
      "indexa todo tu catálogo — productos, precios, stock — y responde consultas con disponibilidad en tiempo real. Cuando el cliente confirma, genera el pago por Nequi o Wompi en el mismo chat.",
    solveHighlight: "Kasho",
    stats: [
      { label: "vs 47 min promedio", value: "2s" },
      { label: "recovery precio", value: "24h" },
      { label: "productos en catálogo", value: "∞" },
    ],
    subtitle: "30 mensajes al día.\nTienes que ir a la bodega antes de responder.",
    tag: "Comercio con catálogo",
  },
];

export function BusinessTypes(): React.ReactElement {
  const [activeIdx, setActiveIdx] = useState(0);
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const activeTab = TABS[activeIdx];

  function animatePanel() {
    if (reduceMotion || !panelRef.current) return;
    const phone = panelRef.current.querySelector(".bp-phone");
    const infoChildren = panelRef.current.querySelectorAll(".bp-info > *");

    if (phone) {
      gsap.fromTo(
        phone,
        { opacity: 0, rotationY: -14, transformPerspective: 900, x: 55 },
        { duration: 0.95, ease: "power3.out", opacity: 1, rotationY: 0, x: 0 },
      );
    }
    if (infoChildren.length) {
      gsap.fromTo(
        infoChildren,
        { opacity: 0, y: 28 },
        {
          duration: 0.7,
          ease: "power3.out",
          opacity: 1,
          stagger: 0.1,
          y: 0,
        },
      );
    }
  }

  function handleTabClick(idx: number) {
    if (idx === activeIdx) return;
    setActiveIdx(idx);
    requestAnimationFrame(animatePanel);
  }

  // Entry animation on first view
  useGSAP(
    () => {
      if (reduceMotion) return;
      ScrollTrigger.create({
        once: true,
        onEnter() {
          animatePanel();
        },
        start: "top 68%",
        trigger: sectionRef.current,
      });
    },
    { dependencies: [reduceMotion], scope: sectionRef },
  );

  return (
    <section
      className="relative py-16 md:py-24 lg:py-32"
      id="negocios"
      ref={sectionRef}
      style={{
        background: "linear-gradient(180deg, #0d0d0d 0%, #090912 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-11 text-center"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: KASHO_EASE }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span className="mb-3.5 inline-block font-sans text-[11px] font-bold uppercase tracking-[.12em] text-kasho-green">
            Para tu tipo de negocio
          </span>
          <h2 className="font-heading text-[clamp(30px,3.8vw,54px)] font-extrabold leading-[1.1] tracking-[-1.5px] text-white">
            Configurado para tu industria.
            <br />
            Listo en 15 minutos.
          </h2>
          <p className="mx-auto mt-3.5 max-w-[540px] font-sans text-[clamp(15px,1.25vw,17px)] leading-[1.65] text-[#888]">
            Kasho no es genérico. Entiende exactamente cómo funciona tu negocio
            desde el primer día.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="mb-9 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: 16 }}
          transition={{ delay: 0.15, duration: 0.5, ease: KASHO_EASE }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {TABS.map((tab, idx) => (
            <button
              className={`flex items-center gap-1.5 rounded-full border px-4 py-2 font-sans text-[13px] font-semibold transition-all duration-200 ${
                idx === activeIdx
                  ? "border-kasho-green/35 bg-kasho-green/[0.09] text-kasho-green"
                  : "border-white/[0.07] bg-white/[0.03] text-[#5a5a5a] hover:border-kasho-green/25 hover:text-[#999]"
              }`}
              key={tab.id}
              onClick={() => handleTabClick(idx)}
              type="button"
            >
              <span className="text-base">{tab.emoji}</span>
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Panel */}
        <div
          className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-12"
          ref={panelRef}
        >
          {/* Info */}
          <div className="bp-info">
            <div className="mb-2.5 font-sans text-[11px] font-bold uppercase tracking-[.1em] text-kasho-green">
              {activeTab.tag}
            </div>
            <h3 className="mb-3.5 font-heading text-[clamp(22px,2.5vw,34px)] font-extrabold leading-[1.2] tracking-[-0.8px] text-white">
              {activeTab.subtitle.split("\n").map((line, i) => (
                <span className="block" key={i}>
                  {line}
                </span>
              ))}
            </h3>
            <p className="mb-5 border-l-2 border-white/[0.08] pl-3.5 font-sans text-[14px] leading-[1.75] text-[#777]">
              {activeTab.pain}
            </p>

            <div className="mb-6 flex flex-wrap gap-4">
              {activeTab.stats.map((stat) => (
                <div
                  className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3"
                  key={stat.label}
                >
                  <div className="font-heading text-[24px] font-extrabold tracking-[-0.5px] text-kasho-green">
                    {stat.value}
                  </div>
                  <div className="mt-0.5 font-sans text-[11px] text-[#555]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-kasho-green/10 bg-kasho-green/[0.05] px-4 py-3.5 font-sans text-[13px] leading-[1.65] text-[#666]">
              <strong className="font-semibold text-kasho-green">
                {activeTab.solveHighlight}
              </strong>{" "}
              {activeTab.solve}
            </div>
          </div>

          {/* Phone */}
          <div className="bp-phone hidden lg:block">
            <div className="overflow-hidden rounded-[22px] border-4 border-[#1c1c1c] bg-[#111] shadow-[0_20px_50px_rgba(0,0,0,.5)]">
              {/* WA header */}
              <div className="flex items-center gap-2 border-b border-white/[0.05] bg-[#141414] px-3 py-2.5">
                <div className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-full bg-kasho-green text-[13px]">
                  {activeTab.emoji}
                </div>
                <div className="font-sans text-[12px] font-semibold text-white">
                  {activeTab.label}
                </div>
                <span className="ml-auto rounded-full bg-kasho-green/12 px-2 py-0.5 font-sans text-[10px] font-semibold text-kasho-green">
                  Kasho IA
                </span>
              </div>

              {/* Messages */}
              <div className="flex min-h-[240px] flex-col gap-1.5 bg-[#090909] px-3 py-3.5">
                {activeTab.messages.map((msg, i) => (
                  <div
                    className={`max-w-[82%] rounded-[11px] px-2.5 py-1.5 font-sans text-[12px] leading-[1.55] ${
                      msg.side === "cli"
                        ? "self-start rounded-bl-[3px] bg-white/[0.07] text-[#bbb]"
                        : "self-end rounded-br-[3px] border border-kasho-green/18 bg-kasho-green/[0.11] text-[#d8fff4]"
                    }`}
                    key={i}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
