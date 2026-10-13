import React, { createContext, useContext, useState, useEffect } from "react";
import { soundManager } from "../lib/sound";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Default to 'light' (Daylight Luxury Glassmorphism) matching user reference image, or persistent preference
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("infravision_theme");
      if (saved === "light" || saved === "dark") return saved;
    } catch (e) {
      console.warn("Error reading theme preference", e);
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
    try {
      localStorage.setItem("infravision_theme", theme);
    } catch (e) {
      console.warn("Error saving theme preference", e);
    }
  }, [theme]);

  const toggleTheme = () => {
    soundManager.playHapticClick(720, 0.04);
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark: theme === "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
