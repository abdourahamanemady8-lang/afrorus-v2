import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DownloadGuideButton from '@/components/DownloadGuideButton';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n/config';
import { isLocale } from '@/i18n/config';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dictionary = await getDictionary(params.locale);
  return {
    title: dictionary.meta.guideTitle,
    description: dictionary.meta.guideDescription
  };
}

export default async function GuidePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dictionary = await getDictionary(locale);
  const { guide } = dictionary;

  return (
    <div className="min-h-screen bg-off-white">
      <section className="bg-gradient-to-r from-russia-red to-charcoal pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-africa-gold text-sm font-semibold tracking-widest uppercase">{guide.eyebrow}</span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mt-3 mb-6">{guide.title}</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">{guide.intro}</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white rounded-2xl shadow-md p-8">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl">📋</span>
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal">{guide.adminTitle}</h2>
            </div>
            <ul className="space-y-4 text-gray-700">
              {guide.adminItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-russia-red font-bold text-xl">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-8">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl">❄️</span>
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal">{guide.winterTitle}</h2>
            </div>
            <ul className="space-y-4 text-gray-700">
              {guide.winterItems.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <span className="text-russia-red font-bold">•</span>
                  <span><strong>{item.label}</strong> {item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-8">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl">🍲</span>
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal">{guide.foodTitle}</h2>
            </div>
            <div className="space-y-4">
              {guide.foodPlaces.map((place) => (
                <div key={place.city}>
                  <h3 className="font-bold text-russia-red">{place.city}</h3>
                  <p>{place.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8">
            <DownloadGuideButton messages={guide.download} />
          </div>
        </div>
      </section>
    </div>
  );
}
