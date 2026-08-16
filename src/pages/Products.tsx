import { motion, AnimatePresence } from "framer-motion";
import { usePageTransitions } from "@/hooks/usePageTransitions";
import { useLenis } from "@/hooks/useLenis";
import { useState } from "react";
import { PremiumButton } from "@/components/ui/premium-button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/products";
import { Link, useNavigate } from "react-router-dom";
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
                                    Our Work
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

                <div className="container-custom px-6 md:px-8 lg:px-12 section-padding">
                    {/* Hero Section */}
                    <section className="mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full mb-8"
                            >
                                <Sparkles className="w-4 h-4 text-yellow-400" />
                                <span className="text-sm font-medium">Premium Software Solutions</span>
                            </motion.div>

                            <h1 className="hero-text text-6xl md:text-8xl font-bold mb-8">
                                Our
                                <span className="block text-primary">Products</span>
                            </h1>
                            <p className="body-text text-xl max-w-3xl mx-auto text-muted-foreground">
                                Ready-to-use software solutions designed for Indian businesses.
                                Start your digital journey with{" "}
                                <span className="text-white font-semibold">FREE domain & hosting</span> for the first year.
                            </p>
                        </motion.div>
                    </section>

                    {/* Value Highlights Section */}
                    <section className="mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        >
                            {[
                                { icon: Star, title: "Free .in Domain", subtitle: "First year included" },
                                { icon: Zap, title: "Free Hosting", subtitle: "24/7 online availability" },
                                { icon: Sparkles, title: "Complete Solution", subtitle: "Everything you need" }
                            ].map((item, index) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                    className="flex items-center gap-4 p-6 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                                >
                                    <div className="p-3 bg-white/10 rounded-lg">
                                        <item.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </section>

                    {/* Products Section */}
                    <section className="mb-20">
                        <motion.div layout className="space-y-12">
                            <AnimatePresence>
                                {products.map((product, index) => (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -50 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className="group relative cursor-pointer"
                                        onMouseEnter={() => setHoveredProduct(product.id)}
                                        onMouseLeave={() => setHoveredProduct(null)}
                                        onClick={() => navigate(product.route)}
                                    >
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-12 px-8 border border-white/10 rounded-xl hover:border-white/30 hover:bg-white/5 transition-all">
                                            {/* Product Image */}
                                            <div className="relative aspect-video overflow-hidden rounded-lg">
                                                <motion.div
                                                    animate={{
                                                        scale: hoveredProduct === product.id ? 1.05 : 1
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

                                                {/* Overlay on hover */}
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: hoveredProduct === product.id ? 1 : 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <div className="absolute bottom-6 left-6 right-6">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                                                First Year FREE
                                                            </Badge>
                                                        </div>
                                                        <p className="text-white/80 text-sm">Click anywhere to view details</p>
                                                    </div>
                                                </motion.div>

                                                {/* Featured badge */}
                                                {product.featured && (
                                                    <div className="absolute top-4 right-4">
                                                        <Badge className="bg-white text-black font-semibold">
                                                            <Star className="w-3 h-3 mr-1 fill-current" />
                                                            Featured
                                                        </Badge>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Product Content */}
                                            <div className="space-y-6">
                                                <Badge variant="outline" className="text-sm">
                                                    {product.category}
                                                </Badge>

                                                <h3 className="hero-text text-3xl md:text-4xl font-bold group-hover:text-primary transition-colors">
                                                    {product.name}
                                                </h3>

                                                <p className="body-text text-lg text-muted-foreground italic">
                                                    "{product.tagline}"
                                                </p>

                                                <p className="body-text text-lg text-muted-foreground leading-relaxed">
                                                    {product.shortDescription}
                                                </p>

                                                {/* What's included preview */}
                                                <div className="space-y-2">
                                                    <p className="text-sm font-medium text-white">Includes:</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {["Free Domain", "Free Hosting", "All Features", "Support"].map((item) => (
                                                            <Badge key={item} variant="secondary" className="text-sm px-3 py-1">
                                                                ✓ {item}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-4 pt-4">
                                                    <div onClick={(e) => e.stopPropagation()}>
                                                        <Link to={product.route}>
                                                            <PremiumButton variant="start-project" size="lg">
                                                                View Details
                                                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                                            </PremiumButton>
                                                        </Link>
                                                    </div>
                                                    <div onClick={(e) => e.stopPropagation()}>
                                                        <Link to={`/?product=${product.id}#contact`}>
                                                            <PremiumButton variant="explore-services" size="lg">
                                                                Get Started
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
                    <section className="pt-20 border-t border-border">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="text-center"
                        >
                            <h2 className="hero-text text-4xl md:text-6xl font-bold mb-6">
                                Ready to Digitize
                                <span className="block text-primary">Your Business?</span>
                            </h2>
                            <p className="body-text text-lg mb-4 max-w-2xl mx-auto text-muted-foreground">
                                Start with FREE domain and hosting for your first year.
                                No hidden charges, no technical hassles.
                            </p>
                            <p className="text-xl font-semibold text-white mb-8">
                                Just your business, running online 24/7.
                            </p>
                            <Link to="/?product=general#contact">
                                <PremiumButton variant="start-project" size="xl">
                                    Contact Us Today
                                </PremiumButton>
                            </Link>
                        </motion.div>
                    </section>
                </div>
            </div>
        </motion.div>
    );
};

export default Products;
