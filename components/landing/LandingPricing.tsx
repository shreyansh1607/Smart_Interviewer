"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const plans = [
  {
    name: "Starter",
    priceMonthly: "₹0 / month",
    priceYearly: "₹0 / month",
    description: "Perfect for getting started",
    features: [
      "5 AI interviews / month",
      "Basic AI feedback",
      "Performance summary",
      "Community access",
    ],
    cta: "Get Started",
    note: "No credit card required",
    featured: false,
  },
  {
    name: "Pro",
    priceMonthly: "₹499 / month",
    priceYearly: "₹4,788 / year",
    description: "For serious learners and professionals",
    features: [
      "Unlimited AI interviews",
      "Advanced AI feedback",
      "Detailed analytics",
      "Mock interview mode",
      "Resume review",
      "Priority support",
    ],
    cta: "Upgrade to Pro",
    note: "Save 20% on yearly billing",
    featured: true,
  },
  {
    name: "Enterprise",
    priceMonthly: "Custom",
    priceYearly: "Contact us",
    description: "For teams and organizations",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Custom workflows",
      "API access",
      "Dedicated account manager",
      "SLA & priority support",
    ],
    cta: "Contact Sales",
    note: "Custom onboarding available",
    featured: false,
  },
];

interface LandingPricingProps {
  currentUser?: User | null;
}

export default function LandingPricing({ currentUser }: LandingPricingProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [selected, setSelected] = useState<string>(
    plans.find((p) => p.featured)?.name ?? plans[0].name
  );
  const [loadingPlan, setLoadingPlan] = useState(false);

  useEffect(() => {
    const planParam = searchParams.get("plan");
    const billingParam = searchParams.get("billing");
    if (planParam && plans.some((plan) => plan.name === planParam)) {
      setSelected(planParam);
    }
    if (billingParam === "yearly") {
      setBilling("yearly");
    }
  }, [searchParams]);

  const getPlanPrice = (plan: typeof plans[number]) =>
    billing === "monthly" ? plan.priceMonthly : plan.priceYearly;

  const handleCheckout = async (planName: string) => {
    if (!currentUser?.id) {
      router.push(`/sign-up?plan=${encodeURIComponent(planName)}&billing=${billing}`);
      return;
    }

    const selectedPlan = plans.find((plan) => plan.name === planName);
    if (!selectedPlan) {
      toast.error("Unable to find the selected plan.");
      return;
    }

    setLoadingPlan(true);

    try {
      const response = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: planName,
          billing,
          userId: currentUser.id,
        }),
      });

      const payload = await response.json();
      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to create payment order.");
      }

      const order = payload.order;
      const Razorpay = (window as any).Razorpay;
      if (!Razorpay) {
        throw new Error("Razorpay script failed to load.");
      }

      const checkoutOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Nexus",
        description: `${planName} subscription (${billing})`,
        order_id: order.id,
        image: "/logo.svg",
        method: {
          upi: true,
          upi_link: true,
          card: true,
          netbanking: true,
          wallet: true,
          emandate: false,
          paylater: false,
        },
        handler: async (response: any) => {
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              userId: currentUser.id,
              plan: planName,
              billing,
              amount: order.amount,
            }),
          });
          const verifyPayload = await verifyRes.json();
          if (!verifyRes.ok || !verifyPayload.success) {
            toast.error(verifyPayload.message || "Payment verification failed.");
            return;
          }

          toast.success("Payment complete. Your plan has been updated.");
          router.refresh();
        },
        prefill: {
          name: currentUser.name,
          email: currentUser.email,
        },
        theme: { color: "#7c3aed" },
      };

      const rzp = new Razorpay(checkoutOptions);
      rzp.open();
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message || "Payment checkout failed.");
    } finally {
      setLoadingPlan(false);
    }
  };

  const renderAction = (plan: typeof plans[number]) => {
    if (plan.name === "Pro") {
      if (currentUser?.subscription === "Pro") {
        return (
          <button className="landing-btn landing-btn--primary" disabled>
            Current plan
          </button>
        );
      }

      return (
        <button
          className="landing-btn landing-btn--primary"
          type="button"
          onClick={() => handleCheckout(plan.name)}
          disabled={loadingPlan}
        >
          {currentUser?.id
            ? loadingPlan
              ? "Starting checkout..."
              : plan.cta
            : "Sign up to pay"}
        </button>
      );
    }

    if (plan.name === "Enterprise") {
      return (
        <Link
          href="/sign-up?plan=Enterprise&billing=monthly"
          className="landing-btn landing-btn--secondary"
        >
          {plan.cta}
        </Link>
      );
    }

    return (
      <Link
        href="/sign-up?plan=Starter&billing=monthly"
        className="landing-btn landing-btn--secondary"
      >
        {plan.cta}
      </Link>
    );
  };

  return (
    <section id="pricing" className="landing-section pricing-main-section">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
      <div className="landing-shell">
        <div className="landing-section-header pricing-header">
          <div className="landing-kicker">PRICING</div>
          <h1 className="landing-heading pricing-heading">
            Choose the plan that powers your potential
          </h1>
          <p className="landing-text pricing-subtext">
            Simple pricing. Powerful features. Built for individuals and teams
            who want to grow smarter.
          </p>
        </div>

        <div className="pricing-toggle-row">
          <div className="pricing-toggle-label">Billing cycle</div>
          <div
            className="billing-toggle"
            role="tablist"
            aria-label="Billing toggle"
          >
            <button
              className={`billing-option ${billing === "monthly" ? "active" : ""}`}
              type="button"
              onClick={() => setBilling("monthly")}
            >
              Monthly
            </button>
            <button
              className={`billing-option ${billing === "yearly" ? "active" : ""}`}
              type="button"
              onClick={() => setBilling("yearly")}
            >
              Yearly
            </button>
          </div>
          <span className="pricing-save-chip">Save 20%</span>
        </div>

        <div className="landing-pricing-grid pricing-cards-grid">
          {plans.map((plan) => {
            const isSelected = selected === plan.name;
            const price = getPlanPrice(plan);
            return (
              <article
                key={plan.name}
                className={`landing-pricing-card pricing-card${plan.featured ? " landing-pricing-card--featured pricing-card--pro" : ""}${isSelected ? " selected" : ""}`}
                onClick={() => setSelected(plan.name)}
                aria-pressed={isSelected}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelected(plan.name);
                  }
                }}
              >
                <div className="landing-pricing-card__header">
                  <div>
                    <h3 className="landing-pricing-card__title">{plan.name}</h3>
                    <div className="landing-pricing-card__price">{price}</div>
                  </div>
                  {plan.featured ? (
                    <span className="landing-status-badge">Most popular</span>
                  ) : null}
                </div>

                <p className="landing-pricing-card__description">
                  {plan.description}
                </p>

                <ul className="landing-pricing-card__list">
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>

                {renderAction(plan)}

                <p className="pricing-card-note">{plan.note}</p>
              </article>
            );
          })}
        </div>

        <section className="pricing-trust" aria-label="Trust highlights">
          <article className="pricing-trust-card">
            <h4>Secure & Private</h4>
            <p>Your data is encrypted and protected</p>
          </article>
          <article className="pricing-trust-card">
            <h4>AI-Powered</h4>
            <p>Smart feedback with advanced AI</p>
          </article>
          <article className="pricing-trust-card">
            <h4>Built to Scale</h4>
            <p>From individuals to teams</p>
          </article>
          <article className="pricing-trust-card">
            <h4>24/7 Support</h4>
            <p>Always available when needed</p>
          </article>
        </section>
      </div>
    </section>
  );
}
