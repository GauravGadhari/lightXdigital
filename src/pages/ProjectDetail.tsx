import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { usePageTransitions } from "@/hooks/usePageTransitions";
import { useLenis } from "@/hooks/useLenis";
import { PremiumButton } from "@/components/ui/premium-button";
import { Badge } from "@/components/ui/badge";
import { getProjectById } from "@/data/projects";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  User,
  Briefcase,
} from "lucide-react";

const ProjectDetail = () => {
  usePageTransitions();
  useLenis();
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <Navigate to="/work" replace />;
  }

  const project = getProjectById(id);

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="min-h-screen bg-background"
    >
      <div className="pt-20">
        {/* Navbar */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border"
        >
          <div className="container-custom">
            <div className="flex items-center justify-between h-20">
              <Link
                to="/"
                className="font-serif text-2xl font-bold tracking-tight hover:text-primary transition-colors"
              >
                Light X Digital
              </Link>
              <div className="flex items-center gap-6">
                <Link
                  to="/work"
                  className="text-sm font-medium tracking-wide hover:text-primary transition-colors"
                >
                  All Work
                </Link>
                <Link
                  to="/"
                  className="text-sm font-medium tracking-wide hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </div>
            </div>
          </div>
        </motion.nav>

        <div className="container-custom px-6 md:px-8 lg:px-12 py-16 md:py-20 lg:py-24">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Work
            </Link>
          </motion.div>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="mb-4">
                  {project.category}
                </Badge>
                <h1 className="hero-text text-4xl md:text-6xl font-bold mb-6">
                  {project.title}
                </h1>
                <p className="body-text text-xl text-muted-foreground mb-8">
                  {project.description}
                </p>

                {/* Project Links */}
                <div className="flex gap-4 mb-8">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <PremiumButton variant="view-work" size="md">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Live Site
                      </PremiumButton>
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <PremiumButton variant="explore-services" size="md">
                        <Github className="w-4 h-4 mr-2" />
                        View Code
                      </PremiumButton>
                    </a>
                  )}
                </div>
              </div>

              <div className="relative">
                <motion.img
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  src={project.image}
                  alt={project.title}
                  className="w-full rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </motion.div>

          {/* Project Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 p-8 bg-card border border-border rounded-lg"
          >
            <div className="text-center">
              <Calendar className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Year</h3>
              <p className="text-muted-foreground">{project.year}</p>
            </div>
            <div className="text-center">
              <User className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Client</h3>
              <p className="text-muted-foreground">{project.client}</p>
            </div>
            <div className="text-center">
              <Briefcase className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Category</h3>
              <p className="text-muted-foreground">{project.category}</p>
            </div>
          </motion.div>

          {/* Project Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="hero-text text-3xl font-bold mb-6">
              Project Overview
            </h2>
            <p className="body-text text-lg leading-relaxed text-muted-foreground">
              {project.longDescription}
            </p>
          </motion.div>

          {/* Services & Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16"
          >
            <div>
              <h3 className="hero-text text-2xl font-bold mb-6">
                Services Provided
              </h3>
              <div className="space-y-3">
                {project.services.map((service, index) => (
                  <motion.div
                    key={service}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="body-text">{service}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="hero-text text-2xl font-bold mb-6">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  >
                    <Badge variant="secondary" className="px-4 py-2">
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-16"
          >
            <h3 className="hero-text text-2xl font-bold mb-6">
              Project Gallery
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.gallery.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  className="aspect-video rounded-lg overflow-hidden bg-muted"
                >
                  <img
                    src={image}
                    alt={`${project.title} gallery ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center pt-16 border-t border-border"
          >
            <h2 className="hero-text text-3xl md:text-5xl font-bold mb-6">
              Like What You See?
            </h2>
            <p className="body-text text-lg mb-8 max-w-2xl mx-auto text-muted-foreground">
              Let's collaborate to create something amazing for your business.
              Contact us today to discuss your project.
            </p>
            <Link to="/#contact">
              <PremiumButton variant="start-project" size="xl">
                Start Your Project
              </PremiumButton>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
