import { Language } from "@/context/LanguageContext";

const work = {
  en: {
    // Preloader
    loadingLabel: "Loading works",

    // Hero
    heroHeading1: "Selected",
    heroHeading2: "Works",
    heroDescription:
      "Explore our curated collection of innovative media projects and creative solutions. Each piece represents a unique blend of technology, storytelling, and visual artistry, crafted to push boundaries and deliver exceptional results.",
    scrollLabel: "Scroll",

    // Project card
    viewProject: "VIEW PROJECT",
  },

  ro: {
    // Preloader
    loadingLabel: "Se încarcă lucrările",

    // Hero
    heroHeading1: "Lucrări",
    heroHeading2: "Selectate",
    heroDescription:
      "Explorează colecția noastră selectată de proiecte media inovatoare și soluții creative. Fiecare piesă reprezintă o îmbinare unică de tehnologie, storytelling și artă vizuală, concepută pentru a depăși limitele și a livra rezultate excepționale.",
    scrollLabel: "Derulează",

    // Project card
    viewProject: "VEZI PROIECTUL",
  },
} as const satisfies Record<Language, Record<string, string>>;

export type WorkTranslations = typeof work.en;
export default work;
