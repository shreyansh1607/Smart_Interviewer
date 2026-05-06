"use client";

import Image from "next/image";
import styles from "./SettingsSection.module.css";

export default function SettingsSection() {
  return (
    <section className={styles.page}>
      {/* Page header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.subtitle}>Manage your account and preferences.</p>
      </header>

      {/* Main card */}
      <div className={styles.card}>
        {/* 3D illustration — save Image 1 to /public/settings-illustration.png */}
        <div className={styles.illustration}>
          <Image
            src="/settings-illustration.png"
            alt="Settings under construction"
            width={360}
            height={280}
            priority
            className={styles.illustrationImg}
          />
        </div>

        <h2 className={styles.heading}>
          Settings is{" "}
          <span className={styles.highlight}>under construction!</span>
        </h2>

        <p className={styles.body}>
          We&apos;re building something amazing for you.
          <br />
          In the meantime, you can manage your account settings
          <br />
          or adjust your notification preferences.
        </p>

        {/* Divider dot */}
        <div className={styles.dividerWrap} aria-hidden="true">
          <span className={styles.dividerDot} />
        </div>

        {/* Info banner */}
        <div className={styles.infoBanner}>
          <div className={styles.infoIcon}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <p className={styles.infoText}>
            Thank you for your patience! We&apos;ll have this section ready soon.
          </p>
          <div className={styles.heartIcon} aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#7c3aed" stroke="#7c3aed" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}