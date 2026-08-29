import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n/config';
import { isLocale } from '@/i18n/config';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dictionary = await getDictionary(params.locale);
  return {
    title: dictionary.meta.aboutTitle,
    description: dictionary.meta.aboutDescription
  };
}

export default async function AProposPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dictionary = await getDictionary(locale);
  const { about } = dictionary;

  return (
    <div className="min-h-screen bg-off-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-charcoal mb-12 text-center">
          {about.titleBefore}<span className="text-russia-red">AfroRus Reality</span>
        </h1>

        <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-russia-red mb-4">{about.missionTitle}</h2>
            <p className="text-gray-700 leading-relaxed text-lg">{about.missionP1}</p>
            <p className="text-gray-700 leading-relaxed mt-4">{about.missionP2}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-russia-red mb-4">{about.teamTitle}</h2>
            <p className="text-gray-700 leading-relaxed text-lg">{about.teamText}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-russia-red mb-4">{about.contactTitle}</h2>
            <div className="space-y-2 text-gray-700">
              <p className="flex items-center gap-2">
                <span className="text-2xl">📧</span>
                <a href="mailto:contact@afrorus-reality.com" className="hover:text-russia-red underline">contact@afrorus-reality.com</a>
              </p>
              <p className="flex items-center gap-2"><span className="text-2xl">📍</span>{about.location}</p>
              <p className="flex items-center gap-2"><span className="text-2xl">📱</span>{about.telegram}</p>
            </div>
            <p className="text-gray-600 mt-6 text-sm">{about.partnership}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
