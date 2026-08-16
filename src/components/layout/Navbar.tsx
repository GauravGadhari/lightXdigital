import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PremiumButton } from "@/components/ui/premium-button";
import { Link, useNavigate } from "react-router-dom";
import { siteConfig } from "@/config/site.config";
import { useAuth } from "@/hooks/useAuth";
import { User, LogIn, Crown } from "lucide-react";

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, signInWithGoogle, subscriptions } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const hasAnyPro = subscriptions.some((s) => s.is_active);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollY = window.scrollY;

      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.documentElement.style.overflow = "hidden";

      document.body.dataset.scrollY = scrollY.toString();

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsMobileMenuOpen(false);
        }
      };
      document.addEventListener("keydown", handleEscape);

      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    } else {
      const scrollY = document.body.dataset.scrollY;

      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.documentElement.style.overflow = "";

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY));
        delete document.body.dataset.scrollY;
      }
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.documentElement.style.overflow = "";
      if (document.body.dataset.scrollY) {
        const scrollY = document.body.dataset.scrollY;
        window.scrollTo(0, parseInt(scrollY));
        delete document.body.dataset.scrollY;
      }
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (href: string) => {
    if (href.startsWith("#")) {
      setIsMobileMenuOpen(false);

      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      navigate(href);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-navbar transition-all duration-500 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center"
          >
            <Link to="/" className="flex items-center">
              <span className="font-serif text-2xl font-bold tracking-tight">
                Light X Digital
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {siteConfig.navigation.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onClick={() => handleNavigation(item.href)}
                className="text-sm font-medium tracking-wide hover:text-primary transition-colors"
              >
                {item.name}
              </motion.button>
            ))}
          </div>

          {/* User Auth + CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  to="/account"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-border/80 bg-card hover:border-primary transition-all text-xs font-semibold shadow-sm"
                >
                  <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold">
                    {user.email?.[0].toUpperCase()}
                  </div>
                  <span className="text-muted-foreground">{user.email?.split("@")[0]}</span>
                  {hasAnyPro && <Crown className="w-3.5 h-3.5 text-yellow-500" />}
                </Link>
              </motion.div>
            ) : (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => signInWithGoogle()}
                className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 px-3 py-2"
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign In
              </motion.button>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <PremiumButton
                onClick={() => handleNavigation("#contact")}
                variant="contact-us"
                size="md"
              >
                Start Project
              </PremiumButton>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <motion.span
              animate={{
                rotate: isMobileMenuOpen ? 45 : 0,
                y: isMobileMenuOpen ? 8 : 0,
              }}
              className="w-6 h-0.5 bg-foreground block transition-all"
            />
            <motion.span
              animate={{
                opacity: isMobileMenuOpen ? 0 : 1,
              }}
              className="w-6 h-0.5 bg-foreground block transition-all"
            />
            <motion.span
              animate={{
                rotate: isMobileMenuOpen ? -45 : 0,
                y: isMobileMenuOpen ? -8 : 0,
              }}
              className="w-6 h-0.5 bg-foreground block transition-all"
            />
          </motion.button>
        </div>
      </div>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              onTouchMove={(e) => e.preventDefault()}
              onWheel={(e) => e.preventDefault()}
              style={{ touchAction: "none" }}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.6,
              }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-background border-l border-border z-[70] md:hidden overflow-hidden"
              onTouchMove={(e) => e.preventDefault()}
              onWheel={(e) => e.preventDefault()}
              style={{ touchAction: "none" }}
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-serif text-2xl font-bold tracking-tight"
                >
                  Light X Digital
                </motion.span>
                <motion.button
                  initial={{ opacity: 0, rotate: 180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
                >
                  <motion.span
                    animate={{ rotate: 45 }}
                    className="w-6 h-0.5 bg-foreground block absolute"
                  />
                  <motion.span
                    animate={{ rotate: -45 }}
                    className="w-6 h-0.5 bg-foreground block absolute"
                  />
                </motion.button>
              </div>

              <div className="flex flex-col h-full overflow-y-auto">
                <div className="flex-1 px-6 py-6 space-y-4">
                  {user ? (
                    <div className="p-4 rounded-2xl bg-card border border-border mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">
                          {user.email?.[0].toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold truncate">{user.email}</p>
                          <p className="text-[10px] text-muted-foreground">Logged in with Google</p>
                        </div>
                      </div>
                      <Link
                        to="/account"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="mt-3 block text-center py-2 rounded-xl bg-muted text-xs font-semibold hover:bg-muted/80"
                      >
                        Manage Subscriptions
                      </Link>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        signInWithGoogle();
                      }}
                      className="w-full py-3 rounded-2xl bg-card border border-border flex items-center justify-center gap-2 text-sm font-semibold hover:border-primary transition-colors"
                    >
                      <LogIn className="w-4 h-4 text-primary" />
                      Sign In with Google
                    </button>
                  )}

                  {siteConfig.navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <button
                        onClick={() => handleNavigation(item.href)}
                        className="w-full text-left text-xl font-medium tracking-wide hover:text-primary transition-colors py-2.5 border-b border-border/30"
                      >
                        {item.name}
                      </button>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="p-6 border-t border-border bg-muted/30"
                >
                  <PremiumButton
                    onClick={() => handleNavigation("#contact")}
                    variant="contact-us"
                    size="lg"
                    className="w-full"
                  >
                    Start Project
                  </PremiumButton>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
