'use client';

import React from 'react';
import { UserIcon, BriefcaseIcon, CalendarIcon, CurrencyDollarIcon, ChartBarIcon, AcademicCapIcon, ChatBubbleLeftIcon, Cog6ToothIcon, StarIcon } from '@heroicons/react/24/outline';

const menuItems = [
  {
    id: 'profile',
    title: 'Профиль',
    icon: UserIcon,
    items: [
      'Личные данные',
      'Верификация',
      'Статус "EcoGuide"',
      'Портфолио'
    ]
  },
  {
    id: 'tours',
    title: 'Мои туры',
    icon: BriefcaseIcon,
    items: [
      'Создание тура',
      'Редактирование туров',
      'Календарь',
      'Статистика'
    ]
  },
  {
    id: 'bookings',
    title: 'Бронирования',
    icon: CalendarIcon,
    items: [
      'Текущие заказы',
      'Завершенные заказы',
      'Чат с туристами',
      'Экстренная связь'
    ]
  },
  {
    id: 'finance',
    title: 'Финансы',
    icon: CurrencyDollarIcon,
    items: [
      'Баланс',
      'История выплат',
      'Платежные методы',
      'Налоговые отчеты'
    ]
  },
  {
    id: 'analytics',
    title: 'Аналитика',
    icon: ChartBarIcon,
    items: [
      'Популярность туров',
      'Рейтинг и отзывы',
      'Рекомендации'
    ]
  },
  {
    id: 'education',
    title: 'Обучение',
    icon: AcademicCapIcon,
    items: [
      'Курсы',
      'Гайды',
      'Материалы'
    ]
  },
  {
    id: 'support',
    title: 'Поддержка',
    icon: ChatBubbleLeftIcon,
    items: [
      'Чат с техподдержкой',
      'FAQ'
    ]
  },
  {
    id: 'settings',
    title: 'Настройки',
    icon: Cog6ToothIcon,
    items: [
      'Уведомления',
      'Конфиденциальность'
    ]
  },
  {
    id: 'eco-rating',
    title: 'Экорейтинг',
    icon: StarIcon,
    items: [
      'Баллы',
      'Бейджи',
      'CO₂ калькулятор'
    ]
  }
];

export default function GuideDashboard() {
  const [activeSection, setActiveSection] = React.useState('profile');

  return (
    <div className="flex h-screen bg-green-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-green-800 mb-8">Кабинет гида</h1>
          <nav>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-2 p-3 rounded-lg mb-2 ${
                  activeSection === item.id ? 'bg-green-100 text-green-800' : 'text-gray-600 hover:bg-green-50'
                }`}
              >
                <item.icon className="w-6 h-6" />
                <span>{item.title}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-green-800 mb-6">
            {menuItems.find(item => item.id === activeSection)?.title}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuItems
              .find(item => item.id === activeSection)
              ?.items.map((subItem, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100"
                >
                  <h3 className="text-xl font-semibold text-green-700 mb-2">
                    {subItem}
                  </h3>
                  <p className="text-green-600">
                    Нажмите для подробной информации
                  </p>
                </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
} 