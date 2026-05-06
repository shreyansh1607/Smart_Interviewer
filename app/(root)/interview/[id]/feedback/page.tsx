import dayjs from "dayjs";
import Link from "next/link";
import { redirect } from "next/navigation";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";

import DownloadButton from "./DowloadButton";
import styles from "./Feedback.module.css";

const Feedback = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  return (
    <section className={styles["feedback-page"]}>

      {/* HEADER */}
      <div className={styles["feedback-header"]}>
        <div>
          <Link href="/dashboard?tab=interviews" className={styles["back-link"]}>
            ← Back to Interviews
          </Link>

          <h1 className={styles.title}>Interview Feedback</h1>

          <p className={styles.subtitle}>
            {interview.role} Interview
          </p>

          <div className={styles.meta}>
            <span>
              {dayjs(feedback?.createdAt).format("MMM D, YYYY h:mm A")}
            </span>
            <span>• Interview ID: {interview.id}</span>
          </div>
        </div>

        {/* ✅ DOWNLOAD BUTTON */}
        <DownloadButton feedback={feedback} interview={interview} />
      </div>

      {/* GRID */}
      <div className={styles["feedback-grid"]}>

        {/* LEFT */}
        <div className={styles.left}>

          {/* PERFORMANCE */}
          <div className={styles.card}>
            <h3>Performance Breakdown</h3>

            {feedback?.categoryScores.map((item, i) => (
              <div key={i} className={styles["score-item"]}>
                <div className={styles["score-top"]}>
                  <span>{i + 1}. {item.name}</span>
                  <span>{item.score}/100</span>
                </div>

                <div className={styles["progress-bar"]}>
                  <div
                    className={styles["progress-fill"]}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* DETAILED */}
          <div className={styles.card}>
            <h3>Detailed Feedback</h3>

            {feedback?.categoryScores.map((item, i) => (
              <details key={i} className={styles.accordion}>
                <summary>
                  {i + 1}. {item.name}
                  <span>{item.score}/100</span>
                </summary>
                <p>{item.comment}</p>
              </details>
            ))}
          </div>

        </div>

        {/* RIGHT */}
        <div className={styles.right}>

          {/* SCORE */}
          <div className={`${styles.card} ${styles["score-card"]}`}>
            <div
              className={styles.circle}
              style={{
                background: `conic-gradient(#8b5cf6 ${feedback.totalScore}%, #1e293b 0)`
              }}
            >
              <span>{feedback?.totalScore}</span>
              <p>/100</p>
            </div>

            <div>
              <h3>Needs Improvement</h3>
              <p>{feedback?.finalAssessment}</p>
            </div>
          </div>

          {/* SUMMARY */}
          <div className={styles.card}>
            <h3>Summary</h3>
            <p>{feedback?.finalAssessment}</p>
          </div>

          {/* STRENGTHS */}
          <div className={styles.card}>
            <h3 className={styles.green}>Strengths</h3>
            <ul className={styles.list}>
              {feedback?.strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          {/* IMPROVEMENTS */}
          <div className={styles.card}>
            <h3 className={styles.orange}>Areas for Improvement</h3>
            <ul className={`${styles.list} ${styles["orange-list"]}`}>
              {feedback?.areasForImprovement.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      {/* FOOTER */}
      <div className={styles["footer-actions"]}>
        <Link href="/dashboard?tab=interviews" className={styles["btn-secondary"]}>
          Back to Dashboard
        </Link>

        <Link href={`/interview/${id}`} className={styles["btn-primary"]}>
          Retake Interview
        </Link>
      </div>

    </section>
  );
};

export default Feedback;