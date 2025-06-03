"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize theme state to 'light' on both server and client initially
  const [theme, setTheme] = useState<"light" | "dark">('light');

  // Use useEffect to determine and set the theme on the client side based on localStorage or system preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
      if (storedTheme) {
        setTheme(storedTheme);
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark");
      } else {
         // If no stored theme and system preference is not dark, default to light
        setTheme("light");
      }
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Ensure the 'dark' class is applied/removed when theme changes
  useEffect(() => {
    console.log(`Applying theme: ${theme}`);
    const root = document.documentElement;
    
    // Explicitly remove and then add the class
    root.classList.remove("light", "dark"); // Remove both just in case

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      // Optionally add 'light' class, though Tailwind doesn't require it for light mode
      // root.classList.add("light");
    }
    
    console.log(`HTML element now has dark class: ${root.classList.contains('dark')}`); // Log after modification

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
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
