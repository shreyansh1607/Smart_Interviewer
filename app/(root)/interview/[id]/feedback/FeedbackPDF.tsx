import {
    Document,
    Page,
    Text,
    View,
    StyleSheet
  } from "@react-pdf/renderer";
  
  const styles = StyleSheet.create({
    page: {
      padding: 24,
      backgroundColor: "#020617",
      color: "#e2e8f0",
      fontSize: 11,
      fontFamily: "Helvetica",
    },
  
    /* HEADER */
    header: {
      marginBottom: 16,
    },
  
    brand: {
      fontSize: 10,
      color: "#8b5cf6",
      marginBottom: 4,
    },
  
    title: {
      fontSize: 18,
      fontWeight: "bold",
    },
  
    subtitle: {
      fontSize: 11,
      color: "#94a3b8",
      marginTop: 4,
    },
  
    /* GRID */
    grid: {
      flexDirection: "row",
      gap: 12,
    },
  
    left: {
      flex: 1.6,
    },
  
    right: {
      flex: 1,
    },
  
    /* CARD */
    card: {
      backgroundColor: "#0f172a",
      borderRadius: 10,
      padding: 12,
      marginBottom: 12,
      border: "1px solid #1e293b",
    },
  
    cardTitle: {
      fontSize: 12,
      fontWeight: "bold",
      marginBottom: 8,
    },
  
    /* SCORE CARD */
    scoreCard: {
      backgroundColor: "#0f172a",
      padding: 12,
      borderRadius: 10,
      border: "1px solid #1e293b",
      marginBottom: 12,
    },
  
    scoreText: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#8b5cf6",
    },
  
    scoreLabel: {
      fontSize: 10,
      color: "#94a3b8",
    },
  
    /* PROGRESS */
    progressItem: {
      marginBottom: 8,
    },
  
    progressRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 2,
    },
  
    progressBar: {
      height: 4,
      backgroundColor: "#1e293b",
      borderRadius: 2,
    },
  
    progressFill: {
      height: 4,
      backgroundColor: "#6366f1",
      borderRadius: 2,
    },
  
    /* SUMMARY */
    summaryText: {
      fontSize: 10,
      lineHeight: 1.5,
      color: "#cbd5f5",
    },
  
    /* LIST */
    listItem: {
      marginBottom: 5,
      fontSize: 10,
    },
  
    strength: {
      color: "#22c55e",
    },
  
    improvement: {
      color: "#f59e0b",
    },
  
    /* FOOTER */
    footer: {
      marginTop: 16,
      borderTop: "1px solid #1e293b",
      paddingTop: 8,
      fontSize: 9,
      color: "#64748b",
      textAlign: "center",
    }
  });
  
  const FeedbackPDF = ({ feedback, interview }: any) => (
    <Document>
      <Page style={styles.page}>
  
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.brand}>NEXUS REPORT</Text>
          <Text style={styles.title}>Interview Feedback</Text>
          <Text style={styles.subtitle}>
            {interview.role} Interview • Score {feedback.totalScore}/100
          </Text>
        </View>
  
        {/* GRID */}
        <View style={styles.grid}>
  
          {/* LEFT */}
          <View style={styles.left}>
  
            {/* PERFORMANCE */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Performance Breakdown</Text>
  
              {feedback.categoryScores.map((item: any, i: number) => (
                <View key={i} style={styles.progressItem}>
                  <View style={styles.progressRow}>
                    <Text>{item.name}</Text>
                    <Text>{item.score}/100</Text>
                  </View>
  
                  <View style={styles.progressBar}>
                    <View
                      style={{
                        ...styles.progressFill,
                        width: `${item.score}%`,
                      }}
                    />
                  </View>
                </View>
              ))}
            </View>
  
            {/* DETAILED */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Detailed Feedback</Text>
  
              {feedback.categoryScores.map((item: any, i: number) => (
                <View key={i} style={{ marginBottom: 6 }}>
                  <Text style={{ fontWeight: "bold" }}>
                    {item.name} ({item.score}/100)
                  </Text>
                  <Text style={styles.summaryText}>{item.comment}</Text>
                </View>
              ))}
            </View>
  
          </View>
  
          {/* RIGHT */}
          <View style={styles.right}>
  
            {/* SCORE */}
            <View style={styles.scoreCard}>
              <Text style={styles.scoreLabel}>Overall Score</Text>
              <Text style={styles.scoreText}>{feedback.totalScore}/100</Text>
              <Text style={styles.summaryText}>
                Needs Improvement
              </Text>
            </View>
  
            {/* SUMMARY */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Summary</Text>
              <Text style={styles.summaryText}>
                {feedback.finalAssessment}
              </Text>
            </View>
  
            {/* STRENGTHS */}
            <View style={styles.card}>
              <Text style={[styles.cardTitle, styles.strength]}>
                Strengths
              </Text>
              {feedback.strengths.map((s: string, i: number) => (
                <Text key={i} style={styles.listItem}>
                  • {s}
                </Text>
              ))}
            </View>
  
            {/* IMPROVEMENTS */}
            <View style={styles.card}>
              <Text style={[styles.cardTitle, styles.improvement]}>
                Areas for Improvement
              </Text>
              {feedback.areasForImprovement.map((a: string, i: number) => (
                <Text key={i} style={styles.listItem}>
                  • {a}
                </Text>
              ))}
            </View>
  
          </View>
  
        </View>
  
        {/* FOOTER */}
        <Text style={styles.footer}>
          Generated by Nexus AI Interview System
        </Text>
  
      </Page>
    </Document>
  );
  
  export default FeedbackPDF;