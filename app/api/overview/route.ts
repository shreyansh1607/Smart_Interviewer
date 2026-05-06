import { NextResponse } from "next/server";
import { db } from "@/firebase/admin";
import { getCurrentUser } from "@/lib/actions/auth.action";

export async function GET() {
  const user = await getCurrentUser();
  const userId = user?.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 🔥 Fetch interviews
  const interviewsSnap = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .get();

  const interviews = interviewsSnap.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  // 🔥 Fetch feedback
  const feedbackSnap = await db
    .collection("feedback")
    .where("userId", "==", userId)
    .get();

  const feedbacks = feedbackSnap.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  // ✅ SORT feedback by date
  feedbacks.sort(
    (a: any, b: any) =>
      new Date(a.createdAt).getTime() -
      new Date(b.createdAt).getTime()
  );

  // =============================
  // 📊 STATS
  // =============================
  const totalInterviews = interviews.length;

  const avgScore =
    feedbacks.length > 0
      ? Math.round(
          feedbacks.reduce((acc: number, f: any) => acc + f.totalScore, 0) /
            feedbacks.length
        )
      : 0;

  const lastScore =
    feedbacks.length > 0
      ? feedbacks[feedbacks.length - 1].totalScore
      : 0;

  const lastTwo = feedbacks.slice(-2);

  const improvement =
    lastTwo.length === 2
      ? lastTwo[1].totalScore - lastTwo[0].totalScore
      : 0;

  // =============================
  // 📈 TREND
  // =============================
  const trend = feedbacks.slice(-6).map((f: any) => f.totalScore);

  // =============================
  // 🧠 CATEGORY AGGREGATION
  // =============================
  const categoryMap: Record<string, number[]> = {};

  feedbacks.forEach((f: any) => {
    f.categoryScores.forEach((c: any) => {
      if (!categoryMap[c.name]) categoryMap[c.name] = [];
      categoryMap[c.name].push(c.score);
    });
  });

  const categories = Object.entries(categoryMap).map(([name, scores]) => ({
    name,
    score: Math.round(
      (scores as number[]).reduce((a, b) => a + b, 0) / scores.length
    ),
  }));

  const weakest = categories.sort((a, b) => a.score - b.score)[0];

  // =============================
  // 🕒 RECENT INTERVIEWS
  // =============================
  const feedbackMap = new Map();

  feedbacks.forEach((f: any) => {
    feedbackMap.set(f.interviewId, f);
  });

  const recent = interviews.slice(0, 5).map((i: any) => ({
    role: i.role,
    score: feedbackMap.get(i.id)?.totalScore || null,
  }));

  // =============================
  return NextResponse.json({
    totalInterviews,
    avgScore,
    lastScore,
    improvement,
    trend,
    categories,
    weakestArea: weakest?.name || "N/A",
    recent,
  });
}