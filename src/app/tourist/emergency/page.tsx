'use client';

import React from 'react';
import EmergencyContact from '@/components/EmergencyContact';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function EmergencyPage() {
  const { language, changeLanguage } = useLanguage();
  const t = translations[language];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-800">
          {t.emergencyContact}
        </h2>
        <LanguageSwitcher 
          currentLanguage={language} 
          onLanguageChange={changeLanguage}
        />
      </div>
      <EmergencyContact />
    </div>
  );
} 