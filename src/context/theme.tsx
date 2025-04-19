import { useContext, createContext } from "react";

interface ThemeContextType {
  themeMode: "light" | "dark"; 
  storedTheme?: "light" | "dark" | "system";
  lightTheme: () => void;
  darkTheme: () => void;
  systemTheme?: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  themeMode: "light",
  lightTheme: () => {},
  darkTheme: () => {},
  systemTheme: () => {},
});

export const ThemeProvider = ThemeContext.Provider;

export default function useTheme() {
  return useContext(ThemeContext);
}
