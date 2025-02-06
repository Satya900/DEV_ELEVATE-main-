import { useContext, createContext } from "react";

interface ThemeContextType {
  themeMode: "light" | "dark"; 
  lightTheme: () => void;
  darkTheme: () => void;
}


const ThemeContext = createContext<ThemeContextType>({
  themeMode: "light",
  lightTheme: () => {},
  darkTheme: () => {},
});

export const ThemeProvider = ThemeContext.Provider;

export default function useTheme() {
  return useContext(ThemeContext);
}
