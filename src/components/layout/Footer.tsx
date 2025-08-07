import { motion } from "framer-motion";
import { siteConfig } from "@/config/site.config";
import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";

export const Footer = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-px h-full bg-primary" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-primary" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-primary" />
      </div>

      <div className="container-custom relative">
        {/* Main Footer Content */}
        <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="mb-6">
              <span className="font-serif text-3xl font-bold tracking-tight">
                Light X Digital
              </span>
              <p className="body-text text-muted-foreground mt-2 text-lg">
                {siteConfig.tagline}
              </p>
            </div>

            <p className="body-text text-muted-foreground leading-relaxed max-w-md mb-8">
              Crafting exceptional digital experiences that drive meaningful
              results and establish lasting connections between brands and their
              audiences.
            </p>

            {/* Social Links */}
            <div className="flex space-x-6">
              {[{ name: "Instagram", href: siteConfig.links.instagram }].map(
                (social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="w-12 h-12 border border-border bg-card rounded-full flex items-center justify-center hover:border-primary transition-colors group"
                  >
                    <Instagram className="w-4 h-4 group-hover:text-primary transition-colors" />
                  </motion.a>
                )
              )}
            </div>
          </motion.div>

          {/* Navigation Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-serif text-xl font-bold mb-6">Navigation</h3>
            <ul className="space-y-4">
              {siteConfig.navigation.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="body-text text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
              <li>
                <Link
                  to="/work"
                  className="body-text text-muted-foreground hover:text-primary transition-colors"
                >
                  Work
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-serif text-xl font-bold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${siteConfig.links.email}`}
                  className="body-text text-muted-foreground hover:text-primary transition-colors"
                >
                  {siteConfig.links.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.links.phone}`}
                  className="body-text text-muted-foreground hover:text-primary transition-colors"
                >
                  {siteConfig.links.phone}
                </a>
              </li>
              <li>
                <span className="body-text text-muted-foreground">
                  {siteConfig.company.location}
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-border py-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="body-text text-sm text-muted-foreground">
              © {currentYear} Light X Digital. All rights reserved.
            </p>

            <div className="flex space-x-8">
              <button className="body-text text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </button>
              <button className="body-text text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Element */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        transition={{ duration: 2 }}
        viewport={{ once: true }}
        className="absolute top-0 left-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
      />
    </footer>
  );
};
