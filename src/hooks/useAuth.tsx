import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { load } from "@cashfreepayments/cashfree-js";

export interface SubscriptionInfo {
  app_id: string;
  app_slug: string;
  app_name: string;
  plan_key: string;
  status: string;
  current_period_end: string | null;
  is_active: boolean;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithGoogle: (redirectTo?: string) => Promise<void>;
  signOut: () => Promise<void>;
  subscriptions: SubscriptionInfo[];
  refreshSubscriptions: () => Promise<void>;
  createPaymentOrder: (appSlug: string, planKey: string, tier?: number) => Promise<{ payment_link?: string; order_id?: string; error?: string; pending_kyc?: boolean }>;
  cancelSubscription: (appSlug: string) => Promise<{ success: boolean; message?: string; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState<SubscriptionInfo[]>([]);

  const fetchSubscriptions = async () => {
    try {
      if (!supabase.auth.getUser) return;
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (!currentUser) {
        setSubscriptions([]);
        return;
      }

      const { data, error } = await supabase.rpc("get_my_subscriptions");
      if (!error && Array.isArray(data)) {
        setSubscriptions(data as SubscriptionInfo[]);
      }
    } catch (err) {
      console.error("Error fetching subscriptions:", err);
    }
  };

  useEffect(() => {
    // Initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user) {
        fetchSubscriptions();
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user) {
        await fetchSubscriptions();
      } else {
        setSubscriptions([]);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async (redirectTo?: string) => {
    const targetUrl = redirectTo || window.location.href;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: targetUrl,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      console.error("Google sign in error:", error.message);
      throw error;
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setSubscriptions([]);
  };

  const createPaymentOrder = async (appSlug: string, planKey: string, tier: number = 2) => {
    try {
      if (!session) {
        return { error: "Please sign in with Google first." };
      }

      const response = await supabase.functions.invoke("create-order", {
        body: { app_slug: appSlug, plan_key: planKey, tier },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (response.error) {
        let errorMsg = response.error.message;
        try {
          if ((response.error as any).context) {
            const body = await (response.error as any).context.json();
            if (body && body.error) {
              errorMsg = body.error;
            }
          }
        } catch (_) {}
        console.error("Edge function error:", errorMsg);
        return { error: errorMsg };
      }

      const data = response.data;
      if (data && data.payment_session_id) {
        const cashfree = await load({
          mode: data.is_production ? "production" : "sandbox",
        });
        await cashfree.checkout({
          paymentSessionId: data.payment_session_id,
          redirectTarget: "_self",
        });
        return { order_id: data.order_id, payment_session_id: data.payment_session_id };
      }

      return {
        error: data?.error || "Payment session was not created",
        pending_kyc: data?.pending_kyc,
      };
    } catch (err: any) {
      console.error("createPaymentOrder error:", err);
      return { error: err.message || "Unexpected payment creation error" };
    }
  };

  const cancelSubscription = async (appSlug: string) => {
    try {
      if (!user) return { success: false, error: "Not authenticated" };

      const { data, error } = await supabase.rpc("cancel_subscription", {
        p_app_slug: appSlug,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      await fetchSubscriptions();
      return {
        success: data?.success ?? true,
        message: data?.message || "Subscription cancelled.",
        error: data?.error,
      };
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to cancel subscription" };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signInWithGoogle,
        signOut,
        subscriptions,
        refreshSubscriptions: fetchSubscriptions,
        createPaymentOrder,
        cancelSubscription,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
