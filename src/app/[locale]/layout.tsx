import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '../globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n/config';
import { isLocale, locales } from '@/i18n/config';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dictionary = await getDictionary(params.locale);

  return {
    title: 'AfroRus Reality',
    description: dictionary.meta.siteDescription
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;

  const dictionary = await getDictionary(locale);

  return (
    <html lang={params.locale}>
      <body className="flex flex-col min-h-screen">
        <Navbar locale={locale} messages={dictionary.nav} />
        <main className="flex-grow pt-20">{children}</main>
        <Footer locale={locale} messages={dictionary.footer} />
      </body>
    </html>
  );
}
