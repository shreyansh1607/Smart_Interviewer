"use client";

import styles from "./sections.module.css";
import { TrendingUp, BarChart3, PieChart, Calendar } from "lucide-react";

export default function AnalyticsSection() {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h1 className={styles.title}>Your Analytics 📊</h1>
        <p className={styles.subtitle}>
          Deep dive into your performance metrics and insights
        </p>
      </div>

      <div className={styles.analyticsGrid}>
        <div className={styles.chartCard}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <BarChart3 size={20} color="#a855f7" />
            <h3 className={styles.chartTitle}>Interview Performance</h3>
          </div>
          <div className={styles.chartPlaceholder}>
            Chart showing your score progression over time
          </div>
        </div>

        <div className={styles.chartCard}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <PieChart size={20} color="#7c3aed" />
            <h3 className={styles.chartTitle}>Skills Distribution</h3>
          </div>
          <div className={styles.chartPlaceholder}>
            Pie chart of your skill areas
          </div>
        </div>

        <div className={styles.chartCard}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <TrendingUp size={20} color="#a855f7" />
            <h3 className={styles.chartTitle}>Growth Trend</h3>
          </div>
          <div className={styles.chartPlaceholder}>
            Your improvement trajectory
          </div>
        </div>

        <div className={styles.chartCard}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Calendar size={20} color="#7c3aed" />
            <h3 className={styles.chartTitle}>Activity Timeline</h3>
          </div>
          <div className={styles.chartPlaceholder}>
            Your interview activity heatmap
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        {[
          { label: "Avg Score", value: "84%", trend: "+5%" },
          { label: "Total Time", value: "24.5h", trend: "+3.5h" },
          { label: "Consistency", value: "92%", trend: "Excellent" },
          { label: "Rank", value: "Top 15%", trend: "📈" },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              padding: "16px",
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
              {stat.label}
            </p>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "800",
                color: "#e8f6ff",
                marginBottom: "4px",
              }}
            >
              {stat.value}
            </div>
            <p style={{ fontSize: "12px", color: "#7eca70", margin: "0" }}>
              {stat.trend}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
