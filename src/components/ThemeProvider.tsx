"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

const DEFAULT_ACCENT = "#2563eb";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkMode, setDarkMode] = useState(false);
  const [accentColor, setAccentColorState] = useState(DEFAULT_ACCENT);
  const [mounted, setMounted] = useState(false);

  // Initialize from localStorage / system preference
  useEffect(() => {
    const storedDark = localStorage.getItem("theme-dark");
    if (storedDark !== null) {
      setDarkMode(storedDark === "true");
    } else {
      setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }

    const storedAccent = localStorage.getItem("theme-accent");
    if (storedAccent) {
      setAccentColorState(storedAccent);
    }

    setMounted(true);
  }, []);

  // Sync dark class to <html>
  useEffect(() => {
    if (!mounted) return;
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("theme-dark", String(darkMode));
  }, [darkMode, mounted]);

  // Sync accent color CSS variable
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.style.setProperty("--primary", accentColor);
    localStorage.setItem("theme-accent", accentColor);
  }, [accentColor, mounted]);

  const toggleDarkMode = useCallback(() => setDarkMode((prev) => !prev), []);

  const setAccentColor = useCallback((color: string) => {
    setAccentColorState(color);
  }, []);

  return (
    <ThemeContext.Provider
      value={{ darkMode, toggleDarkMode, accentColor, setAccentColor }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
