'use client';

import React from 'react';
import Link from 'next/link';
import { 
  StarIcon, 
  NewspaperIcon, 
  MagnifyingGlassIcon, 
  PhoneIcon,
  CloudIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

import TouristStats from '@/components/TouristStats';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface NavigationButton {
  href: string;
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

export default function TouristPage() {
  const { language, changeLanguage } = useLanguage();
  const t = translations[language];

  const navigationButtons: NavigationButton[] = [
    {
      href: '/tourist/recommendations',
      icon: StarIcon,
      title: t.personalizedRecommendations,
      description: t.personalizedRecommendationsDesc,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      href: '/tourist/news',
      icon: NewspaperIcon,
      title: t.news,
      description: t.newsDesc,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      href: '/tourist/search',
      icon: MagnifyingGlassIcon,
      title: t.search,
      description: t.searchDesc,
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      href: '/tourist/emergency',
      icon: PhoneIcon,
      title: t.emergency,
      description: t.emergencyDesc,
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      href: '/tourist/carbon-report',
      icon: CloudIcon,
      title: t.carbonReport,
      description: t.carbonReportDesc,
      color: 'bg-teal-500 hover:bg-teal-600'
    },
    {
      href: '/settings',
      icon: Cog6ToothIcon,
      title: t.settings,
      description: t.settingsDesc,
      color: 'bg-gray-500 hover:bg-gray-600'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      {/* Language Switcher */}
      <div className="flex justify-end mb-4">
        <LanguageSwitcher 
          currentLanguage={language} 
          onLanguageChange={changeLanguage}
        />
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-green-800 mb-6 md:mb-8">
        {t.touristDashboard}
      </h1>

      {/* Статистика туриста */}
      <div className="mb-8">
        <TouristStats />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {navigationButtons.map((button) => (
          <Link 
            key={button.href} 
            href={button.href}
            className={`${button.color} text-white rounded-lg p-4 md:p-6 transition-transform transform hover:scale-105 hover:shadow-lg`}
          >
            <div className="flex items-start gap-3 md:gap-4">
              <button.icon className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0" />
              <div>
                <h2 className="text-lg md:text-xl font-semibold mb-2">
                  {button.title}
                </h2>
                <p className="text-sm md:text-base text-white/90">
                  {button.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 md:mt-12 p-4 md:p-6 bg-green-50 rounded-lg">
        <h3 className="text-lg md:text-xl font-semibold text-green-800 mb-3 md:mb-4">
          {t.welcomeMessage}
        </h3>
        <p className="text-sm md:text-base text-green-700">
          {t.welcomeDesc}
        </p>
      </div>
    </div>
  );
} 