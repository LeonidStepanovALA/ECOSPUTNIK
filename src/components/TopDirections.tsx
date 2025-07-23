'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/translations';
import { 
  TrophyIcon, 
  ArrowUpIcon, 
  CurrencyDollarIcon, 
  StarIcon,
  MapPinIcon,
  UsersIcon,
  CalendarIcon,
  CloudIcon
} from '@heroicons/react/24/outline';

interface DirectionData {
  id: string;
  name: string;
  region: string;
  popularity: number;
  revenue: number;
  ecoRating: number;
  tourists: number;
  bookings: number;
  carbonFootprint: number;
  description: string;
  activities: string[];
  image: string;
  trend: 'up' | 'down' | 'stable';
  growthRate: number;
}

const TopDirections: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [sortBy, setSortBy] = useState<'popularity' | 'revenue' | 'eco'>('popularity');
  const [selectedDirection, setSelectedDirection] = useState<DirectionData | null>(null);

  // Данные ТОП-5 направлений
  const directionsData: DirectionData[] = [
    {
      id: 'almaty-mountains',
      name: 'Горы Заилийского Алатау',
      region: 'Алматы',
      popularity: 95,
      revenue: 85000000,
      ecoRating: 9.2,
      tourists: 45000,
      bookings: 3200,
      carbonFootprint: 850,
      description: 'Живописные горные маршруты с эко-отелями и велосипедными тропами',
      activities: ['Горный туризм', 'Велосипедные туры', 'Эко-отели', 'Пешие прогулки'],
      image: '/hiking.jpg',
      trend: 'up',
      growthRate: 15
    },
    {
      id: 'balkhash-lake',
      name: 'Озеро Балхаш',
      region: 'Алматинская область',
      popularity: 88,
      revenue: 72000000,
      ecoRating: 8.8,
      tourists: 38000,
      bookings: 2800,
      carbonFootprint: 720,
      description: 'Крупнейшее озеро Казахстана с экологическими турами и рыбалкой',
      activities: ['Рыбалка', 'Эко-туры', 'Пляжный отдых', 'Водные виды спорта'],
      image: '/lake.jpg',
      trend: 'up',
      growthRate: 12
    },
    {
      id: 'astana-city',
      name: 'Астана - Зеленый город',
      region: 'Астана',
      popularity: 82,
      revenue: 65000000,
      ecoRating: 8.5,
      tourists: 32000,
      bookings: 2400,
      carbonFootprint: 650,
      description: 'Современная столица с эко-парками и велосипедными маршрутами',
      activities: ['Городские туры', 'Эко-парки', 'Велосипедные маршруты', 'Эко-отели'],
      image: '/tesla.jpg',
      trend: 'up',
      growthRate: 18
    },
    {
      id: 'shymkent-history',
      name: 'Исторический Шымкент',
      region: 'Шымкент',
      popularity: 75,
      revenue: 55000000,
      ecoRating: 7.8,
      tourists: 28000,
      bookings: 2100,
      carbonFootprint: 520,
      description: 'Древний город с историческими памятниками и эко-фермами',
      activities: ['Исторические туры', 'Эко-фермы', 'Культурные мероприятия', 'Гастрономические туры'],
      image: '/cooking-class.jpg',
      trend: 'stable',
      growthRate: 5
    },
    {
      id: 'aktobe-nature',
      name: 'Природа Актобе',
      region: 'Актобе',
      popularity: 68,
      revenue: 45000000,
      ecoRating: 7.2,
      tourists: 22000,
      bookings: 1600,
      carbonFootprint: 420,
      description: 'Природные заповедники и степные ландшафты Западного Казахстана',
      activities: ['Природные туры', 'Охота', 'Степные экскурсии', 'Эко-кемпинги'],
      image: '/glamping.jpg',
      trend: 'down',
      growthRate: -3
    }
  ];

  const getSortedDirections = () => {
    return [...directionsData].sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.popularity - a.popularity;
        case 'revenue':
          return b.revenue - a.revenue;
        case 'eco':
          return b.ecoRating - a.ecoRating;
        default:
          return b.popularity - a.popularity;
      }
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'KZT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <ArrowUpIcon className="w-5 h-5 text-green-600" />;
      case 'down':
        return <ArrowUpIcon className="w-5 h-5 text-red-600 rotate-180" />;
      case 'stable':
        return <div className="w-5 h-5 text-gray-600">—</div>;
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      case 'stable':
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Контролы сортировки */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-wrap gap-4 items-center">
          <h3 className="text-lg font-semibold text-green-800">{t.sortBy}</h3>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSortBy('popularity')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                sortBy === 'popularity' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              <TrophyIcon className="w-4 h-4" />
              {t.popularityRanking}
            </button>
            
            <button
              onClick={() => setSortBy('revenue')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                sortBy === 'revenue' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              <CurrencyDollarIcon className="w-4 h-4" />
              {t.revenueRanking}
            </button>
            
            <button
              onClick={() => setSortBy('eco')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                sortBy === 'eco' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              <StarIcon className="w-4 h-4" />
              {t.ecoRatingRanking}
            </button>
          </div>
        </div>
      </div>

      {/* ТОП-5 направлений */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {getSortedDirections().map((direction, index) => (
          <div
            key={direction.id}
            onClick={() => setSelectedDirection(direction)}
            className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100 hover:border-green-300 transition-all duration-200 cursor-pointer"
          >
            {/* Заголовок с рейтингом */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800">{direction.name}</h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPinIcon className="w-4 h-4" />
                    {direction.region}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getTrendIcon(direction.trend)}
                <span className={`text-sm font-semibold ${getTrendColor(direction.trend)}`}>
                  {direction.growthRate > 0 ? '+' : ''}{direction.growthRate}%
                </span>
              </div>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <TrophyIcon className="w-5 h-5 text-green-600" />
                <div>
                  <div className="text-sm text-gray-600">{t.popularity}</div>
                  <div className="font-semibold text-green-800">{direction.popularity}%</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <CurrencyDollarIcon className="w-5 h-5 text-green-600" />
                <div>
                  <div className="text-sm text-gray-600">{t.revenue}</div>
                  <div className="font-semibold text-green-800">{formatCurrency(direction.revenue)}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <StarIcon className="w-5 h-5 text-green-600" />
                <div>
                  <div className="text-sm text-gray-600">{t.ecoRating}</div>
                  <div className="font-semibold text-green-800">{direction.ecoRating}/10</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <UsersIcon className="w-5 h-5 text-green-600" />
                <div>
                  <div className="text-sm text-gray-600">{t.tourists}</div>
                  <div className="font-semibold text-green-800">{formatNumber(direction.tourists)}</div>
                </div>
              </div>
            </div>

            {/* Активности */}
            <div className="flex flex-wrap gap-2">
              {direction.activities.slice(0, 3).map((activity, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded"
                >
                  {activity}
                </span>
              ))}
              {direction.activities.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                  +{direction.activities.length - 3}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно с деталями */}
      {selectedDirection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-green-800">{selectedDirection.name}</h3>
                <p className="text-gray-600 flex items-center gap-1">
                  <MapPinIcon className="w-4 h-4" />
                  {selectedDirection.region}
                </p>
              </div>
              <button
                onClick={() => setSelectedDirection(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Детальная статистика */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrophyIcon className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-semibold">{t.popularity}</span>
                </div>
                <div className="text-2xl font-bold text-green-800">{selectedDirection.popularity}%</div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CurrencyDollarIcon className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-semibold">{t.revenue}</span>
                </div>
                <div className="text-2xl font-bold text-green-800">{formatCurrency(selectedDirection.revenue)}</div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <StarIcon className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-semibold">{t.ecoRating}</span>
                </div>
                <div className="text-2xl font-bold text-green-800">{selectedDirection.ecoRating}/10</div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <UsersIcon className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-semibold">{t.tourists}</span>
                </div>
                <div className="text-2xl font-bold text-green-800">{formatNumber(selectedDirection.tourists)}</div>
              </div>
            </div>

            {/* Описание */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-green-800 mb-2">{t.description}</h4>
              <p className="text-gray-700">{selectedDirection.description}</p>
            </div>

            {/* Дополнительная статистика */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-green-600" />
                <div>
                  <div className="text-sm text-gray-600">{t.bookings}</div>
                  <div className="font-semibold text-green-800">{formatNumber(selectedDirection.bookings)}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <CloudIcon className="w-5 h-5 text-green-600" />
                <div>
                  <div className="text-sm text-gray-600">{t.carbonFootprint}</div>
                  <div className="font-semibold text-green-800">{selectedDirection.carbonFootprint} т CO₂</div>
                </div>
              </div>
            </div>

            {/* Все активности */}
            <div>
              <h4 className="text-lg font-semibold text-green-800 mb-2">{t.activities}</h4>
              <div className="flex flex-wrap gap-2">
                {selectedDirection.activities.map((activity, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-2 bg-green-100 text-green-700 text-sm rounded-lg"
                  >
                    {activity}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedDirection(null)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopDirections; 