'use client';

import React from 'react';
import { CalendarIcon, MapPinIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/translations';

interface EcoEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  participants: number;
  maxParticipants: number;
  category: string;
  imageUrl?: string;
}

const ecoEvents: EcoEvent[] = [
  {
    id: '1',
    title: 'Акция "Посади дерево"',
    description: 'Массовая посадка деревьев в парках и скверах города. Каждое посаженное дерево компенсирует 0.2 т CO₂ в год. Присоединяйтесь к акциям в парках, заповедниках и городских зонах.',
    date: '25 июля 2024',
    time: '09:00 - 12:00',
    location: 'Парк Панфилова, Алматы',
    participants: 45,
    maxParticipants: 100,
    category: 'Посадка деревьев'
  },
  {
    id: '2',
    title: 'Уборка мусора на озере Балхаш',
    description: 'Экологическая акция по очистке берегов озера Балхаш от пластикового мусора и загрязнений. Поможем сохранить уникальную экосистему озера.',
    date: '28 июля 2024',
    time: '08:00 - 15:00',
    location: 'Озеро Балхаш, Алматинская область',
    participants: 32,
    maxParticipants: 50,
    category: 'Уборка территории'
  },
  {
    id: '3',
    title: 'Эко-марафон "Зеленый город"',
    description: 'Велосипедный марафон по экологическим маршрутам города с остановками для уборки мусора. Протяженность маршрута 25 км.',
    date: '5 августа 2024',
    time: '07:00 - 14:00',
    location: 'Центральный парк, Астана',
    participants: 78,
    maxParticipants: 150,
    category: 'Велосипедный тур'
  },
  {
    id: '4',
    title: 'Семинар "Экологический туризм"',
    description: 'Бесплатный семинар для туристов о принципах экологического туризма и минимизации углеродного следа. Практические советы от экспертов.',
    date: '10 августа 2024',
    time: '14:00 - 16:00',
    location: 'Эко-центр "Зеленая планета", Алматы',
    participants: 25,
    maxParticipants: 40,
    category: 'Образование'
  },
  {
    id: '5',
    title: 'Акция "Чистые горы"',
    description: 'Волонтерская акция по уборке туристических троп в горах Заилийского Алатау. Поможем сохранить красоту горных пейзажей.',
    date: '15 августа 2024',
    time: '06:00 - 18:00',
    location: 'Горы Заилийского Алатау, Алматинская область',
    participants: 18,
    maxParticipants: 30,
    category: 'Уборка территории'
  }
];

export default function EcoEventsPage() {
  const { language } = useLanguage();
  const t = translations[language];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Посадка деревьев':
        return 'bg-green-100 text-green-800';
      case 'Уборка территории':
        return 'bg-blue-100 text-blue-800';
      case 'Велосипедный тур':
        return 'bg-yellow-100 text-yellow-800';
      case 'Образование':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (participants: number, maxParticipants: number) => {
    const percentage = (participants / maxParticipants) * 100;
    if (percentage >= 80) return 'bg-red-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-800 mb-4">
          Эко-события
        </h1>
        <p className="text-gray-600 text-lg">
          Присоединяйтесь к экологическим акциям и внесите свой вклад в сохранение природы
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ecoEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 relative">
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                  {event.category}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-semibold">{event.title}</h3>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-4 line-clamp-3">
                {event.description}
              </p>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">{event.date}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <ClockIcon className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">{event.time}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <MapPinIcon className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">{event.location}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <UserGroupIcon className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">
                    {event.participants}/{event.maxParticipants} участников
                  </span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Заполненность</span>
                  <span>{Math.round((event.participants / event.maxParticipants) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getProgressColor(event.participants, event.maxParticipants)}`}
                    style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium">
                Присоединиться
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 