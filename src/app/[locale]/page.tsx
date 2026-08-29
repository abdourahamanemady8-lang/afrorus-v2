import Hero from '@/components/Hero';
import QuotesCarousel from '@/components/QuotesCarousel';
import Link from 'next/link';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n/config';
import { isLocale, localizedPath } from '@/i18n/config';
import { notFound } from 'next/navigation';

export default async function Home({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dictionary = await getDictionary(locale);
  const { home } = dictionary;
  const missionIcons = ['🎭', '❄️🔥', '🤝'];
  const missionClasses = ['bg-russia-red/10', 'bg-africa-gold/10', 'bg-charcoal/5'];

  return (
    <>
      <Hero locale={locale} messages={home.hero} />

      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-africa-gold text-sm font-semibold tracking-widest uppercase">{home.mission.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal mt-3">
              {home.mission.titleBefore} <span className="text-russia-red">AfroRus Reality</span> {home.mission.titleAfter}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">{home.mission.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {home.mission.cards.map((card, index) => (
              <div key={card.title} className="bg-off-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition">
                <div className={`w-20 h-20 ${missionClasses[index]} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <span className="text-4xl">{missionIcons[index]}</span>
                </div>
                <h3 className="text-xl font-bold text-charcoal mb-3">{card.title}</h3>
                <p className="text-gray-600">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-off-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-africa-gold text-sm font-semibold tracking-widest uppercase">{home.latest.eyebrow}</span>
              <h2 className="text-4xl md:text-5xl font-bold text-charcoal mt-3">{home.latest.title}</h2>
            </div>
            <Link
              href={localizedPath(locale, '/temoignages')}
              className="mt-4 md:mt-0 text-russia-red font-semibold hover:underline text-lg"
            >
              {home.latest.link}
            </Link>
          </div>
        </div>
      </section>

      <QuotesCarousel messages={dictionary.quotes} />

      <section className="py-24 px-4 bg-gradient-to-r from-charcoal to-dark-gray text-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-africa-gold text-sm font-semibold tracking-widest uppercase">{home.cta.eyebrow}</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-6">{home.cta.title}</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">{home.cta.description}</p>
          <Link href={localizedPath(locale, '/guide')} className="btn-gold inline-flex items-center gap-2 text-lg px-10 py-4">
            {home.cta.button}
          </Link>
        </div>
      </section>
    </>
  );
}
