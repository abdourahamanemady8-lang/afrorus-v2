import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { localizedPath } from '@/i18n/config';
import type { PostSummary } from '@/types/content';
import ShareButtons from './ShareButtons'; // 👈 1. On importe le bouton

interface PostCardProps {
  post: PostSummary;
  locale: Locale;
  relevantLabel: string;
  messages: {
    readMore: string;
    comments: string;
    likes: string;
  };
}

const dateLocales: Record<Locale, string> = {
  fr: 'fr-FR',
  en: 'en-US',
  ru: 'ru-RU'
};

export default function PostCard({ post, locale, messages, relevantLabel }: PostCardProps) {
  const date = new Intl.DateTimeFormat(dateLocales[locale], {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date(post.publishedAt));

  // 👈 2. On crée le lien exact de l'article pour le partage
  const postUrl = `https://afrorus-v2.vercel.app/${locale}/actualites/${post.slug}`;

  return (
    <article className="group bg-white border-b border-charcoal/20 pb-6 h-full flex flex-col">
      
      <Link href={localizedPath(locale, `/actualites/${post.slug}`)} className="block flex-grow">
        <div className="relative aspect-[16/10] bg-charcoal overflow-hidden mb-5">
          {post.coverUrl ? (
            <img src={post.coverUrl} alt="" className="w-full h-full object-cover transition duration-500 group-hover:scale-[1.025]" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-charcoal to-dark-gray" />
          )}
          {post.isRelevant && (
            <span className="absolute left-0 top-0 bg-russia-red text-white px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.14em]">
              {relevantLabel}
            </span>
          )}
        </div>

        <div className="flex items-center flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.1em] mb-3">
          <time className="text-charcoal/55">{date}</time>
        </div>

        <h2 className="font-serif text-2xl md:text-[1.7rem] leading-[1.16] font-semibold text-charcoal group-hover:text-russia-red transition mb-3">
          {post.title}
        </h2>
        <p className="text-charcoal/65 leading-relaxed line-clamp-3">{post.excerpt}</p>

        <div className="flex items-center justify-between gap-4 mt-6 pt-4 border-t border-charcoal/10">
          <span className="font-semibold text-sm text-charcoal group-hover:text-russia-red transition inline-flex items-center gap-2">
            {messages.readMore}
            <span aria-hidden="true">→</span>
          </span>
          <span className="text-xs text-charcoal/45 whitespace-nowrap">
            {post.commentsCount} {messages.comments} · {post.likesCount} {messages.likes}
          </span>
        </div>
      </Link>

      {/* 👈 3. On ajoute le bouton de partage tout en bas, en dehors du lien */}
      <div className="px-1 mt-2">
        <ShareButtons url={postUrl} title={post.title} />     
      </div>
      
    </article>
  );
}