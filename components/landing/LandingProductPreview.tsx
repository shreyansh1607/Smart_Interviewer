"use client";

import { useState } from "react";
import styles from "./LandingProductPreview.module.css";

export default function LandingProductPreview() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      id: 1,
      title: "AI Interview Session",
      description:
        "Real-time conversation with AI Interviewer tailored to your role.",
      icon: "📱",
    },
    {
      id: 2,
      title: "Smart Feedback",
      description: "Get instant AI feedback with scores and improvement tips.",
      icon: "📊",
    },
    {
      id: 3,
      title: "Performance Analytics",
      description:
        "Track your progress with detailed analytics and visual insights.",
      icon: "📈",
    },
    {
      id: 4,
      title: "Question Library",
      description:
        "Access a wide range of curated questions by role and topic.",
      icon: "📚",
    },
    {
      id: 5,
      title: "Resume Parsing",
      description: "AI-powered resume analysis and optimization suggestions.",
      icon: "📄",
    },
    {
      id: 6,
      title: "Interview Records",
      description:
        "Store and review all your past interview sessions and progress.",
      icon: "🎥",
    },
  ];

  return (
    <section className={styles.previewSection}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          <span className={styles.badgeText}>PROJECT PREVIEW</span>
        </div>

        <h2 className={styles.heading}>
          See <span className={styles.accent}>Nexus</span> in Action
        </h2>

        <p className={styles.subheading}>
          Explore a live preview of the Nexus AI Interviewer platform
          <br />
          and see how it helps you prepare, practice, and improve.
        </p>
      </div>

      {/* Main Content */}
      <div className={styles.container}>
        {/* Left: Features List */}
        <div className={styles.featuresList}>
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`${styles.featureItem} ${
                hoveredFeature === feature.id ? styles.featureItemActive : ""
              }`}
              onMouseEnter={() => setHoveredFeature(feature.id)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className={styles.featureIcon}>{feature.icon}</div>
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDesc}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Preview Panel */}
        <div className={styles.previewPanel}>
          {/* Top Section */}
          <div className={styles.previewTop}>
            <div className={styles.sessionHeader}>
              <div className={styles.headerLeft}>
                <div className={styles.sessionBadge}>N</div>
                <div className={styles.sessionInfo}>
                  <div className={styles.sessionDot} />
                  <span className={styles.sessionTitle}>
                    AI Interview Session
                  </span>
                </div>
              </div>
              <div className={styles.sessionTime}>
                <span>24:36</span>
                <span className={styles.endSession}>End Session</span>
              </div>
            </div>

            {/* Chat Messages */}
            <div className={styles.chatArea}>
              <div className={styles.messageUser}>
                <span className={styles.userInitial}>👤</span>
                <div className={styles.messageBubble}>
                  <p>
                    Can you walk me through a challenging project you worked on
                    and how you overcame the main obstacles?
                  </p>
                  <span className={styles.timestamp}>15:32 AM</span>
                </div>
              </div>

              <div className={styles.messageAI}>
                <span className={styles.aiInitial}>💬</span>
                <div className={styles.messageBubbleAI}>
                  <p>
                    Sure! In my last project, I was responsible for building a
                    real-time analytics dashboard. The main challenge was
                    handling large data streams efficiently...
                  </p>
                  <span className={styles.timestamp}>15:32 AM</span>
                </div>
              </div>

              <div className={styles.inputArea}>
                <input
                  type="text"
                  placeholder="Type your answer..."
                  className={styles.input}
                />
                <button className={styles.sendBtn}>→</button>
              </div>
            </div>
          </div>

          {/* Right Stats Section */}
          <div className={styles.statsSection}>
            {/* Overall Score */}
            <div className={styles.scoreCard}>
              <h4>Overall Score</h4>
              <div className={styles.scoreCircle}>
                <div className={styles.scoreValue}>86</div>
                <div className={styles.scoreLabel}>/100</div>
              </div>
            </div>

            {/* Strengths */}
            <div className={styles.strengthsCard}>
              <h4>Strengths</h4>
              <div className={styles.strengthItem}>
                <span className={styles.strengthName}>Problem Solving</span>
                <span className={styles.strengthPercent}>90%</span>
              </div>
              <div className={styles.strengthBar}>
                <div
                  className={styles.strengthBarFill}
                  style={{ width: "90%" }}
                />
              </div>

              <div className={styles.strengthItem}>
                <span className={styles.strengthName}>Communication</span>
                <span className={styles.strengthPercent}>85%</span>
              </div>
              <div className={styles.strengthBar}>
                <div
                  className={styles.strengthBarFill}
                  style={{ width: "85%" }}
                />
              </div>

              <div className={styles.strengthItem}>
                <span className={styles.strengthName}>Technical Skills</span>
                <span className={styles.strengthPercent}>82%</span>
              </div>
              <div className={styles.strengthBar}>
                <div
                  className={styles.strengthBarFill}
                  style={{ width: "82%" }}
                />
              </div>
            </div>

            {/* Speaking Pace */}
            <div className={styles.paceCard}>
              <h4>Speaking Pace</h4>
              <div className={styles.paceValue}>
                142 <span>WPM</span>
              </div>
              <div className={styles.paceSlider}>
                <div className={styles.paceTrack} />
                <div className={styles.paceDot} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className={styles.ctaSection}>
        <button className={styles.primaryBtn}>
          Try Nexus Now
          <span className={styles.arrow}>→</span>
        </button>
        <button className={styles.secondaryBtn}>
          <span className={styles.playIcon}>▶</span>
          Watch Demo
        </button>
        <p className={styles.disclaimer}>No credit card required</p>
      </div>
    </section>
  );
}
