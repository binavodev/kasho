import Link from "next/link";

export function LegalPageFooter(): React.ReactElement {
  return (
    <footer className="bg-kasho-black px-4 py-10 text-center sm:px-6">
      <nav
        aria-label="Documentos legales"
        className="mb-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
      >
        <Link
          className="font-sans text-sm text-white/45 no-underline transition-colors hover:text-kasho-green"
          href="/terminos"
        >
          Términos de uso
        </Link>
        <span aria-hidden className="text-white/15">
          ·
        </span>
        <Link
          className="font-sans text-sm text-white/45 no-underline transition-colors hover:text-kasho-green"
          href="/privacidad"
        >
          Política de privacidad
        </Link>
      </nav>
      <p className="font-sans text-[13px] text-white/25">© 2026 Kasho. Colombia.</p>
    </footer>
  );
}
