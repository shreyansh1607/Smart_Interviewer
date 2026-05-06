import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/actions/auth.action";
import styles from "./rootLayout.module.css";

const Layout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/sign-in");

  return (
    <div className={styles.rootLayout}>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.navLogo}>
          <Image src="/icon.svg" alt="Nexus logo" width={32} height={32} />
          <h2 className={styles.navBrand}>NEXUS</h2>
        </Link>
      </nav>
  
      {children}
    </div>
  );
};

export default Layout;
