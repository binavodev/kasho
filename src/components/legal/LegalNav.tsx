import Link from "next/link";

export function LegalNav(): React.ReactElement {
  return (
    <nav className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-kasho-gray-border bg-white/95 px-4 backdrop-blur-xl sm:px-6">
      <Link
        className="font-heading text-xl font-extrabold text-kasho-green"
        href="/"
      >
        Kasho
      </Link>
      <Link
        className="font-sans text-sm text-kasho-gray-text transition-colors hover:text-kasho-black"
        href="/"
      >
        ← Volver al inicio
      </Link>
    </nav>
  );
}
