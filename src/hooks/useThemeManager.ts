import { useState, useEffect } from "react";

export default function useThemeManager() {
  const getSavedTheme = (): "light" | "dark" => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme; 
    }
   
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const [themeMode, setThemeMode] = useState<"light" | "dark">(getSavedTheme);

  const lightTheme = () => {
    setThemeMode("light");
    localStorage.setItem("theme", "light");
  };

  const darkTheme = () => {
    setThemeMode("dark");
    localStorage.setItem("theme", "dark"); 
  };

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      htmlElement.classList.remove("light", "dark");
      htmlElement.classList.add(themeMode);
    }
  }, [themeMode]);

  return { themeMode, lightTheme, darkTheme };
}
