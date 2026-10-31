import ShareButtons from '@/components/ShareButtons';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PostCard from '@/components/PostCard';
import PostFilters from '@/components/PostFilters';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n/config';
import { isLocale, localizedPath } from '@/i18n/config';
import { getPosts } from '@/lib/posts';

export const revalidate = 60;

const dateLocales: Record<Locale, string> = {
  fr: 'fr-FR',
  en: 'en-US',
  ru: 'ru-RU'
};

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dictionary = await getDictionary(params.locale);
  return {
    title: dictionary.meta.newsTitle,
    description: dictionary.meta.newsDescription
  };
}

export default async function NewsPage({
  params,
  searchParams
}: {
  params: { locale: string };
  searchParams: { q?: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dictionary = await getDictionary(locale);
  const search = typeof searchParams.q === 'string' ? searchParams.q.trim().slice(0, 120) : '';
  const posts = await getPosts(locale, { search });
  const showFeatured = !search && posts.length > 0;
  const featured = showFeatured ? posts[0] : null;
  const list = showFeatured ? posts.slice(1) : posts;

  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-7xl mx-auto px-4 pt-10 md:pt-14">
        <div className="border-t-4 border-russia-red pt-5 pb-7 md:pb-9 flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-charcoal/10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-russia-red mb-2">{dictionary.news.eyebrow}</p>
            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-charcoal tracking-tight">{dictionary.news.title}</h1>
          </div>
          <p className="text-sm md:text-base text-charcoal/55 max-w-2xl leading-relaxed">{dictionary.news.description}</p>
        </div>
      </section>

      <section className="bg-white border-b border-charcoal/10 px-4 py-5 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto">
          <PostFilters locale={locale} search={search} messages={dictionary.news.filters} />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        {posts.length === 0 ? (
          <div className="border-y border-charcoal/20 py-16 text-center">
            <h2 className="font-serif text-3xl font-semibold text-charcoal mb-2">{dictionary.news.emptyTitle}</h2>
            <p className="text-charcoal/55">{dictionary.news.emptyText}</p>
          </div>
        ) : (
          <>
            {featured && (
              <article className="grid lg:grid-cols-[1.35fr_1fr] gap-8 lg:gap-12 items-center border-b border-charcoal/20 pb-12 md:pb-16 mb-12 md:mb-16">
                
                {/* PARTIE GAUCHE : L'IMAGE */}
                <Link href={localizedPath(locale, `/actualites/${featured.slug}`)} className="block overflow-hidden bg-charcoal aspect-[16/10] relative group">
                  {featured.coverUrl ? (
                    <img src={featured.coverUrl} alt="" className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-500" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-charcoal to-dark-gray" />
                  )}
                  {featured.isRelevant && (
                    <span className="absolute left-0 top-0 bg-russia-red text-white px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em]">
                      {dictionary.news.relevant}
                    </span>
                  )}
                </Link>

                {/* PARTIE DROITE : LE TEXTE ET LE PARTAGE */}
                <div>
                  <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.12em] mb-5">
                    <time className="text-charcoal/50">
                      {new Intl.DateTimeFormat(dateLocales[locale], { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(featured.publishedAt))}
                    </time>
                  </div>
                  <h2 className="font-serif text-4xl md:text-5xl leading-[1.08] font-semibold text-charcoal mb-5">{featured.title}</h2>
                  <p className="text-lg text-charcoal/65 leading-relaxed mb-7">{featured.excerpt}</p>
                  
                  <div className="flex flex-col gap-4">
                    <Link
                      href={localizedPath(locale, `/actualites/${featured.slug}`)}
                      className="inline-flex w-fit items-center gap-3 bg-charcoal text-white px-6 py-3.5 font-semibold hover:bg-russia-red transition"
                    >
                      {dictionary.news.card.readMore}
                      <span aria-hidden="true">→</span>
                    </Link>

                    {/* 👇 LE BOUTON DE PARTAGE EST MAINTENANT BIEN PLACÉ ICI 👇 */}
                    <ShareButtons 
                      url={`https://afrorus-v2.vercel.app/${locale}/actualites/${featured.slug}`} 
                      title={featured.title} 
                    />
                  </div>
                </div>
              </article>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {list.map((post) => (
                <PostCard key={post.id} post={post} locale={locale} messages={dictionary.news.card} relevantLabel={dictionary.news.relevant} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}