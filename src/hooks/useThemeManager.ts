import { useState, useEffect } from "react";

export default function useThemeManager() {
  const getSavedTheme = (): "light" | "dark" | "system" => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light" || savedTheme === "system") {
      return savedTheme; 
    }
   
    return "system";
  };

  const getPreferredTheme = (): "light" | "dark" => {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const [themeMode, setThemeMode] = useState<"light" | "dark" | "system">(getSavedTheme);
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(
    themeMode === "system" ? getPreferredTheme() : themeMode as "light" | "dark"
  );

  const lightTheme = () => {
    setThemeMode("light");
    localStorage.setItem("theme", "light");
  };

  const darkTheme = () => {
    setThemeMode("dark");
    localStorage.setItem("theme", "dark"); 
  };

  const systemTheme = () => {
    setThemeMode("system");
    localStorage.setItem("theme", "system");
  };

  useEffect(() => {
    if (themeMode === "system") {
      setResolvedTheme(getPreferredTheme());
    } else {
      setResolvedTheme(themeMode as "light" | "dark");
    }
  }, [themeMode]);

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      htmlElement.classList.remove("light", "dark");
      htmlElement.classList.add(resolvedTheme);
      
      // Add transition class for smooth theme changes
      htmlElement.classList.add("transition-colors");
      htmlElement.style.setProperty("--transition-duration", "0.3s");
    }
  }, [resolvedTheme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = () => {
      if (themeMode === "system") {
        setResolvedTheme(getPreferredTheme());
      }
    };
    
    mediaQuery.addEventListener("change", handleChange);
    
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [themeMode]);

  return { 
    themeMode: resolvedTheme, // Using resolved theme for UI
    storedTheme: themeMode, // For settings display
    lightTheme, 
    darkTheme,
    systemTheme 
  };
}
