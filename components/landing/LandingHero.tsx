"use client";

import Link from "next/link";

type LandingHeroProps = {
  onWatchDemo: () => void;
};

const stats = [
  { value: "10K+", label: "interviews" },
  { value: "500+", label: "questions" },
  { value: "4.8★", label: "rating" },
  { value: "50+", label: "company packs" },
];

export default function LandingHero({ onWatchDemo }: LandingHeroProps) {
  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: "url('/heroBackground.png')",
        backgroundSize: "cover",
        backgroundPosition: "center right",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* dark overlay for left-side readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(10,10,20,0.92) 0%, rgba(10,10,20,0.75) 50%, rgba(10,10,20,0.1) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1200px",
          width: "100%",
          margin: "0 auto",
          padding: "120px 48px 80px",
        }}
      >
        {/* badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            border: "1px solid rgba(168,85,247,0.4)",
            borderRadius: "999px",
            padding: "6px 16px",
            marginBottom: "28px",
            background: "rgba(168,85,247,0.08)",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#a855f7",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: "#c084fc",
              textTransform: "uppercase",
            }}
          >
            AI-Powered Platform
          </span>
        </div>

        {/* heading */}
        <h1
          style={{
            fontSize: "clamp(2.8rem, 6vw, 5rem)",
            fontWeight: 800,
            lineHeight: 1.08,
            color: "#ffffff",
            margin: "0 0 24px",
            maxWidth: "620px",
          }}
        >
          Where{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #a855f7 0%, #6366f1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Intelligence
          </span>{" "}
          Connects
        </h1>

        {/* description */}
        <p
          style={{
            fontSize: "1.125rem",
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.7,
            maxWidth: "480px",
            margin: "0 0 40px",
          }}
        >
          Practice smarter, get feedback that matters, and land your dream role
          with AI-driven mock interviews.
        </p>

        {/* CTA buttons */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "64px",
          }}
        >
          <Link href="/dashboard" style={{ textDecoration: "none" }}>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "linear-gradient(135deg, #a855f7 0%, #6366f1 100%)",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                padding: "14px 28px",
                fontSize: "1rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Get Started
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="#fff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </Link>

          <button
            onClick={onWatchDemo}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(255,255,255,0.06)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: "12px",
              padding: "14px 28px",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              backdropFilter: "blur(8px)",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.06)")
            }
          >
            <span
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                <path d="M1 1l8 5-8 5V1z" fill="#fff" />
              </svg>
            </span>
            Watch Demo
          </button>
        </div>

        {/* stats */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "14px",
                padding: "16px 24px",
                minWidth: "110px",
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  color: "#ffffff",
                  lineHeight: 1,
                  marginBottom: "4px",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.45)",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
