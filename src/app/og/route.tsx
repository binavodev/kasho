import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest): Promise<ImageResponse> {
  const { searchParams } = new URL(request.url);
  const monto = searchParams.get("monto") ?? "3.800.000";
  const plan = searchParams.get("plan") ?? "Pro";

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
            {/* Marca Kasho */}
            <div
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "-0.5px",
              }}
            >
              Kasho
            </div>
          </div>
          <div
            style={{
              background: "rgba(99,102,241,0.2)",
              border: "1px solid rgba(99,102,241,0.5)",
              borderRadius: "100px",
              padding: "8px 20px",
              fontSize: 16,
              color: "#a5b4fc",
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
              background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
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
