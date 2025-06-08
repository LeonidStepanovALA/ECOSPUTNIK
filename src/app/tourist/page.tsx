'use client';

import React from 'react';
import { MapIcon, HomeIcon, AdjustmentsHorizontalIcon, CalendarIcon, UserIcon, BookOpenIcon, ChatBubbleLeftIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

const menuItems = [
  {
    id: 'main',
    title: 'Лента/Главная',
    icon: HomeIcon,
    items: [
      'Персонализированные рекомендации',
      'Акции и новости',
      'Поиск',
      'Экстренная связь'
    ]
  },
  {
    id: 'filters',
    title: 'Фильтры',
    icon: AdjustmentsHorizontalIcon,
    items: [
      'Тип размещения',
      'Уровень устойчивости',
      'Гиды'
    ]
  },
  {
    id: 'map',
    title: 'Карта',
    icon: MapIcon,
    items: [
      '"Зеленые" маршруты',
      'Отметки экоотелей',
      'Станции зарядки'
    ]
  },
  {
    id: 'bookings',
    title: 'Бронирования',
    icon: CalendarIcon,
    items: [
      'Текущие поездки',
      'Прошлые поездки',
      'Чеклисты экологичности'
    ]
  },
  {
    id: 'profile',
    title: 'Профиль',
    icon: UserIcon,
    items: [
      'Личные данные',
      'Экостатистика',
      'Награды и бейджи'
    ]
  },
  {
    id: 'education',
    title: 'Образование',
    icon: BookOpenIcon,
    items: [
      'Статьи',
      'Советы',
      'FAQ'
    ]
  },
  {
    id: 'support',
    title: 'Поддержка',
    icon: ChatBubbleLeftIcon,
    items: [
      'Чат с командой',
      'FAQ'
    ]
  },
  {
    id: 'settings',
    title: 'Настройки',
    icon: Cog6ToothIcon,
    items: [
      'Язык',
      'Уведомления',
      'Экорежим'
    ]
  }
];

export default function TouristDashboard() {
  const [activeSection, setActiveSection] = React.useState('main');

  return (
    <div className="flex h-screen bg-green-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-green-800 mb-8">Личный кабинет туриста</h1>
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