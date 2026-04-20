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
      <nav aria-label="Breadcrumb" className="py-3">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-400">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1">
                {isLast ? (
                  <span className="text-white font-medium" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <>
                    <Link
                      href={item.href}
                      className="hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                    <span aria-hidden="true" className="text-gray-600">
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
