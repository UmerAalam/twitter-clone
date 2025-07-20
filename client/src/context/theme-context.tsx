import { createContext, ReactNode, useContext, useState } from "react";
type ThemeMode = "dark" | "light";
type ThemeContextState = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextState | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const mode = localStorage.getItem("mode");

    if (!mode) {
      return "light";
    }

    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    }

    return mode as ThemeMode;
  });

  const setMode = (mode: ThemeMode) => {
    setThemeMode(mode);

    if (mode === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("mode", mode);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("mode", mode);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        mode: themeMode,
        setMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme needs to be wrapped by context");
  }

  return context;
};
