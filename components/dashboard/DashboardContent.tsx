"use client";

import styles from "./DashboardContent.module.css";
import OverviewSection from "./sections/OverviewSection";
import CreateInterviewSection from "./sections/CreateInterviewSection";
import MyInterviewsSection from "./sections/MyInterviewsSection";
import AnalyticsSection from "./sections/AnalyticsSection";
import FeedbackSection from "./sections/FeedbackSection";
import ImprovementsSection from "./sections/ImprovementsSection";
import AchievementsSection from "./sections/AchievementsSection";
import SettingsSection from "./sections/SettingsSection";

interface DashboardContentProps {
  activeTab: string;
}

export default function DashboardContent({ activeTab }: DashboardContentProps) {
  const renderContent = () => {
    switch (activeTab) {
      case "create":
        return <CreateInterviewSection />;
      case "interviews":
        return <MyInterviewsSection />;
      case "overview":
        return <OverviewSection />;
      // case "analytics":
      //   return <AnalyticsSection />;
      case "achievements":
        return <AchievementsSection />;
      case "feedback":
        return <FeedbackSection />;
      case "improvements":
        return <ImprovementsSection />;
      case "settings":
        return <SettingsSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <main className={styles.content}>
      <div className={styles.wrapper}>{renderContent()}</div>
    </main>
  );
}
