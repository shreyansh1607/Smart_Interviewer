import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/actions/auth.action";
import styles from "./auth.module.css";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const loggedIn = await isAuthenticated();
  if (loggedIn) redirect("/");

  return (
    <div className={styles.authLayout}>
      <div className={styles.authLayoutAmbient} aria-hidden />
      <header className={styles.authLayoutTopbar}>
        <Link href="/" className={styles.authLayoutBrand}>
          <Image src="/icon.svg" alt="Nexus logo" width={28} height={28} />
          <span>NEXUS</span>
        </Link>
      </header>
      <div className={styles.authLayoutShell}>
        <aside className={styles.authLayoutContent}>
          <span className={styles.authLayoutBadge}>WELCOME TO NEXUS</span>
          <h1>
            AI-Powered Interviews.
            <br />
            Real-World <span>Results.</span>
          </h1>
          <p>
            Practice smarter, get feedback that matters, and land your dream
            role.
          </p>

          <div className={styles.authLayoutFeatureList}>
            <div className={styles.authLayoutFeatureItem}>
              <span className={styles.authLayoutFeatureIcon}>⚡</span>
              <div>
                <h4>AI-Powered Feedback</h4>
                <p>Get smarter insights that help you improve faster.</p>
              </div>
            </div>
            <div className={styles.authLayoutFeatureItem}>
              <span className={styles.authLayoutFeatureIcon}>◎</span>
              <div>
                <h4>Realistic Mock Interviews</h4>
                <p>
                  Experience real interview scenarios tailored to your goals.
                </p>
              </div>
            </div>
            <div className={styles.authLayoutFeatureItem}>
              <span className={styles.authLayoutFeatureIcon}>↗</span>
              <div>
                <h4>Track & Improve</h4>
                <p>Analyze your performance and grow with every session.</p>
              </div>
            </div>
          </div>

          <div className={styles.authLayoutTestimonial}>
            <p>
              Nexus helped me build confidence and crack my dream job at Google.
            </p>
            <strong>Arjun Mehta</strong>
            <span>Software Engineer</span>
          </div>
        </aside>
        <section className={styles.authLayoutFormPanel}>{children}</section>
      </div>
      <div className={styles.authLayoutSecurity}>
        <strong>Your data is safe with us</strong>
        <span>Secure · Private · Trusted</span>
      </div>
    </div>
  );
};

export default AuthLayout;
