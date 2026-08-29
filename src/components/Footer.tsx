import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { localizedPath } from '@/i18n/config';

interface FooterProps {
  locale: Locale;
  messages: {
    tagline: string;
    navigation: string;
    home: string;
    testimonials: string;
    guide: string;
    about: string;
    partners: string;
    association: string;
    contact: string;
    location: string;
    rights: string;
  };
}

export default function Footer({ locale, messages }: FooterProps) {
  return (
    <footer className="bg-dark-gray text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-2xl font-bold text-white mb-4">
              AfroRus <span className="text-africa-gold">Reality</span>
            </h4>
            <p className="text-white/60 text-sm leading-relaxed">{messages.tagline}</p>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-4">{messages.navigation}</h5>
            <ul className="space-y-2 text-white/60 text-sm">
              <li><Link href={localizedPath(locale)} className="hover:text-white transition">{messages.home}</Link></li>
              <li><Link href={localizedPath(locale, '/temoignages')} className="hover:text-white transition">{messages.testimonials}</Link></li>
              <li><Link href={localizedPath(locale, '/guide')} className="hover:text-white transition">{messages.guide}</Link></li>
              <li><Link href={localizedPath(locale, '/a-propos')} className="hover:text-white transition">{messages.about}</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-4">{messages.partners}</h5>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>Русский Диалог (NSTU)</li>
              <li>{messages.association}</li>
              <li>Fondation Gorchakov</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-4">{messages.contact}</h5>
            <p className="text-white/60 text-sm">
              contact@afrorus-reality.com<br />
              {messages.location}
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-white/60 hover:text-white">📱</a>
              <a href="#" className="text-white/60 hover:text-white">📘</a>
              <a href="#" className="text-white/60 hover:text-white">📷</a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/40 text-sm">
          © 2026 AfroRus Reality. {messages.rights}
        </div>
      </div>
    </footer>
  );
}
