import { Language } from "@/context/LanguageContext";

const services = {
  en: {
    // Hero
    heroHeading1: "Our",
    heroHeading2: "Services",
    heroDescription:
      "We operate at the intersection of data and desire. Our suite of services is designed to elevate every aspect of your digital presence, explicitly tailored for those who demand excellence.",
    scrollLabel: "Scroll",

    // Packages
    availablePackages: "Available Packages",

    // Related work
    relatedWorkTitle: "Related Work",
    relatedWorkSubtitle: "Completed Projects",
  },

  ro: {
    // Hero
    heroHeading1: "Serviciile",
    heroHeading2: "Noastre",
    heroDescription:
      "Operăm la intersecția datelor cu dorința. Suita noastră de servicii este concepută să ridice fiecare aspect al prezenței tale digitale, adaptată explicit pentru cei care cer excelență.",
    scrollLabel: "Derulează",

    // Packages
    availablePackages: "Pachete Disponibile",

    // Related work
    relatedWorkTitle: "Lucrări Conexe",
    relatedWorkSubtitle: "Proiecte Finalizate",
  },
} as const satisfies Record<Language, Record<string, string>>;

export type ServicesTranslations = typeof services.en;
export default services;
