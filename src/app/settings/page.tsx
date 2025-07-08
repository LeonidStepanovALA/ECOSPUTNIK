'use client';

import React from 'react';
import { 
  Cog6ToothIcon, 
  BellIcon, 
  ShieldCheckIcon, 
  UserIcon, 
  QuestionMarkCircleIcon, 
  InformationCircleIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface SettingItem {
  icon: React.ElementType;
  title: string;
  description: string;
  href?: string;
  onClick?: () => void;
}

export default function SettingsPage() {
  const { language, changeLanguage } = useLanguage();
  const t = translations[language];

  const settingsItems: SettingItem[] = [
    {
      icon: BellIcon,
      title: t.notifications,
      description: 'Управление уведомлениями',
      href: '/settings/notifications'
    },
    {
      icon: ShieldCheckIcon,
      title: t.privacy,
      description: 'Настройки конфиденциальности',
      href: '/settings/privacy'
    },
    {
      icon: UserIcon,
      title: t.account,
      description: 'Управление аккаунтом',
      href: '/settings/account'
    },
    {
      icon: QuestionMarkCircleIcon,
      title: t.help,
      description: 'Помощь и поддержка',
      href: '/settings/help'
    },
    {
      icon: InformationCircleIcon,
      title: t.about,
      description: 'О приложении',
      href: '/settings/about'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-green-800">
              {t.settings}
            </h1>
          </div>
          <LanguageSwitcher 
            currentLanguage={language} 
            onLanguageChange={changeLanguage}
          />
        </div>

        {/* Language Settings */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
            <Cog6ToothIcon className="w-5 h-5 mr-2" />
            {t.language}
          </h2>
          <p className="text-gray-600 mb-4">
            Выберите предпочитаемый язык интерфейса
          </p>
          <div className="flex justify-start">
            <LanguageSwitcher 
              currentLanguage={language} 
              onLanguageChange={changeLanguage}
            />
          </div>
        </div>

        {/* Settings List */}
        <div className="space-y-4">
          {settingsItems.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <item.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-800">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
                {item.href ? (
                  <Link 
                    href={item.href}
                    className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                  >
                    <ArrowLeftIcon className="w-5 h-5 rotate-180" />
                  </Link>
                ) : (
                  <button
                    onClick={item.onClick}
                    className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                  >
                    <ArrowLeftIcon className="w-5 h-5 rotate-180" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <div className="mt-8">
          <button className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors font-medium">
            {t.logout}
          </button>
        </div>
      </div>
    </div>
  );
} 