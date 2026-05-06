"use client";

import styles from "./sections.module.css";
import { Lightbulb, AlertCircle, CheckCircle } from "lucide-react";

export default function FeedbackSection() {
  const feedbackItems = [
    {
      id: 1,
      title: "Communication Skills",
      score: 85,
      type: "strong",
      content:
        "You explained your thought process clearly. Continue practicing to improve technical depth.",
    },
    {
      id: 2,
      title: "Problem-Solving Approach",
      score: 78,
      type: "improvement",
      content:
        "Consider breaking down problems step-by-step. Try the STAR method for better structure.",
    },
    {
      id: 3,
      title: "Code Quality",
      score: 90,
      type: "strong",
      content:
        "Excellent code structure and readability. Great use of design patterns.",
    },
    {
      id: 4,
      title: "Time Management",
      score: 72,
      type: "improvement",
      content:
        "You spent too much time on initial analysis. Practice managing your time better.",
    },
  ];

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h1 className={styles.title}>AI-Generated Feedback 💬</h1>
        <p className={styles.subtitle}>
          Detailed insights from your latest interview performance
        </p>
      </div>

      <div className={styles.feedbackList}>
        {feedbackItems.map((item) => (
          <div key={item.id} className={styles.feedbackCard}>
            <div className={styles.feedbackHeader}>
              <div>
                <h3 className={styles.feedbackTitle}>{item.title}</h3>
              </div>
              <div className={styles.feedbackScore}>{item.score}</div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 12px",
                background:
                  item.type === "strong"
                    ? "rgba(126, 202, 112, 0.1)"
                    : "rgba(255, 193, 7, 0.1)",
                borderRadius: "8px",
                borderLeft: `3px solid ${item.type === "strong" ? "#7eca70" : "#ffc107"}`,
                width: "fit-content",
              }}
            >
              {item.type === "strong" ? (
                <CheckCircle size={14} color="#7eca70" />
              ) : (
                <AlertCircle size={14} color="#ffc107" />
              )}
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  color: item.type === "strong" ? "#7eca70" : "#ffc107",
                }}
              >
                {item.type === "strong" ? "Strength" : "Improvement Area"}
              </span>
            </div>

            <p className={styles.feedbackText}>{item.content}</p>
          </div>
        ))}
      </div>

      <div
        style={{
          padding: "20px",
          background:
            "linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(124, 58, 237, 0.04) 100%)",
          border: "1px solid rgba(168, 85, 247, 0.15)",
          borderRadius: "16px",
          display: "flex",
          gap: "12px",
        }}
      >
        <Lightbulb size={20} color="#a855f7" style={{ flexShrink: 0 }} />
        <div>
          <p
            style={{
              fontSize: "14px",
              fontWeight: "700",
              color: "#e8f6ff",
              margin: "0 0 8px",
            }}
          >
            Pro Tip for Your Next Interview
          </p>
          <p style={{ fontSize: "13px", color: "#89a8c2", margin: "0" }}>
            Focus on algorithmic complexity analysis. Practice Big O notation
            explanations and trade-off discussions in your solutions.
          </p>
        </div>
      </div>
    </div>
  );
}
