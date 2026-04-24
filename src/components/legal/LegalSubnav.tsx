import Link from "next/link";

const ITEMS = [
  { id: "terminos" as const, href: "/terminos", label: "Términos de uso" },
  { id: "privacidad" as const, href: "/privacidad", label: "Privacidad" },
];

type LegalSubnavProps = { current: "privacidad" | "terminos" };

export function LegalSubnav({ current }: LegalSubnavProps): React.ReactElement {
  return (
    <div className="border-b border-white/[0.08] bg-kasho-black/50 px-4 backdrop-blur-md sm:px-6">
      <div className="mx-auto flex max-w-[740px] gap-1 py-1">
        {ITEMS.map((item) => {
          const isActive = item.id === current;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                isActive
                  ? "font-sans rounded-lg bg-white/[0.08] px-3 py-1.5 text-sm font-medium text-kasho-green"
                  : "font-sans rounded-lg px-3 py-1.5 text-sm text-white/50 transition-colors hover:text-white/90"
              }
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
