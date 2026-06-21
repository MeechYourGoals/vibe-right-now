import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Star, Crown, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SUBSCRIPTION_PLANS, type UserSubscriptionTier } from "@/types/subscription";

const TIER_META: Record<
  UserSubscriptionTier,
  { icon: typeof Star | null; ring: string; cta: string }
> = {
  free: { icon: null, ring: "border-white/10", cta: "Start exploring" },
  plus: {
    icon: Star,
    ring: "border-blue-400/40",
    cta: "Choose Plus",
  },
  premium: {
    icon: Crown,
    ring: "border-purple-400/60",
    cta: "Choose Premium",
  },
  pro: {
    icon: Zap,
    ring: "border-amber-400/50",
    cta: "Go Pro",
  },
};

const PricingSection = () => {
  const navigate = useNavigate();
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="relative overflow-hidden bg-[#0a0612] py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-fuchsia-600/15 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-purple-300">
            Pricing
          </span>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Start free. Upgrade when you're hooked.
          </h2>
          <p className="mt-4 text-lg text-white/60">
            No commitment, cancel anytime. Every plan unlocks more of Vernon.
          </p>

          {/* Billing toggle */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 p-1.5">
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                !annual ? "bg-white text-[#0a0612]" : "text-white/70"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                annual ? "bg-white text-[#0a0612]" : "text-white/70"
              }`}
            >
              Annual
              <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-xs font-semibold text-emerald-300">
                -20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SUBSCRIPTION_PLANS.map((plan, i) => {
            const meta = TIER_META[plan.tier];
            const Icon = meta.icon;
            const monthly = plan.price;
            const display = annual
              ? (monthly * 0.8).toFixed(2)
              : monthly.toFixed(2);
            const isPopular = plan.isPopular;

            return (
              <motion.div
                key={plan.tier}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex flex-col rounded-3xl border bg-white/[0.03] p-7 backdrop-blur-sm ${meta.ring} ${
                  isPopular ? "ring-2 ring-purple-400/50" : ""
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                      <Sparkles className="h-3 w-3" /> Most popular
                    </span>
                  </div>
                )}

                <div className="mb-4 flex items-center gap-2">
                  {Icon && (
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                      <Icon className="h-4 w-4 text-white" />
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                </div>

                <div className="mb-1 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">
                    ${display}
                  </span>
                  <span className="text-sm text-white/50">/mo</span>
                </div>
                <p className="mb-6 text-xs text-white/40">
                  {plan.price === 0
                    ? "Free forever"
                    : annual
                      ? "billed annually"
                      : "billed monthly"}
                </p>

                <ul className="mb-8 flex-1 space-y-3">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      <span className="text-sm leading-snug text-white/70">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() =>
                    navigate(plan.price === 0 ? "/home" : "/login")
                  }
                  className={`w-full rounded-full font-semibold ${
                    isPopular
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {meta.cta}
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
