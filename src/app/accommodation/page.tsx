'use client';

import React from 'react';
import { HomeIcon, LightBulbIcon, DocumentCheckIcon, CalendarIcon, ChartBarIcon, AcademicCapIcon, ChatBubbleLeftIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

const menuItems = [
  {
    id: 'info',
    title: 'Основная информация',
    icon: HomeIcon,
    items: [
      'Название и описание',
      'Фото и видео',
      'Локация',
      'Категория',
      'Экостатус'
    ]
  },
  {
    id: 'eco-measures',
    title: 'Экологические меры',
    icon: LightBulbIcon,
    items: [
      'Энергия',
      'Вода',
      'Отходы',
      'Питание',
      'Транспорт'
    ]
  },
  {
    id: 'certificates',
    title: 'Сертификаты',
    icon: DocumentCheckIcon,
    items: [
      'LEED',
      'Green Key',
      'Biosphere',
      'Загрузка документов'
    ]
  },
  {
    id: 'bookings',
    title: 'Управление бронированиями',
    icon: CalendarIcon,
    items: [
      'Календарь доступности',
      'Подтверждение заказов',
      'Отмена заказов',
      'Чат с гостями'
    ]
  },
  {
    id: 'analytics',
    title: 'Аналитика',
    icon: ChartBarIcon,
    items: [
      'Загрузка номеров',
      'Средний чек',
      'Сезонность',
      'Экорейтинг гостей'
    ]
  },
  {
    id: 'finance',
    title: 'Финансы',
    icon: ShoppingBagIcon,
    items: [
      'Выручка',
      'Комиссия платформы',
      'Экобонусы'
    ]
  },
  {
    id: 'education',
    title: 'Обучение',
    icon: AcademicCapIcon,
    items: [
      'Гайды',
      'Вебинары',
      'Материалы'
    ]
  },
  {
    id: 'support',
    title: 'Поддержка',
    icon: ChatBubbleLeftIcon,
    items: [
      'Чат с модераторами',
      'FAQ',
      'Помощь'
    ]
  }
];

export default function AccommodationDashboard() {
  const [activeSection, setActiveSection] = React.useState('info');

  return (
    <div className="flex h-screen bg-green-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-green-800 mb-8">Управление размещением</h1>
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