import React from 'react';
import { ResepMakanan } from '../data/makanan';
import { ResepMinuman } from '../data/minuman';
import { useFavorites } from '../FavoritesContext';
import MakananRecipeGrid from '../components/makanan/RecipeGrid';
import MinumanRecipeGrid from '../components/minuman/RecipeGrid';

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  const allMakanan = Object.values(ResepMakanan.resep);
  const allMinuman = Object.values(ResepMinuman.resep);

  const favoriteMakanan = Array.from(favorites)
    .filter(key => key.startsWith('makanan:'))
    .map(key => {
      const id = Number(key.split(':')[1]);
      return allMakanan.find(r => r.id === id);
    })
    .filter(Boolean);

  const favoriteMinuman = Array.from(favorites)
    .filter(key => key.startsWith('minuman:'))
    .map(key => {
      const id = Number(key.split(':')[1]);
      return allMinuman.find(r => r.id === id);
    })
    .filter(Boolean);

  const anyFavorites = favoriteMakanan.length > 0 || favoriteMinuman.length > 0;

  return (
    <div className="min-h-screen p-4 md:p-8 pb-28">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Favorit Saya</h1>

        {!anyFavorites && (
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600">Kamu belum menambahkan resep ke favorit. Jelajahi resep dan tambahkan yang kamu suka.</p>
          </div>
        )}

        {favoriteMakanan.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Makanan Favorit</h2>
            <MakananRecipeGrid recipes={favoriteMakanan} />
          </section>
        )}

        {favoriteMinuman.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-4">Minuman Favorit</h2>
            <MinumanRecipeGrid recipes={favoriteMinuman} />
          </section>
        )}
      </div>
    </div>
  );
}
