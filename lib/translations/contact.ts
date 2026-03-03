import { Language } from "@/context/LanguageContext";

const contact = {
  en: {
    // Hero
    heroHeading1: "Get In",
    heroHeading2: "Touch",
    heroDescription:
      "We are always looking for new challenges and opportunities to collaborate. Let's create something exceptional together.",
    scrollLabel: "Scroll",

    // Contact cards
    emailLabel: "Email Us",
    callLabel: "Call Us",
    whatsappLabel: "WhatsApp",

    // Social section
    socialTagline: "Follow our journey",
    socialHeading1: "Connect",
    socialHeading2: "With Us",
    socialDescription:
      "Stay updated with our latest work, insights, and creative explorations across all platforms.",
  },

  ro: {
    // Hero
    heroHeading1: "Scrie-ne",
    heroHeading2: "Acum",
    heroDescription:
      "Suntem mereu în căutare de noi provocări și oportunități de colaborare. Hai să creăm ceva excepțional împreună.",
    scrollLabel: "Derulează",

    // Contact cards
    emailLabel: "Email",
    callLabel: "Sună-ne",
    whatsappLabel: "WhatsApp",

    // Social section
    socialTagline: "Urmărește-ne",
    socialHeading1: "Conectează-te",
    socialHeading2: "Cu Noi",
    socialDescription:
      "Rămâi la curent cu cele mai recente lucrări, perspective și explorări creative pe toate platformele.",
  },
} as const satisfies Record<Language, Record<string, string>>;

export type ContactTranslations = typeof contact.en;
export default contact;
