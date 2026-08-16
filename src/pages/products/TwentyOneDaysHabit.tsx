import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePageTransitions } from "@/hooks/usePageTransitions";
import { useLenis } from "@/hooks/useLenis";
import { PremiumButton } from "@/components/ui/premium-button";
import { Badge } from "@/components/ui/badge";
import { twentyOneDaysHabitDetails } from "@/data/products";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  ArrowLeft,
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
      className="min-h-screen bg-background text-foreground"
    >
      <div className="pt-20">
        {/* Navigation */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border"
        >
          <div className="container-custom">
            <div className="flex items-center justify-between h-20">
              <Link
                to="/"
                className="font-serif text-2xl font-bold tracking-tight hover:text-primary transition-colors"
              >
                Light X Digital
              </Link>
              <div className="flex items-center gap-6">
                <Link
                  to="/products"
                  className="text-sm font-medium tracking-wide hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  All Products
                </Link>
                <Link
                  to="/pricing"
                  className="text-sm font-medium tracking-wide hover:text-primary transition-colors"
                >
                  Pricing
                </Link>
                {user ? (
                  <Link
                    to="/account"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card hover:border-primary transition-colors text-sm"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                      {user.email?.[0].toUpperCase()}
                    </div>
                    <span className="hidden sm:inline text-xs text-muted-foreground">{user.email?.split("@")[0]}</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => signInWithGoogle()}
                    className="text-sm font-medium tracking-wide text-primary hover:underline flex items-center gap-1.5"
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.nav>

        <div className="container-custom px-6 md:px-8 lg:px-12 section-padding">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Link to="/products" className="hover:text-primary transition-colors">
              Products
            </Link>
            <span>/</span>
            <span className="text-foreground">21 Days of Habit</span>
          </motion.div>

          {/* Hero Section */}
          <section className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-7"
              >
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <Badge variant="outline" className="px-3 py-1 text-sm border-primary/40 bg-primary/10 text-primary">
                    <Sparkles className="w-3.5 h-3.5 mr-1 text-primary inline" />
                    v4.3.0 Ecosystem Edition
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1 text-sm border-green-500/40 bg-green-500/10 text-green-400">
                    <Shield className="w-3.5 h-3.5 mr-1 inline" />
                    100% Offline-First
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1 text-sm border-yellow-500/40 bg-yellow-500/10 text-yellow-400">
                    <Flame className="w-3.5 h-3.5 mr-1 inline" />
                    Streak Freeze
                  </Badge>
                </div>

                <h1 className="hero-text text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
                  Build Habits That{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-cyan-400">
                    Actually Stick
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
                  {product.heroSubtitle}
                </p>

                {/* Value Props Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {product.valueProps.map((vp, index) => {
                    const IconComp = iconMap[vp.icon] || Sparkles;
                    return (
                      <div
                        key={index}
                        className="p-4 rounded-xl bg-card border border-border/60 hover:border-primary/40 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3 text-primary">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <h4 className="text-sm font-semibold mb-1">{vp.title}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">{vp.subtitle}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="#pricing-plans"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
                  >
                    <Crown className="w-5 h-5" />
                    Get Ad-Free Pro
                  </a>
                  <a
                    href="#features"
                    className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-border bg-card/60 hover:border-primary/50 transition-colors text-sm font-medium"
                  >
                    Explore Features
                  </a>
                </div>
              </motion.div>

              {/* Hero Visual Showcase */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-5"
              >
                <div className="relative mx-auto max-w-[360px]">
                  {/* Glowing background halo */}
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary/30 to-cyan-500/20 blur-2xl opacity-60 -z-10" />

                  {/* App Frame Container */}
                  <div className="rounded-[36px] p-3 bg-gradient-to-b from-white/15 to-white/5 border border-white/20 shadow-2xl backdrop-blur-xl">
                    <div className="rounded-[28px] overflow-hidden bg-[#0D1B0F] border border-white/10 p-6 text-white">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <div className="text-xs text-emerald-400 font-semibold tracking-wider uppercase">Today's Streak</div>
                          <div className="text-3xl font-extrabold flex items-center gap-2 mt-1">
                            <Flame className="w-7 h-7 text-orange-500 fill-orange-500" />
                            21 Days!
                          </div>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
                          PRO ACTIVE
                        </div>
                      </div>

                      {/* Mock habits */}
                      <div className="space-y-3 mb-6">
                        {[
                          { title: "Morning Meditation", time: "15 min", color: "from-purple-500 to-indigo-600", done: true },
                          { title: "Read 20 Pages", time: "Daily goal", color: "from-blue-500 to-cyan-600", done: true },
                          { title: "Hydrate 3 Liters", time: "8 / 8 glasses", color: "from-teal-500 to-emerald-600", done: true },
                          { title: "Workout & Stretching", time: "45 min", color: "from-orange-500 to-amber-600", done: false },
                        ].map((h, i) => (
                          <div
                            key={i}
                            className={`p-3.5 rounded-2xl flex items-center justify-between border transition-all ${
                              h.done ? "bg-white/10 border-white/20" : "bg-white/5 border-white/10 opacity-70"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${h.color} flex items-center justify-center`}>
                                <Sparkles className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <div className="text-sm font-semibold">{h.title}</div>
                                <div className="text-[11px] text-white/60">{h.time}</div>
                              </div>
                            </div>
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                h.done ? "bg-emerald-500 text-white" : "border-2 border-white/30"
                              }`}
                            >
                              {h.done && <Check className="w-3.5 h-3.5" />}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <Shield className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs font-medium text-emerald-200">2 Streak Freezes Available</span>
                        </div>
                        <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Protected</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing-plans" className="mb-24 scroll-mt-28">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <Badge variant="outline" className="px-3 py-1 text-sm border-primary/30 text-primary mb-4">
                Unlock Pro Access
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Invest in Your Daily Consistency
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                One subscription syncs seamlessly across your mobile devices and web browser. 0 Ads forever.
              </p>
            </motion.div>

            {/* Plan Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-10">
              {plans.map((plan) => {
                const isSelected = selectedPlan === plan.id;
                const price = currency === "INR" ? plan.priceInr : plan.priceUsd;
                const period = currency === "INR" ? plan.periodInr : plan.periodUsd;

                return (
                  <motion.div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    whileHover={{ y: -4 }}
                    className={`relative rounded-3xl p-8 cursor-pointer transition-all border ${
                      isSelected
                        ? "bg-card border-primary ring-2 ring-primary/30 shadow-xl shadow-primary/10"
                        : "bg-card/60 border-border/80 hover:border-border"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-md">
                        MOST POPULAR
                      </div>
                    )}
                    {plan.badge && !plan.popular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-md">
                        {plan.badge}
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold">{plan.name}</h3>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected ? "border-primary bg-primary text-white" : "border-muted-foreground/40"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </div>

                    <div className="mb-6">
                      <span className="text-4xl font-extrabold">{price}</span>
                      <span className="text-sm text-muted-foreground ml-1.5">{period}</span>
                    </div>

                    <ul className="space-y-3 mb-8 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        <span>0 Ads & clean interface</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        <span>Unlimited habit trackers</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        <span>Streak freeze protection</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        <span>Real-time Google Cloud sync</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        <span>21-Day Guided Journeys</span>
                      </li>
                    </ul>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPlan(plan.id);
                        handleCheckout();
                      }}
                      disabled={isCheckingOut || isAlreadyPro}
                      className={`w-full py-3.5 rounded-2xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                        isSelected
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {isCheckingOut && isSelected ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Processing...
                        </>
                      ) : isAlreadyPro ? (
                        "Pro Already Active"
                      ) : (
                        `Choose ${plan.name}`
                      )}
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* Trust & Guarantee Box */}
            <div className="max-w-2xl mx-auto text-center p-6 rounded-2xl bg-card border border-border/60">
              <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground flex-wrap">
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-primary" />
                  <span>Secure 256-bit Encrypted Checkout</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-primary" />
                  <span>Instant Cross-Device Pro Activation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-primary" />
                  <span>Zero Data Loss Guarantee</span>
                </div>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section id="features" className="mb-24 scroll-mt-28">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <Badge variant="outline" className="px-3 py-1 text-sm border-primary/30 text-primary mb-4">
                Engineered for Consistency
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Everything You Need to Build Lasting Habits
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Carefully crafted features focused on habit psychology, minimal cognitive friction, and zero distractions.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {product.features.map((f, i) => {
                const IconComp = iconMap[f.icon] || Sparkles;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="p-8 rounded-3xl bg-card border border-border/80 hover:border-primary/40 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-24 max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="px-3 py-1 text-sm border-primary/30 text-primary mb-4">
                Got Questions?
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {product.faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-2xl border border-border/80 bg-card px-6 py-2"
                >
                  <AccordionTrigger className="text-left font-semibold text-base hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default TwentyOneDaysHabit;
