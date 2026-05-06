"use client";

import styles from "./LandingCommunity.module.css";

export default function LandingCommunity() {
  const stats = [
    {
      icon: "👥",
      value: "12K+",
      label: "Active Members",
      sublabel: "Growing every day",
    },
    {
      icon: "💬",
      value: "8K+",
      label: "Discussions",
      sublabel: "Across topics & roles",
    },
    {
      icon: "🏆",
      value: "2K+",
      label: "Success Stories",
      sublabel: "Shared by members",
    },
    {
      icon: "⚡",
      value: "95%",
      label: "Recommend Nexus",
      sublabel: "To their peers",
    },
  ];

  const trendingTopics = [
    { tag: "System Design Interview Tips", replies: 128 },
    { tag: "Behavioral Questions", replies: 95 },
    { tag: "Resume Review Help", replies: 76 },
    { tag: "Frontend Developer Guide", replies: 64 },
    { tag: "Machine Learning Interviews", replies: 52 },
  ];

  const recentDiscussions = [
    {
      author: "Rohit Verma",
      avatar: "👨",
      title: "How to ace system design interviews?",
      tags: ["System Design", "2h ago"],
      comments: 24,
      upvotes: 56,
    },
    {
      author: "Priya Sharma",
      avatar: "👩",
      title: "Sharing my experience at Google Step Internship",
      tags: ["Experience", "5h ago"],
      comments: 18,
      upvotes: 42,
    },
    {
      author: "Rohit Verma",
      avatar: "👨",
      title: "React vs Next.js – Which one to choose in 2024?",
      tags: ["Web Development", "8h ago"],
      comments: 31,
      upvotes: 63,
    },
    {
      author: "Sneha Iyer",
      avatar: "👩",
      title: "Mock interview feedback - Need opinions",
      tags: ["Mock Interviews", "10h ago"],
      comments: 15,
      upvotes: 38,
    },
    {
      author: "Karan Singh",
      avatar: "👨",
      title: "Best resources for DSA practice?",
      tags: ["DSA", "12h ago"],
      comments: 27,
      upvotes: 51,
    },
  ];

  const topContributors = [
    { name: "Rohit Verma", points: "1,245 points", rank: "#1" },
    { name: "Priya Sharma", points: "980 points", rank: "#2" },
    { name: "Arjun Mehta", points: "875 points", rank: "#3" },
    { name: "Sneha Iyer", points: "690 points", rank: "#4" },
    { name: "Karan Singh", points: "560 points", rank: "#5" },
  ];

  return (
    <section className={styles.communitySection}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          <span className={styles.badgeText}>COMMUNITY</span>
        </div>

        <h2 className={styles.heading}>
          Learn together. <span className={styles.accent}>Grow together.</span>
        </h2>

        <p className={styles.subheading}>
          Join a community of ambitious learners, share insights,
          <br />
          help others, and take your interview prep to the next level.
        </p>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        {stats.map((stat, idx) => (
          <div key={idx} className={styles.statCard}>
            <div className={styles.statIcon}>{stat.icon}</div>
            <div className={styles.statValue}>{stat.value}</div>
            <div className={styles.statLabel}>{stat.label}</div>
            <div className={styles.statSublabel}>{stat.sublabel}</div>
          </div>
        ))}
      </div>

      {/* Three Columns Section */}
      <div className={styles.columnsContainer}>
        {/* Trending Topics */}
        <div className={styles.column}>
          <div className={styles.columnHeader}>
            <span className={styles.columnTitle}>🔥 Trending Topics</span>
            <a href="#" className={styles.viewAllLink}>
              View all
            </a>
          </div>
          <div className={styles.topicsList}>
            {trendingTopics.map((topic, idx) => (
              <div key={idx} className={styles.topicItem}>
                <span className={styles.topicTag}>#</span>
                <span className={styles.topicName}>{topic.tag}</span>
                <span className={styles.topicReplies}>
                  {topic.replies} replies
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Discussions */}
        <div className={styles.column}>
          <div className={styles.columnHeader}>
            <span className={styles.columnTitle}>💬 Recent Discussions</span>
            <a href="#" className={styles.viewAllLink}>
              View all
            </a>
          </div>
          <div className={styles.discussionsList}>
            {recentDiscussions.map((discussion, idx) => (
              <div key={idx} className={styles.discussionItem}>
                <div className={styles.discussionAuthor}>
                  <span className={styles.authorAvatar}>
                    {discussion.avatar}
                  </span>
                  <span className={styles.authorName}>{discussion.author}</span>
                </div>
                <div className={styles.discussionTitle}>{discussion.title}</div>
                <div className={styles.discussionMeta}>
                  {discussion.tags.map((tag, i) => (
                    <span key={i} className={styles.discussionTag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className={styles.discussionStats}>
                  <span className={styles.statItem}>
                    💬 {discussion.comments}
                  </span>
                  <span className={styles.statItem}>
                    👍 {discussion.upvotes}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Contributors */}
        <div className={styles.column}>
          <div className={styles.columnHeader}>
            <span className={styles.columnTitle}>⭐ Top Contributors</span>
            <a href="#" className={styles.viewAllLink}>
              View all
            </a>
          </div>
          <div className={styles.contributorsList}>
            {topContributors.map((contributor, idx) => (
              <div key={idx} className={styles.contributorItem}>
                <div className={styles.contributorInfo}>
                  <span className={styles.contributorAvatar}>👤</span>
                  <div className={styles.contributorDetails}>
                    <div className={styles.contributorName}>
                      {contributor.name}
                    </div>
                    <div className={styles.contributorPoints}>
                      {contributor.points}
                    </div>
                  </div>
                </div>
                <div className={styles.contributorRank}>{contributor.rank}</div>
              </div>
            ))}
          </div>

          {/* Join Community Card */}
          <div className={styles.joinCard}>
            <div className={styles.joinIcon}>👥</div>
            <div className={styles.joinTitle}>
              Be a part of something bigger
            </div>
            <div className={styles.joinDesc}>
              Connect, learn, and grow with like-minded peers.
            </div>
            <button className={styles.joinBtn}>Join Community →</button>
          </div>
        </div>
      </div>

      {/* Can't Find Answer Section */}
      <div className={styles.helpSection}>
        <div className={styles.helpContent}>
          <div className={styles.helpIcon}>❓</div>
          <div className={styles.helpText}>
            <strong>Can't find your answer?</strong>
            <p>Ask the community and get help from experts.</p>
          </div>
          <button className={styles.askBtn}>Ask Now →</button>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className={styles.bottomCTA}>
        <div className={styles.ctaContent}>
          <div className={styles.ctaIcon}>❤️</div>
          <div className={styles.ctaText}>
            <strong>Support others. Share Knowledge. Earn Recognition.</strong>
            <p>
              Your contribution today can help someone land their dream role
              tomorrow.
            </p>
          </div>
        </div>
        <button className={styles.ctaBtn}>Start Contributing →</button>
      </div>
    </section>
  );
}

