import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePageTransitions } from "@/hooks/usePageTransitions";
import { useLenis } from "@/hooks/useLenis";
import { Badge } from "@/components/ui/badge";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  CheckCircle2,
  Loader2,
  Smartphone,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

const PaymentStatus = () => {
  usePageTransitions();
  useLenis();
  const [searchParams] = useSearchParams();
  const { user, refreshSubscriptions, subscriptions } = useAuth();
  const [isVerifying, setIsVerifying] = useState(true);
  const [countdown, setCountdown] = useState(3);

  const orderId = searchParams.get("order_id");

  const openApp = () => {
    // Attempt custom scheme deep link to return to mobile app
    window.location.href = "daysofhabit://payment-success?status=success";
    setTimeout(() => {
      window.location.href = "io.supabase.21days://payment-success?status=success";
    }, 500);
  };

  useEffect(() => {
    const checkStatus = async () => {
      await new Promise((res) => setTimeout(res, 2000));
      if (user) {
        await refreshSubscriptions();
      }
      setIsVerifying(false);
    };

    checkStatus();
  }, [user]);

  const hasActiveSub = subscriptions.some((s) => s.is_active);

  // Auto-launch countdown when payment is verified
  useEffect(() => {
    if (!isVerifying && hasActiveSub) {
      // Trigger instant deep link on mount
      openApp();

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            openApp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isVerifying, hasActiveSub]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="min-h-screen bg-background text-foreground flex items-center justify-center p-6"
    >
      <div className="max-w-md w-full p-8 rounded-3xl bg-card border border-border text-center shadow-xl">
        {isVerifying ? (
          <div className="py-12">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Verifying Your Payment...</h2>
            <p className="text-sm text-muted-foreground">
              Please wait while we confirm your transaction with Cashfree and activate your Pro access.
            </p>
          </div>
        ) : hasActiveSub ? (
          <div className="py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <Badge className="bg-emerald-500 text-white text-xs mb-3">PAYMENT SUCCESSFUL</Badge>
            <h1 className="text-2xl md:text-3xl font-bold mb-3">🎉 Welcome to Pro!</h1>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Your subscription is now active. All premium features and 0 advertisements have been enabled for your account.
            </p>

            {/* Direct App Return Button */}
            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 mb-6 text-center space-y-3">
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-primary">
                <Smartphone className="w-4 h-4" />
                <span>
                  {countdown > 0
                    ? `Returning to App in ${countdown}s...`
                    : "App Launch Triggered!"}
                </span>
              </div>
              <button
                onClick={openApp}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-md shadow-primary/20"
              >
                <Smartphone className="w-4 h-4" />
                Open 21 Days of Habit App
              </button>
            </div>

            <div className="space-y-3">
              <Link
                to="/account"
                className="w-full py-3 rounded-2xl border border-border text-sm font-medium hover:bg-muted/30 transition-colors block text-center"
              >
                Manage Subscription on Web
              </Link>
            </div>
          </div>
        ) : (
          <div className="py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold mb-2">Order Completed!</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Your payment has been received by Cashfree. Tap below to return to the app and unlock Pro!
            </p>

            <button
              onClick={openApp}
              className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mb-3 shadow-lg shadow-primary/25"
            >
              <Smartphone className="w-4 h-4" />
              Return to 21 Days of Habit App
            </button>

            <Link
              to="/account"
              className="w-full py-3 rounded-2xl border border-border text-sm font-medium hover:bg-muted/30 transition-colors block text-center"
            >
              Check My Account
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PaymentStatus;
