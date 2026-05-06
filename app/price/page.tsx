import { DM_Sans, Syne } from "next/font/google";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";
import LandingPricing from "@/components/landing/LandingPricing";
import { getCurrentUser } from "@/lib/actions/auth.action";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });

export default async function PricePage() {
  const currentUser = await getCurrentUser();

  return (
    <main
      className={`landing-page price-page ${dmSans.variable} ${syne.variable}`}
    >
      <LandingNavbar scrolled={true} currentUser={currentUser} />
      <LandingPricing currentUser={currentUser} />
      <LandingFooter />
    </main>
  );
}
