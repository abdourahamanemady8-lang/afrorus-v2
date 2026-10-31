import ReactionBar from './ReactionBar';
import ShareButtons from './ShareButtons';

interface TestimonialCardProps {
  id: string | number; // 👈 AJOUT IMPORTANT : On ajoute l'ID
  titre: string;
  categorie: string;
  citationAfricain: string;
  nomAfricain: string;
  citationRusse: string;
  nomRusse: string;
  videoUrl?: string;
  watchLabel: string;
  noVideoLabel: string;
}

export default function TestimonialCard({
  id, // 👈 On le récupère ici
  titre,
  categorie,
  citationAfricain,
  nomAfricain,
  citationRusse,
  nomRusse,
  videoUrl,
  watchLabel,
  noVideoLabel
}: TestimonialCardProps) {
  return (
    <article className="testimonial-card group flex flex-col h-full">
      <span className="category-badge mb-4 self-start">{categorie}</span>
      <h3 className="text-xl font-bold text-charcoal mb-5 group-hover:text-russia-red transition-colors">{titre}</h3>

      <div className="space-y-5 mt-auto">
        <div className="flex gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-africa-gold/20 flex items-center justify-center text-xl">👨🏿‍🎓</div>
          <div>
            <p className="testimonial-quote text-sm line-clamp-3">« {citationAfricain} »</p>
            <p className="text-xs font-semibold text-charcoal/70 mt-1.5">— {nomAfricain}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-russia-red/10 flex items-center justify-center text-xl">👨🏻‍🎓</div>
          <div>
            <p className="testimonial-quote text-sm line-clamp-3">« {citationRusse} »</p>
            <p className="text-xs font-semibold text-charcoal/70 mt-1.5">— {nomRusse}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-light-gray flex justify-end">
        {videoUrl ? (
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-russia-red text-sm font-medium hover:underline cursor-pointer inline-flex items-center gap-1 transition-colors"
          >
            {watchLabel}<span className="text-lg">→</span>
          </a>
        ) : (
          <span className="text-gray-400 text-sm italic">{noVideoLabel}</span>
        )}
      </div>

      {/* 👇 C'EST ICI QU'ON AJOUTE LA BARRE DE RÉACTIONS 👇 */}
      <ReactionBar temoignageId={id} />
          <ShareButtons 
      url="https://afrorus-v2.vercel.app/fr/temoignages" 
      title={titre} 
    />
      
    </article>
  );
}