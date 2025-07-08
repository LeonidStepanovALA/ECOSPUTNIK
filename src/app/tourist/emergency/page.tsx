import React from 'react';
import EmergencyContact from '@/components/EmergencyContact';

export default function EmergencyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-green-800 mb-6">
        Экстренная связь
      </h2>
      <EmergencyContact />
    </div>
  );
} 