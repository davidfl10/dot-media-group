"use client";

import React, { createContext, useContext, useState } from "react";

export type Language = "en" | "ro";

interface LanguageContextValue {
    language: Language;
    setLanguage: (l: Language) => void;
    toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>("en");

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
