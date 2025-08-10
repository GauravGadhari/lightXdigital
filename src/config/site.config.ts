export const siteConfig = {
  name: "Light X Digital",
  tagline: "Where innovation meets execution",
  description:
    "Light X Digital - Premier digital marketing agency led by Gaurav Gadhari from Nashik. Expert web development, mobile apps, AI solutions, SEO, and digital marketing services that drive business growth and exceptional ROI.",
  url: "https://lightxdigital.vercel.app",
  ogImage: "https://lightxdigital.vercel.app/og.jpg",
  keywords: [
    "Light X Digital",
    "Light",
    "Gaurav Gadhari",
    "digital marketing agency",
    "digital marketing",
    "digital agency",
    "SEO services",
    "web development",
    "mobile app development",
    "AI solutions",
    "social media marketing",
    "content marketing",
    "PPC advertising",
    "brand strategy",
    "Nashik digital marketing",
    "Maharashtra digital agency",
    "website design",
    "digital transformation",
    "online marketing",
    "internet marketing",
    "performance marketing",
    "lead generation"
  ],
  links: {
    instagram: "https://www.instagram.com/light.x.digital/",
    email: "lightxdigital@gmail.com",
    phone: "+91 77210 42911",
    whatsapp: "+917721042911"
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
