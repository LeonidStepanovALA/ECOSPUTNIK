'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/translations';
import { MapPinIcon, UsersIcon, CalendarIcon, CurrencyDollarIcon, CloudIcon } from '@heroicons/react/24/outline';

interface RegionData {
  id: string;
  name: string;
  coordinates: [number, number];
  tourists: number;
  bookings: number;
  revenue: number;
  carbonFootprint: number;
  ecoRating: number;
  activities: string[];
  color: string;
}

const InteractiveMap: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);
  const [mapView, setMapView] = useState<'tourists' | 'revenue' | 'carbon' | 'eco'>('tourists');
  const [isLoading, setIsLoading] = useState(true);

  // Данные регионов Казахстана
  const regionsData: RegionData[] = [
    {
      id: 'almaty',
      name: 'Алматы',
      coordinates: [43.2220, 76.8512],
      tourists: 125000,
      bookings: 8900,
      revenue: 45000000,
      carbonFootprint: 1250,
      ecoRating: 8.5,
      activities: ['Горный туризм', 'Эко-туры', 'Велосипедные маршруты'],
      color: '#10B981'
    },
    {
      id: 'astana',
      name: 'Астана',
      coordinates: [51.1694, 71.4491],
      tourists: 98000,
      bookings: 7200,
      revenue: 38000000,
      carbonFootprint: 980,
      ecoRating: 7.8,
      activities: ['Городские туры', 'Парки', 'Эко-отели'],
      color: '#059669'
    },
    {
      id: 'shymkent',
      name: 'Шымкент',
      coordinates: [42.3000, 69.6000],
      tourists: 45000,
      bookings: 3200,
      revenue: 18000000,
      carbonFootprint: 650,
      ecoRating: 6.9,
      activities: ['Исторические туры', 'Эко-фермы'],
      color: '#047857'
    },
    {
      id: 'aktobe',
      name: 'Актобе',
      coordinates: [50.2833, 57.1667],
      tourists: 28000,
      bookings: 2100,
      revenue: 12000000,
      carbonFootprint: 420,
      ecoRating: 6.2,
      activities: ['Природные туры', 'Охота'],
      color: '#065F46'
    },
    {
      id: 'karaganda',
      name: 'Караганда',
      coordinates: [49.8000, 73.1000],
      tourists: 35000,
      bookings: 2800,
      revenue: 15000000,
      carbonFootprint: 580,
      ecoRating: 7.1,
      activities: ['Горнодобывающие туры', 'Эко-парки'],
      color: '#064E3B'
    },
    {
      id: 'taraz',
      name: 'Тараз',
      coordinates: [42.9000, 71.3667],
      tourists: 22000,
      bookings: 1600,
      revenue: 9000000,
      carbonFootprint: 320,
      ecoRating: 5.8,
      activities: ['Исторические места', 'Эко-туризм'],
      color: '#134E4A'
    },
    {
      id: 'pavlodar',
      name: 'Павлодар',
      coordinates: [52.3000, 76.9500],
      tourists: 18000,
      bookings: 1300,
      revenue: 7000000,
      carbonFootprint: 280,
      ecoRating: 6.5,
      activities: ['Озерные туры', 'Рыбалка'],
      color: '#16463D'
    },
    {
      id: 'semey',
      name: 'Семей',
      coordinates: [50.4000, 80.2500],
      tourists: 15000,
      bookings: 1100,
      revenue: 6000000,
      carbonFootprint: 240,
      ecoRating: 5.9,
      activities: ['Речные туры', 'Эко-заповедники'],
      color: '#14532D'
    },
    {
      id: 'uralsk',
      name: 'Уральск',
      coordinates: [51.2333, 51.3667],
      tourists: 12000,
      bookings: 900,
      revenue: 5000000,
      carbonFootprint: 200,
      ecoRating: 6.8,
      activities: ['Речные круизы', 'Охота'],
      color: '#166534'
    },
    {
      id: 'kostanay',
      name: 'Костанай',
      coordinates: [53.2167, 63.6333],
      tourists: 16000,
      bookings: 1200,
      revenue: 6500000,
      carbonFootprint: 260,
      ecoRating: 6.1,
      activities: ['Степные туры', 'Эко-фермы'],
      color: '#15803D'
    }
  ];

  useEffect(() => {
    // Имитация загрузки данных
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getMapColor = (region: RegionData) => {
    const maxValue = Math.max(...regionsData.map(r => {
      switch (mapView) {
        case 'tourists': return r.tourists;
        case 'revenue': return r.revenue;
        case 'carbon': return r.carbonFootprint;
        case 'eco': return r.ecoRating;
        default: return r.tourists;
      }
    }));

    const value = {
      tourists: region.tourists,
      revenue: region.revenue,
      carbon: region.carbonFootprint,
      eco: region.ecoRating
    }[mapView];

    const intensity = value / maxValue;
    return `rgba(16, 185, 129, ${0.3 + intensity * 0.7})`;
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Контролы карты */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-wrap gap-4 items-center">
          <h3 className="text-lg font-semibold text-green-800">{t.mapView}</h3>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setMapView('tourists')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                mapView === 'tourists' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              <UsersIcon className="w-4 h-4" />
              {t.tourists}
            </button>
            
            <button
              onClick={() => setMapView('revenue')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                mapView === 'revenue' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              <CurrencyDollarIcon className="w-4 h-4" />
              {t.revenue}
            </button>
            
            <button
              onClick={() => setMapView('carbon')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                mapView === 'carbon' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              <CloudIcon className="w-4 h-4" />
              {t.carbonFootprint}
            </button>
            
            <button
              onClick={() => setMapView('eco')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                mapView === 'eco' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              <MapPinIcon className="w-4 h-4" />
              {t.ecoRating}
            </button>
          </div>
        </div>
      </div>

      {/* Интерактивная карта */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="relative h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2 border-green-200 overflow-hidden">
          {/* Карта Казахстана (упрощенная) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              {regionsData.map((region) => (
                <div
                  key={region.id}
                  onClick={() => setSelectedRegion(region)}
                  className="absolute cursor-pointer transition-all duration-200 hover:scale-110"
                  style={{
                    left: `${((region.coordinates[1] + 87) / 20) * 100}%`,
                    top: `${((55 - region.coordinates[0]) / 20) * 100}%`,
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-xs"
                    style={{
                      backgroundColor: getMapColor(region),
                      transform: selectedRegion?.id === region.id ? 'scale(1.5)' : 'scale(1)'
                    }}
                  >
                    {region.name.charAt(0)}
                  </div>
                  
                  {/* Тултип с данными */}
                  {selectedRegion?.id === region.id && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white p-3 rounded-lg shadow-lg border border-green-200 min-w-48 z-10">
                      <div className="text-center mb-2">
                        <h4 className="font-semibold text-green-800">{region.name}</h4>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">{t.tourists}:</span>
                          <span className="font-semibold">{formatNumber(region.tourists)}</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-gray-600">{t.bookings}:</span>
                          <span className="font-semibold">{formatNumber(region.bookings)}</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-gray-600">{t.revenue}:</span>
                          <span className="font-semibold">{formatCurrency(region.revenue)}</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-gray-600">{t.carbonFootprint}:</span>
                          <span className="font-semibold">{region.carbonFootprint} т CO₂</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-gray-600">{t.ecoRating}:</span>
                          <span className="font-semibold">{region.ecoRating}/10</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-2 border-t border-gray-200">
                        <div className="text-xs text-gray-600 mb-1">{t.activities}:</div>
                        <div className="flex flex-wrap gap-1">
                          {region.activities.map((activity, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded"
                            >
                              {activity}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Легенда */}
          <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-md">
            <div className="text-sm font-semibold text-green-800 mb-2">{t.legend}</div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-300 rounded"></div>
                <span>{t.low}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>{t.medium}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-700 rounded"></div>
                <span>{t.high}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center gap-3">
            <UsersIcon className="w-8 h-8 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-green-800">
                {formatNumber(regionsData.reduce((sum, r) => sum + r.tourists, 0))}
              </div>
              <div className="text-sm text-gray-600">{t.totalTourists}</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center gap-3">
            <CalendarIcon className="w-8 h-8 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-green-800">
                {formatNumber(regionsData.reduce((sum, r) => sum + r.bookings, 0))}
              </div>
              <div className="text-sm text-gray-600">{t.totalBookings}</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center gap-3">
            <CurrencyDollarIcon className="w-8 h-8 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-green-800">
                {formatCurrency(regionsData.reduce((sum, r) => sum + r.revenue, 0))}
              </div>
              <div className="text-sm text-gray-600">{t.totalRevenue}</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center gap-3">
            <CloudIcon className="w-8 h-8 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-green-800">
                {regionsData.reduce((sum, r) => sum + r.carbonFootprint, 0)} т
              </div>
              <div className="text-sm text-gray-600">{t.totalCarbonFootprint}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap; 