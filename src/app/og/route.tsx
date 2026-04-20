import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const DEFAULT_MONTO_DISPLAY = "3.800.000";

function montoDisplayFromParam(raw: string | null): string {
  if (!raw || raw.trim() === "") {
    return DEFAULT_MONTO_DISPLAY;
  }
  const trimmed = raw.trim();
  if (/^\d{1,3}(\.\d{3})+$/.test(trimmed)) {
    return trimmed;
  }
  const digits = trimmed.replace(/\D/g, "");
  if (!digits) {
    return DEFAULT_MONTO_DISPLAY;
  }
  const n = Number(digits);
  if (!Number.isFinite(n)) {
    return DEFAULT_MONTO_DISPLAY;
  }
  return new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 }).format(n);
}

export async function GET(request: NextRequest): Promise<ImageResponse> {
  const requestUrl = new URL(request.url);
  const origin = requestUrl.origin;
  const { searchParams } = requestUrl;
  const monto = montoDisplayFromParam(searchParams.get("monto"));
  const plan = searchParams.get("plan") ?? "Pro";
  const logoSrc = `${origin}/icons/kasho-logo-dark-3x.png`;

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #111827 60%, #1a2744 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Header — logo + plan badge */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <img
              alt="Kasho"
              height={56}
              src={logoSrc}
              style={{ height: 56, width: "auto", objectFit: "contain" }}
              width={220}
            />
          </div>
          <div
            style={{
              background: "rgba(0,196,140,0.18)",
              border: "1px solid rgba(0,196,140,0.45)",
              borderRadius: "100px",
              padding: "8px 20px",
              fontSize: 16,
              color: "#5eead4",
              fontWeight: 600,
            }}
          >
            Plan {plan}
          </div>
        </div>

        {/* Contenido principal */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: 22,
              color: "#9ca3af",
              fontWeight: 500,
              letterSpacing: "0.5px",
            }}
          >
            ESTA SEMANA RECUPERASTE
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-3px",
              lineHeight: 1,
            }}
          >
            ${monto}
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#6ee7b7",
              fontWeight: 600,
            }}
          >
            en leads que ibas a perder.
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 18, color: "#6b7280" }}>kashoai.com</div>
          <div
            style={{
              background: "linear-gradient(90deg, #00c48c, #007a5c)",
              borderRadius: "100px",
              padding: "12px 28px",
              fontSize: 18,
              color: "#ffffff",
              fontWeight: 700,
            }}
          >
            Prueba gratis 14 días →
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
