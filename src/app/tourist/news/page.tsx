import React from 'react';
import NewsAndPromotions from '@/components/NewsAndPromotions';

export default function NewsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-green-800 mb-6">
        Акции и новости
      </h2>
      <NewsAndPromotions />
    </div>
  );
} 