"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";

type Theme = "system" | "light" | "dark";

const STORAGE_KEY = "Profilio-theme";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "system",
  setTheme: () => {},
});

/* Minimal external store backed by localStorage */
let cachedTheme: Theme | undefined;
const listeners = new Set<() => void>();

function readStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";

  try {
    const cookieValue = document.cookie
      .split(";")
      .map((entry) => entry.trim())
      .find((entry) => entry.startsWith(`${STORAGE_KEY}=`));

    const cookieTheme = cookieValue
      ? decodeURIComponent(cookieValue.slice(STORAGE_KEY.length + 1))
      : null;

    const stored = cookieTheme || localStorage.getItem(STORAGE_KEY);
    return stored === "system" || stored === "light" || stored === "dark"
      ? stored
      : "system";
  } catch {
    return "system";
  }
}

function getSnapshot(): Theme {
  if (cachedTheme === undefined) cachedTheme = readStoredTheme();
  return cachedTheme;
}

function getServerSnapshot(): Theme {
  return "system";
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function emit() {
  listeners.forEach((cb) => cb());
}

function persist(next: Theme) {
  cachedTheme = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
    document.cookie = `Profilio-theme=${next};path=/;max-age=31536000`;
    document.documentElement.dataset.theme = resolveTheme(next);
  } catch {
    /* ignore */
  }
  emit();
}

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function resolveTheme(theme: Theme): "light" | "dark" {
  return theme === "system" ? getSystemTheme() : theme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  /* Mirror the resolved theme onto <html data-theme> */
  useEffect(() => {
    document.documentElement.dataset.theme = resolveTheme(theme);

    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      document.documentElement.dataset.theme = getSystemTheme();
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    persist(next);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function useResolvedTheme() {
  const { theme } = useTheme();

  const getDocumentTheme = (): "light" | "dark" => {
    if (typeof document === "undefined") return "light";

    const storedTheme = readStoredTheme();
    return storedTheme === "system" ? getSystemTheme() : storedTheme;
  };

  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(
    getDocumentTheme
  );

  useEffect(() => {
    const update = () => setResolvedTheme(getDocumentTheme());

    update();

    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => update();

    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    }

    mq.addListener(onChange);
    return () => mq.removeListener(onChange);
  }, [theme]);

  return resolvedTheme;
}