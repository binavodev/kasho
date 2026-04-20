/**
 * Validación y saneamiento del formulario lista de espera.
 * Límites alineados con reglas Firestore recomendadas (tamaños y tipos).
 */

export const WAITLIST_LIMITS = {
  emailMax: 254,
  nameMax: 200,
  whatsappMax: 40,
} as const;

export type WaitlistPayload = {
  email: string;
  name: string;
  whatsapp: string;
};

export type WaitlistFieldErrors = Partial<
  Record<"email" | "name" | "whatsapp", string>
>;

/** Caracteres de control, ZWSP, BOM, etc. */
const CTRL_RE = /[\u0000-\u001F\u007F\u200B\uFEFF]/g;

/** Patrones típicos de inyección / payloads en campos de texto */
const SUSPICIOUS_NAME_RE =
  /[<>{}[\]`]|javascript:|data:|vbscript:|on\w+\s*=|\\x[0-9a-f]{2}|&#/i;

/**
 * Nombre: letras (incl. latin-1 y comunes), espacios, apóstrofe, punto, guion.
 * Sin URLs, sin tags, sin caracteres de control.
 */
const NAME_ALLOWED_RE =
  /^[\p{L}\p{M}\p{N}\s'.-]+$/u;

const EMAIL_LOCAL_RE = /^[a-z0-9](?:[a-z0-9._-]*[a-z0-9])?$/i;
const EMAIL_DOMAIN_RE =
  /^([a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,63}$/i;

/** Parte local y dominio; admite subdominios (ej. correo.empresa.com.co) */
function isValidEmailShape(value: string): boolean {
  if (value.length > WAITLIST_LIMITS.emailMax) {
    return false;
  }
  const at = value.lastIndexOf("@");
  if (at < 1) {
    return false;
  }
  const local = value.slice(0, at);
  const domain = value.slice(at + 1);
  if (local.length > 64 || domain.length > 253 || domain.length < 3) {
    return false;
  }
  if (local.includes("..") || domain.includes("..")) {
    return false;
  }
  if (!EMAIL_LOCAL_RE.test(local)) {
    return false;
  }
  return EMAIL_DOMAIN_RE.test(domain);
}

function sanitizeName(raw: string): string {
  return raw.replace(CTRL_RE, "").replace(/\s+/g, " ").trim();
}

function sanitizeEmail(raw: string): string {
  return raw.replace(CTRL_RE, "").trim().toLowerCase();
}

function sanitizeWhatsappRaw(raw: string): string {
  return raw.replace(CTRL_RE, "").trim();
}

/**
 * Solo dígitos para validar longitud E.164 (10–15 dígitos nacionales sin +).
 */
function countPhoneDigits(value: string): number {
  return value.replace(/\D/g, "").length;
}

/**
 * Formato guardado: solo + y dígitos, sin letras ni espacios internos raros.
 * Ej.: +573001234567
 */
function canonicalWhatsapp(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) {
    return "";
  }
  return `+${digits}`;
}

export function validateWaitlistFields(input: {
  email: string;
  name: string;
  whatsapp: string;
}):
  | { data: WaitlistPayload; success: true }
  | { errors: WaitlistFieldErrors; success: false } {
  const errors: WaitlistFieldErrors = {};

  const name = sanitizeName(input.name);
  const email = sanitizeEmail(input.email);
  const whatsappRaw = sanitizeWhatsappRaw(input.whatsapp);

  if (name.length === 0) {
    errors.name = "Ingresa tu nombre";
  } else if (name.length < 2) {
    errors.name = "El nombre debe tener al menos 2 caracteres";
  } else if (name.length > WAITLIST_LIMITS.nameMax) {
    errors.name = `Máximo ${WAITLIST_LIMITS.nameMax} caracteres`;
  } else if (SUSPICIOUS_NAME_RE.test(name)) {
    errors.name = "El nombre contiene caracteres no permitidos";
  } else if (!NAME_ALLOWED_RE.test(name)) {
    errors.name = "Usa solo letras, números y espacios (sin símbolos raros)";
  }

  if (email.length === 0) {
    errors.email = "Ingresa tu correo";
  } else if (email.length > WAITLIST_LIMITS.emailMax) {
    errors.email = `Correo demasiado largo (máx. ${WAITLIST_LIMITS.emailMax})`;
  } else if (!isValidEmailShape(email)) {
    errors.email = "Correo no válido";
  }

  const digits = countPhoneDigits(whatsappRaw);
  const canonical = canonicalWhatsapp(whatsappRaw);

  if (whatsappRaw.length === 0) {
    errors.whatsapp = "Ingresa tu WhatsApp";
  } else if (digits < 10) {
    errors.whatsapp = "Incluye el número completo (mín. 10 dígitos)";
  } else if (digits > 15) {
    errors.whatsapp = "Número demasiado largo";
  } else if (canonical.length === 0) {
    errors.whatsapp = "Número no válido";
  } else if (canonical.length > WAITLIST_LIMITS.whatsappMax) {
    errors.whatsapp = `Máximo ${WAITLIST_LIMITS.whatsappMax} caracteres`;
  } else if (!/^\+\d{10,15}$/.test(canonical)) {
    errors.whatsapp = "Formato de WhatsApp no válido";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, success: false };
  }

  return {
    data: {
      email,
      name,
      whatsapp: canonical,
    },
    success: true,
  };
}
