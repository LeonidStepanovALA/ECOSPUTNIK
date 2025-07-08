'use client';

import React from 'react';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

interface LanguageSwitcherProps {
  currentLanguage: 'ru' | 'en';
  onLanguageChange: (language: 'ru' | 'en') => void;
  className?: string;
}

export default function LanguageSwitcher({ 
  currentLanguage, 
  onLanguageChange, 
  className = '' 
}: LanguageSwitcherProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <GlobeAltIcon className="w-5 h-5 text-green-600" />
      <div className="flex bg-white rounded-lg border-2 border-green-100 overflow-hidden">
        <button
          onClick={() => onLanguageChange('ru')}
          className={`px-3 py-1 text-sm font-medium transition-colors ${
            currentLanguage === 'ru'
              ? 'bg-green-600 text-white'
              : 'text-gray-600 hover:bg-green-50'
          }`}
        >
          RU
        </button>
        <button
          onClick={() => onLanguageChange('en')}
          className={`px-3 py-1 text-sm font-medium transition-colors ${
            currentLanguage === 'en'
              ? 'bg-green-600 text-white'
              : 'text-gray-600 hover:bg-green-50'
          }`}
        >
          EN
        </button>
      </div>
    </div>
  );
} 