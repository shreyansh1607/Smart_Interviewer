import Image from "next/image";
import { redirect } from "next/navigation";

import Agent from "@/components/Agent";
import { getRandomInterviewCover } from "@/lib/utils";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";
import DisplayTechIcons from "@/components/DisplayTechIcons";
import styles from "./session.module.css";

const InterviewDetails = async ({ params }: RouteParams) => {
  const { id } = await params;

  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  return (
    <main className={styles.page}>
      <section className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.left}>
            <div className={styles.titleRow}>
              <div className={styles.cover}>
                <Image
                  src={getRandomInterviewCover()}
                  alt="cover-image"
                  fill
                  sizes="40px"
                  className={styles.coverImg}
                />
              </div>
              <div className={styles.titleBlock}>
                <h1 className={styles.title}>
                  <span className={styles.role}>{interview.role}</span> Interview
                </h1>
                <p className={styles.subtitle}>
                  Stay concise. Use the transcript panel to track what’s being
                  captured.
                </p>
              </div>
            </div>

            <div className={styles.techRow}>
              <DisplayTechIcons techStack={interview.techstack} />
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.badge} title="Interview type">
              {interview.type}
            </div>
            <div className={styles.meta}>
              Voice session • Transcript reserved • Single-screen layout
            </div>
          </div>
        </header>

        <section className={styles.agentSection}>
          <Agent
            userName={user?.name!}
            userId={user?.id}
            interviewId={id}
            type="interview"
            questions={interview.questions}
            feedbackId={feedback?.id}
          />
        </section>
      </section>
    </main>
  );
};

export default InterviewDetails;
