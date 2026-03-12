import { useEffect, useState, useCallback } from "react";

export type Theme = "light" | "dark";
export type ThemePreference = "light" | "dark" | "system";

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyDOM(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
}

export const useTheme = () => {
  const [preference, setPreference] = useState<ThemePreference>("system");
  const [resolved, setResolved] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  const resolve = useCallback((pref: ThemePreference): Theme => {
    return pref === "system" ? getSystemTheme() : pref;
  }, []);

  // Initialise from localStorage
  useEffect(() => {
    const saved = (localStorage.getItem("theme") as ThemePreference) || "system";
    const theme = resolve(saved);
    setPreference(saved);
    setResolved(theme);
    applyDOM(theme);
    setMounted(true);
  }, [resolve]);

  // Listen for OS theme changes when preference is "system"
  useEffect(() => {
    if (preference !== "system") return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      const theme = e.matches ? "dark" : "light";
      setResolved(theme);
      applyDOM(theme);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [preference]);

  const setThemePreference = useCallback(
    (pref: ThemePreference) => {
      const theme = resolve(pref);
      setPreference(pref);
      setResolved(theme);
      applyDOM(theme);
      localStorage.setItem("theme", pref);
    },
    [resolve],
  );

  // Cycles: system → light → dark → system
  const toggleTheme = useCallback(() => {
    const next: ThemePreference =
      preference === "system"
        ? "light"
        : preference === "light"
          ? "dark"
          : "system";
    setThemePreference(next);
  }, [preference, setThemePreference]);

  return {
    theme: resolved,
    preference,
    toggleTheme,
    setTheme: setThemePreference,
    mounted,
  };
};
