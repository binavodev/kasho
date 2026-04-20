# Kasho — Landing (kashoai.com)

Sitio de marketing público de **Kasho**: motor de ventas conversacional con IA para PYMEs en Colombia. Stack moderno con App Router, TypeScript estricto y SEO/AISO listo para producción.

## Requisitos

- **Node.js** 20+ (recomendado)
- **pnpm** 9+

## Instalación y desarrollo

```bash
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando      | Descripción                    |
|-------------|---------------------------------|
| `pnpm dev`  | Servidor de desarrollo (Next.js) |
| `pnpm build`| Build de producción             |
| `pnpm start`| Servidor tras `pnpm build`      |
| `pnpm lint` | ESLint                          |

## Stack

- **Framework:** [Next.js](https://nextjs.org) 16 (App Router)
- **UI:** React 19, [Tailwind CSS](https://tailwindcss.com) v4, [shadcn/ui](https://ui.shadcn.com) (Base UI), utilidades `clsx` / `tailwind-merge`
- **Tipografía:** [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) — Plus Jakarta Sans (títulos), DM Sans (cuerpo), Geist Mono (código)
- **Animación:** [Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com/) + `@gsap/react`
- **Iconos:** [Iconoir](https://iconoir.com/) (`iconoir-react`)

## Estructura relevante

```
src/
  app/
    layout.tsx          # Metadata global, JSON-LD (@graph)
    globals.css         # Tokens de marca y Tailwind
    (marketing)/        # Home + shell Navbar/Footer
      layout.tsx
      page.tsx
      precios/
      blog/
      ventas-whatsapp/[sector]/
      vs/[competidor]/
      colombia/[ciudad]/
    privacidad/         # Legal (nav propio)
    terminos/
    og/route.tsx        # OG dinámica (ImageResponse)
    sitemap.ts
    robots.ts
    not-found.tsx
    error.tsx
  components/
    landing/            # Secciones de la home
    legal/              # Páginas legales
    ui/                 # Breadcrumb, Button, etc.
  lib/                  # fonts, motion, utils
public/
  llms.txt              # AISO / LLMs
```

## Rutas públicas principales

| Ruta | Notas |
|------|--------|
| `/` | Landing principal |
| `/precios` | Planes en COP |
| `/blog` | Blog (placeholder) |
| `/ventas-whatsapp/[sector]` | Páginas por sector (SSG + revalidación) |
| `/vs/[competidor]` | Comparativas (SSG) |
| `/colombia/[ciudad]` | Páginas locales (SSG) |
| `/privacidad`, `/terminos` | Legales |
| `/og` | Imagen Open Graph dinámica (`?monto=`, `?plan=`) |
| `/sitemap.xml`, `/robots.txt` | Generados por convención App Router |
| `/llms.txt` | Archivo estático para agentes |

## SEO y AISO

- Metadatos amplios en `app/layout.tsx` (Open Graph, Twitter, `alternates`, robots con vista previa de imágenes).
- **JSON-LD** en layout: Organization, WebSite, SoftwareApplication (ofertas), FAQPage.
- **Sitemap** y **robots** dinámicos (`app/sitemap.ts`, `app/robots.ts`).
- **`public/llms.txt`** con información estructurada para LLMs.
- Redirecciones **www/apex y HTTPS** las define el hosting (p. ej. **Vercel** dominios / **Cloudflare**), no el repo.

## Despliegue

Compatible con cualquier hosting que ejecute Node para Next.js (por ejemplo **Vercel**). Tras el build:

```bash
pnpm build && pnpm start
```

Configura la URL canónica de producción (`https://kashoai.com`) en variables de entorno si más adelante parametrizas el dominio en código.

## Documentación interna (no versionada)

Estos archivos conviven en la carpeta del proyecto para referencia local pero **no se suben a Git** (ver `.gitignore`):

- `KASHO_Brand_Guidelines_v1.docx.md`
- `KASHO_Documento_Producto_Colombia_v2.md`
- `KASHO_Modelo_Financiero_v1.docx.md`

Si ya estaban rastreados por Git, quítalos del índice sin borrarlos del disco: `git rm --cached <archivo>`.

## Licencia y marca

Código del repositorio según la política del equipo. Contenido y marca **Kasho** son propiedad de sus titulares.
