import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PremiumButton } from "@/components/ui/premium-button";
import { Link, useNavigate } from "react-router-dom";
import { siteConfig } from "@/config/site.config";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;

      // Prevent scrolling on multiple elements
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.documentElement.style.overflow = "hidden";

      // Store scroll position for restoration
      document.body.dataset.scrollY = scrollY.toString();

      // Add escape key listener
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
      // Restore scroll position
      const scrollY = document.body.dataset.scrollY;

      // Reset styles
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.documentElement.style.overflow = "";

      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY));
        delete document.body.dataset.scrollY;
      }
    }

    // Cleanup on unmount
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
      // Close mobile menu first
      setIsMobileMenuOpen(false);

      // Small delay to allow scroll position restoration before scrolling to target
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // Use React Router for internal navigation
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

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="hidden md:block"
          >
            <PremiumButton
              onClick={() => handleNavigation("#contact")}
              variant="contact-us"
              size="md"
            >
              Start Project
            </PremiumButton>
          </motion.div>

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
            {/* Backdrop */}
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

            {/* Full Screen Menu Panel */}
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
              {/* Menu Header */}
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
                    animate={{
                      rotate: 45,
                    }}
                    className="w-6 h-0.5 bg-foreground block absolute"
                  />
                  <motion.span
                    animate={{
                      rotate: -45,
                    }}
                    className="w-6 h-0.5 bg-foreground block absolute"
                  />
                </motion.button>
              </div>

              {/* Menu Content */}
              <div className="flex flex-col h-full">
                {/* Navigation Links */}
                <div className="flex-1 px-6 py-8">
                  <div className="space-y-6">
                    {siteConfig.navigation.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.1 }}
                      >
                        <button
                          onClick={() => handleNavigation(item.href)}
                          className="w-full text-left text-2xl font-medium tracking-wide hover:text-primary transition-colors py-3 border-b border-border/30"
                        >
                          {item.name}
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA Section */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="p-6 border-t border-border bg-muted/30"
                >
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground text-center">
                      Ready to start your project?
                    </p>
                    <PremiumButton
                      onClick={() => handleNavigation("#contact")}
                      variant="contact-us"
                      size="lg"
                      className="w-full"
                    >
                      Start Project
                    </PremiumButton>
                  </div>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="px-6 py-4 bg-card border-t border-border"
                >
                  <div className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Get in touch
                    </p>
                    <p className="text-sm font-medium">
                      {siteConfig.links.email}
                    </p>
                    <p className="text-sm font-medium">
                      {siteConfig.links.phone}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="absolute top-1/2 right-8 transform -translate-y-1/2 w-32 h-32 border border-primary rounded-full"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.05 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="absolute bottom-1/4 left-8 w-24 h-24 border border-primary rounded-full"
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
