"use client";

import styles from "./sections.module.css";

export default function ImprovementsSection() {
  const improvements = [
    {
      id: 1,
      title: "System Design Mastery",
      description: "Master distributed systems and scalability concepts",
      progress: 65,
      target: 90,
    },
    {
      id: 2,
      title: "Algorithm Optimization",
      description: "Improve your problem-solving speed and efficiency",
      progress: 78,
      target: 95,
    },
    {
      id: 3,
      title: "Communication Excellence",
      description: "Enhance your technical communication skills",
      progress: 82,
      target: 92,
    },
    {
      id: 4,
      title: "Behavioral Questions",
      description: "Master storytelling and STAR method responses",
      progress: 71,
      target: 90,
    },
    {
      id: 5,
      title: "Code Quality & Standards",
      description: "Write cleaner, more maintainable code",
      progress: 88,
      target: 96,
    },
    {
      id: 6,
      title: "Time Management",
      description: "Complete interviews within time limits",
      progress: 59,
      target: 85,
    },
  ];

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h1 className={styles.title}>Your Improvement Path 📈</h1>
        <p className={styles.subtitle}>
          Track your progress and focus on areas that need attention
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          padding: "16px",
          background:
            "linear-gradient(135deg, rgba(126, 202, 112, 0.1) 0%, rgba(126, 202, 112, 0.05) 100%)",
          border: "1px solid rgba(126, 202, 112, 0.2)",
          borderRadius: "12px",
          marginBottom: "16px",
        }}
      >
        <p
          style={{
            fontSize: "13px",
            fontWeight: "700",
            color: "#7eca70",
            margin: "0",
          }}
        >
          ✅ Good Progress
        </p>
        <p style={{ fontSize: "13px", color: "#9ab2cd", margin: "0" }}>
          You've improved 15% overall in the last 2 weeks. Keep up the momentum!
        </p>
      </div>

      <div className={styles.improvementsGrid}>
        {improvements.map((item) => (
          <div key={item.id} className={styles.improvementCard}>
            <h3 className={styles.improvementTitle}>{item.title}</h3>
            <p className={styles.improvementDesc}>{item.description}</p>

            <div className={styles.improvementProgress}>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${item.progress}%` }}
                />
              </div>
              <div className={styles.progressText}>
                <span>{item.progress}%</span>
                <span>Goal: {item.target}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        <div
          style={{
            padding: "20px",
            background:
              "linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(124, 58, 237, 0.04) 100%)",
            border: "1px solid rgba(168, 85, 247, 0.15)",
            borderRadius: "12px",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              color: "#89a8c2",
              margin: "0 0 8px",
              textTransform: "uppercase",
            }}
          >
            Focus Areas
          </p>
          <p
            style={{
              fontSize: "14px",
              color: "#e8f6ff",
              margin: "0",
              fontWeight: "600",
            }}
          >
            System Design, Time Mgmt
          </p>
        </div>

        <div
          style={{
            padding: "20px",
            background:
              "linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(124, 58, 237, 0.04) 100%)",
            border: "1px solid rgba(168, 85, 247, 0.15)",
            borderRadius: "12px",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              color: "#89a8c2",
              margin: "0 0 8px",
              textTransform: "uppercase",
            }}
          >
            Next Milestone
          </p>
          <p
            style={{
              fontSize: "14px",
              color: "#e8f6ff",
              margin: "0",
              fontWeight: "600",
            }}
          >
            85% Average Score
          </p>
        </div>

        <div
          style={{
            padding: "20px",
            background:
              "linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(124, 58, 237, 0.04) 100%)",
            border: "1px solid rgba(168, 85, 247, 0.15)",
            borderRadius: "12px",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              color: "#89a8c2",
              margin: "0 0 8px",
              textTransform: "uppercase",
            }}
          >
            Estimated Time
          </p>
          <p
            style={{
              fontSize: "14px",
              color: "#e8f6ff",
              margin: "0",
              fontWeight: "600",
            }}
          >
            3-4 Weeks
          </p>
        </div>
      </div>
    </div>
  );
}
