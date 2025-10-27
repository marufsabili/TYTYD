import React from 'react';
import FavoriteButton from './FavoriteButton';

export default function RecipeModal({ open, onClose, recipe, type }) {
  if (!open || !recipe) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full mx-4 overflow-hidden">
        <div className="relative">
          <img src={recipe.image_url} alt={recipe.name} className="w-full h-64 object-cover" />
          <div className="absolute top-4 right-4">
            <FavoriteButton recipe={recipe} type={type} />
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-1">{recipe.name}</h3>
              <p className="text-sm text-slate-600 mb-4">{type === 'makanan' ? 'Makanan' : 'Minuman'}</p>
            </div>
            <button onClick={onClose} className="text-slate-500 hover:text-slate-700">Tutup</button>
          </div>

          {recipe.ingredients && (
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Bahan-bahan</h4>
              <ul className="list-disc list-inside text-sm text-slate-700">
                {recipe.ingredients.map((ing, idx) => <li key={idx}>{ing}</li>)}
              </ul>
            </div>
          )}

          {recipe.steps && (
            <div>
              <h4 className="font-semibold mb-2">Langkah-langkah</h4>
              <ol className="list-decimal list-inside text-sm text-slate-700 space-y-1">
                {recipe.steps.map((s, idx) => <li key={idx}>{s}</li>)}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
