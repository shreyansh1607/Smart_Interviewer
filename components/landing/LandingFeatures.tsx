"use client";

import styles from "./LandingFeatures.module.css";

const liveFeatures = [
  {
    id: "ai-interviews",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
      </svg>
    ),
    title: "AI Mock Interviews",
    desc: "Practice real interviews tailored to your role, experience, and skill level with adaptive AI.",
  },
  {
    id: "feedback",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: "Feedback & Scoring",
    desc: "Get instant feedback, scores, and improvement tips after every session.",
  },
  {
    id: "resume",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    title: "Resume Analysis",
    desc: "AI analyzes your resume and gives personalized suggestions to strengthen your profile.",
  },
  {
    id: "questions",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    title: "Question Bank",
    desc: "Access a vast collection of curated questions by role, topic, and difficulty.",
  },
];

const comingSoonFeatures = [
  {
    id: "company-packs",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
    title: "Company Packs",
    desc: "Practice with company-specific questions and interview experiences.",
  },
  {
    id: "skill-gap",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Skill Gap Tracker",
    desc: "Identify weak areas, track progress, and focus on what truly matters.",
  },
  {
    id: "leaderboard",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
      </svg>
    ),
    title: "Leaderboard",
    desc: "Compete with others, climb the ranks, and stay motivated every step of the way.",
  },
  {
    id: "community",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Community",
    desc: "Join a community of learners, share insights, and grow together.",
  },
];

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 7h10M7 2l5 5-5 5" />
    </svg>
  );
}

function FeatureCard({
  feature,
  live,
}: {
  feature: (typeof liveFeatures)[0];
  live: boolean;
}) {
  return (
    <div
      className={`${styles.featuresCard} ${live ? styles.featureCardLive : styles.featureCardSoon}`}
    >
      <div className={styles.featureCardTop}>
        <div className={styles.featureCardIcon}>{feature.icon}</div>
        <span
          className={`${styles.featureCardBadge} ${live ? styles.featureCardBadgeLive : styles.featureCardBadgeSoon}`}
        >
          {live ? "LIVE" : "COMING SOON"}
        </span>
      </div>
      <h3 className={styles.featureCardTitle}>{feature.title}</h3>
      <p className={styles.featureCardDesc}>{feature.desc}</p>
      <div className={styles.featureCardArrow}>
        <ArrowIcon />
      </div>
    </div>
  );
}

export default function LandingFeatures() {
  return (
    <section id="features" className={styles.featuresSection}>
      <div
        className={`${styles.featuresBgGlow} ${styles.featuresBgGlowLeft}`}
      />
      <div
        className={`${styles.featuresBgGlow} ${styles.featuresBgGlowRight}`}
      />

      <div className={styles.featuresShell}>
        <div className={styles.featuresHeader}>
          <div className={styles.featuresBadge}>
            <span className={styles.featuresBadgeDot} />
            POWERFUL FEATURES
          </div>
          <h2 className={styles.featuresHeading}>
            Everything you need to
            <br />
            <span className={styles.featuresHeadingAccent}>
              ace every interview
            </span>
          </h2>
          <p className={styles.featuresSubheading}>
            All the tools you need to practice smarter, improve faster,
            <br />
            and land your dream role.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {liveFeatures.map((f) => (
            <FeatureCard key={f.id} feature={f} live={true} />
          ))}
        </div>

        <div className={`${styles.featuresGrid} ${styles.featuresGridSoon}`}>
          {comingSoonFeatures.map((f) => (
            <FeatureCard key={f.id} feature={f} live={false} />
          ))}
        </div>
      </div>
    </section>
  );
}

// "use client";

// const featureRows = [
//   [
//     {
//       icon: "AI",
//       title: "AI Mock Interviews",
//       description:
//         "Run realistic mock interview sessions tailored for students and freshers.",
//       badge: "Live",
//       comingSoon: false,
//     },
//     {
//       icon: "FS",
//       title: "Feedback & Scoring",
//       description:
//         "Get instant scoring, strengths, and specific improvement notes after each session.",
//       badge: "Live",
//       comingSoon: false,
//     },
//     {
//       icon: "RA",
//       title: "Resume Analysis",
//       description:
//         "Review your resume against the interview role to highlight gaps before practice.",
//       badge: "Live",
//       comingSoon: false,
//     },
//     {
//       icon: "QB",
//       title: "Question Bank",
//       description:
//         "Browse curated questions by role, skill level, and interview style.",
//       badge: "Live",
//       comingSoon: false,
//     },
//   ],
//   [
//     {
//       icon: "CP",
//       title: "Company Packs",
//       description:
//         "Practice with company-specific question sets and interview themes.",
//       badge: "Coming soon",
//       comingSoon: true,
//     },
//     {
//       icon: "SG",
//       title: "Skill Gap Tracker",
//       description:
//         "Track weak areas across multiple sessions and focus your practice.",
//       badge: "Coming soon",
//       comingSoon: true,
//     },
//     {
//       icon: "LB",
//       title: "Leaderboard",
//       description:
//         "Compare progress, streaks, and practice consistency with peers.",
//       badge: "Coming soon",
//       comingSoon: true,
//     },
//     {
//       icon: "CM",
//       title: "Community",
//       description:
//         "Learn together with shared discussion spaces for interview preparation.",
//       badge: "Coming soon",
//       comingSoon: true,
//     },
//   ],
// ];

// export default function LandingFeatures() {
//   return (
//     <section id="features" className="landing-section">
//       <div className="landing-shell">
//         <div className="landing-section-header">
//           <div className="landing-kicker">Features</div>
//           <h2 className="landing-heading">
//             Everything a first interview prep app should have.
//           </h2>
//           <p className="landing-text">
//             The first row is ready to use. The second row is intentionally
//             lighter, dashed, and marked as coming soon so visitors can see the
//             roadmap without confusion.
//           </p>
//         </div>

//         <div className="landing-feature-stack">
//           {featureRows.map((row, rowIndex) => (
//             <div key={rowIndex} className="landing-feature-grid">
//               {row.map((feature) => (
//                 <article
//                   key={feature.title}
//                   className={`landing-feature-card${feature.comingSoon ? " landing-feature-card--coming-soon" : ""}`}
//                 >
//                   <div className="landing-feature-card__topline">
//                     <div className="landing-feature-card__icon">
//                       {feature.icon}
//                     </div>
//                     <span className="landing-status-badge landing-status-badge--subtle">
//                       {feature.badge}
//                     </span>
//                   </div>
//                   <h3 className="landing-feature-card__title">
//                     {feature.title}
//                   </h3>
//                   <p className="landing-feature-card__description">
//                     {feature.description}
//                   </p>
//                 </article>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
