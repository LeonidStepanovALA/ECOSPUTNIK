'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Home() {
  const { language, changeLanguage } = useLanguage();
  const t = translations[language];

  const roles = [
    {
      title: t.tourist,
      description: t.touristDesc,
      href: '/tourist',
      icon: '🏃‍♂️'
    },
    {
      title: t.guide,
      description: t.guideDesc,
      href: '/guide',
      icon: '🎯'
    },
    {
      title: t.accommodation,
      description: t.accommodationDesc,
      href: '/accommodation',
      icon: '🏡'
    },
    {
      title: t.admin,
      description: t.adminDesc,
      href: '/admin',
      icon: '⚙️'
    }
  ];
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Language Switcher */}
        <div className="flex justify-end mb-4">
          <LanguageSwitcher 
            currentLanguage={language} 
            onLanguageChange={changeLanguage}
          />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-6 md:mb-8">
          {t.welcome}
        </h1>
        <p className="text-base md:text-lg text-green-700 text-center mb-8 md:mb-12 px-4">
          {t.selectRole}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {roles.map((role) => (
            <Link
              key={role.title}
              href={role.href}
              className="block p-4 md:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border-2 border-green-100 hover:border-green-300"
            >
              <div className="flex items-center mb-3 md:mb-4">
                <span className="text-3xl md:text-4xl mr-3 md:mr-4">{role.icon}</span>
                <h2 className="text-xl md:text-2xl font-semibold text-green-800">{role.title}</h2>
              </div>
              <p className="text-sm md:text-base text-green-600">{role.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
