import type { Locale } from './config';

const dictionaries = {
  fr: () => import('./messages/fr').then((module) => module.default),
  en: () => import('./messages/en').then((module) => module.default),
  ru: () => import('./messages/ru').then((module) => module.default)
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
