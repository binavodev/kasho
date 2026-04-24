import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumb visible con JSON-LD BreadcrumbList integrado.
 * Siempre incluye "Inicio" como primer elemento.
 */
export function Breadcrumb({ items }: BreadcrumbProps): React.ReactElement {
  const allItems: BreadcrumbItem[] = [{ label: "Inicio", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `https://kashoai.com${item.href}`,
    })),
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <nav aria-label="Breadcrumb" className="pt-0 pb-2">
        <ol className="flex flex-wrap items-center gap-1 font-sans text-sm text-white/40">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            return (
              <li key={`bc-${index}-${item.label}`} className="flex items-center gap-1">
                {isLast ? (
                  <span className="font-medium text-white/80" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <>
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-kasho-green"
                    >
                      {item.label}
                    </Link>
                    <span aria-hidden="true" className="text-white/20">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
