import React from "react";
import { motion } from "framer-motion";
import { usePageTransitions } from "@/hooks/usePageTransitions";
import { useLenis } from "@/hooks/useLenis";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  User as UserIcon,
  Crown,
  LogOut,
  Sparkles,
  Flame,
  ArrowRight,
  ShieldCheck,
  Calendar,
  CreditCard,
  LogIn,
  Layers,
} from "lucide-react";
import { toast } from "sonner";

const Account = () => {
  usePageTransitions();
  useLenis();
  const navigate = useNavigate();
  const { user, loading, signOut, signInWithGoogle, subscriptions } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      navigate("/");
    } catch (e: any) {
      toast.error("Failed to sign out");
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
        <div className="container-custom max-w-4xl mx-auto px-4">
          {!user ? (
            /* Signed Out View */
            <div className="text-center py-16 sm:py-24">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                <UserIcon className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold mb-3">Your LightX Account</h1>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto mb-8">
                Sign in with Google to view and manage your subscriptions across 21 Days of Habit and LightX apps.
              </p>
              <button
                onClick={() => signInWithGoogle()}
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-semibold shadow-lg shadow-primary/25 hover:opacity-90 transition-opacity"
              >
                <LogIn className="w-4 h-4" />
                Sign In with Google
              </button>
            </div>
          ) : (
            /* Signed In View */
            <div>
              {/* Profile Card */}
              <div className="p-5 sm:p-8 rounded-3xl bg-card border border-border mb-8 sm:mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-primary to-emerald-400 flex items-center justify-center text-xl sm:text-2xl font-bold text-primary-foreground shadow-md shrink-0">
                    {user.email?.[0].toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-lg sm:text-2xl font-bold truncate">
                      {user.user_metadata?.full_name || user.email?.split("@")[0]}
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">{user.email}</p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <Badge variant="outline" className="text-[10px] sm:text-xs border-primary/30 text-primary">
                        Google Verified
                      </Badge>
                      <Badge variant="outline" className="text-[10px] sm:text-xs border-emerald-500/30 text-emerald-400">
                        Cloud Sync Active
                      </Badge>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSignOut}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl border border-destructive/30 text-destructive text-xs sm:text-sm font-semibold hover:bg-destructive/10 transition-colors flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>

              {/* Subscriptions Section */}
              <div className="mb-10 sm:mb-12">
                <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                  <Crown className="w-5 h-5 text-primary" />
                  Active Subscriptions
                </h3>

                {subscriptions.length === 0 ? (
                  <div className="p-6 sm:p-8 rounded-3xl border border-dashed border-border bg-card/40 text-center">
                    <Layers className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground mx-auto mb-3 opacity-60" />
                    <h4 className="font-semibold text-base sm:text-lg mb-1">No Active Subscriptions</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto mb-5">
                      You are currently using free tiers. Upgrade to Pro for 0 ads and unlimited access.
                    </p>
                    <Link
                      to="/pricing"
                      className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-semibold hover:opacity-90 transition-opacity"
                    >
                      View Pro Plans <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {subscriptions.map((sub, index) => (
                      <div
                        key={index}
                        className="p-5 sm:p-6 rounded-2xl bg-card border border-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shrink-0">
                            <Flame className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-bold text-sm sm:text-base">{sub.app_name || "21 Days of Habit"}</h4>
                              <Badge className="bg-emerald-500 text-white text-[10px]">
                                {sub.plan_key.toUpperCase()} PRO
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Status: <span className="text-emerald-400 capitalize">{sub.status}</span>
                              {sub.current_period_end
                                ? ` • Active until ${new Date(sub.current_period_end).toLocaleDateString()}`
                                : " • Lifetime Access"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                          <Badge variant="outline" className="border-primary/40 text-primary text-[10px] sm:text-xs py-1">
                            <ShieldCheck className="w-3 h-3 mr-1" />
                            Synced to Mobile
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Ecosystem Apps Grid */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Explore LightX Apps</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shrink-0">
                        <Flame className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm sm:text-base">21 Days of Habit</h4>
                        <p className="text-[11px] sm:text-xs text-muted-foreground">Habit tracker with streak recovery</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                      Build life-changing daily routines in 21-day cycles with 0 ads.
                    </p>
                    <Link
                      to="/products/21-days-of-habit"
                      className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                    >
                      View App Details <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-yellow-500 to-amber-600 flex items-center justify-center text-white shrink-0">
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm sm:text-base">Jewel Bill Pro</h4>
                        <p className="text-[11px] sm:text-xs text-muted-foreground">Jewellery billing & GST suite</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                      Complete billing software for jewellery retailers with GST and gold rate calculation.
                    </p>
                    <Link
                      to="/products/jewel-bill-pro"
                      className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                    >
                      View Software Details <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default Account;
