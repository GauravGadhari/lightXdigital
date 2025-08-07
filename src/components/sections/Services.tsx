import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { siteConfig } from "@/config/site.config";
import strategyIcon from "@/assets/strategy-icon.png";
import brandingIcon from "@/assets/branding-icon.png";
import developmentIcon from "@/assets/development-icon.png";

const serviceIcons = [strategyIcon, brandingIcon, developmentIcon];

export const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="section-padding bg-background relative">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="hero-text text-5xl md:text-7xl font-bold mb-6">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="body-text text-xl text-muted-foreground max-w-3xl mx-auto">
            We craft exceptional digital experiences that drive meaningful results and 
            establish lasting connections between brands and their audiences.
          </p>
        </motion.div>

        <div className="space-y-32">
          {siteConfig.services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 100 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Service Content */}
              <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.2 }}
                >
                  {/* Service Number */}
                  <div className="flex items-center mb-6">
                    <span className="font-serif text-6xl font-bold text-primary opacity-30">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="ml-6 h-px bg-primary flex-1" />
                  </div>

                  <h3 className="hero-text text-4xl md:text-5xl font-bold mb-6">
                    {service.title}
                  </h3>
                  
                  <p className="body-text text-lg text-muted-foreground mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-4">
                    {service.features.map((feature, featureIndex) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ 
                          duration: 0.5, 
                          delay: 0.5 + index * 0.2 + featureIndex * 0.1 
                        }}
                        className="flex items-center"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mr-4 flex-shrink-0" />
                        <span className="body-text text-foreground">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Service Visual */}
              <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                  className="relative"
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="w-full h-full bg-gradient-to-br from-primary to-transparent rounded-2xl" />
                  </div>

                  {/* Icon Container */}
                  <div className="relative flex items-center justify-center h-96 rounded-2xl border border-border bg-card">
                    <motion.img
                      src={serviceIcons[index]}
                      alt={service.title}
                      className="w-32 h-32 object-contain"
                      animate={{ 
                        y: [-10, 10, -10],
                        rotate: [0, 2, 0, -2, 0]
                      }}
                      transition={{ 
                        duration: 6, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                    />

                    {/* Floating Decorations */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3] 
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: 1 + index * 0.3
                      }}
                      className="absolute top-8 right-8 w-4 h-4 bg-primary rounded-full"
                    />
                    
                    <motion.div
                      animate={{ 
                        x: [-5, 5, -5],
                        y: [5, -5, 5] 
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: 2 + index * 0.3
                      }}
                      className="absolute bottom-8 left-8 w-2 h-2 bg-primary rounded-full"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};