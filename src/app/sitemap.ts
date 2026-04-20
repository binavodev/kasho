import type { MetadataRoute } from "next";

const BASE_URL = "https://kashoai.com";

// Sectores de negocio con páginas programáticas
const SECTORES = [
  "salud-estetica",
  "educacion-cursos",
  "inmobiliaria",
  "agencias-viaje",
  "talleres-premium",
] as const;

// Competidores con páginas de comparación
const COMPETIDORES = ["kommo", "treble", "sirena", "leadsales"] as const;

// Ciudades colombianas con páginas locales
const CIUDADES = ["bogota", "medellin", "cali", "barranquilla"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Páginas principales
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/precios`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/demo`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacidad`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terminos`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Páginas de sector (/ventas-whatsapp/[sector])
  const sectorPages: MetadataRoute.Sitemap = SECTORES.map((sector) => ({
    url: `${BASE_URL}/ventas-whatsapp/${sector}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // Páginas de comparación (/vs/[competidor])
  const competidorPages: MetadataRoute.Sitemap = COMPETIDORES.map(
    (competidor) => ({
      url: `${BASE_URL}/vs/${competidor}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    }),
  );

  // Páginas de ciudad (/colombia/[ciudad])
  const ciudadPages: MetadataRoute.Sitemap = CIUDADES.map((ciudad) => ({
    url: `${BASE_URL}/colombia/${ciudad}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    ...staticPages,
    ...sectorPages,
    ...competidorPages,
    ...ciudadPages,
  ];
}
