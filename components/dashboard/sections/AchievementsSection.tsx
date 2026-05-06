"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Trophy, Calendar, Flame, BarChart3,
  Star, Lock, Mic, Target, Brain, Check,
} from "lucide-react";
import styles from "./AchievementsSection.module.css";

/* ── Types ─────────────────────────────────────────────── */
type TimeRange = "all" | "month" | "week";
type MsStatus  = "completed" | "in_progress" | "locked";

type ApiResponse = {
  stats: {
    achievementsUnlocked: number;
    streakDays: number;
    interviewsCompleted: number;
    level: number;
    xp: number;
    xpTotal: number;
    nextLevelXp: number;
  };
  badges: { id: string; earned: boolean }[];
  milestones: { id: string; status: MsStatus; date?: string }[];
};

/* ── Badge definitions ─────────────────────────────────── */
type BadgeDef = {
  id: string;
  name: string;
  desc: string;
  tone: "purple" | "blue" | "gold" | "slate";
  icon: React.ReactNode;
};

const BADGE_DEFS: BadgeDef[] = [
  { id: "first-interview",  name: "First Interview",  desc: "Completed your first interview",  tone: "purple", icon: <Mic    size={26} /> },
  { id: "streak-7",         name: "7-Day Streak",     desc: "Active for 7 days in a row",      tone: "blue",   icon: <Calendar size={24} /> },
  { id: "focused-learner",  name: "Focused Learner",  desc: "Completed 10 interviews",         tone: "purple", icon: <Target size={24} /> },
  { id: "consistent-pro",   name: "Consistent Pro",   desc: "Maintain a 30-day streak",        tone: "blue",   icon: <Brain  size={24} /> },
  { id: "top-performer",    name: "Top Performer",    desc: "Achieved 60% average score",      tone: "gold",   icon: <Trophy size={24} /> },
  { id: "master-achiever",  name: "Master Achiever",  desc: "Complete 50 interviews",          tone: "slate",  icon: <Lock   size={22} /> },
];

/* ── Milestone definitions ─────────────────────────────── */
type MsDef = { id: string; title: string; sub: string; target: number | null };

const MS_DEFS: MsDef[] = [
  { id: "first-steps",      title: "First Steps",      sub: "Sign up to Nexus",              target: null },
  { id: "first-interview",  title: "First Interview",  sub: "Complete your first interview", target: null },
  { id: "five-interviews",  title: "5 Interviews",     sub: "Complete 5 interviews",         target: 5    },
  { id: "ten-interviews",   title: "10 Interviews",    sub: "Complete 10 interviews",        target: 10   },
  { id: "twenty-five",      title: "25 Interviews",    sub: "Complete 25 interviews",        target: 25   },
  { id: "fifty",            title: "50 Interviews",    sub: "Complete 50 interviews",        target: 50   },
];

/* ── Component ─────────────────────────────────────────── */
export default function AchievementsSection() {
  const [range,   setRange]   = useState<TimeRange>("all");
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);
  const [data,    setData]    = useState<ApiResponse | null>(null);

  useEffect(() => {
    let alive = true;
    const ctrl = new AbortController();

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/achievements?range=${range}`, {
          signal: ctrl.signal,
          cache: "no-store",
        });
        if (!res.ok) throw new Error(res.status === 401 ? "Please sign in." : "Failed to load.");
        const json = (await res.json()) as ApiResponse;
        if (alive) setData(json);
      } catch (e) {
        if (!alive || (e instanceof DOMException && e.name === "AbortError")) return;
        setError(e instanceof Error ? e.message : "Something went wrong.");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => { alive = false; ctrl.abort(); };
  }, [range]);

  /* Earned map */
  const earnedMap = useMemo(() => {
    const m = new Map<string, boolean>();
    for (const b of data?.badges ?? []) m.set(b.id, b.earned);
    return m;
  }, [data]);

  /* Milestone map */
  const msMap = useMemo(() => {
    const m = new Map<string, { status: MsStatus; date?: string }>();
    for (const ms of data?.milestones ?? []) m.set(ms.id, { status: ms.status, date: ms.date });
    return m;
  }, [data]);

  const stats  = data?.stats;
  const xpPct  = stats ? Math.min(100, Math.round((stats.xp / (stats.xpTotal || 1)) * 100)) : 0;

  /* Connector colour between milestone i and i+1 */
  function connectorColor(i: number): "purple" | "fade" | "none" {
    const curr = msMap.get(MS_DEFS[i].id)?.status     ?? "locked";
    const next = msMap.get(MS_DEFS[i + 1]?.id)?.status ?? "locked";
    if (curr === "completed" && next === "completed")   return "purple";
    if (curr === "completed" && next !== "completed")   return "fade";
    return "none";
  }

  /* Icon inside milestone node */
  function msIcon(def: MsDef, status: MsStatus) {
    if (status === "completed")  return <Check size={20} />;
    if (status === "in_progress") return <span className={styles.msNodeLabel}>{def.target}</span>;
    return <Lock size={18} />;
  }

  return (
    <section className={styles.page}>

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerIcon}><Trophy size={22} /></div>
          <div>
            <h1 className={styles.title}>Achievements</h1>
            <p className={styles.subtitle}>Track your progress and celebrate your milestones.</p>
          </div>
        </div>

        <div className={styles.filter}>
          <span className={styles.filterIcon}><Calendar size={15} /></span>
          <select
            value={range}
            onChange={(e) => setRange(e.target.value as TimeRange)}
            className={styles.filterSelect}
            aria-label="Time range"
          >
            <option value="all">All Time</option>
            <option value="month">This Month</option>
            <option value="week">This Week</option>
          </select>
        </div>
      </header>

      {/* Loading / Error */}
      {(loading || error) && (
        <div className={styles.stateBox}>
          {loading ? "Loading your achievements…" : error}
        </div>
      )}

      {/* ── Stats ── */}
      <div className={styles.statsGrid}>

        {/* Achievements */}
        <div className={styles.statCard}>
          <div className={styles.statIconWrap} data-tone="purple"><Trophy size={18} /></div>
          <div className={styles.statNum}>{stats?.achievementsUnlocked ?? "—"}</div>
          <div className={styles.statLabel}>Achievements Unlocked</div>
          <div className={styles.statHint} data-tone="green">Keep growing!</div>
        </div>

        {/* Streak */}
        <div className={styles.statCard}>
          <div className={styles.statIconWrap} data-tone="orange"><Flame size={18} /></div>
          <div className={styles.statNum}>{stats?.streakDays ?? "—"}</div>
          <div className={styles.statLabel}>Day Streak</div>
          <div className={styles.statHint} data-tone="orange">Keep it going!</div>
        </div>

        {/* Interviews */}
        <div className={styles.statCard}>
          <div className={styles.statIconWrap} data-tone="blue"><BarChart3 size={18} /></div>
          <div className={styles.statNum}>{stats?.interviewsCompleted ?? "—"}</div>
          <div className={styles.statLabel}>Interviews Completed</div>
          <div className={styles.statHint} data-tone="blue">Great work!</div>
        </div>

        {/* Level */}
        <div className={styles.statCard}>
          <div className={styles.levelRow}>
            <div className={styles.statIconWrap} data-tone="green"><Star size={18} /></div>
            <div>
              <div className={styles.levelTitle}>Level {stats?.level ?? "—"}</div>
              <div className={styles.levelSub}>Next Level: {stats?.nextLevelXp ?? "—"} XP</div>
            </div>
          </div>
          <div className={styles.levelBarWrap}>
            <div className={styles.levelBarFill} style={{ width: `${xpPct}%` }} />
          </div>
          <div className={styles.levelMeta}>{stats?.xp ?? "—"} / {stats?.xpTotal ?? "—"} XP</div>
        </div>
      </div>

      {/* ── Badges ── */}
      <section className={styles.panel}>
        <div className={styles.panelHead}>
          <h2 className={styles.panelTitle}>Your Badges</h2>
          <button className={styles.viewAll} type="button">View All →</button>
        </div>

        <div className={styles.badgeGrid}>
          {BADGE_DEFS.map((b) => {
            const earned = !!earnedMap.get(b.id);
            return (
              <div key={b.id} className={styles.badgeCard} data-earned={String(earned)}>
                <div className={styles.badgeHex} data-tone={b.tone}>
                  {b.icon}
                </div>
                <div className={styles.badgeName}>{b.name}</div>
                <div className={styles.badgeDesc}>{b.desc}</div>
                <div className={styles.badgePill} data-earned={String(earned)}>
                  {earned ? "✓ Earned" : "🔒 Locked"}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Milestones ── */}
      <section className={styles.panel}>
        <div className={styles.panelHead}>
          <div>
            <h2 className={styles.panelTitle}>Milestones</h2>
            <p className={styles.panelSub}>Celebrate your journey and unlock new achievements.</p>
          </div>
        </div>

        <div className={styles.msTrack} role="list">
          {MS_DEFS.map((def, i) => {
            const ms     = msMap.get(def.id);
            const status = ms?.status ?? (i === 0 ? "completed" : "locked");
            const color  = i < MS_DEFS.length - 1 ? connectorColor(i) : "none";

            return (
              <div key={def.id} className={styles.msItem} role="listitem">
                {/* Connector line to the right */}
                {i < MS_DEFS.length - 1 && (
                  <div className={styles.msConnector} data-color={color} aria-hidden="true" />
                )}

                {/* Circle node */}
                <div className={styles.msNode} data-status={status}>
                  {msIcon(def, status)}
                </div>

                <div className={styles.msTitle}>{def.title}</div>
                <div className={styles.msSub}>{def.sub}</div>
                {ms?.date && <div className={styles.msDate}>{ms.date}</div>}

                <div className={styles.msPill} data-status={status}>
                  {status === "completed"
                    ? "✓ Completed"
                    : status === "in_progress"
                    ? "In Progress"
                    : "🔒 Locked"}
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </section>
  );
}