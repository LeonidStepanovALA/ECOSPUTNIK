'use client';

import React from 'react';
import { ChartBarIcon, MapIcon, RocketLaunchIcon, CloudIcon, UserGroupIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

const menuItems = [
  {
    id: 'dashboard',
    title: 'Дашборд',
    icon: ChartBarIcon,
    items: [
      'Общее количество туристов',
      'Количество бронирований',
      'Средний углеродный след',
      'Процент компенсации CO₂'
    ]
  },
  {
    id: 'regions',
    title: 'Отчеты по регионам',
    icon: MapIcon,
    items: [
      'Карта активности',
      'ТОП-5 направлений',
      'ТОП-5 "зеленых" регионов',
      'Детализация по странам'
    ]
  },
  {
    id: 'directions',
    title: 'Анализ направлений',
    icon: RocketLaunchIcon,
    items: [
      'Сравнение категорий',
      'Популярность экомаршрутов',
      'Тренды',
      'Сезонность'
    ]
  },
  {
    id: 'carbon',
    title: 'Углеродный след',
    icon: CloudIcon,
    items: [
      'Общая статистика CO₂',
      'Компенсация выбросов',
      'Эквивалент в деревьях',
      'Эффективность мер'
    ]
  },
  {
    id: 'users',
    title: 'Пользовательская аналитика',
    icon: UserGroupIcon,
    items: [
      'Портрет туриста',
      'Вовлеченность',
      'Retention',
      'Лояльность'
    ]
  },
  {
    id: 'export',
    title: 'Экспорт отчетов',
    icon: ArrowDownTrayIcon,
    items: [
      'PDF отчеты',
      'Excel экспорт',
      'CSV выгрузка',
      'Автоматическая отправка'
    ]
  }
];

export default function AnalystDashboard() {
  const [activeSection, setActiveSection] = React.useState('dashboard');

  return (
    <div className="flex h-screen bg-green-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-green-800 mb-8">Панель аналитика</h1>
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