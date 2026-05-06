"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/actions/auth.action";

type LandingNavbarProps = {
  scrolled: boolean;
  currentUser?: User | null;
};

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Features", href: "/#features" },
  { label: "Interview", href: "/dashboard" },
  { label: "Pricing", href: "/price" },
  { label: "Community", href: "/#community" },
  { label: "About", href: "/about" },
];

export default function LandingNavbar({
  scrolled,
  currentUser = null,
}: LandingNavbarProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const userName = currentUser?.name || "Nexus User";
  const userEmail = currentUser?.email || "user@nexus.ai";
  const userPlan = currentUser?.subscription || "Basic";
  const initials = userName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleSignOut = async () => {
    await signOut();
    setMenuOpen(false);
    router.refresh();
    router.push("/");
  };

  useEffect(() => {
    if (!menuOpen) return;

    const handleOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  return (
    <header
      className={`landing-navbar${scrolled ? " landing-navbar--scrolled" : ""}`}
    >
      <div className="landing-shell landing-navbar__inner">
        <Link href="/" className="landing-brand">
          <Image
            src="/icon.svg"
            alt="Nexus logo"
            width={38}
            height={38}
            className="landing-brand__logo"
          />

          <span className="landing-brand__text">
            NE
            <span className="landing-brand__accent">X</span>
            US
          </span>
        </Link>

        <nav className="landing-navbar__links" aria-label="Primary">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="landing-navbar__link"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="landing-navbar__actions">
          {currentUser ? (
            <div className="landing-profile-menu" ref={menuRef}>
              <button
                type="button"
                className="landing-profile-menu__trigger"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-expanded={menuOpen}
                aria-haspopup="menu"
              >
                <span className="landing-profile-menu__avatar">{initials || "U"}</span>
              </button>
              {menuOpen && (
                <div className="landing-profile-menu__dropdown" role="menu">
                  <div className="landing-profile-menu__header">
                    <strong>{userName}</strong>
                    <span>{userEmail}</span>
                  </div>
                  <div className="landing-profile-menu__divider" />
                  <div className="landing-profile-menu__item landing-profile-menu__item--muted">
                    <span>Subscription</span>
                    <em>{userPlan}</em>
                  </div>
                  <div className="landing-profile-menu__divider" />
                  <button
                    type="button"
                    className="landing-profile-menu__item landing-profile-menu__item--danger"
                    onClick={handleSignOut}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/sign-in" className="landing-btn landing-btn--ghost">
                Log in
              </Link>
              <Link href="/sign-up" className="landing-btn landing-btn--primary">
                Sign up free
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
