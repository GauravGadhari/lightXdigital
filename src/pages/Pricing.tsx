import React, { useState } from "react";
import { motion } from "framer-motion";
import { usePageTransitions } from "@/hooks/usePageTransitions";
import { useLenis } from "@/hooks/useLenis";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
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

const Pricing = () => {
  usePageTransitions();
  useLenis();
  const { user, signInWithGoogle, createPaymentOrder, subscriptions } = useAuth();

  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly" | "lifetime">("yearly");
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
    toast.loading("Creating checkout link...", { id: "pricing-checkout" });

    try {
      const result = await createPaymentOrder(appSlug, planKey);
      toast.dismiss("pricing-checkout");

      if (result.payment_link) {
        toast.success("Redirecting to Cashfree...");
        window.location.href = result.payment_link;
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
                  className="text-sm font-medium tracking-wide hover:text-primary transition-colors"
                >
                  Products
                </Link>
                <Link
                  to="/work"
                  className="text-sm font-medium tracking-wide hover:text-primary transition-colors"
                >
                  Our Work
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
          {/* Header */}
          <section className="text-center mb-16 max-w-3xl mx-auto">
            <Badge variant="outline" className="px-3 py-1 text-sm border-primary/30 text-primary mb-4">
              LightX Apps Ecosystem
            </Badge>
            <h1 className="hero-text text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Simple, Transparent{" "}
              <span className="text-primary">Pricing</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Unlock Pro features across all your devices. Zero hidden charges, 100% money-back guarantee, and uninterrupted productivity.
            </p>

            {/* Currency Selector */}
            <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-card border border-border">
              <button
                onClick={() => setCurrency("INR")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  currency === "INR" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                🇮🇳 INR (₹)
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  currency === "USD" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                🌍 USD ($)
              </button>
            </div>
          </section>

          {/* 21 Days of Habit Pricing Highlight */}
          <section className="mb-20">
            <div className="max-w-5xl mx-auto rounded-3xl border border-border bg-card/60 p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10" />

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 pb-8 border-b border-border/80">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg">
                    <Flame className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-bold">21 Days of Habit</h2>
                      {is21DaysPro && (
                        <Badge className="bg-emerald-500 text-white text-xs">PRO ACTIVE</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">Minimalist habit tracker with streak freezes and cloud sync</p>
                  </div>
                </div>
                <Link
                  to="/products/21-days-of-habit"
                  className="text-sm text-primary hover:underline flex items-center gap-1 font-semibold"
                >
                  View Product Page <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* 3 Tier Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    className={`rounded-2xl p-6 border transition-all ${
                      plan.popular
                        ? "bg-card border-primary ring-1 ring-primary/40 shadow-lg shadow-primary/5"
                        : "bg-background/80 border-border"
                    }`}
                  >
                    {plan.badge && (
                      <div className="inline-block px-3 py-0.5 rounded-full bg-primary/20 text-primary text-[11px] font-bold mb-3">
                        {plan.badge}
                      </div>
                    )}
                    <h3 className="text-base font-bold mb-1">{plan.title}</h3>
                    <p className="text-xs text-muted-foreground mb-4">{plan.desc}</p>
                    <div className="mb-6">
                      <span className="text-3xl font-extrabold">{plan.price}</span>
                      <span className="text-xs text-muted-foreground ml-1">{plan.period}</span>
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
          <section className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-8 text-xs text-muted-foreground flex-wrap">
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-primary" />
                <span>Cashfree Encrypted Payments</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-primary" />
                <span>Syncs with Android & iOS App</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-primary" />
                <span>Cancel Anytime</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default Pricing;
