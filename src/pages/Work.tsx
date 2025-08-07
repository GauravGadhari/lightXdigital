import { motion, AnimatePresence } from "framer-motion";
import { usePageTransitions } from "@/hooks/usePageTransitions";
import { useLenis } from "@/hooks/useLenis";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects, getAllCategories } from "@/data/projects";
import { Link } from "react-router-dom";
import { ExternalLink, Github, ArrowRight } from "lucide-react";

const Work = () => {
  usePageTransitions();
  useLenis();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", ...getAllCategories()];
  
  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
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
              <Link to="/" className="font-serif text-2xl font-bold tracking-tight hover:text-primary transition-colors">
                Light X Digital
              </Link>
              <Link 
                to="/"
                className="text-sm font-medium tracking-wide hover:text-primary transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </motion.nav>

      <div className="container-custom px-6 md:px-8 lg:px-12 section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="hero-text text-6xl md:text-8xl font-bold mb-8">
            Our
            <span className="block text-primary">Work</span>
          </h1>
          <p className="body-text text-xl max-w-3xl mx-auto text-muted-foreground">
            Discover our portfolio of innovative digital solutions that have transformed businesses and created lasting impact across various industries.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`px-6 py-3 transition-all duration-300 ${
                selectedCategory === category 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-transparent border-foreground text-foreground hover:bg-foreground hover:text-background"
              }`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="space-y-12"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-12 border-b border-border last:border-b-0">
                  {/* Project Image */}
                  <div className={`relative aspect-video overflow-hidden rounded-lg ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex gap-4">
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                          >
                            <ExternalLink className="w-5 h-5 text-white" />
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                          >
                            <Github className="w-5 h-5 text-white" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className="text-sm">
                        {project.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{project.year}</span>
                    </div>
                    
                    <h3 className="hero-text text-3xl md:text-4xl font-bold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="body-text text-lg text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-sm px-3 py-1">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge variant="secondary" className="text-sm px-3 py-1">
                          +{project.technologies.length - 4} more
                        </Badge>
                      )}
                    </div>

                    <Link
                      to={`/work/${project.id}`}
                      className="inline-flex items-center gap-3 text-lg font-medium hover:text-primary transition-colors group/link"
                    >
                      View Project Details
                      <ArrowRight className="w-5 h-5 group-hover/link:translate-x-2 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20 pt-20 border-t border-border"
        >
          <h2 className="hero-text text-4xl md:text-6xl font-bold mb-6">
            Ready to Start Your
            <span className="block text-primary">Project?</span>
          </h2>
          <p className="body-text text-lg mb-8 max-w-2xl mx-auto text-muted-foreground">
            Let's discuss how we can bring your vision to life with our expertise and innovative approach.
          </p>
          <Link to="/#contact">
            <Button className="btn-primary text-lg px-12 py-6">
              Start Your Project
            </Button>
          </Link>
        </motion.div>
      </div>
      </div>
    </motion.div>
  );
};

export default Work;