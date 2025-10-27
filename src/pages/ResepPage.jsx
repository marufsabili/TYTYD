import { useState, useMemo } from 'react';
import { ResepMakanan } from '../data/makanan';
import { ResepMinuman } from '../data/minuman';
import RecipeGridMakanan from '../components/makanan/RecipeGrid';
import RecipeGridMinuman from '../components/minuman/RecipeGrid';
import Pagination from '../components/Pagination';

export default function ResepPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [pageMakanan, setPageMakanan] = useState(1);
  const [pageMinuman, setPageMinuman] = useState(1);
  const [pageSizeMakanan, setPageSizeMakanan] = useState(6);
  const [pageSizeMinuman, setPageSizeMinuman] = useState(6);

  const allMakanan = Object.values(ResepMakanan.resep);
  const allMinuman = Object.values(ResepMinuman.resep);

  const filteredMakanan = useMemo(() => {
    if (!searchQuery.trim()) return allMakanan;
    const q = searchQuery.toLowerCase();
    return allMakanan.filter(r => r.name.toLowerCase().includes(q));
  }, [searchQuery]);

  const filteredMinuman = useMemo(() => {
    if (!searchQuery.trim()) return allMinuman;
    const q = searchQuery.toLowerCase();
    return allMinuman.filter(r => r.name.toLowerCase().includes(q));
  }, [searchQuery]);

  const pagedMakanan = useMemo(() => {
    const start = (pageMakanan - 1) * pageSizeMakanan;
    return filteredMakanan.slice(start, start + pageSizeMakanan);
  }, [filteredMakanan, pageMakanan, pageSizeMakanan]);

  const pagedMinuman = useMemo(() => {
    const start = (pageMinuman - 1) * pageSizeMinuman;
    return filteredMinuman.slice(start, start + pageSizeMinuman);
  }, [filteredMinuman, pageMinuman, pageSizeMinuman]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="max-w-2xl mx-auto mb-8">
          <label className="block text-sm font-medium text-slate-700 mb-2">Cari resep</label>
          <div className="flex items-center space-x-2">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari makanan atau minuman..."
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 shadow-sm focus:outline-none"
            />
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Resep Makanan</h2>
          <RecipeGridMakanan recipes={pagedMakanan} />
          <Pagination
            total={filteredMakanan.length}
            page={pageMakanan}
            pageSize={pageSizeMakanan}
            onPageChange={(p) => setPageMakanan(p)}
            onPageSizeChange={(s) => { setPageSizeMakanan(s); setPageMakanan(1); }}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Resep Minuman</h2>
          <RecipeGridMinuman recipes={pagedMinuman} />
          <Pagination
            total={filteredMinuman.length}
            page={pageMinuman}
            pageSize={pageSizeMinuman}
            onPageChange={(p) => setPageMinuman(p)}
            onPageSizeChange={(s) => { setPageSizeMinuman(s); setPageMinuman(1); }}
          />
        </section>
      </main>
    </div>
  );
}
