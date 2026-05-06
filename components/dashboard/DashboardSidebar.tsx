"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/actions/auth.action";
import styles from "./DashboardSidebar.module.css";
import {
  LayoutDashboard,
  Plus,
  BookOpen,
  BarChart3,
  MessageSquare,
  HelpCircle,
  Bot,
  Users,
  Trophy,
  Settings,
  LogOut,
  Menu,
  X,
  Zap,
} from "lucide-react";

interface DashboardSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser?: { name?: string; email?: string; subscription?: string } | null;
}

const menuItems = [
  { id: "overview",    label: "Overview",         icon: LayoutDashboard },
  { id: "create",      label: "Create Interview",  icon: Plus            },
  { id: "interviews",  label: "My Interviews",     icon: BookOpen        },
  // { id: "analytics",   label: "Analytics",         icon: BarChart3       },
  // { id: "feedback",    label: "Feedback",          icon: MessageSquare   },
  // { id: "question-bank", label: "Question Bank",   icon: HelpCircle      },
  // { id: "ai-coach",    label: "AI Coach",          icon: Bot             },
  // { id: "community",   label: "Community",         icon: Users           },
];

const bottomItems = [
  { id: "achievements", label: "Achievements", icon: Trophy   },
  { id: "settings",     label: "Settings",     icon: Settings },
];

export default function DashboardSidebar({
  activeTab,
  setActiveTab,
  currentUser = null,
}: DashboardSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const userName = currentUser?.name || "User";
  const userEmail = currentUser?.email || "";
  const userPlan = currentUser?.subscription || "Free";
  const isPro = userPlan?.toLowerCase() === "pro";

  const initials = userName
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleClick = (id: string) => {
    setActiveTab(id);
    setMobileOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        className={styles.mobileToggle}
        onClick={() => setMobileOpen((p) => !p)}
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Backdrop */}
      {mobileOpen && (
        <div className={styles.backdrop} onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${mobileOpen ? styles.open : ""}`}>

        {/* Logo */}
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/icon.svg"
              alt="Nexus"
              width={36}
              height={36}
              className={styles.logoImg}
            />
            <span className={styles.logoText}>
              NE<span className={styles.logoX}>X</span>US
            </span>
          </Link>
        </div>

        {/* Primary nav */}
        <nav className={styles.nav}>
          {menuItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleClick(id)}
              className={`${styles.navItem} ${activeTab === id ? styles.navItemActive : ""}`}
            >
              <Icon size={18} className={styles.navIcon} />
              <span className={styles.navLabel}>{label}</span>
              {activeTab === id && <div className={styles.activeBar} />}
            </button>
          ))}
        </nav>

        <div className={styles.divider} />

        {/* Bottom nav */}
        <nav className={styles.nav}>
          {bottomItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleClick(id)}
              className={`${styles.navItem} ${activeTab === id ? styles.navItemActive : ""}`}
            >
              <Icon size={18} className={styles.navIcon} />
              <span className={styles.navLabel}>{label}</span>
              {activeTab === id && <div className={styles.activeBar} />}
            </button>
          ))}

          <button
            onClick={handleSignOut}
            className={`${styles.navItem} ${styles.navItemLogout}`}
          >
            <LogOut size={18} className={styles.navIcon} />
            <span className={styles.navLabel}>Logout</span>
          </button>
        </nav>

        {/* Upgrade card — only for free users */}
        {!isPro && (
          <div className={styles.upgradeCard}>
            <div className={styles.upgradeIcon}>
              <Zap size={16} />
            </div>
            <div className={styles.upgradeText}>
              <div className={styles.upgradeTitle}>Upgrade to Pro</div>
              <div className={styles.upgradeDesc}>
                Unlock advanced analytics, custom questions, and more.
              </div>
            </div>
            <button className={styles.upgradeBtn} onClick={() => router.push("/price")}>Upgrade Now →</button>
          </div>
        )}

        {/* User profile */}
        <div className={styles.profile}>
          <div className={styles.profileAvatar}>{initials}</div>
          <div className={styles.profileInfo}>
            <div className={styles.profileName}>{userName}</div>
            <div className={styles.profileEmail}>{userEmail}</div>
          </div>
          <div className={styles.profilePlan}>{userPlan}</div>
        </div>

      </aside>
    </>
  );
}