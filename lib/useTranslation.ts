import { useLanguage } from "@/context/LanguageContext";
import home from "@/lib/translations/home";
import work from "@/lib/translations/work";
import contact from "@/lib/translations/contact";
import services from "@/lib/translations/services";

const namespaces = { home, work, contact, services };

type Namespace = keyof typeof namespaces;
type Translations<N extends Namespace> = (typeof namespaces)[N]["en"];

/**
 * Usage:
 *   const t = useTranslation("home");
 *   <p>{t.heroHeading1}</p>
 */
export function useTranslation<N extends Namespace>(ns: N): Translations<N> {
  const { language } = useLanguage();
  return namespaces[ns][language] as Translations<N>;
}
