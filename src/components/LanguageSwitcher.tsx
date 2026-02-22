import { useTranslation } from "react-i18next";
import deFlag from "../assets/flags/de.svg";
import ruFlag from "../assets/flags/ru.svg";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const isRu = i18n.language === "ru";

  const toggleLanguage = () => {
    i18n.changeLanguage(isRu ? "de" : "ru");
  };

  return (
    <div className="flex items-center gap-3">
      {/* DE flag */}
      <img
        src={deFlag}
        alt="German"
        className={`w-6 h-4 rounded-sm transition-all ${
          !isRu ? "scale-110 ring-2 ring-blue-500" : "opacity-50"
        }`}
      />

      {/* Toggle */}
      <button
        onClick={toggleLanguage}
        className={`
          relative w-14 h-7 rounded-full transition-all duration-300
          ${
            isRu
              ? "bg-gradient-to-r from-blue-500 to-indigo-600"
              : "bg-gray-300 dark:bg-gray-600"
          }
        `}
      >
        <span
          className={`
            absolute top-1 left-1 w-5 h-5 rounded-full
            bg-white dark:bg-gray-200
            shadow-md transform transition-transform duration-300
            ${isRu ? "translate-x-7" : ""}
          `}
        />
      </button>

      {/* RU flag */}
      <img
        src={ruFlag}
        alt="Russian"
        className={`w-6 h-4 rounded-sm transition-all ${
          isRu ? "scale-110 ring-2 ring-blue-500" : "opacity-50"
        }`}
      />
    </div>
  );
}