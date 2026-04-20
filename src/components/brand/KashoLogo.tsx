const LOGO_VIEWBOX_WIDTH = 210;
const LOGO_VIEWBOX_HEIGHT = 56;

export type KashoLogoProps = {
  /** Use `light` when the logo sits on a white or light bar; `dark` on `#0d0d0d` or similar. */
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
  const src =
    background === "light"
      ? "/icons/kasho-logo-light.svg"
      : "/icons/kasho-logo-dark.svg";
  const width = Math.round(
    (LOGO_VIEWBOX_WIDTH / LOGO_VIEWBOX_HEIGHT) * height,
  );

  return (
    <span className={`inline-flex shrink-0 items-center ${className ?? ""}`}>
      <img
        alt="Kasho"
        className="max-h-[40px] w-auto max-w-[min(100%,220px)]"
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        height={height}
        loading={priority ? "eager" : "lazy"}
        src={src}
        style={{ height, width: "auto" }}
        width={width}
      />
    </span>
  );
}
