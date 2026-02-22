import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: "de" | "ru") => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => changeLanguage("de")}
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
      >
        DE
      </button>

      <button
        onClick={() => changeLanguage("ru")}
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
      >
        RU
      </button>
    </div>
  );
}