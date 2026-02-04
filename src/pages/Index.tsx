import { useLenis } from "@/hooks/useLenis";
import { usePageTransitions } from "@/hooks/usePageTransitions";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  useLenis();
  usePageTransitions();
  const location = useLocation();

  // Scroll to hash section on page load (e.g., #contact)
  useEffect(() => {
    if (location.hash) {
      // Small delay to allow page to render first
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location.hash]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen bg-background"
    >
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </motion.div>
  );
};

export default Index;
