"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { db, auth } from "@/firebase/client";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { Play, Eye, RotateCcw, Plus, Search, SlidersHorizontal, Calendar, FileText, ChevronLeft, ChevronRight, TrendingUp, Clock, CheckCircle2, BarChart3 } from "lucide-react";
import styles from "./my-interviews.module.css";

// ─── Tech stack icon colors ───────────────────────────────────────────────────
const TECH_COLORS: Record<string, { bg: string; color: string; short: string }> = {
  "react":      { bg: "#1e3a5f", color: "#61dafb", short: "Re" },
  "react.js":   { bg: "#1e3a5f", color: "#61dafb", short: "Re" },
  "node":       { bg: "#1a3a1a", color: "#68a063", short: "No" },
  "node.js":    { bg: "#1a3a1a", color: "#68a063", short: "No" },
  "express":    { bg: "#1a2a1a", color: "#68b068", short: "Ex" },
  "express.js": { bg: "#1a2a1a", color: "#68b068", short: "Ex" },
  "mongodb":    { bg: "#1a3a1a", color: "#4db33d", short: "Mo" },
  "python":     { bg: "#1e3a5f", color: "#ffd43b", short: "Py" },
  "typescript": { bg: "#1e3060", color: "#3178c6", short: "Ts" },
  "javascript": { bg: "#3a3000", color: "#f7df1e", short: "Js" },
  "java":       { bg: "#3a1a00", color: "#f89820", short: "Ja" },
  "c++":        { bg: "#1a1a3a", color: "#9c88ff", short: "C+" },
  "aws":        { bg: "#3a2000", color: "#ff9900", short: "Aw" },
  "docker":     { bg: "#1a2a3a", color: "#2496ed", short: "Do" },
  "git":        { bg: "#3a1a1a", color: "#f05032", short: "Gi" },
  "github":     { bg: "#1a1a2a", color: "#ffffff", short: "Gh" },
  "postgresql": { bg: "#1a2a3a", color: "#336791", short: "Pg" },
  "mysql":      { bg: "#1a2a3a", color: "#4479a1", short: "My" },
  "redis":      { bg: "#3a1a1a", color: "#dc382d", short: "Rd" },
  "graphql":    { bg: "#2a1a3a", color: "#e10098", short: "Gq" },
  "flutter":    { bg: "#1a2a3a", color: "#02569b", short: "Fl" },
  "swift":      { bg: "#3a1a00", color: "#fa7343", short: "Sw" },
  "kotlin":     { bg: "#1a1a3a", color: "#7f52ff", short: "Ko" },
  "mern stack": { bg: "#1e3a5f", color: "#61dafb", short: "ME" },
  "linux":      { bg: "#2a2a1a", color: "#fcc624", short: "Li" },
  "postman":    { bg: "#3a1a00", color: "#ff6c37", short: "Pm" },
  "restful apis": { bg: "#1a3a3a", color: "#00d4aa", short: "RA" },
  "agile development": { bg: "#1a2a3a", color: "#a78bfa", short: "Ag" },
};

function getTechStyle(tech: string) {
  const key = tech.trim().toLowerCase();
  return TECH_COLORS[key] || { bg: "#1a1a2e", color: "#a78bfa", short: tech.trim().slice(0, 2).toUpperCase() };
}

function TechBadge({ tech }: { tech: string }) {
  const style = getTechStyle(tech);
  return (
    <span className={styles.techBadge} style={{ background: style.bg, color: style.color, borderColor: style.color + "33" }}>
      {tech.trim()}
    </span>
  );
}

function CoverIcon({ techstack, coverImage }: { techstack: string[]; coverImage?: string }) {
  const primary = techstack?.[0] || "";
  const style = getTechStyle(primary);
  return (
    <div className={styles.coverIcon} style={{ background: style.bg, borderColor: style.color + "44" }}>
      <span style={{ color: style.color, fontSize: "1.4rem", fontWeight: 800 }}>{style.short}</span>
    </div>
  );
}

const ITEMS_PER_PAGE = 5;

type Interview = {
  id: string;
  role: string;
  type: string;
  level: string;
  techstack: string[];
  questions: string[];
  createdAt: string;
  coverImage?: string;
  finalized?: boolean;
  userId: string;
  hasFeedback: boolean;
  feedbackId: string | null;
  score?: number;
  completedAt?: string;
};

export default function MyInterviewsSection() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // filters
  const [activeFilter, setActiveFilter] = useState<"all" | "pending" | "completed">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest" | "score">("latest");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchInterviews = async () => {
      setLoading(true);
      const user = auth.currentUser;
      if (!user) return setLoading(false);

      const q = query(
        collection(db, "interviews"),
        where("userId", "==", user.uid)
      );
      const snapshot = await getDocs(q);

      const data = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const interview = { id: doc.id, ...doc.data() } as Interview;
          const feedbackQ = query(
            collection(db, "feedback"),
            where("interviewId", "==", doc.id),
            where("userId", "==", user.uid)
          );
          const feedbackSnap = await getDocs(feedbackQ);
          const feedbackDoc = feedbackSnap.empty ? null : feedbackSnap.docs[0];
          return {
            ...interview,
            hasFeedback: !feedbackSnap.empty,
            feedbackId: feedbackDoc?.id || null,
            score: feedbackDoc?.data()?.totalScore || null,
          };
        })
      );

      setInterviews(data);
      setLoading(false);
    };
    fetchInterviews();
  }, []);

  // ─── Stats ───────────────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const total = interviews.length;
    const completed = interviews.filter((i) => i.hasFeedback).length;
    const pending = interviews.filter((i) => !i.hasFeedback).length;
    const scores = interviews.filter((i) => i.score).map((i) => i.score as number);
    const avgScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
    return { total, completed, pending, avgScore };
  }, [interviews]);

  // ─── Unique roles & types for filters ────────────────────────────────────────
  const roles = useMemo(() => ["all", ...Array.from(new Set(interviews.map((i) => i.role)))], [interviews]);
  const types = useMemo(() => ["all", ...Array.from(new Set(interviews.map((i) => i.type)))], [interviews]);

  // ─── Filtered & sorted list ───────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = [...interviews];

    if (activeFilter === "pending") list = list.filter((i) => !i.hasFeedback);
    if (activeFilter === "completed") list = list.filter((i) => i.hasFeedback);
    if (roleFilter !== "all") list = list.filter((i) => i.role === roleFilter);
    if (typeFilter !== "all") list = list.filter((i) => i.type === typeFilter);
    if (searchQuery) list = list.filter((i) => i.role.toLowerCase().includes(searchQuery.toLowerCase()) || i.techstack?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

    if (sortOrder === "latest") list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    if (sortOrder === "oldest") list.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    if (sortOrder === "score") list.sort((a, b) => (b.score || 0) - (a.score || 0));

    return list;
  }, [interviews, activeFilter, roleFilter, typeFilter, searchQuery, sortOrder]);

  // ─── Pagination ───────────────────────────────────────────────────────────────
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleFilterChange = (f: "all" | "pending" | "completed") => {
    setActiveFilter(f);
    setCurrentPage(1);
  };

  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 86400000);
    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    if (diff < 7) return `${diff} days ago`;
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  }

  return (
    <div className={styles.section}>

      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerIcon}><FileText size={22} /></div>
          <div>
            <h1 className={styles.title}>My Interviews</h1>
            <p className={styles.subtitle}>View and manage all your interview sessions</p>
          </div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.searchBox}>
            <Search size={15} className={styles.searchIcon} />
            <input
              className={styles.searchInput}
              placeholder="Search interviews..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <button className={styles.newBtn} onClick={() => router.push("/dashboard/interview-manual")}>
            <Plus size={16} /> New Interview
          </button>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className={styles.statsGrid}>
        {[
          { icon: <FileText size={20} />, label: "Total Interviews", value: stats.total, sub: "All time", color: "#6366f1" },
          { icon: <Clock size={20} />, label: "Pending", value: stats.pending, sub: "To be completed", color: "#f59e0b" },
          { icon: <CheckCircle2 size={20} />, label: "Completed", value: stats.completed, sub: "Interviews done", color: "#22c55e" },
          { icon: <BarChart3 size={20} />, label: "Average Score", value: stats.avgScore !== null ? `${stats.avgScore}%` : "—", sub: "Across all completed", color: "#3b82f6" },
        ].map((s) => (
          <div key={s.label} className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: s.color + "22", color: s.color }}>{s.icon}</div>
            <div>
              <div className={styles.statValue}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
              <div className={styles.statSub} style={{ color: s.color }}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Filters bar ── */}
      <div className={styles.filtersBar}>
        <div className={styles.tabGroup}>
          {(["all", "pending", "completed"] as const).map((f) => (
            <button key={f} onClick={() => handleFilterChange(f)} className={`${styles.tab} ${activeFilter === f ? styles.tabActive : ""}`}>
              {f === "all" ? "All Interviews" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className={styles.filterGroup}>
          <select className={styles.select} value={roleFilter} onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }}>
            {roles.map((r) => <option key={r} value={r}>{r === "all" ? "All Roles" : r}</option>)}
          </select>
          <select className={styles.select} value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}>
            {types.map((t) => <option key={t} value={t}>{t === "all" ? "All Types" : t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
          </select>
          <select className={styles.select} value={sortOrder} onChange={(e) => setSortOrder(e.target.value as any)}>
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
            <option value="score">Highest Score</option>
          </select>
        </div>
      </div>

      {/* ── List ── */}
      <div className={styles.list}>
        {loading ? (
          <div className={styles.empty}>Loading your interviews...</div>
        ) : paginated.length === 0 ? (
          <div className={styles.empty}>No interviews found.</div>
        ) : (
          paginated.map((interview) => {
            const MAX_VISIBLE = 4;
            const visibleTech = interview.techstack?.slice(0, MAX_VISIBLE) || [];
            const extraCount = (interview.techstack?.length || 0) - MAX_VISIBLE;

            return (
              <div key={interview.id} className={styles.card}>
                <div className={styles.cardLeft}>
                  <CoverIcon techstack={interview.techstack} coverImage={interview.coverImage} />
                  <div className={styles.cardInfo}>
                    <div className={styles.cardTitleRow}>
                      <span className={styles.cardTitle}>{interview.role} Interview</span>
                      <span className={styles.cardType} style={{ background: interview.type === "technical" ? "#1e3a5f" : interview.type === "balanced" ? "#1a3a1a" : "#2a1a3a", color: interview.type === "technical" ? "#60a5fa" : interview.type === "balanced" ? "#4ade80" : "#c084fc" }}>
                        {interview.type?.charAt(0).toUpperCase() + interview.type?.slice(1)}
                      </span>
                    </div>
                    <div className={styles.cardMeta}>
                      <span className={styles.cardRole}>{interview.role}</span>
                      <span className={styles.cardDot}>•</span>
                      <span className={styles.cardLevel} style={{ color: "#a78bfa" }}>{interview.level}</span>
                    </div>
                    <div className={styles.techList}>
                      {visibleTech.map((t) => <TechBadge key={t} tech={t} />)}
                      {extraCount > 0 && <span className={styles.techExtra}>+{extraCount}</span>}
                    </div>
                  </div>
                </div>

                <div className={styles.cardMid}>
                  <div className={styles.cardStat}>
                    <FileText size={14} />
                    <span>{interview.questions?.length || 0} Questions</span>
                  </div>
                </div>

                <div className={styles.cardRight}>
                  <div className={styles.dateInfo}>
                    <div className={styles.dateRow}>
                      <Calendar size={13} />
                      <span>{formatDate(interview.createdAt)}</span>
                    </div>
                    <div className={styles.dateSubRow}>
                      {interview.hasFeedback ? "Completed" : "Added"} {formatDate(interview.createdAt)}
                    </div>
                  </div>

                  <div className={styles.cardActions}>
                    <span className={`${styles.statusBadge} ${interview.hasFeedback ? styles.statusCompleted : styles.statusPending}`}>
                      {interview.hasFeedback ? <><CheckCircle2 size={12} /> Completed</> : <><Clock size={12} /> Pending</>}
                    </span>

                    {!interview.hasFeedback ? (
                      <button className={styles.btnPrimary} onClick={() => router.push(`/interview/${interview.id}`)}>
                        <Play size={14} /> Start Interview
                      </button>
                    ) : (
                      <>
                        <button className={styles.btnPrimary} onClick={() => router.push(`/interview/${interview.id}/feedback`)}>
                          <BarChart3 size={14} /> View Feedback
                        </button>
                        <button className={styles.btnSecondary} onClick={() => router.push(`/interview/${interview.id}`)}>
                          <RotateCcw size={14} /> Retry Interview
                        </button>
                      </>
                    )}
                    <button className={styles.btnGhost} onClick={() => router.push(`/interview/${interview.id}`)}>
                      View Details <ChevronRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button className={styles.pageBtn} onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button key={p} onClick={() => setCurrentPage(p)} className={`${styles.pageBtn} ${currentPage === p ? styles.pageBtnActive : ""}`}>
              {p}
            </button>
          ))}
          <button className={styles.pageBtn} onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}