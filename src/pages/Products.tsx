import { motion, AnimatePresence } from "framer-motion";
import { usePageTransitions } from "@/hooks/usePageTransitions";
import { useLenis } from "@/hooks/useLenis";
import { useState } from "react";
import { PremiumButton } from "@/components/ui/premium-button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/products";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Sparkles, Star, Zap } from "lucide-react";

const Products = () => {
  usePageTransitions();
  useLenis();
  const navigate = useNavigate();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen bg-background flex flex-col"
    >
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="container-custom">
          {/* Hero Section */}
          <section className="mb-14 sm:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto px-2"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 border border-white/20 rounded-full mb-6"
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-xs sm:text-sm font-medium">Premium Software Solutions</span>
              </motion.div>

              <h1 className="hero-text text-4xl sm:text-6xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
                Our <span className="text-primary">Products</span>
              </h1>
              <p className="body-text text-sm sm:text-lg text-muted-foreground leading-relaxed">
                Ready-to-use software solutions designed for businesses and habit builders.
                Start your digital journey with <span className="text-white font-semibold">seamless cloud sync & Pro features</span>.
              </p>
            </motion.div>
          </section>

          {/* Value Highlights Section */}
          <section className="mb-14 sm:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"
            >
              {[
                { icon: Star, title: "0 Ads & Clean UI", subtitle: "Focused, distraction-free design" },
                { icon: Zap, title: "Real-time Cloud Sync", subtitle: "Instant cross-device backup" },
                { icon: Sparkles, title: "Complete Ecosystem", subtitle: "Mobile apps & web portal" },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3.5 sm:gap-4 p-4 sm:p-6 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="p-2.5 sm:p-3 bg-white/10 rounded-xl shrink-0">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm sm:text-base">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Products Section */}
          <section className="mb-16 sm:mb-20">
            <motion.div layout className="space-y-8 sm:space-y-12">
              <AnimatePresence>
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group relative cursor-pointer"
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                    onClick={() => navigate(product.route)}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center p-5 sm:p-8 md:p-10 border border-white/10 rounded-3xl hover:border-white/30 hover:bg-white/5 transition-all">
                      {/* Product Image */}
                      <div className="relative aspect-video overflow-hidden rounded-2xl">
                        <motion.div
                          animate={{
                            scale: hoveredProduct === product.id ? 1.05 : 1,
                          }}
                          transition={{ duration: 0.6 }}
                          className="w-full h-full"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>

                        {/* Featured badge */}
                        {product.featured && (
                          <div className="absolute top-3.5 right-3.5">
                            <Badge className="bg-white text-black font-semibold text-[11px]">
                              <Star className="w-3 h-3 mr-1 fill-current" />
                              Featured
                            </Badge>
                          </div>
                        )}
                      </div>

                      {/* Product Content */}
                      <div className="space-y-4 sm:space-y-5">
                        <Badge variant="outline" className="text-xs">
                          {product.category}
                        </Badge>

                        <h3 className="hero-text text-2xl sm:text-3xl md:text-4xl font-bold group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>

                        <p className="body-text text-xs sm:text-sm text-muted-foreground italic">
                          "{product.tagline}"
                        </p>

                        <p className="body-text text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {product.shortDescription}
                        </p>

                        <div className="flex flex-wrap gap-3 pt-2">
                          <div onClick={(e) => e.stopPropagation()}>
                            <Link to={product.route}>
                              <PremiumButton variant="start-project" size="md">
                                View Details
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                              </PremiumButton>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </section>

          {/* CTA Section */}
          <section className="pt-14 sm:pt-20 border-t border-border">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center max-w-2xl mx-auto px-2"
            >
              <h2 className="hero-text text-3xl sm:text-5xl font-bold mb-4">
                Ready to Upgrade <span className="block text-primary">Your Experience?</span>
              </h2>
              <p className="body-text text-xs sm:text-base mb-6 text-muted-foreground leading-relaxed">
                Unlock Pro features, 0 ads, and multi-device sync across our ecosystem.
              </p>
              <Link to="/pricing">
                <PremiumButton variant="start-project" size="lg">
                  Explore Pro Plans
                </PremiumButton>
              </Link>
            </motion.div>
          </section>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default Products;
