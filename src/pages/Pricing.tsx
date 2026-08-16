import React, { useState } from "react";
import { motion } from "framer-motion";
import { usePageTransitions } from "@/hooks/usePageTransitions";
import { useLenis } from "@/hooks/useLenis";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Sparkles,
  Check,
  Flame,
  Shield,
  Zap,
  Globe,
  Lock,
  Loader2,
  Crown,
  LogIn,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

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

const Pricing = () => {
  usePageTransitions();
  useLenis();
  const { user, signInWithGoogle, createPaymentOrder, subscriptions } = useAuth();

  const [currency] = useState<"INR" | "USD">(detectAutoCurrency());
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const is21DaysPro = subscriptions.some((sub) => sub.app_slug === "21days" && sub.is_active);

  const handleSubscribe = async (appSlug: string, planKey: string) => {
    if (!user) {
      toast.info("Please sign in with Google to subscribe", {
        action: {
          label: "Sign In",
          onClick: () => signInWithGoogle(),
        },
      });
      try {
        await signInWithGoogle();
      } catch (e: any) {
        toast.error("Sign-in failed. Please try again.");
      }
      return;
    }

    setIsCheckingOut(true);
    toast.loading("Creating checkout session...", { id: "pricing-checkout" });

    try {
      const tier = currency === "INR" ? 2 : 1;
      const result = await createPaymentOrder(appSlug, planKey, tier);
      toast.dismiss("pricing-checkout");

      if (result.order_id) {
        toast.success("Launching secure checkout...");
      } else {
        toast.error(result.error || "Failed to create order");
        setIsCheckingOut(false);
      }
    } catch (err: any) {
      toast.dismiss("pricing-checkout");
      toast.error(err.message || "An error occurred");
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
          {/* Header */}
          <section className="text-center mb-12 md:mb-16 max-w-3xl mx-auto px-2">
            <Badge variant="outline" className="px-3 py-1 text-xs sm:text-sm border-primary/30 text-primary mb-3">
              LightX Apps Ecosystem
            </Badge>
            <h1 className="hero-text text-3xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight leading-tight">
              Simple, Transparent <span className="text-primary">Pricing</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
              Unlock Pro features across all your devices. Zero hidden charges, 100% money-back guarantee, and uninterrupted productivity.
            </p>
          </section>

          {/* 21 Days of Habit Pricing Card */}
          <section className="mb-16">
            <div className="max-w-5xl mx-auto rounded-3xl border border-border bg-card/70 p-5 sm:p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-60 sm:w-80 h-60 sm:h-80 bg-primary/10 rounded-full blur-3xl -z-10" />

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border/80">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shrink-0">
                    <Flame className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-xl sm:text-2xl font-bold">21 Days of Habit</h2>
                      {is21DaysPro && (
                        <Badge className="bg-emerald-500 text-white text-[11px]">PRO ACTIVE</Badge>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Minimalist habit tracker with streak freezes & cloud sync</p>
                  </div>
                </div>
                <Link
                  to="/products/21-days-of-habit"
                  className="text-xs sm:text-sm text-primary hover:underline flex items-center gap-1 font-semibold"
                >
                  View Product Page <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* 3 Tier Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                {[
                  {
                    id: "monthly",
                    title: "Monthly Pro",
                    price: currency === "INR" ? "₹79" : "$1.99",
                    period: "/ month",
                    desc: "Flexible month-to-month commitment",
                  },
                  {
                    id: "yearly",
                    title: "Yearly Pro",
                    price: currency === "INR" ? "₹399" : "$9.99",
                    period: "/ year",
                    badge: "SAVE 58%",
                    popular: true,
                    desc: "Best choice for serious habit builders",
                  },
                  {
                    id: "lifetime",
                    title: "Lifetime Access",
                    price: currency === "INR" ? "₹1,999" : "$19.99",
                    period: "one-time",
                    badge: "PAY ONCE",
                    desc: "Forever Pro access & all future updates",
                  },
                ].map((plan) => (
                  <div
                    key={plan.id}
                    className={`rounded-2xl p-5 sm:p-6 border transition-all flex flex-col justify-between ${
                      plan.popular
                        ? "bg-card border-primary ring-1 ring-primary/40 shadow-lg shadow-primary/5"
                        : "bg-background/80 border-border"
                    }`}
                  >
                    <div>
                      {plan.badge && (
                        <div className="inline-block px-2.5 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold mb-2.5">
                          {plan.badge}
                        </div>
                      )}
                      <h3 className="text-base font-bold mb-0.5">{plan.title}</h3>
                      <p className="text-xs text-muted-foreground mb-4">{plan.desc}</p>
                      <div className="mb-6">
                        <span className="text-2xl sm:text-3xl font-extrabold">{plan.price}</span>
                        <span className="text-xs text-muted-foreground ml-1">{plan.period}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={isCheckingOut || is21DaysPro}
                      onClick={() => handleSubscribe("21days", plan.id)}
                      className={`w-full py-3 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 ${
                        plan.popular
                          ? "bg-primary text-primary-foreground hover:opacity-90 shadow-md"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {is21DaysPro ? "Active" : `Subscribe ${plan.title}`}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Guarantee Footer */}
          <section className="max-w-2xl mx-auto text-center px-4">
            <div className="flex items-center justify-center gap-4 sm:gap-8 text-xs text-muted-foreground flex-wrap">
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-primary" />
                <span>Cashfree Encrypted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-primary" />
                <span>Syncs with Android & iOS</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-primary" />
                <span>Cancel Anytime</span>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default Pricing;
