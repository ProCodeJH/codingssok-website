import ko from './locales/ko'
import en from './locales/en'
import type { Locale } from './locales/ko'

export type SupportedLocale = 'ko' | 'en'

const locales: Record<SupportedLocale, Locale> = { ko, en }

const LOCALE_KEY = 'codingssok_locale'

export function getLocale(): SupportedLocale {
    if (typeof window === 'undefined') return 'ko'
    return (localStorage.getItem(LOCALE_KEY) as SupportedLocale) || 'ko'
}

export function setLocale(locale: SupportedLocale) {
    if (typeof window === 'undefined') return
    localStorage.setItem(LOCALE_KEY, locale)
}

export function t(locale?: SupportedLocale): Locale {
    return locales[locale || getLocale()] || locales.ko
}

export { ko, en }
export type { Locale }
