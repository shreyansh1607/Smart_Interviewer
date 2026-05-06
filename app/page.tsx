import LandingPage from "./landing-page";
import { getCurrentUser } from "@/lib/actions/auth.action";

export default async function Page() {
  const currentUser = await getCurrentUser();
  return <LandingPage currentUser={currentUser} />;
}
