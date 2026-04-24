const ISOLOGO_SRC = "/icons/kasho-icon.svg";

export type KashoLogoProps = {
  /** `dark` = texto claro (fondo oscuro). `light` = texto oscuro (fondo claro). */
  background: "dark" | "light";
  className?: string;
  height?: number;
  priority?: boolean;
};

export function KashoLogo({
  background,
  className,
  height = 28,
  priority = false,
}: KashoLogoProps): React.ReactElement {
  const textClass =
    background === "dark" ? "text-white" : "text-kasho-black";
  const fontSizePx = Math.max(15, Math.round(height * 0.68));
  const gapClass = height >= 32 ? "gap-2.5" : "gap-2";

  return (
    <span
      className={`inline-flex items-center ${gapClass} ${className ?? ""}`}
    >
      <img
        alt=""
        aria-hidden
        className="shrink-0 select-none"
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        height={height}
        loading={priority ? "eager" : "lazy"}
        src={ISOLOGO_SRC}
        style={{ height, width: height }}
        width={height}
      />
      <span
        className={`font-heading font-extrabold leading-none tracking-[-0.04em] antialiased ${textClass}`}
        style={{ fontSize: fontSizePx }}
      >
        Kasho
      </span>
    </span>
  );
}
