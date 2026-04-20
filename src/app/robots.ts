import type { MetadataRoute } from "next";

const BASE_URL = "https://kashoai.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Regla general — todos los crawlers
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard/",
          "/onboarding/",
          "/api/",
          "/admin/",
          "/_next/",
          "/superadmin/",
        ],
      },
      // GPTBot (OpenAI) — permitido en contenido público
      {
        userAgent: "GPTBot",
        allow: ["/", "/ventas-whatsapp/", "/vs/", "/colombia/", "/blog/", "/precios"],
        disallow: [
          "/dashboard/",
          "/onboarding/",
          "/api/",
          "/admin/",
          "/superadmin/",
        ],
      },
      // PerplexityBot — permitido en contenido público
      {
        userAgent: "PerplexityBot",
        allow: ["/", "/ventas-whatsapp/", "/vs/", "/colombia/", "/blog/", "/precios"],
        disallow: [
          "/dashboard/",
          "/onboarding/",
          "/api/",
          "/admin/",
          "/superadmin/",
        ],
      },
      // Anthropic Claude — permitido en contenido público
      {
        userAgent: "ClaudeBot",
        allow: ["/", "/ventas-whatsapp/", "/vs/", "/colombia/", "/blog/", "/precios"],
        disallow: [
          "/dashboard/",
          "/onboarding/",
          "/api/",
          "/admin/",
          "/superadmin/",
        ],
      },
      // Google Extended (Gemini) — permitido en contenido público
      {
        userAgent: "Google-Extended",
        allow: ["/", "/ventas-whatsapp/", "/vs/", "/colombia/", "/blog/", "/precios"],
        disallow: [
          "/dashboard/",
          "/onboarding/",
          "/api/",
          "/admin/",
          "/superadmin/",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
