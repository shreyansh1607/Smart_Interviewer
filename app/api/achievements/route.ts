import { NextResponse } from "next/server";
import { db } from "@/firebase/admin";
import { getCurrentUser } from "@/lib/actions/auth.action";

type TimeRange = "all" | "month" | "week";

function parseRange(input: string | null): TimeRange {
  if (input === "week" || input === "month" || input === "all") return input;
  return "all";
}

function startOfDayUTC(d: Date) {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

function addDaysUTC(d: Date, days: number) {
  const next = new Date(d);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function toDayKeyUTC(dateIso: string) {
  const d = new Date(dateIso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
}

function withinRange(createdAtIso: string | undefined, range: TimeRange) {
  if (!createdAtIso) return false;
  if (range === "all") return true;

  const d = new Date(createdAtIso);
  if (Number.isNaN(d.getTime())) return false;

  const now = new Date();
  const end = addDaysUTC(startOfDayUTC(now), 1); // exclusive
  const start =
    range === "week"
      ? addDaysUTC(startOfDayUTC(now), -7)
      : addDaysUTC(startOfDayUTC(now), -30);

  return d >= start && d < end;
}

function computeStreakFromDayKeys(dayKeys: string[]) {
  const set = new Set(dayKeys);
  const today = startOfDayUTC(new Date()).toISOString().slice(0, 10);
  let streak = 0;
  let cursor = today;
  while (set.has(cursor)) {
    streak += 1;
    const d = new Date(cursor + "T00:00:00.000Z");
    cursor = addDaysUTC(d, -1).toISOString().slice(0, 10);
  }
  return streak;
}

export async function GET(request: Request) {
  const user = await getCurrentUser();
  const userId = user?.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const range = parseRange(new URL(request.url).searchParams.get("range"));

  const [interviewsSnap, feedbackSnap] = await Promise.all([
    db.collection("interviews").where("userId", "==", userId).get(),
    db.collection("feedback").where("userId", "==", userId).get(),
  ]);

  const interviews = interviewsSnap.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as { createdAt?: string }),
  }));

  const feedbacks = feedbackSnap.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as { createdAt?: string; totalScore?: number; interviewId?: string }),
  }));

  const interviewsInRange = interviews.filter((i) => withinRange(i.createdAt, range));
  const feedbacksInRange = feedbacks.filter((f) => withinRange(f.createdAt, range));

  const completedInterviewIds = new Set(
    feedbacksInRange.map((f) => f.interviewId).filter(Boolean) as string[]
  );

  const interviewsCompleted = completedInterviewIds.size;

  const avgScore =
    feedbacksInRange.length > 0
      ? Math.round(
          feedbacksInRange.reduce((acc, f) => acc + (f.totalScore || 0), 0) /
            feedbacksInRange.length
        )
      : 0;

  const activityDays: string[] = [];
  for (const i of interviewsInRange) {
    const key = i.createdAt ? toDayKeyUTC(i.createdAt) : null;
    if (key) activityDays.push(key);
  }
  for (const f of feedbacksInRange) {
    const key = f.createdAt ? toDayKeyUTC(f.createdAt) : null;
    if (key) activityDays.push(key);
  }

  const streakDays = computeStreakFromDayKeys(activityDays);

  // XP/Level (computed, not persisted)
  const xpTotal = 1000;
  const xpAllTimeBase = Math.max(0, interviewsCompleted) * 120 + Math.max(0, streakDays) * 40;
  const xpBonus = avgScore >= 60 ? 120 : avgScore >= 80 ? 220 : 0;
  const xpRaw = xpAllTimeBase + xpBonus;
  const level = Math.floor(xpRaw / xpTotal) + 1;
  const xp = xpRaw % xpTotal;

  // Badge rules
  const earnedFirstInterview = interviewsCompleted >= 1;
  const earnedStreak7 = streakDays >= 7;
  const earnedFocused = interviewsCompleted >= 10;
  const earnedConsistent = streakDays >= 30;
  const earnedTop = avgScore >= 60 && interviewsCompleted >= 1;
  const earnedMaster = interviewsCompleted >= 50;

  const badges = [
    { id: "first-interview", earned: earnedFirstInterview },
    { id: "streak-7", earned: earnedStreak7 },
    { id: "focused-learner", earned: earnedFocused },
    { id: "consistent-pro", earned: earnedConsistent },
    { id: "top-performer", earned: earnedTop },
    { id: "master-achiever", earned: earnedMaster },
  ];

  const achievementsUnlocked = badges.filter((b) => b.earned).length;

  const milestones = [
    { id: "first-steps", target: 0 },
    { id: "first-interview", target: 1 },
    { id: "five-interviews", target: 5 },
    { id: "ten-interviews", target: 10 },
    { id: "twenty-five", target: 25 },
    { id: "fifty", target: 50 },
  ].map((m) => {
    const status =
      interviewsCompleted >= m.target
        ? "completed"
        : interviewsCompleted >= Math.max(0, m.target - 1)
          ? "in_progress"
          : "locked";
    return { id: m.id, status };
  });

  return NextResponse.json({
    range,
    stats: {
      achievementsUnlocked,
      streakDays,
      interviewsCompleted,
      level,
      xp,
      xpTotal,
      nextLevelXp: Math.max(0, xpTotal - xp),
      avgScore,
    },
    badges,
    milestones,
  });
}

