import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { load } from "@cashfreepayments/cashfree-js";
import { Loader2, ShieldCheck, AlertCircle } from "lucide-react";

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id") || searchParams.get("payment_session_id");
  const env = searchParams.get("env") || "test"; // 'test' or 'prod'

  const [status, setStatus] = useState<"loading" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      setErrorMsg("Missing payment session ID. Please restart the checkout from the app.");
      return;
    }

    let isMounted = true;

    const initCheckout = async () => {
      try {
        const cashfree = await load({
          mode: env === "prod" ? "production" : "sandbox",
        });

        if (!isMounted) return;

        await cashfree.checkout({
          paymentSessionId: sessionId,
          redirectTarget: "_self",
        });
      } catch (err: any) {
        if (!isMounted) return;
        setStatus("error");
        setErrorMsg(err?.message || "Failed to initialize Cashfree checkout.");
      }
    };

    initCheckout();

    return () => {
      isMounted = false;
    };
  }, [sessionId, env]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      {status === "loading" ? (
        <div className="flex flex-col items-center max-w-sm">
          <div className="relative mb-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
            </div>
          </div>
          <h1 className="text-xl font-bold mb-2">Connecting to Cashfree Gateway...</h1>
          <p className="text-sm text-zinc-400 mb-6">
            Opening secure payment checkout with UPI, QR & Cards.
          </p>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>256-bit Encrypted Banking Tunnel</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-6 text-red-400">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-bold mb-2">Checkout Error</h1>
          <p className="text-sm text-zinc-400 mb-6">{errorMsg}</p>
          <a
            href="https://www.lightxdigital.in/pricing"
            className="px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Go to Pricing Page
          </a>
        </div>
      )}
    </div>
  );
};

export default Checkout;
