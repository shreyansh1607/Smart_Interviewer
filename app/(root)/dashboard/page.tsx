"use client";

import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardContent from "@/components/dashboard/DashboardContent";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("interviews");

  return (
  <div className={styles.dashboardContainer}>
    <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
    <div className={styles.dashboardMain}>
      <DashboardContent activeTab={activeTab} />
    </div>
  </div>
);
}
