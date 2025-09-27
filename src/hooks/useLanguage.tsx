import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Lang = "en" | "ml";

interface LanguageContextValue {
  language: Lang;
  setLanguage: (lang: Lang) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Lang>(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("krishi:lang") as Lang | null) : null;
    return saved === "ml" || saved === "en" ? saved : "en";
  });

  useEffect(() => {
    try {
      localStorage.setItem("krishi:lang", language);
      // also reflect on html lang for accessibility
      document.documentElement.lang = language === "en" ? "en" : "ml";
    } catch {}
  }, [language]);

  const setLanguage = (lang: Lang) => setLanguageState(lang);
  const toggleLanguage = () => setLanguageState((prev) => (prev === "en" ? "ml" : "en"));

  const value = useMemo(() => ({ language, setLanguage, toggleLanguage }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}

// Tiny helper to choose between two strings
export function tr(en: string, ml: string, lang: Lang) {
  return lang === "en" ? en : ml;
}
