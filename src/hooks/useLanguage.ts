'use client';

import { useState, useEffect } from 'react';
import { Language } from '@/translations';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('ru');

  useEffect(() => {
    // Загружаем язык из localStorage при инициализации
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'ru' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return { language, changeLanguage };
} 