import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <>
      <Navbar />
      <div className="pt-16">{children}</div>
      <Footer />
    </>
  );
}
