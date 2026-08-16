import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Work from "./pages/Work";
import ProjectDetail from "./pages/ProjectDetail";
import Products from "./pages/Products";
import JewelBillPro from "./pages/products/JewelBillPro";
import TwentyOneDaysHabit from "./pages/products/TwentyOneDaysHabit";
import Pricing from "./pages/Pricing";
import Account from "./pages/Account";
import PaymentStatus from "./pages/PaymentStatus";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:id" element={<ProjectDetail />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/jewel-bill-pro" element={<JewelBillPro />} />
        <Route path="/products/21-days-of-habit" element={<TwentyOneDaysHabit />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/subscription" element={<Pricing />} />
        <Route path="/account" element={<Account />} />
        <Route path="/payment-status" element={<PaymentStatus />} />
        <Route path="/subscription/success" element={<PaymentStatus />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
