import { useState, useEffect } from "react";

export default function useThemeManager() {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  const lightTheme = () => {
    setThemeMode("light");
  };

  const darkTheme = () => {
    setThemeMode("dark");
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
