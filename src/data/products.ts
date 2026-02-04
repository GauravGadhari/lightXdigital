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
      price: 0,
      label: "First Year FREE",
      includes: [
        "Complete Billing System",
        "Your Own Website Address (.in domain)",
        "Website Running 24/7",
        "All Features Unlocked",
        "WhatsApp Support"
      ]
    },
    maintenance: {
      price: "Contact for Quote",
      label: "After First Year",
      includes: [
        "Website Address Renewal",
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
      title: "Free Website Address",
      subtitle: "Your own .in domain for 1st year — customers find you online easily"
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
    "Your Own Website Address (.in domain) — FREE for 1st year",
    "24/7 Website Hosting — FREE for 1st year",
    "Unlimited Invoices",
    "Unlimited Customers",
    "Unlimited Items in Catalog",
    "PDF Invoice Generation",
    "Shop Branding & Customization",
    "Gold & Silver Rate Management",
    "GST Calculation",
    "Invoice History & Search",
    "WhatsApp Support",
    "Free Updates During 1st Year"
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
      answer: "Your website address and hosting need renewal after 1 year. We offer a simple yearly maintenance plan that includes renewal, support, and free updates. We'll contact you before renewal."
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

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};
