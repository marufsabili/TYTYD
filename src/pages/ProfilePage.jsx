// src/pages/ProfilePage.jsx
import { ResepMakanan } from '../data/makanan';
import { ResepMinuman } from '../data/minuman';
import { useFavorites } from '../FavoritesContext';

export default function ProfilePage() {
  const { favorites, toggleFavorite } = useFavorites();

  const allMakanan = Object.values(ResepMakanan.resep);
  const allMinuman = Object.values(ResepMinuman.resep);

  const favoriteItems = Array.from(favorites).map((key) => {
    const [type, idStr] = key.split(':');
    const id = Number(idStr);
    if (type === 'makanan') return { type, item: allMakanan.find(i => i.id === id) };
    if (type === 'minuman') return { type, item: allMinuman.find(i => i.id === id) };
    return null;
  }).filter(Boolean);

  return (
    <div className="p-4 md:p-8 pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Profile Pengguna
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 mb-6 flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold">NA</div>
          <div>
            <div className="text-lg font-semibold">M Maruf Sabili Riziq</div>
            <div className="text-sm text-slate-600">NIM: 21120123140123</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Favorit Kamu</h2>
          {favoriteItems.length === 0 ? (
            <p className="text-gray-600">Kamu belum menambahkan resep ke favorit. Jelajahi resep dan tambahkan yang kamu suka.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {favoriteItems.map(({ type, item }) => (
                <div key={`${type}-${item.id}`} className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                  <img src={item.image_url} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-slate-800">{item.name}</h3>
                      <button onClick={() => toggleFavorite(`${type}:${item.id}`)} className="text-sm text-red-500">Hapus</button>
                    </div>
                    <p className="text-xs text-slate-600">{type === 'makanan' ? 'Makanan' : 'Minuman'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
