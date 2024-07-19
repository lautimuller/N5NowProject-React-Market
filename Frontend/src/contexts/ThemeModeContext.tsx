import React, { createContext, useState, useContext } from "react";

interface DarkModeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const ThemeModeContext = createContext<DarkModeContextType | undefined>(
  undefined
);

export const ThemeModeProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};
