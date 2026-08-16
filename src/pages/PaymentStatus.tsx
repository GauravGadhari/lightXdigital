import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePageTransitions } from "@/hooks/usePageTransitions";
import { useLenis } from "@/hooks/useLenis";
import { Badge } from "@/components/ui/badge";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  Crown,
  Smartphone,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const PaymentStatus = () => {
  usePageTransitions();
  useLenis();
  const [searchParams] = useSearchParams();
  const { user, refreshSubscriptions, subscriptions } = useAuth();
  const [isVerifying, setIsVerifying] = useState(true);

  const orderId = searchParams.get("order_id");

  useEffect(() => {
    const checkStatus = async () => {
      // Small pause to let webhook record payment
      await new Promise((res) => setTimeout(res, 2000));
      if (user) {
        await refreshSubscriptions();
      }
      setIsVerifying(false);
    };

    checkStatus();
  }, [user]);

  const hasActiveSub = subscriptions.some((s) => s.is_active);

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

            <div className="p-4 rounded-2xl bg-muted/40 border border-border/80 mb-6 text-left space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Instant Mobile Activation</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Open your <strong>21 Days of Habit</strong> app and sign in with <strong>{user?.email}</strong>. Pro will activate automatically!
              </p>
            </div>

            <div className="space-y-3">
              <Link
                to="/account"
                className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
              >
                Go to My Account <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/products/21-days-of-habit"
                className="w-full py-3 rounded-2xl border border-border text-sm font-medium hover:bg-muted/30 transition-colors block text-center"
              >
                Back to Product Page
              </Link>
            </div>
          </div>
        ) : (
          <div className="py-6">
            <div className="w-16 h-16 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold mb-2">Order Processed</h2>
            <p className="text-sm text-muted-foreground mb-6">
              If your payment was completed, your subscription will activate shortly. You can check your account status anytime.
            </p>

            <div className="space-y-3">
              <Link
                to="/account"
                className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity block text-center"
              >
                Check My Account
              </Link>
              <Link
                to="/pricing"
                className="w-full py-3 rounded-2xl border border-border text-sm font-medium hover:bg-muted/30 transition-colors block text-center"
              >
                Return to Pricing
              </Link>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PaymentStatus;
