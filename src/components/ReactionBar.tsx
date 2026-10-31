'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'; // Vérifie que le chemin est le bon

const EMOJIS = ['❤️', '😂', '👍', '😮'];

interface ReactionBarProps {
  temoignageId: string | number;
}

export default function ReactionBar({ temoignageId }: ReactionBarProps) {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // 1. Identifier le visiteur (au chargement)
  useEffect(() => {
    let visitorId = localStorage.getItem('afrorus_visitor_id');
    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem('afrorus_visitor_id', visitorId);
    }
    setUserId(visitorId);
  }, []);

  // 2. Charger les compteurs depuis Supabase
  useEffect(() => {
    if (!userId) return;

    const fetchReactions = async () => {
      const { data, error } = await supabase
        .from('temoignage_reactions')
        .select('reaction_type, user_id')
        .eq('temoignage_id', temoignageId);

      if (!error && data) {
        // Compter les réactions
        const newCounts: Record<string, number> = { '❤️': 0, '😂': 0, '👍': 0, '😮': 0 };
        let myReaction = null;

        data.forEach((row) => {
          newCounts[row.reaction_type] = (newCounts[row.reaction_type] || 0) + 1;
          if (row.user_id === userId) {
            myReaction = row.reaction_type;
          }
        });

        setCounts(newCounts);
        setUserReaction(myReaction);
      }
    };

    fetchReactions();
  }, [temoignageId, userId]);

  // 3. Gérer le clic sur un emoji
  const handleReaction = async (emoji: string) => {
    if (!userId) return;

    // Mise à jour visuelle immédiate (Optimistic UI pour la fluidité)
    const isRemoving = userReaction === emoji;
    const previousReaction = userReaction;
    
    setCounts((prev) => {
      const newCounts = { ...prev };
      if (previousReaction) newCounts[previousReaction] = Math.max(0, newCounts[previousReaction] - 1);
      if (!isRemoving) newCounts[emoji] = (newCounts[emoji] || 0) + 1;
      return newCounts;
    });
    setUserReaction(isRemoving ? null : emoji);

    // Mise à jour dans Supabase
    try {
      if (isRemoving) {
        // Supprimer la réaction
        await supabase
          .from('temoignage_reactions')
          .delete()
          .match({ temoignage_id: temoignageId, user_id: userId });
      } else {
        // Ajouter ou Mettre à jour (Upsert gère les deux cas)
        await supabase
          .from('temoignage_reactions')
          .upsert(
            { temoignage_id: temoignageId, user_id: userId, reaction_type: emoji },
            { onConflict: 'temoignage_id, user_id' }
          );
      }
    } catch (error) {
      console.error('Erreur réaction:', error);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
      {EMOJIS.map((emoji) => {
        const isActive = userReaction === emoji;
        const count = counts[emoji] || 0;

        return (
          <button
            key={emoji}
            onClick={() => handleReaction(emoji)}
            className={`
              group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
              ${isActive 
                ? 'bg-red-50 text-red-600 border border-red-200 shadow-sm scale-105' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:scale-105'
              }
            `}
          >
            <span className={`text-lg transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
              {emoji}
            </span>
            <span>{count > 0 ? count : ''}</span>
          </button>
        );
      })}
    </div>
  );
}