'use client';

import React, { useState } from 'react';
import { TagIcon, NewspaperIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface NewsItem {
  id: string;
  type: 'news' | 'promotion';
  title: string;
  description: string;
  date: string;
  region: string;
  discount?: string;
  validUntil?: string;
}

const newsItems: NewsItem[] = [
  // Новости
  {
    id: 'news_1',
    type: 'news',
    title: 'Открытие нового эко-отеля в Алматы',
    description: 'В центре Алматы открылся новый эко-отель "Зеленая долина" с нулевым углеродным следом. Отель оснащен солнечными панелями и системой переработки отходов.',
    date: '20 июля 2024',
    region: 'Алматы'
  },
  {
    id: 'news_2',
    type: 'news',
    title: 'Новые велосипедные маршруты в Астане',
    description: 'В Астане открылись новые велосипедные маршруты для туристов. Общая протяженность маршрутов составляет 50 км.',
    date: '22 июля 2024',
    region: 'Астана'
  },
  {
    id: 'news_3',
    type: 'news',
    title: 'Запуск программы "Эко-гид"',
    description: 'Запущена новая программа сертификации экологических гидов. Первые 50 гидов уже получили сертификаты.',
    date: '24 июля 2024',
    region: 'Казахстан'
  },
  {
    id: 'news_4',
    type: 'news',
    title: 'Рекорд по посадке деревьев',
    description: 'В рамках акции "Зеленый Казахстан" посажено более 100,000 деревьев. Цель - посадить 1 миллион деревьев к концу года.',
    date: '26 июля 2024',
    region: 'Казахстан'
  },
  {
    id: 'news_5',
    type: 'news',
    title: 'Новый эко-маршрут в горах',
    description: 'Открыт новый экологический маршрут в горах Заилийского Алатау. Маршрут проходит через заповедные зоны.',
    date: '28 июля 2024',
    region: 'Алматинская область'
  },
  // Акции
  {
    id: 'promotion_1',
    type: 'promotion',
    title: 'Скидка 20% на все эко-туры',
    description: 'Специальное предложение на все экологические туры до конца месяца. Включены велосипедные туры, пешие прогулки и эко-экскурсии.',
    date: '21 июля 2024',
    region: 'Казахстан',
    discount: '20%',
    validUntil: '31 июля 2024'
  },
  {
    id: 'promotion_2',
    type: 'promotion',
    title: 'Бесплатные эко-экскурсии в выходные',
    description: 'В выходные дни бесплатные экскурсии по эко-маршрутам для всех желающих. Требуется предварительная регистрация.',
    date: '23 июля 2024',
    region: 'Алматы',
    discount: '100%',
    validUntil: '31 августа 2024'
  },
  {
    id: 'promotion_3',
    type: 'promotion',
    title: 'Скидка 30% на эко-отели',
    description: 'Специальные цены на проживание в эко-отелях по всей стране. Включен завтрак из органических продуктов.',
    date: '25 июля 2024',
    region: 'Казахстан',
    discount: '30%',
    validUntil: '30 сентября 2024'
  },
  {
    id: 'promotion_4',
    type: 'promotion',
    title: 'Бонусные эко-баллы за велосипедные туры',
    description: 'Двойные эко-баллы за участие в велосипедных турах. Накопленные баллы можно обменять на скидки.',
    date: '27 июля 2024',
    region: 'Казахстан',
    discount: '2x баллы',
    validUntil: '31 августа 2024'
  },
  {
    id: 'promotion_5',
    type: 'promotion',
    title: 'Скидка 15% на эко-оборудование',
    description: 'Скидки на эко-оборудование для туристов: велосипеды, палатки, рюкзаки из переработанных материалов.',
    date: '29 июля 2024',
    region: 'Казахстан',
    discount: '15%',
    validUntil: '15 августа 2024'
  }
];

export default function NewsPage() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'news' | 'promotion'>('all');

  const filteredItems = selectedFilter === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.type === selectedFilter);

  const getTypeIcon = (type: string) => {
    return type === 'promotion' ? (
      <TagIcon className="w-6 h-6 text-green-600" />
    ) : (
      <NewspaperIcon className="w-6 h-6 text-blue-600" />
    );
  };

  const getTypeColor = (type: string) => {
    return type === 'promotion' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-blue-100 text-blue-800 border-blue-200';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-800 mb-4">
        Акции и новости
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Будьте в курсе последних новостей и специальных предложений в мире экологического туризма
        </p>
        
        {/* Фильтры */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedFilter === 'all'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Все ({newsItems.length})
          </button>
          <button
            onClick={() => setSelectedFilter('news')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedFilter === 'news'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Новости ({newsItems.filter(item => item.type === 'news').length})
          </button>
          <button
            onClick={() => setSelectedFilter('promotion')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedFilter === 'promotion'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Акции ({newsItems.filter(item => item.type === 'promotion').length})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(item.type)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(item.type)}`}>
                    {item.type === 'promotion' ? 'Акция' : 'Новость'}
                  </span>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500 mt-1">
                    <MapPinIcon className="w-4 h-4" />
                    <span>{item.region}</span>
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {item.title}
              </h3>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {item.description}
              </p>
              
              {item.type === 'promotion' && item.discount && (
                <div className="mb-4 p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-green-800 font-medium">Скидка:</span>
                    <span className="text-green-600 font-bold text-lg">{item.discount}</span>
                  </div>
                  {item.validUntil && (
                    <div className="text-sm text-green-600 mt-1">
                      Действует до: {item.validUntil}
                    </div>
                  )}
                </div>
              )}
              
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium">
                {item.type === 'promotion' ? 'Воспользоваться' : 'Подробнее'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 