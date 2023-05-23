import { ReactNode, createContext, useContext, useMemo, useState } from "react";

type ThemeContextType = {
  isDarkMode: boolean;
  setIsDarkMode: (darkTheme: boolean) => void;
  toggleTheme: () => void;
};

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  setIsDarkMode: () => {},
  toggleTheme: () => {},
});

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
    localStorage.setItem("isDarkMode", String(!isDarkMode));
  };

  const themeContextValue: ThemeContextType = useMemo(
    () => ({
      isDarkMode,
      setIsDarkMode,
      toggleTheme,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isDarkMode]
  );

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
