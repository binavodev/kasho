import Link from "next/link";

type LegalPageFooterProps = {
  linkHref: string;
  linkLabel: string;
};

export function LegalPageFooter({
  linkHref,
  linkLabel,
}: LegalPageFooterProps): React.ReactElement {
  return (
    <footer className="bg-kasho-black px-4 py-8 text-center sm:px-6">
      <span className="font-sans text-[13px] text-[#444]">
        © 2026 Kasho. Colombia. ·{" "}
        <Link className="text-[#555] hover:text-white" href={linkHref}>
          {linkLabel}
        </Link>
      </span>
    </footer>
  );
}
