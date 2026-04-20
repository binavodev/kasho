"use client";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Check, Xmark } from "iconoir-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { useWaitlist } from "@/contexts/waitlist-context";
import { getFirestoreDb, isFirebaseConfigured } from "@/lib/firebase";
import {
  validateWaitlistFields,
  WAITLIST_LIMITS,
} from "@/lib/waitlist-validation";

type FieldErrors = Partial<Record<"email" | "name" | "whatsapp", string>>;

export function WaitlistDialog(): React.ReactElement {
  const { open, setOpen } = useWaitlist();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  const resetForm = useCallback(() => {
    setName("");
    setEmail("");
    setWhatsapp("");
    setErrors({});
    setStatus("idle");
    setErrorMessage("");
  }, []);

  const handleClose = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  useEffect(() => {
    const node = dialogRef.current;
    if (!node) {
      return;
    }
    if (open) {
      node.showModal();
    } else if (node.open) {
      node.close();
    }
  }, [open]);

  useEffect(() => {
    const node = dialogRef.current;
    if (!node) {
      return;
    }
    const onDialogClose = (): void => {
      setOpen(false);
      resetForm();
    };
    node.addEventListener("close", onDialogClose);
    return () => node.removeEventListener("close", onDialogClose);
  }, [resetForm, setOpen]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    const result = validateWaitlistFields({ email, name, whatsapp });
    if (!result.success) {
      setErrors(result.errors);
      return;
    }
    setErrors({});

    if (!isFirebaseConfigured()) {
      setStatus("error");
      setErrorMessage(
        "Falta configurar Firebase. Añade las variables en .env.local.",
      );
      return;
    }

    const database = getFirestoreDb();
    if (!database) {
      setStatus("error");
      setErrorMessage("No se pudo conectar con Firebase.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      await addDoc(collection(database, "waitlist"), {
        createdAt: serverTimestamp(),
        email: result.data.email,
        name: result.data.name,
        source: "landing" as const,
        whatsapp: result.data.whatsapp,
      });
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage(
        "No pudimos guardar tu registro. Revisa las reglas de Firestore o intenta más tarde.",
      );
    }
  };

  return (
    <dialog
      aria-labelledby={titleId}
      aria-modal="true"
      className="fixed left-1/2 top-1/2 z-[200] max-h-[min(92vh,720px)] w-[min(calc(100vw-2rem),440px)] max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/10 bg-[#111118] p-0 text-white shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
      ref={dialogRef}
    >
      <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] px-6 py-5">
        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-kasho-green">
            Kasho
          </p>
          <h2
            className="mt-1 font-heading text-xl font-bold tracking-tight text-white"
            id={titleId}
          >
            Lista de espera
          </h2>
          <p className="mt-1 font-sans text-sm leading-relaxed text-[#9ca3af]">
            Te avisamos cuando abramos nuevos cupos. Sin spam.
          </p>
        </div>
        <button
          aria-label="Cerrar"
          className="rounded-lg p-2 text-[#9ca3af] transition-colors hover:bg-white/10 hover:text-white"
          onClick={handleClose}
          type="button"
        >
          <Xmark height={22} strokeWidth={1.75} width={22} />
        </button>
      </div>

      {status === "success" ? (
        <div className="flex flex-1 flex-col justify-center px-6 py-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-kasho-green/15 text-kasho-green">
            <Check height={32} strokeWidth={2} width={32} />
          </div>
          <p className="font-heading text-lg font-bold text-white">
            Estás en la lista
          </p>
          <p className="mt-2 font-sans text-sm text-[#a1a1aa]">
            Revisa tu correo; pronto te escribimos con novedades.
          </p>
          <button
            className="mt-8 rounded-xl bg-kasho-green px-5 py-3 font-sans text-sm font-semibold text-kasho-black transition hover:bg-kasho-green-dark"
            onClick={handleClose}
            type="button"
          >
            Listo
          </button>
        </div>
      ) : (
        <form
          className="flex flex-1 flex-col px-6 pb-6 pt-2"
          noValidate
          onSubmit={(event) => void handleSubmit(event)}
        >
          <div className="space-y-4">
            <div>
              <label
                className="mb-1.5 block font-sans text-[13px] font-medium text-[#d4d4d8]"
                htmlFor="waitlist-name"
              >
                Nombre
              </label>
              <input
                autoComplete="name"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-sans text-[15px] text-white outline-none ring-kasho-green/40 placeholder:text-[#71717a] focus:border-kasho-green/50 focus:ring-2"
                id="waitlist-name"
                maxLength={WAITLIST_LIMITS.nameMax}
                onChange={(event) => setName(event.target.value)}
                placeholder="Tu nombre"
                type="text"
                value={name}
              />
              {errors.name ? (
                <p className="mt-1 font-sans text-xs text-red-400">{errors.name}</p>
              ) : null}
            </div>
            <div>
              <label
                className="mb-1.5 block font-sans text-[13px] font-medium text-[#d4d4d8]"
                htmlFor="waitlist-email"
              >
                Correo electrónico
              </label>
              <input
                autoComplete="email"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-sans text-[15px] text-white outline-none ring-kasho-green/40 placeholder:text-[#71717a] focus:border-kasho-green/50 focus:ring-2"
                id="waitlist-email"
                inputMode="email"
                maxLength={WAITLIST_LIMITS.emailMax}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="tu@correo.com"
                type="email"
                value={email}
              />
              {errors.email ? (
                <p className="mt-1 font-sans text-xs text-red-400">
                  {errors.email}
                </p>
              ) : null}
            </div>
            <div>
              <label
                className="mb-1.5 block font-sans text-[13px] font-medium text-[#d4d4d8]"
                htmlFor="waitlist-whatsapp"
              >
                WhatsApp
              </label>
              <input
                autoComplete="tel"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-sans text-[15px] text-white outline-none ring-kasho-green/40 placeholder:text-[#71717a] focus:border-kasho-green/50 focus:ring-2"
                id="waitlist-whatsapp"
                inputMode="tel"
                maxLength={WAITLIST_LIMITS.whatsappMax}
                onChange={(event) => setWhatsapp(event.target.value)}
                placeholder="+57 300 123 4567"
                type="text"
                value={whatsapp}
              />
              {errors.whatsapp ? (
                <p className="mt-1 font-sans text-xs text-red-400">
                  {errors.whatsapp}
                </p>
              ) : null}
            </div>
          </div>

          {status === "error" && errorMessage ? (
            <p
              className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 font-sans text-sm text-red-200"
              role="alert"
            >
              {errorMessage}
            </p>
          ) : null}

          <p className="mt-4 font-sans text-[11px] leading-relaxed text-[#71717a]">
            Al enviar, aceptas que te contactemos con novedades de Kasho. Ver{" "}
            <a className="text-kasho-green underline-offset-2 hover:underline" href="/privacidad">
              privacidad
            </a>
            .
          </p>

          <button
            className="mt-5 w-full rounded-xl bg-kasho-green py-3.5 font-sans text-[15px] font-semibold text-kasho-black transition enabled:hover:bg-kasho-green-dark enabled:hover:shadow-[0_8px_24px_rgba(0,196,140,0.25)] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={status === "loading"}
            type="submit"
          >
            {status === "loading" ? "Enviando…" : "Unirme a la lista"}
          </button>
        </form>
      )}
    </dialog>
  );
}
