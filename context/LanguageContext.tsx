"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "ro";

const STORAGE_KEY = "dmg-language";

interface LanguageContextValue {
    language: Language;
    setLanguage: (l: Language) => void;
    toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>(() => {
        if (typeof window === "undefined") return "en";
        return (localStorage.getItem(STORAGE_KEY) as Language) ?? "en";
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, language);
    }, [language]);

    const toggle = () => setLanguage((prev) => (prev === "ro" ? "en" : "ro"));

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggle }}>
            {children}
        </LanguageContext.Provider>
    );
};

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
    return ctx;
}

export default LanguageProvider;
