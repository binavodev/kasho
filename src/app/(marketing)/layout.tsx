import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import { WaitlistDialog } from "@/components/waitlist/WaitlistDialog";
import { WaitlistProvider } from "@/contexts/waitlist-context";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <WaitlistProvider>
      <Navbar />
      <div className="bg-kasho-black pt-16">{children}</div>
      <Footer />
      <WaitlistDialog />
    </WaitlistProvider>
  );
}
