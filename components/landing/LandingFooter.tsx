"use client";

import Link from "next/link";

const productLinks = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Mock interviews", href: "/#product-preview" },
  { label: "Pricing", href: "/price" },
];

const companyLinks = [
  { label: "About", href: "/#about" },
  { label: "Community", href: "/#community" },
  { label: "Careers", href: "/sign-up" },
  { label: "Contact", href: "mailto:hello@nexus.ai" },
];

const resourceLinks = [
  { label: "Get started", href: "/sign-up" },
  { label: "Log in", href: "/sign-in" },
  { label: "Privacy", href: "/price" },
  { label: "Terms", href: "/price" },
];

export default function LandingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id="about" className="landing-footer">
      <div className="landing-shell landing-footer__panel">
        <div className="landing-footer__grid">
          <div className="landing-footer__brand-block">
            <Link href="/" className="landing-footer__brand">
              <span className="landing-brand__mark">N</span>
              <span className="landing-brand__text">Nexus</span>
            </Link>
            <p className="landing-footer__tagline">
              AI-powered mock interviews to help you prepare with confidence,
              improve faster, and land better offers.
            </p>
          </div>

          <div className="landing-footer__column">
            <h4 className="landing-footer__title">Product</h4>
            <div className="landing-footer__links" aria-label="Product links">
              {productLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="landing-footer__link"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="landing-footer__column">
            <h4 className="landing-footer__title">Company</h4>
            <div className="landing-footer__links" aria-label="Company links">
              {companyLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="landing-footer__link"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="landing-footer__column">
            <h4 className="landing-footer__title">Resources</h4>
            <div className="landing-footer__links" aria-label="Resource links">
              {resourceLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="landing-footer__link"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="landing-footer__bottom">
          <div className="landing-footer__copy">
            © {year} Nexus. All rights reserved.
          </div>
          <div className="landing-footer__meta">
            Made in India <span className="landing-footer__heart">❤️</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
