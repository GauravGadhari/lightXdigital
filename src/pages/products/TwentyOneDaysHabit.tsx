import React, { useState } from "react";
import { motion } from "framer-motion";
import { usePageTransitions } from "@/hooks/usePageTransitions";
import { useLenis } from "@/hooks/useLenis";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { twentyOneDaysHabitDetails } from "@/data/products";
import {
  Flame,
  Shield,
  Sparkles,
  Cloud,
  Bell,
  TrendingUp,
  Compass,
  Check,
  Zap,
  Star,
  Lock,
  Smartphone,
  Globe,
  Loader2,
  LogIn,
  Crown,
  ArrowLeft,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";

interface PlanItem {
  id: "monthly" | "yearly" | "lifetime";
  name: string;
  priceInr: string;
  priceUsd: string;
  periodInr: string;
  periodUsd: string;
  badge?: string;
  popular?: boolean;
}

const plans: PlanItem[] = [
  {
    id: "monthly",
    name: "Monthly Pro",
    priceInr: "₹79",
    priceUsd: "$1.99",
    periodInr: "/ month",
    periodUsd: "/ month",
  },
  {
    id: "yearly",
    name: "Yearly Pro",
    priceInr: "₹399",
    priceUsd: "$9.99",
    periodInr: "/ year",
    periodUsd: "/ year",
    badge: "SAVE 58%",
    popular: true,
  },
  {
    id: "lifetime",
    name: "Lifetime Access",
    priceInr: "₹1,999",
    priceUsd: "$19.99",
    periodInr: "one-time",
    periodUsd: "one-time",
    badge: "BEST VALUE",
  },
];

const iconMap: Record<string, React.ElementType> = {
  Flame,
  Shield,
  Sparkles,
  Cloud,
  Bell,
  TrendingUp,
  Compass,
};

const detectAutoCurrency = (): "INR" | "USD" => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const lang = navigator.language || "";
    if (
      tz.includes("Calcutta") ||
      tz.includes("Kolkata") ||
      lang.includes("IN") ||
      lang.includes("hi") ||
      lang.includes("mr") ||
      lang.includes("ta") ||
      lang.includes("te")
    ) {
      return "INR";
    }
    return "USD";
  } catch {
    return "INR";
  }
};

const TwentyOneDaysHabit = () => {
  usePageTransitions();
  useLenis();
  const navigate = useNavigate();
  const { user, signInWithGoogle, createPaymentOrder, subscriptions } = useAuth();

  const [currency] = useState<"INR" | "USD">(detectAutoCurrency());
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly" | "lifetime">("yearly");
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const product = twentyOneDaysHabitDetails;
  const isAlreadyPro = subscriptions.some((sub) => sub.app_slug === "21days" && sub.is_active);

  const handleCheckout = async () => {
    if (!user) {
      toast.info("Please sign in with Google to link your subscription", {
        action: {
          label: "Sign In",
          onClick: () => signInWithGoogle(),
        },
      });
      try {
        await signInWithGoogle();
      } catch (e: any) {
        toast.error("Sign in failed. Please try again.");
      }
      return;
    }

    setIsCheckingOut(true);
    toast.loading("Creating secure checkout session...", { id: "checkout" });

    try {
      const tier = currency === "INR" ? 2 : 1;
      const result = await createPaymentOrder("21days", selectedPlan, tier);
      toast.dismiss("checkout");

      if (result.order_id) {
        toast.success("Launching checkout...");
      } else {
        toast.error(result.error || "Failed to create payment session.");
        setIsCheckingOut(false);
      }
    } catch (err: any) {
      toast.dismiss("checkout");
      toast.error(err.message || "An unexpected error occurred.");
      setIsCheckingOut(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="min-h-screen bg-background text-foreground flex flex-col"
    >
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="container-custom">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <Link to="/products" className="hover:text-primary transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              Products
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">21 Days of Habit</span>
          </div>

          {/* Hero Section */}
          <section className="mb-16 md:mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-7 text-center lg:text-left"
              >
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <Badge variant="outline" className="px-2.5 py-1 text-xs border-primary/40 bg-primary/10 text-primary">
                    <Sparkles className="w-3 h-3 mr-1 text-primary inline" />
                    v4.3.0 Ecosystem Edition
                  </Badge>
                  <Badge variant="outline" className="px-2.5 py-1 text-xs border-green-500/40 bg-green-500/10 text-green-400">
                    <Shield className="w-3 h-3 mr-1 inline" />
                    100% Offline-First
                  </Badge>
                  <Badge variant="outline" className="px-2.5 py-1 text-xs border-yellow-500/40 bg-yellow-500/10 text-yellow-400">
                    <Flame className="w-3 h-3 mr-1 inline" />
                    Streak Freeze
                  </Badge>
                </div>

                <h1 className="hero-text text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight">
                  Build Habits That{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-cyan-400">
                    Actually Stick
                  </span>
                </h1>

                <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  {product.heroSubtitle}
                </p>

                {/* Value Props Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 text-left">
                  {product.valueProps.map((vp, index) => {
                    const IconComp = iconMap[vp.icon] || Sparkles;
                    return (
                      <div
                        key={index}
                        className="p-3.5 sm:p-4 rounded-2xl bg-card border border-border/60 hover:border-primary/40 transition-colors"
                      >
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-2 sm:mb-3 text-primary">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <h4 className="text-xs sm:text-sm font-semibold mb-1">{vp.title}</h4>
                        <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">{vp.subtitle}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4">
                  <a
                    href="#pricing-plans"
                    className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
                  >
                    <Crown className="w-4 h-4" />
                    Get Ad-Free Pro
                  </a>
                  <a
                    href="#features"
                    className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-full border border-border bg-card/60 hover:border-primary/50 transition-colors text-xs sm:text-sm font-medium"
                  >
                    Explore Features
                  </a>
                </div>
              </motion.div>

              {/* Hero Visual Showcase */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-5 flex justify-center"
              >
                <div className="relative w-full max-w-[320px] sm:max-w-[350px]">
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary/30 to-cyan-500/20 blur-2xl opacity-60 -z-10" />

                  <div className="rounded-[32px] p-2.5 sm:p-3 bg-gradient-to-b from-white/15 to-white/5 border border-white/20 shadow-2xl backdrop-blur-xl">
                    <div className="rounded-[26px] overflow-hidden bg-[#0D1B0F] border border-white/10 p-4 sm:p-5 text-white">
                      <div className="flex items-center justify-between mb-4 sm:mb-5">
                        <div>
                          <div className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase">Today's Streak</div>
                          <div className="text-2xl sm:text-3xl font-extrabold flex items-center gap-1.5 mt-0.5">
                            <Flame className="w-6 h-6 text-orange-500 fill-orange-500" />
                            21 Days!
                          </div>
                        </div>
                        <div className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold">
                          PRO ACTIVE
                        </div>
                      </div>

                      <div className="space-y-2.5 mb-4 sm:mb-5">
                        {[
                          { title: "Morning Meditation", time: "15 min", color: "from-purple-500 to-indigo-600", done: true },
                          { title: "Read 20 Pages", time: "Daily goal", color: "from-blue-500 to-cyan-600", done: true },
                          { title: "Hydrate 3 Liters", time: "8 / 8 glasses", color: "from-teal-500 to-emerald-600", done: true },
                          { title: "Workout & Stretching", time: "45 min", color: "from-orange-500 to-amber-600", done: false },
                        ].map((h, i) => (
                          <div
                            key={i}
                            className={`p-2.5 sm:p-3 rounded-xl flex items-center justify-between border transition-all ${
                              h.done ? "bg-white/10 border-white/20" : "bg-white/5 border-white/10 opacity-70"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${h.color} flex items-center justify-center shrink-0`}>
                                <Sparkles className="w-3.5 h-3.5 text-white" />
                              </div>
                              <div>
                                <div className="text-xs sm:text-sm font-semibold">{h.title}</div>
                                <div className="text-[10px] text-white/60">{h.time}</div>
                              </div>
                            </div>
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                h.done ? "bg-emerald-500 text-white" : "border-2 border-white/30"
                              }`}
                            >
                              {h.done && <Check className="w-3 h-3" />}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="text-[11px] font-medium text-emerald-200">2 Streak Freezes Available</span>
                        </div>
                        <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider">Protected</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing-plans" className="mb-16 md:mb-24 scroll-mt-24">
            <div className="text-center mb-8 sm:mb-12 max-w-2xl mx-auto px-2">
              <Badge variant="outline" className="px-3 py-1 text-xs border-primary/30 text-primary mb-3">
                Unlock Pro Access
              </Badge>
              <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-3">
                Invest in Your Daily Consistency
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                One subscription syncs seamlessly across your mobile devices and web browser. 0 Ads forever.
              </p>
            </div>

            {/* Plan Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto mb-8">
              {plans.map((plan) => {
                const isSelected = selectedPlan === plan.id;
                const price = currency === "INR" ? plan.priceInr : plan.priceUsd;
                const period = currency === "INR" ? plan.periodInr : plan.periodUsd;

                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`relative rounded-3xl p-5 sm:p-7 cursor-pointer transition-all border flex flex-col justify-between ${
                      isSelected
                        ? "bg-card border-primary ring-2 ring-primary/30 shadow-xl shadow-primary/10"
                        : "bg-card/60 border-border/80 hover:border-border"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold shadow-md">
                        MOST POPULAR
                      </div>
                    )}
                    {plan.badge && !plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold shadow-md">
                        {plan.badge}
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-base font-bold">{plan.name}</h3>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? "border-primary bg-primary text-white" : "border-muted-foreground/40"
                          }`}
                        >
                          {isSelected && <Check className="w-2.5 h-2.5" />}
                        </div>
                      </div>

                      <div className="mb-5">
                        <span className="text-3xl font-extrabold">{price}</span>
                        <span className="text-xs text-muted-foreground ml-1">{period}</span>
                      </div>

                      <ul className="space-y-2.5 mb-6 text-xs text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span>0 Ads & clean interface</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span>Unlimited habit trackers</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span>Streak freeze protection</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span>Real-time Google Cloud sync</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span>21-Day Guided Journeys</span>
                        </li>
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPlan(plan.id);
                        handleCheckout();
                      }}
                      disabled={isCheckingOut || isAlreadyPro}
                      className={`w-full py-3 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 ${
                        isSelected
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {isCheckingOut && isSelected ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          Processing...
                        </>
                      ) : isAlreadyPro ? (
                        "Pro Already Active"
                      ) : (
                        `Choose ${plan.name}`
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Trust Badges */}
            <div className="max-w-2xl mx-auto text-center p-4 sm:p-5 rounded-2xl bg-card border border-border/60">
              <div className="flex items-center justify-center gap-4 sm:gap-6 text-[11px] text-muted-foreground flex-wrap">
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-primary" />
                  <span>Secure 256-bit Checkout</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3 h-3 text-primary" />
                  <span>Instant Multi-Device Pro</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Smartphone className="w-3 h-3 text-primary" />
                  <span>Zero Data Loss</span>
                </div>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section id="features" className="mb-16 md:mb-24 scroll-mt-24">
            <div className="text-center mb-10 sm:mb-14 max-w-2xl mx-auto px-2">
              <Badge variant="outline" className="px-3 py-1 text-xs border-primary/30 text-primary mb-3">
                Engineered for Consistency
              </Badge>
              <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-3">
                Everything You Need to Build Lasting Habits
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Carefully crafted features focused on habit psychology, minimal cognitive friction, and zero distractions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {product.features.map((f, i) => {
                const IconComp = iconMap[f.icon] || Sparkles;
                return (
                  <div
                    key={i}
                    className="p-5 sm:p-7 rounded-3xl bg-card border border-border/80 hover:border-primary/40 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold mb-2">{f.title}</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{f.description}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-16 max-w-3xl mx-auto px-2">
            <div className="text-center mb-8 sm:mb-10">
              <Badge variant="outline" className="px-3 py-1 text-xs border-primary/30 text-primary mb-3">
                Got Questions?
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold">Frequently Asked Questions</h2>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {product.faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-2xl border border-border/80 bg-card px-4 sm:px-6 py-1"
                >
                  <AccordionTrigger className="text-left font-semibold text-xs sm:text-sm hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-xs leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default TwentyOneDaysHabit;
