import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import de from "../locales/de.json";
import ru from "../locales/ru.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "de",
    supportedLngs: ["de", "ru"],
    interpolation: {
      escapeValue: false,
    },
    resources: {
      de: { translation: de },
      ru: { translation: ru },
    },
  });

export default i18n;