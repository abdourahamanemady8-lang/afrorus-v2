'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { Locale } from '@/i18n/config';

const options: { value: Locale; label: string }[] = [
  { value: 'fr', label: '🇫🇷 FR' },
  { value: 'en', label: '🇬🇧 EN' },
  { value: 'ru', label: '🇷🇺 RU' }
];

interface LanguageSwitcherProps {
  locale: Locale;
  label: string;
  fullWidth?: boolean;
}

export default function LanguageSwitcher({ locale, label, fullWidth = false }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChange = (nextLocale: Locale) => {
    const segments = pathname.split('/');
    segments[1] = nextLocale;
    const nextPath = segments.join('/') || `/${nextLocale}`;
    const query = searchParams.toString();
    document.cookie = `afrorus_locale=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    router.push(query ? `${nextPath}?${query}` : nextPath);
  };

  return (
    <label className={fullWidth ? 'block w-full' : 'block'}>
      <span className="sr-only">{label}</span>
      <select
        value={locale}
        onChange={(event) => handleChange(event.target.value as Locale)}
        className={`${fullWidth ? 'w-full' : ''} bg-russia-red text-white font-semibold py-2 px-4 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-russia-red focus:ring-offset-2`}
        aria-label={label}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-white text-charcoal">
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
