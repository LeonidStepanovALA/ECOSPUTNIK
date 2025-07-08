import React from 'react';
import SearchSection from '@/components/SearchSection';

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-green-800 mb-6">
        Поиск
      </h2>
      <SearchSection />
    </div>
  );
} 