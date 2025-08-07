export const siteConfig = {
  name: "Light X Digital",
  tagline: "Where innovation meets execution",
  description:
    "Light X Digital - Premium digital agency led by Gaurav Gadhari from Nashik, crafting high-performance websites, mobile apps, and AI tools that accelerate business growth and brand value. Your trusted partner for digital transformation.",
  url: "https://lightxdigital.com", // Update this if you haven't gone live yet
  ogImage: "https://lightxdigital.com/og.jpg", // Replace if needed
  keywords: [
    "Light X Digital",
    "Light",
    "Gaurav Gadhari",
    "digital agency",
    "digital marketing",
    "web development",
    "app development",
    "AI solutions",
    "Nashik",
    "website design",
    "mobile app development",
    "digital transformation",
    "SEO services",
    "premium digital agency"
  ],
  links: {
    instagram: "https://www.instagram.com/light.x.digital/",
    email: "lightxdigital@gmail.com",
    phone: "+91 77210 42911"
  },
  navigation: [
    { name: "Services", href: "#services" },
    { name: "Work", href: "/work" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" }
  ],
  services: [
    {
      title: "Website Development",
      description:
        "Responsive, modern websites designed to attract, engage, and convert visitors with clean UI and fast load times.",
      features: [
        "Custom Design & Development",
        "SEO + Performance Optimized",
        "Free Hosting & Domain (1 Year)",
        "Maintenance Plans Available"
      ]
    },
    {
      title: "App Development",
      description:
        "Powerful cross-platform mobile apps using React Native and Expo, tailored for startups and businesses.",
      features: [
        "Android & iOS Support",
        "Push Notifications",
        "Authentication Systems",
        "API Integration & Backend"
      ]
    },
    {
      title: "AI-Powered Solutions",
      description:
        "Smart automation tools, GPT-based bots, and custom AI assistants built for efficiency, engagement, and edge.",
      features: [
        "Custom Chatbots",
        "Voice AI with ElevenLabs",
        "Text Automation Tools",
        "OpenAI / Groq Integration"
      ]
    }
  ],
  company: {
    founded: "2023",
    location: "Nashik, India",
    team: "Led by Gaurav Gadhari + Remote Creators",
    clients: "30+ Projects Delivered"
  }
} as const;

export type SiteConfig = typeof siteConfig;
