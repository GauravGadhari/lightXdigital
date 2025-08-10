import { motion } from "framer-motion";
import { PremiumButton } from "@/components/ui/premium-button";
import { siteConfig } from "@/config/site.config";
import heroAbstract from "@/assets/hero-abstract.png";

export const Hero = () => {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToServices = () => {
    const element = document.querySelector("#services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Abstract */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <img
          src={heroAbstract}
          alt=""
          className="w-full h-full object-contain opacity-20"
        />
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [-20, 20, -20],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full"
      />

      <motion.div
        animate={{
          y: [20, -20, 20],
          x: [-10, 10, -10],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-1/3 right-1/3 w-1 h-1 bg-primary rounded-full"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-primary rounded-full"
      />

      <div className="container-custom relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hero-text text-6xl md:text-8xl lg:text-9xl font-bold mb-8"
          >
            Digital
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="block text-primary"
            >
              Excellence
            </motion.span>
            Redefined
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="body-text text-xl md:text-2xl text-muted-foreground mb-4"
          >
            {siteConfig.tagline}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="body-text text-lg max-w-3xl mx-auto mb-12 text-muted-foreground"
          >
            {siteConfig.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <PremiumButton
              onClick={scrollToContact}
              variant="start-project"
              size="xl"
            >
              Start Your Project
            </PremiumButton>

            <PremiumButton
              onClick={scrollToServices}
              variant="explore-services"
              size="xl"
            >
              Explore Services
            </PremiumButton>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-0.5 h-16 bg-primary rounded-full"
            />
          </motion.div>
        </div>
      </div>

      {/* Decorative Lines */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 2, delay: 1 }}
        className="absolute -bottom-8 left-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
      />
    </section>
  );
};
