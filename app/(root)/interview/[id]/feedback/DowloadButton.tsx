"use client";

import { pdf } from "@react-pdf/renderer";
import FeedbackPDF from "./FeedbackPDF";
import styles from "./Feedback.module.css";

export default function DownloadButton({ feedback, interview }: any) {

  const handleDownload = async () => {
    const blob = await pdf(
      <FeedbackPDF feedback={feedback} interview={interview} />
    ).toBlob();

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "interview-feedback.pdf";
    a.click();
  };

  return (
    <button
      className={styles["download-btn"]}
      onClick={handleDownload}
    >
      Download Report
    </button>
  );
}