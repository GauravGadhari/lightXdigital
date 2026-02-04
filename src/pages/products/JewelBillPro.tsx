import { motion } from "framer-motion";
import { usePageTransitions } from "@/hooks/usePageTransitions";
import { useLenis } from "@/hooks/useLenis";
import { PremiumButton } from "@/components/ui/premium-button";
import { Badge } from "@/components/ui/badge";
import { jewelBillProDetails } from "@/data/products";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Globe,
    Server,
    Sparkles,
    Calculator,
    Receipt,
    Scale,
    Percent,
    Gem,
    Tag,
    FileText,
    Users,
    Package,
    TrendingUp,
    Palette,
    History,
    Check,
    MessageCircle,
    Phone
} from "lucide-react";
import { useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const iconMap: Record<string, React.ElementType> = {
    Globe,
    Server,
    Sparkles,
    Calculator,
    Receipt,
    Scale,
    Percent,
    Gem,
    Tag,
    FileText,
    Users,
    Package,
    TrendingUp,
    Palette,
    History
};

const JewelBillPro = () => {
    usePageTransitions();
    useLenis();
    const product = jewelBillProDetails;
    const [activeScreenshot, setActiveScreenshot] = useState(0);

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
                                    to="/products"
                                    className="text-sm font-medium tracking-wide hover:text-primary transition-colors"
                                >
                                    All Products
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
                            to="/products"
                            className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Products
                        </Link>
                    </motion.div>

                    {/* Section 1: Hero */}
                    <section className="mb-20 pb-20 border-b border-border">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                <div>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                            First Year FREE
                                        </Badge>
                                        <Badge variant="outline">
                                            {product.category}
                                        </Badge>
                                    </div>

                                    <h1 className="hero-text text-4xl md:text-6xl font-bold mb-6 whitespace-pre-line">
                                        {product.heroTitle}
                                    </h1>

                                    <p className="body-text text-xl text-muted-foreground mb-8 leading-relaxed">
                                        {product.heroSubtitle}
                                    </p>

                                    <div className="flex flex-wrap gap-4 mb-8">
                                        <Link to="/?product=jewel-bill-pro#contact">
                                            <PremiumButton variant="start-project" size="lg">
                                                <MessageCircle className="w-5 h-5 mr-2" />
                                                Get Started Free
                                            </PremiumButton>
                                        </Link>
                                        <a href="https://github.com/GauravGadhari/Professional-Jewellery-Billing-System-by-Light-x-Digital" target="_blank" rel="noopener noreferrer">
                                            <PremiumButton variant="explore-services" size="lg">
                                                View Demo
                                            </PremiumButton>
                                        </a>
                                    </div>

                                    {/* Quick Stats */}
                                    <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-green-400" />
                                            <span>No Installation Required</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-green-400" />
                                            <span>Works on Any Device</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-green-400" />
                                            <span>WhatsApp Support</span>
                                        </div>
                                    </div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="relative"
                                >
                                    <div className="relative rounded-lg overflow-hidden shadow-2xl">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full aspect-video object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                        <div className="absolute bottom-6 left-6">
                                            <h3 className="font-serif text-2xl font-bold text-white">{product.name}</h3>
                                            <p className="text-white/80">{product.tagline}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </section>

                    {/* Section 2: Value Propositions */}
                    <section className="mb-20 pb-20 border-b border-border">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <h2 className="hero-text text-3xl md:text-4xl font-bold mb-10 text-center">
                                Why Choose Jewel Bill Pro?
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {product.valueProps.map((prop, index) => {
                                    const IconComponent = iconMap[prop.icon] || Sparkles;
                                    return (
                                        <motion.div
                                            key={prop.title}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                            className="group p-8 border border-white/10 rounded-lg bg-gradient-to-br from-white/5 to-transparent hover:from-white/10 transition-all duration-300"
                                        >
                                            <div className="p-4 bg-white/10 rounded-lg w-fit mb-6 group-hover:bg-white/20 transition-colors">
                                                <IconComponent className="w-8 h-8 text-white" />
                                            </div>
                                            <h3 className="font-serif text-2xl font-bold mb-2">{prop.title}</h3>
                                            <p className="text-muted-foreground">{prop.subtitle}</p>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </section>

                    {/* Section 3: Pricing */}
                    <section className="mb-20 pb-20 border-b border-border">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <div className="text-center mb-12">
                                <h2 className="hero-text text-3xl md:text-5xl font-bold mb-4">
                                    Simple, Transparent Pricing
                                </h2>
                                <p className="body-text text-lg text-muted-foreground max-w-2xl mx-auto">
                                    Start free, grow your business, pay only when you're successful.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                                {/* First Year */}
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                    className="relative p-8 border-2 border-green-500/50 rounded-lg bg-gradient-to-br from-green-500/10 to-transparent"
                                >
                                    <div className="absolute -top-4 left-6">
                                        <Badge className="bg-green-500 text-white font-semibold px-4 py-1">
                                            RECOMMENDED
                                        </Badge>
                                    </div>

                                    <div className="mb-6">
                                        <p className="text-sm text-muted-foreground mb-2">{product.pricing.firstYear.label}</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className="font-serif text-5xl font-bold text-green-400">₹0</span>
                                            <span className="text-muted-foreground">for 1st year</span>
                                        </div>
                                    </div>

                                    <ul className="space-y-3 mb-8">
                                        {product.pricing.firstYear.includes.map((item) => (
                                            <li key={item} className="flex items-start gap-3">
                                                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                                <span className="text-white">{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link to="/?product=jewel-bill-pro#contact" className="block">
                                        <PremiumButton variant="start-project" size="lg" className="w-full justify-center">
                                            Start Free Today
                                        </PremiumButton>
                                    </Link>
                                </motion.div>

                                {/* After First Year */}
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                    className="p-8 border border-white/10 rounded-lg bg-white/5"
                                >
                                    <div className="mb-6">
                                        <p className="text-sm text-muted-foreground mb-2">{product.pricing.maintenance.label}</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className="font-serif text-3xl font-bold text-white">Yearly Plan</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-2">
                                            Affordable annual maintenance
                                        </p>
                                    </div>

                                    <ul className="space-y-3 mb-8">
                                        {product.pricing.maintenance.includes.map((item) => (
                                            <li key={item} className="flex items-start gap-3">
                                                <Check className="w-5 h-5 text-white/60 mt-0.5 flex-shrink-0" />
                                                <span className="text-muted-foreground">{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link to="/?product=jewel-bill-pro#contact" className="block">
                                        <PremiumButton variant="explore-services" size="lg" className="w-full justify-center">
                                            Contact for Details
                                        </PremiumButton>
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </section>

                    {/* Section 4: Features Grid */}
                    <section className="mb-20 pb-20 border-b border-border">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <div className="text-center mb-12">
                                <h2 className="hero-text text-3xl md:text-5xl font-bold mb-4">
                                    Everything Your Shop Needs
                                </h2>
                                <p className="body-text text-lg text-muted-foreground max-w-2xl mx-auto">
                                    Designed specifically for jewellery businesses — no extra features you'll never use.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {product.features.map((feature, index) => {
                                    const IconComponent = iconMap[feature.icon] || Sparkles;
                                    return (
                                        <motion.div
                                            key={feature.title}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                                            className="group p-6 border border-white/10 rounded-lg hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                                                    <IconComponent className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                                        {feature.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </section>

                    {/* Section 5: What's Included */}
                    <section className="mb-20 pb-20 border-b border-border">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <div className="p-8 md:p-12 border border-white/10 rounded-lg bg-gradient-to-br from-white/5 to-transparent">
                                <div className="text-center mb-10">
                                    <h2 className="hero-text text-3xl md:text-4xl font-bold mb-4">
                                        What's Included
                                    </h2>
                                    <p className="body-text text-muted-foreground">
                                        Everything you get with your Jewel Bill Pro package
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {product.whatsIncluded.map((item, index) => (
                                        <motion.div
                                            key={item}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: 0.7 + index * 0.03 }}
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                                <Check className="w-4 h-4 text-green-400" />
                                            </div>
                                            <span className="text-sm">{item}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </section>

                    {/* Section 6: Screenshots Gallery */}
                    <section className="mb-20 pb-20 border-b border-border">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                        >
                            <div className="text-center mb-12">
                                <h2 className="hero-text text-3xl md:text-4xl font-bold mb-4">
                                    See It In Action
                                </h2>
                                <p className="body-text text-muted-foreground">
                                    Clean, professional interface designed for daily use
                                </p>
                            </div>

                            <div className="space-y-6">
                                {/* Main Screenshot */}
                                <motion.div
                                    key={activeScreenshot}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4 }}
                                    className="rounded-lg overflow-hidden border border-white/10"
                                >
                                    <img
                                        src={product.screenshots[activeScreenshot]}
                                        alt={`${product.name} Screenshot ${activeScreenshot + 1}`}
                                        className="w-full aspect-video object-cover"
                                    />
                                </motion.div>

                                {/* Thumbnail Navigation */}
                                <div className="flex justify-center gap-4">
                                    {product.screenshots.map((screenshot, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveScreenshot(index)}
                                            className={`relative w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${activeScreenshot === index
                                                ? "border-white"
                                                : "border-white/20 hover:border-white/50"
                                                }`}
                                        >
                                            <img
                                                src={screenshot}
                                                alt={`Thumbnail ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </section>

                    {/* Section 7: Target Audience */}
                    <section className="mb-20 pb-20 border-b border-border">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.75 }}
                        >
                            <div className="text-center mb-10">
                                <h2 className="hero-text text-3xl md:text-4xl font-bold mb-4">
                                    Perfect For
                                </h2>
                            </div>
                            <div className="flex flex-wrap justify-center gap-4">
                                {product.targetAudience.map((audience, index) => (
                                    <motion.div
                                        key={audience}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                                    >
                                        <Badge
                                            variant="secondary"
                                            className="px-6 py-3 text-base font-medium"
                                        >
                                            {audience}
                                        </Badge>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </section>

                    {/* Section 8: FAQ */}
                    <section className="mb-20 pb-20 border-b border-border">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            <div className="text-center mb-12">
                                <h2 className="hero-text text-3xl md:text-5xl font-bold mb-4">
                                    Common Questions
                                </h2>
                                <p className="body-text text-lg text-muted-foreground">
                                    Everything you need to know before getting started
                                </p>
                            </div>

                            <div className="max-w-3xl mx-auto">
                                <Accordion type="single" collapsible className="space-y-4">
                                    {product.faqs.map((faq, index) => (
                                        <AccordionItem
                                            key={index}
                                            value={`faq-${index}`}
                                            className="border border-white/10 rounded-lg px-6 data-[state=open]:bg-white/5"
                                        >
                                            <AccordionTrigger className="text-left hover:no-underline py-6">
                                                <span className="font-medium text-lg">{faq.question}</span>
                                            </AccordionTrigger>
                                            <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                                                {faq.answer}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        </motion.div>
                    </section>

                    {/* Section 9: Final CTA */}
                    <section className="pt-10">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.9 }}
                            className="text-center"
                        >
                            <div className="max-w-3xl mx-auto">
                                <h2 className="hero-text text-4xl md:text-6xl font-bold mb-6">
                                    Start Your
                                    <span className="block text-primary">Digital Journey Today</span>
                                </h2>
                                <p className="body-text text-xl mb-4 text-muted-foreground">
                                    Free domain. Free hosting. Free for the first year.
                                </p>
                                <p className="text-lg mb-8 text-white">
                                    No technical knowledge required. We set everything up for you.
                                </p>

                                <div className="flex flex-wrap justify-center gap-4 mb-8">
                                    <Link to="/?product=jewel-bill-pro#contact">
                                        <PremiumButton variant="start-project" size="xl">
                                            <MessageCircle className="w-5 h-5 mr-2" />
                                            Get Started Free
                                        </PremiumButton>
                                    </Link>
                                    <a href="tel:+917721042911">
                                        <PremiumButton variant="explore-services" size="xl">
                                            <Phone className="w-5 h-5 mr-2" />
                                            Call Us
                                        </PremiumButton>
                                    </a>
                                </div>

                                <p className="text-sm text-muted-foreground">
                                    Have questions? We're just a WhatsApp message away.
                                </p>
                            </div>
                        </motion.div>
                    </section>
                </div>
            </div>
        </motion.div>
    );
};

export default JewelBillPro;
