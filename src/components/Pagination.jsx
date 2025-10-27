import React from 'react';

export default function Pagination({ total, page, pageSize, onPageChange, onPageSizeChange }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const setPage = (p) => {
    const next = Math.max(1, Math.min(totalPages, p));
    if (next !== page) onPageChange(next);
  };

  const handleSize = (e) => {
    const v = Number(e.target.value) || 6;
    onPageSizeChange(v);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, start + 4);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages.map(p => (
      <button
        key={p}
        onClick={() => setPage(p)}
        className={`px-3 py-1 rounded-md ${p === page ? 'bg-blue-600 text-white' : 'bg-white border'}`}
      >{p}</button>
    ));
  };

  if (totalPages === 1) return (
    <div className="flex items-center justify-between mt-6">
      <div className="text-sm text-slate-600">1 halaman</div>
      <div className="flex items-center space-x-2">
        <label className="text-sm">Per halaman</label>
        <select value={pageSize} onChange={handleSize} className="border rounded px-2 py-1">
          <option value={6}>6</option>
          <option value={9}>9</option>
          <option value={12}>12</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-between mt-6">
      <div className="flex items-center space-x-2">
        <button onClick={() => setPage(page - 1)} className="px-3 py-1 rounded-md bg-white border">Prev</button>
        {renderPageNumbers()}
        <button onClick={() => setPage(page + 1)} className="px-3 py-1 rounded-md bg-white border">Next</button>
      </div>
      <div className="flex items-center space-x-2">
        <label className="text-sm">Per halaman</label>
        <select value={pageSize} onChange={handleSize} className="border rounded px-2 py-1">
          <option value={6}>6</option>
          <option value={9}>9</option>
          <option value={12}>12</option>
        </select>
      </div>
    </div>
  );
}
