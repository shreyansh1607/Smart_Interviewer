"use client";

import styles from "./createInterview.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateInterview() {
  const [selected, setSelected] = useState("ai");
  const router = useRouter();

  return (
    <div className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Create Interview</h1>
        <p className={styles.subtitle}>
          Choose a method to create your AI interview session
        </p>
      </div>

      {/* Cards */}
      <div className={styles.grid}>
        {/* AI OPTION */}
        <div
          className={`${styles.card} ${selected === "ai" ? styles.active : ""}`}
          onClick={() => setSelected("ai")}
        >
          <div className={styles.cardHeader}>
            <div className={styles.icon}>🎤</div>
            <div>
              <span className={styles.badge}>AI-POWERED</span>
              <h3>AI Voice Interview (Vapi)</h3>
            </div>
          </div>

          <p className={styles.desc}>
            Real-time voice interview with adaptive AI.
          </p>

          <ul className={styles.features}>
            <li>Real-time conversation</li>
            <li>Adaptive follow-up</li>
            <li>Human-like experience</li>
            <li>Best for practice</li>
          </ul>

          <button
            className={styles.primaryBtn}
            type="button"
            onClick={() => router.push("/interview")}
          >
            Create with AI →
          </button>
        </div>

        {/* MANUAL OPTION */}
        <div
          className={`${styles.card} ${
            selected === "manual" ? styles.active : ""
          }`}
          onClick={() => setSelected("manual")}
        >
          <div className={styles.cardHeader}>
            <div className={styles.icon}>✏️</div>
            <div>
              <span className={styles.badgeOutline}>MANUAL</span>
              <h3>Manual Interview Setup</h3>
            </div>
          </div>

          <p className={styles.desc}>
            Customize questions and interview structure manually.
          </p>

          <ul className={styles.features}>
            <li>Full control</li>
            <li>Custom difficulty</li>
            <li>Add questions</li>
            <li>Focused prep</li>
          </ul>

          <button
            className={styles.secondaryBtn}
            type="button"
            onClick={() => router.push("/dashboard/interview-manual")}
          >
            Create Manually →
          </button>
        </div>
      </div>

      {/* Info Box */}
      <div className={styles.infoBox}>
        <p>
          💡 AI Voice is best for real interviews. Manual gives full control.
        </p>
      </div>

      {/* Steps */}
      <div className={styles.steps}>
        <h3>What’s Next?</h3>

        <div className={styles.stepsRow}>
          {[
            {
              title: "Choose Method",
              desc: "Select how you want to create your interview",
              icon: "👤",
            },
            {
              title: "Configure Details",
              desc: "Add role, level, and topics",
              icon: "🎯",
            },
            {
              title: "Start Interview",
              desc: "Begin your interview session",
              icon: "📄",
            },
            {
              title: "AI Evaluation",
              desc: "Get analyzed and scored",
              icon: "📊",
            },
            {
              title: "Feedback & Insights",
              desc: "Receive detailed feedback",
              icon: "⭐",
            },
          ].map((step, i) => (
            <div key={i} className={styles.stepItem}>
              <div className={styles.iconCircle}>{step.icon}</div>

              <span className={styles.stepLabel}>Step {i + 1}</span>

              <h4>{step.title}</h4>
              <p>{step.desc}</p>

              {i !== 4 && <div className={styles.arrow}>→</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
