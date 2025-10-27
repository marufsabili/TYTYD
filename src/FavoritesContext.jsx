import React, { createContext, useContext, useEffect, useState } from 'react';

const FavoritesContext = createContext(null);

const LOCAL_KEY = 'resep_nusantara_favorites_v1';

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      if (raw) {
        const arr = JSON.parse(raw);
        setFavorites(new Set(arr));
      }
    } catch (e) {
      console.error('Failed to read favorites from localStorage', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(Array.from(favorites)));
    } catch (e) {
      console.error('Failed to write favorites to localStorage', e);
    }
  }, [favorites]);

  const toggleFavorite = (key) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const isFavorite = (key) => favorites.has(key);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}

export default FavoritesContext;
