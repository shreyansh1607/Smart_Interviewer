import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";
import Image from "next/image";
import styles from "./interview.module.css";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <main className={styles.page}>
      <section className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.headerCopy}>
            <p className={styles.kicker}>Interview generation</p>
            <h1 className={styles.title}>Warm up with your AI interviewer</h1>
            <p className={styles.subtitle}>
              Start a voice session and generate your next mock interview. When
              the call ends, you’ll be taken back to your dashboard.
            </p>
          </div>

          <div className={styles.heroCard} aria-hidden="true">
            <div className={styles.heroImageWrap}>
              <Image
                src="/interviewpageimage.png"
                alt=""
                fill
                priority
                className={styles.heroImage}
                sizes="(max-width: 960px) 92vw, 520px"
              />
            </div>
            <div className={styles.heroOverlay} />
          </div>
        </header>

        <section className={styles.agentSection}>
          <div className={styles.agentInner}>
            <Agent userName={user?.name!} userId={user?.id} type="generate" />
          </div>
          <div className={styles.helperRow}>
            <div className={styles.helperChip}>
              Tip: Use headphones for clearer transcription.
            </div>
            <div className={styles.helperChip}>
              You can end anytime with the End button.
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Page;
