export interface Product {
  id: string;
  name: string;
  tagline: string;
  shortDescription: string;
  category: string;
  image: string;
  featured: boolean;
  route: string;
}

export interface ProductPricing {
  firstYear: {
    price: number;
    label: string;
    includes: string[];
  };
  maintenance: {
    price: string;
    label: string;
    includes: string[];
  };
}

export interface ProductFeature {
  icon: string;
  title: string;
  description: string;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface ProductDetails extends Product {
  heroTitle: string;
  heroSubtitle: string;
  longDescription: string;
  pricing: ProductPricing;
  valueProps: {
    icon: string;
    title: string;
    subtitle: string;
  }[];
  features: ProductFeature[];
  whatsIncluded: string[];
  screenshots: string[];
  faqs: ProductFAQ[];
  techStack: string[];
  targetAudience: string[];
}

// Products List for Products Page
export const products: Product[] = [
  {
    id: "21-days-of-habit",
    name: "21 Days of Habit",
    tagline: "Build Habits That Actually Stick",
    shortDescription: "A minimalist, Apple-inspired habit tracker with streak protection, 0 ads, offline-first sync, and habit journeys.",
    category: "Productivity App",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop&q=80",
    featured: true,
    route: "/products/21-days-of-habit"
  },
  {
    id: "jewel-bill-pro",
    name: "Jewel Bill Pro",
    tagline: "Professional Jewellery Billing, Simplified",
    shortDescription: "Complete billing system for jewellery shops with GST calculation, gold rate management, and professional invoices — all in your browser.",
    category: "Business Software",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=80",
    featured: true,
    route: "/products/jewel-bill-pro"
  }
];

// Jewel Bill Pro Complete Details
export const jewelBillProDetails: ProductDetails = {
  id: "jewel-bill-pro",
  name: "Jewel Bill Pro",
  tagline: "Professional Jewellery Billing, Simplified",
  shortDescription: "Complete billing system for jewellery shops with GST calculation, gold rate management, and professional invoices.",
  heroTitle: "Run Your Jewellery Business\nLike a Pro",
  heroSubtitle: "No more manual calculations. No more billing mistakes. Just create beautiful invoices in seconds with automatic gold rate calculations, GST, and your shop branding.",
  longDescription: "Jewel Bill Pro is a complete billing solution designed specifically for jewellery shops. Whether you're selling gold, silver, diamond jewellery, or precious gems — create professional invoices with accurate weight-based pricing, making charges, stone charges, and GST calculations. Your customers will receive print-ready invoices with your shop's complete branding.",
  category: "Business Software",
  image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=80",
  featured: true,
  route: "/products/jewel-bill-pro",

  pricing: {
    firstYear: {
      price: 20000,
      label: "One-Time Setup",
      includes: [
        "Complete Billing System",
        "Your Own Website Address (.in domain)",
        "1 Year Free Hosting",
        "All Features Unlocked",
        "Full Shop Branding Setup",
        "WhatsApp Support"
      ]
    },
    maintenance: {
      price: "₹3,000/year",
      label: "Yearly Maintenance (After 1st Year)",
      includes: [
        "Domain Renewal",
        "Continued Hosting",
        "Priority Support",
        "Free System Updates",
        "New Features Added"
      ]
    }
  },

  valueProps: [
    {
      icon: "Globe",
      title: "Your Own Website",
      subtitle: "Your own .in domain included — customers find you online easily"
    },
    {
      icon: "Server",
      title: "Always Online",
      subtitle: "Your billing system works 24/7 from anywhere — shop, home, or travel"
    },
    {
      icon: "Sparkles",
      title: "Complete System",
      subtitle: "Everything included — invoices, customers, inventory, gold rates, reports"
    }
  ],

  features: [
    {
      icon: "Calculator",
      title: "Automatic Gold Rate Calculation",
      description: "Enter today's gold/silver rate once — all invoice prices calculate automatically based on weight"
    },
    {
      icon: "Receipt",
      title: "Professional GST Invoices",
      description: "Create tax-compliant invoices with GSTIN, HSN codes, and proper tax breakdowns"
    },
    {
      icon: "Scale",
      title: "Weight-Based Pricing",
      description: "Automatic price calculation per gram — just enter weight and get exact pricing"
    },
    {
      icon: "Percent",
      title: "Making Charges",
      description: "Add making charges as flat amount or percentage — flexibility for all pricing models"
    },
    {
      icon: "Gem",
      title: "Stone & Pearl Charges",
      description: "Separate charges for diamonds, precious stones, and pearls in the same invoice"
    },
    {
      icon: "Tag",
      title: "Discount Support",
      description: "Apply item-wise or bill-wise discounts — keep customers happy"
    },
    {
      icon: "FileText",
      title: "PDF Export",
      description: "Download or print beautiful invoices with your shop's branding and colors"
    },
    {
      icon: "Users",
      title: "Customer Database",
      description: "Save customer details — faster billing for repeat customers"
    },
    {
      icon: "Package",
      title: "Items Catalog",
      description: "Manage your jewellery inventory with categories and quick selection"
    },
    {
      icon: "TrendingUp",
      title: "Daily Rate Management",
      description: "Update gold and silver rates daily — all calculations adjust automatically"
    },
    {
      icon: "Palette",
      title: "Shop Branding",
      description: "Your logo, shop name, address, and custom colors on every invoice"
    },
    {
      icon: "History",
      title: "Invoice History",
      description: "Search, filter, and view all past invoices — never lose a record"
    }
  ],

  whatsIncluded: [
    "Complete Jewellery Billing System",
    "Your Own Website Address (.in domain)",
    "1 Year Free Hosting Included",
    "Unlimited Invoices",
    "Unlimited Customers",
    "Unlimited Items in Catalog",
    "PDF Invoice Generation",
    "Shop Branding & Customization",
    "Gold & Silver Rate Management",
    "GST Calculation",
    "Invoice History & Search",
    "WhatsApp Support",
    "Free Updates for 1st Year"
  ],

  screenshots: [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80"
  ],

  faqs: [
    {
      question: "Do I need to install any software?",
      answer: "No! Jewel Bill Pro works in your web browser. Just open your website address and start billing — works on computer, tablet, or mobile."
    },
    {
      question: "What happens after the first year?",
      answer: "After your first year, a simple yearly maintenance plan of ₹3,000 kicks in. This covers domain renewal, hosting, priority support, and all new features we add. We'll remind you before renewal."
    },
    {
      question: "Is my data safe?",
      answer: "Yes, your data is stored securely in your browser. You can also export your invoice history anytime. We never access your business data."
    },
    {
      question: "Can I add my shop logo?",
      answer: "Absolutely! You can add your shop logo, name in Hindi and English, tagline, full address, phone numbers, and customize invoice colors to match your brand."
    },
    {
      question: "Does it work offline?",
      answer: "The system requires internet to open initially, but once loaded, you can create invoices even with slow internet. Data saves automatically when connection returns."
    },
    {
      question: "How do I update gold rates?",
      answer: "Simple! Go to Gold Rates section, enter today's rate, and save. All new invoices will use the updated rate automatically."
    },
    {
      question: "Can I print invoices?",
      answer: "Yes! Every invoice can be downloaded as a PDF or printed directly. The PDF includes your complete shop branding and looks professional."
    },
    {
      question: "What if I need help?",
      answer: "We provide WhatsApp support. If you face any issue, just message us and we'll help you resolve it quickly."
    }
  ],

  techStack: [
    "React 18",
    "TypeScript",
    "Tailwind CSS",
    "shadcn/ui",
    "Zustand",
    "jsPDF",
    "Vite",
    "Vercel"
  ],

  targetAudience: [
    "Jewellery Shop Owners",
    "Gold & Silver Retailers",
    "Diamond Merchants",
    "Family-Run Jewellery Businesses",
    "New Jewellery Store Startups"
  ]
};

// 21 Days of Habit Complete Details
export const twentyOneDaysHabitDetails: ProductDetails = {
  id: "21-days-of-habit",
  name: "21 Days of Habit",
  tagline: "Build Habits That Actually Stick",
  shortDescription: "A minimalist, aesthetic habit tracker with streak protection, 0 ads, offline-first sync, and habit journeys.",
  heroTitle: "Transform Your Routines.\nMaster Your Life.",
  heroSubtitle: "Build unbreakable habits in 21-day cycles. Featuring smart streak freezes, distraction-free Cupertino UI, seamless cloud sync, and zero ad interruptions.",
  longDescription: "21 Days of Habit is an ultra-fast, offline-first habit tracker engineered around psychological momentum. Whether you are aiming to read daily, drink more water, meditate, or exercise — track your consistency with intuitive one-tap check-ins, intelligent streak recovery shields, and beautiful visual progress charts.",
  category: "Productivity App",
  image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop&q=80",
  featured: true,
  route: "/products/21-days-of-habit",

  pricing: {
    firstYear: {
      price: 399,
      label: "Yearly Pro (Best Value)",
      includes: [
        "0 Advertisements Guaranteed",
        "Unlimited Habits & Daily Check-ins",
        "Streak Freeze Protection Tokens",
        "Multi-Device Cloud Backup & Sync",
        "Detailed Analytics & Completion Heatmaps",
        "Access to All 21-Day Guided Journeys"
      ]
    },
    maintenance: {
      price: "₹79/month or ₹1,999 Lifetime",
      label: "Flexible Options",
      includes: [
        "Monthly Pro: ₹79 / $1.99",
        "Yearly Pro: ₹399 / $9.99 (Save 58%)",
        "Lifetime Access: ₹1,999 / $19.99 (Pay Once)"
      ]
    }
  },

  valueProps: [
    {
      icon: "Shield",
      title: "100% Offline-First",
      subtitle: "Instant 0ms latency. Your data always stays with you, syncing silently when online."
    },
    {
      icon: "Flame",
      title: "Streak Freeze Protection",
      subtitle: "Life happens. Missed days don't erase your momentum with streak recovery tokens."
    },
    {
      icon: "Sparkles",
      title: "Zero Distractions",
      subtitle: "No clutter, no social feed, 0 ad interruptions. Pure focus on your daily growth."
    }
  ],

  features: [
    {
      icon: "Flame",
      title: "Psychological 21-Day Cycles",
      description: "Science-backed habit formation loops designed to turn effort into effortless routine."
    },
    {
      icon: "Shield",
      title: "Streak Freeze System",
      description: "Shield your streaks against unexpected sick days or travel without losing your streak count."
    },
    {
      icon: "Cloud",
      title: "Cross-Device Cloud Sync",
      description: "Sign in with Google on any device to backup and synchronize your habits in real-time."
    },
    {
      icon: "Bell",
      title: "Smart Context Reminders",
      description: "Timely morning briefings, evening recaps, and streak-at-risk alerts so you never miss a beat."
    },
    {
      icon: "TrendingUp",
      title: "In-Depth Insights & Heatmaps",
      description: "Visualize completion rates, best streaks, weekly trends, and habit consistency scores."
    },
    {
      icon: "Compass",
      title: "Curated Habit Journeys",
      description: "Pre-built templates for morning routines, deep work, mindfulness, fitness, and financial discipline."
    }
  ],

  whatsIncluded: [
    "Ad-Free Pro on Mobile App & Web",
    "Unlimited Habits Tracking",
    "Streak Freeze Tokens",
    "Instant Google Cloud Sync",
    "Interactive Habit Journeys",
    "Smart Multi-Time Reminders",
    "Detailed Analytics & Heatmaps",
    "Cross-Device Sync Across Mobile & Tablet",
    "Lifetime Updates"
  ],

  screenshots: [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80"
  ],

  faqs: [
    {
      question: "If I subscribe on the website, does it work in the mobile app?",
      answer: "Yes! Simply sign in with the same Google account on your mobile app, and your Pro subscription and habits will be instantly active."
    },
    {
      question: "What payment methods are supported?",
      answer: "We support UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, NetBanking, and Wallets via secure Cashfree payment gateway."
    },
    {
      question: "Will I lose my existing habits when updating?",
      answer: "Never. The app uses an offline-first architecture. All your local habits and the last 90 days of completions automatically sync to your cloud account upon signing in."
    },
    {
      question: "Can I use the app completely offline?",
      answer: "Yes. All features and check-ins work completely offline. Data syncs automatically whenever you reconnect to the internet."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes. Subscriptions can be managed or canceled anytime directly from your LightX account portal."
    }
  ],

  techStack: [
    "Flutter",
    "Supabase Auth & Database",
    "Cashfree Payments",
    "PostHog Analytics",
    "Local Notifications",
    "Edge Functions"
  ],

  targetAudience: [
    "Students & Self-Learners",
    "Professionals & Entrepreneurs",
    "Fitness & Health Enthusiasts",
    "Anyone looking to break bad habits and build positive routines"
  ]
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

