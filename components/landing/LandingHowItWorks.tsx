"use client";

import styles from "./LandingHowItWorks.module.css";

const steps = [
  {
    number: "01",
    title: "Create account",
    description: "Sign up in seconds and unlock your personal interview dashboard.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    number: "02",
    title: "Pick your interview",
    description: "Choose the role, level, and interview style you want to practice.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Practice with AI",
    description: "Answer adaptive questions while the AI interviewer responds in real time.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="23"/>
      </svg>
    ),
  },
  {
    number: "04",
    title: "Review & improve",
    description: "Read your feedback, see the scoring breakdown, and prep smarter next time.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
];

export default function LandingHowItWorks() {
  return (
    <section id="how-it-works" className={styles.section}>
      <div className={styles.glowLeft} />
      <div className={styles.glowRight} />

      <div className={styles.shell}>
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            How It Works
          </div>
          <h2 className={styles.heading}>
            Four simple steps from<br />
            <span className={styles.headingAccent}>signup to improvement</span>
          </h2>
          <p className={styles.subheading}>
            No setup, no friction — just practice that actually prepares you.
          </p>
        </div>

        <div className={styles.grid}>
          {steps.map((step, idx) => (
            <div key={step.number} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.iconWrap}>{step.icon}</div>
                <span className={styles.number}>{step.number}</span>
              </div>
              <h3 className={styles.cardTitle}>{step.title}</h3>
              <p className={styles.cardDesc}>{step.description}</p>
              {idx < steps.length - 1 && (
                <div className={styles.connector}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="rgba(168,85,247,0.4)" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M3 8h10M9 4l4 4-4 4"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}