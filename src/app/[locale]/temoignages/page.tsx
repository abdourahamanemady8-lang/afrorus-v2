import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryFilter from '@/components/CategoryFilter';
import TestimonialCard from '@/components/TestimonialCard';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n/config';
import { isLocale } from '@/i18n/config';
import { supabase } from '@/lib/supabase';
import { CATEGORIES } from '@/lib/constants';

export const revalidate = 3600;

async function getTemoignages(categorie?: string) {
  if (!supabase) return [];

  let query = supabase.from('temoignages').select('*').order('created_at', { ascending: false });

  if (categorie && categorie !== 'all') {
    query = query.eq('categorie', categorie).limit(3);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Supabase:', error);
    return [];
  }

  return data || [];
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dictionary = await getDictionary(params.locale);
  return {
    title: dictionary.meta.testimonialsTitle,
    description: dictionary.meta.testimonialsDescription
  };
}

export default async function TemoignagesPage({
  params,
  searchParams
}: {
  params: { locale: string };
  searchParams: { categorie?: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;

  const dictionary = await getDictionary(locale);
  const categorie = searchParams.categorie || 'all';
  const temoignages = await getTemoignages(categorie);
  const categories = CATEGORIES.map((category) => ({
    ...category,
    label: dictionary.testimonials.categories[category.id as keyof typeof dictionary.testimonials.categories]
  }));

  return (
    <div className="min-h-screen bg-off-white">
      <section className="bg-charcoal pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{dictionary.testimonials.title}</h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">{dictionary.testimonials.description}</p>
        </div>
      </section>

      <section className="py-8 px-4 border-b border-light-gray bg-white sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <CategoryFilter categories={categories} />
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {temoignages.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
              <p className="text-2xl text-gray-500">{dictionary.testimonials.emptyTitle}</p>
              <p className="text-gray-400 mt-2">{dictionary.testimonials.emptyText}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {temoignages.map((item: any) => (
                <TestimonialCard
                  key={item.id}
                  id={item.id}
                  titre={item[`titre_${locale}`] || item.titre}
                  categorie={dictionary.testimonials.categories[item.categorie as keyof typeof dictionary.testimonials.categories] || item.categorie}
                  citationAfricain={item[`citation_africain_${locale}`] || item.citation_africain}
                  nomAfricain={item.nom_africain}
                  citationRusse={item[`citation_russe_${locale}`] || item.citation_russe}
                  nomRusse={item.nom_russe}
                  videoUrl={item.video_url}
                  watchLabel={dictionary.testimonialCard.watch}
                  noVideoLabel={dictionary.testimonialCard.noVideo}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
