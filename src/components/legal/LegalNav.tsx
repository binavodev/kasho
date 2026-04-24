import Link from "next/link";

import { KashoLogo } from "@/components/brand/KashoLogo";

export function LegalNav(): React.ReactElement {
  return (
    <nav className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/[0.08] bg-kasho-black/80 px-4 backdrop-blur-xl sm:px-6">
      <Link className="flex items-center" href="/">
        <KashoLogo background="dark" height={28} priority />
      </Link>
      <Link
        className="font-sans text-sm text-white/55 transition-colors hover:text-kasho-green"
        href="/"
      >
        ← Volver al inicio
      </Link>
    </nav>
  );
}
