import React from 'react';
import { Star } from 'lucide-react';
import { useFavorites } from '../FavoritesContext';

export default function FavoriteButton({ recipe, type }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const key = `${type}:${recipe.id}`;

  const active = isFavorite(key);

  return (
    <button
      onClick={(e) => { e.stopPropagation(); toggleFavorite(key); }}
      aria-label={active ? 'Hapus dari favorit' : 'Tambah ke favorit'}
      className={`absolute right-4 top-4 z-20 p-2 rounded-full transition-all duration-200 ${active ? 'bg-yellow-400/90 text-white shadow-lg' : 'bg-white/60 text-yellow-500 hover:bg-white/90'}`}>
      <Star size={18} fill={active ? 'currentColor' : 'none'} />
    </button>
  );
}
