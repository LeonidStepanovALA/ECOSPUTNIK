import React from 'react';
import PersonalizedRecommendations from '@/components/PersonalizedRecommendations';

export default function RecommendationsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-green-800 mb-6">
        Персонализированные рекомендации
      </h2>
      <PersonalizedRecommendations />
    </div>
  );
} 