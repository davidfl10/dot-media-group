import { Language } from "@/context/LanguageContext";

const home = {
  en: {
    // Hero section
    heroDescriptionDesktop:
      "DOT Media Group is a premier global digital agency shaping the future of online presence. We fuse strategy, design, and innovation to create brands that define their industries.",
    heroDescriptionMobile1:
      "DOT Media Group is a premier global digital agency shaping the future of online presence.",
    heroDescriptionMobile2:
      "We fuse strategy, design, and innovation to create brands that define their industries.",
    heroHeading1: "We redefine",
    heroHeading2: "digital expression",
    scrollLabel: "Scroll",

    // Scroll reveal section
    reveal1: "We are shaping the next generation of digital presence.",
    reveal2: "Not just creators, but thinkers, innovators, and collaborators.",
    reveal3: "Transforming ordinary online noise into strategy, clarity, and growth.",
    reveal4: "We design ecosystems where ideas evolve into influence.",
    reveal5: "Where brands rise beyond frameworks to inspire, engage, and lead.",
    reveal6: "Fueled by ambition. Defined by precision. Built for tomorrow.",

    // Services section
    servicesLabel: "Our expertise",
    servicesHeading1: "Engineering",
    servicesHeading2: "Influence.",
    servicesDescription:
      "We operate at the intersection of data and desire. Our suite of services is designed to elevate every aspect of your digital presence, explicitly tailored for those who demand excellence.",

    // Partners section
    partnersLabel: "Featured work",
    partnersHeading1: "Trusted by brands",
    partnersHeading2: "that lead.",
    partnersDescription:
      "We help the best teams to succeed — from new startups to international companies.",
    partnersYearLabel: "Year",

    // CTA section
    ctaLine1: "Let's build",
    ctaLine1Italic: "the",
    ctaLine2: "impossible.",
    ctaDescription:
      "You have a vision — We have the creative firepower to realize it. Tell us about your project, and let's define the future of your brand.",
  },

  ro: {
    // Hero section
    heroDescriptionDesktop:
      "DOT Media Group este o agenție digitală globală de top care modelează viitorul prezenței online. Îmbinăm strategie, design și inovație pentru a crea branduri care definesc industriile lor.",
    heroDescriptionMobile1:
      "DOT Media Group este o agenție digitală globală de top care modelează viitorul prezenței online.",
    heroDescriptionMobile2:
      "Îmbinăm strategie, design și inovație pentru a crea branduri care definesc industriile lor.",
    heroHeading1: "Redefinim",
    heroHeading2: "expresia digitală",
    scrollLabel: "Derulează",

    // Scroll reveal section
    reveal1: "Modelăm viitoarea generație a prezenței digitale.",
    reveal2: "Nu doar creatori, ci gânditori, inovatori și colaboratori.",
    reveal3: "Transformăm zgomotul online obișnuit în strategie, claritate și creștere.",
    reveal4: "Proiectăm ecosisteme în care ideile evoluează în influență.",
    reveal5: "Unde brandurile depășesc tiparele pentru a inspira, angaja și conduce.",
    reveal6: "Alimentați de ambiție. Definiți de precizie. Construiți pentru mâine.",

    // Services section
    servicesLabel: "Expertiza noastră",
    servicesHeading1: "Ingineria",
    servicesHeading2: "Influenței.",
    servicesDescription:
      "Operăm la intersecția datelor cu dorința. Suita noastră de servicii este concepută să ridice fiecare aspect al prezenței tale digitale, adaptată explicit pentru cei care cer excelență.",

    // Partners section
    partnersLabel: "Lucrări selectate",
    partnersHeading1: "Aleși de branduri",
    partnersHeading2: "care conduc.",
    partnersDescription:
      "Ajutăm cele mai bune echipe să reușească — de la startup-uri noi până la companii internaționale.",
    partnersYearLabel: "An",

    // CTA section
    ctaLine1: "Construim",
    ctaLine1Italic: "împreună",
    ctaLine2: "imposibilul.",
    ctaDescription:
      "Ai o viziune — Noi avem puterea creativă să o realizăm. Spune-ne despre proiectul tău și hai să definim viitorul brandului tău.",
  },
} as const satisfies Record<Language, Record<string, string>>;

export type HomeTranslations = typeof home.en;
export default home;
