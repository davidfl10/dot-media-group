"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "black" | "white";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("white");

  useEffect(() => {
    const month = new Date().getMonth();
    const isNovToMar = month >= 10 || month <= 2;
    setTheme(isNovToMar ? "black" : "white");
  }, []);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export default ThemeProvider;