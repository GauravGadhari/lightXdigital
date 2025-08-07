import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { siteConfig } from "@/config/site.config";

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { label: "Founded", value: siteConfig.company.founded },
    { label: "Location", value: siteConfig.company.location },
    { label: "Team", value: siteConfig.company.team },
    { label: "Clients", value: siteConfig.company.clients },
  ];

  return (
    <section id="about" className="section-padding bg-muted relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-primary rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-primary rounded-full" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-primary rounded-full" />
      </div>

      <div className="container-custom relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hero-text text-5xl md:text-7xl font-bold mb-8"
            >
              Crafting Digital
              <span className="block text-primary">Experiences</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6 text-lg text-muted-foreground"
            >
              <p className="body-text leading-relaxed">
                At Light X Digital, we believe that exceptional digital experiences are born 
                from the perfect fusion of strategy, creativity, and technical excellence. 
                Our team of visionaries and craftspeople work in harmony to transform ambitious 
                ideas into digital realities that captivate and convert.
              </p>

              <p className="body-text leading-relaxed">
                We don't just build websites or run campaigns – we architect digital ecosystems 
                that grow with your business, adapt to market changes, and consistently deliver 
                measurable results that exceed expectations.
              </p>

              <p className="body-text leading-relaxed">
                Every project is an opportunity to push boundaries, challenge conventions, 
                and create something truly remarkable that stands the test of time.
              </p>
            </motion.div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="text-center group"
              >
                <div className="border border-border bg-card p-8 rounded-2xl hover:border-primary transition-colors duration-300">
                  <motion.div
                    className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2"
                    animate={{ 
                      scale: [1, 1.05, 1] 
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="body-text text-sm font-medium tracking-wide uppercase text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-32 text-center max-w-4xl mx-auto"
        >
          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
              className="absolute -top-8 -left-8 text-8xl text-primary opacity-20 font-serif"
            >
              "
            </motion.div>
            
            <blockquote className="hero-text text-3xl md:text-4xl font-light italic text-center leading-relaxed">
              We don't just follow trends —{" "}
              <span className="text-primary font-medium">we create them</span>
            </blockquote>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="absolute -bottom-8 -right-8 text-8xl text-primary opacity-20 font-serif rotate-180"
            >
              "
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};