import en from "./locales/en.json";

export const LOCALES = ["en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

const translations = { en } as const;

export function getLangFromUrl(url: URL): Locale {
  const [, firstSegment] = url.pathname.split("/");
  if (firstSegment && LOCALES.includes(firstSegment as Locale)) {
    return firstSegment as Locale;
  }
  return DEFAULT_LOCALE;
}

type TranslationValue = string | Record<string, unknown> | unknown[];

function get(obj: Record<string, unknown>, path: string): TranslationValue {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && !Array.isArray(acc)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj) as TranslationValue;
}

export function useTranslations(lang: Locale) {
  return function t(key: string): string {
    const value = get(
      translations[lang] as unknown as Record<string, unknown>,
      key
    );
    if (typeof value === "string") return value;
    // Fall back to English
    const fallback = get(
      translations[DEFAULT_LOCALE] as unknown as Record<string, unknown>,
      key
    );
    if (typeof fallback === "string") return fallback;
    return key;
  };
}

export function useTranslationsObj(lang: Locale) {
  return function tObj<T = TranslationValue>(key: string): T {
    const value = get(
      translations[lang] as unknown as Record<string, unknown>,
      key
    );
    if (value !== undefined) return value as T;
    const fallback = get(
      translations[DEFAULT_LOCALE] as unknown as Record<string, unknown>,
      key
    );
    return fallback as T;
  };
}

/**
 * Returns the localized path for a given canonical (English) path.
 * - English: returns path as-is (no prefix)
 * - Other locales: prefixes with /locale
 */
export function getLocalizedPath(path: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return path;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalizedPath}`;
}

/**
 * Given the current URL, returns the equivalent URL in another locale.
 */
export function getAlternateUrl(
  url: URL,
  targetLocale: Locale,
  baseUrl: string
): string {
  const currentLocale = getLangFromUrl(url);
  let pathname = url.pathname;

  // Strip current locale prefix if present
  if (currentLocale !== DEFAULT_LOCALE) {
    pathname = pathname.replace(new RegExp(`^/${currentLocale}`), "") || "/";
  }

  const localizedPath = getLocalizedPath(pathname, targetLocale);
  return `${baseUrl.replace(/\/$/, "")}${localizedPath}`;
}
