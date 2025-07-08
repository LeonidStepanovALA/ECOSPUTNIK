import React from 'react';
import { CloudIcon, SparklesIcon, ArrowTrendingDownIcon, CalendarIcon, CalculatorIcon } from '@heroicons/react/24/outline';

const mockCarbonData = {
  summary: {
    totalFootprint: 2.1,
    savedFootprint: 1.8,
    reductionPercentage: 46,
    treesEquivalent: 9,
    monthlyAverage: 0.3
  },
  breakdown: {
    transport: {
      total: 0.8,
      saved: 0.6,
      percentage: 25
    },
    accommodation: {
      total: 0.5,
      saved: 0.4,
      percentage: 20
    },
    activities: {
      total: 0.4,
      saved: 0.3,
      percentage: 15
    },
    food: {
      total: 0.3,
      saved: 0.2,
      percentage: 10
    },
    waste: {
      total: 0.1,
      saved: 0.1,
      percentage: 5
    }
  },
  timeline: [
    { month: 'Январь', footprint: 0.4, saved: 0.3 },
    { month: 'Февраль', footprint: 0.3, saved: 0.2 },
    { month: 'Март', footprint: 0.5, saved: 0.4 },
    { month: 'Апрель', footprint: 0.2, saved: 0.1 },
    { month: 'Май', footprint: 0.4, saved: 0.3 },
    { month: 'Июнь', footprint: 0.3, saved: 0.2 }
  ],
  achievements: [
    { title: 'Эко-транспорт', description: 'Использовал велосипед и электромобили', impact: 'Сократил выбросы на 25%' },
    { title: 'Эко-отели', description: 'Выбирал отели с эко-сертификатами', impact: 'Сократил выбросы на 20%' },
    { title: 'Эко-туры', description: 'Участвовал в экологических турах', impact: 'Сократил выбросы на 15%' },
    { title: 'Эко-питание', description: 'Выбирал местные органические продукты', impact: 'Сократил выбросы на 10%' },
    { title: 'Переработка', description: 'Сортировал отходы во время путешествий', impact: 'Сократил выбросы на 5%' }
  ]
};

export default function CarbonReportPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-8">
          Отчет о сокращенном углеродном следе
        </h1>

        {/* Основная статистика */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-green-800">Общий след</h3>
              <CloudIcon className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-green-600">{mockCarbonData.summary.totalFootprint} т CO₂</p>
            <p className="text-sm text-gray-600 mt-2">За весь период</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-green-800">Сэкономлено</h3>
              <ArrowTrendingDownIcon className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-green-600">{mockCarbonData.summary.savedFootprint} т CO₂</p>
            <p className="text-sm text-gray-600 mt-2">Благодаря эко-действиям</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-green-800">Сокращение</h3>
              <CalculatorIcon className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-green-600">{mockCarbonData.summary.reductionPercentage}%</p>
            <p className="text-sm text-gray-600 mt-2">По сравнению с обычными туристами</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-green-800">Деревья</h3>
              <SparklesIcon className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-green-600">{mockCarbonData.summary.treesEquivalent}</p>
            <p className="text-sm text-gray-600 mt-2">Эквивалент посаженных деревьев</p>
          </div>
        </div>

        {/* Детальная разбивка */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-green-800 mb-6">Детальная разбивка по категориям</h2>
          
          <div className="space-y-4">
            {Object.entries(mockCarbonData.breakdown).map(([category, data]) => (
              <div key={category} className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-green-800 capitalize">
                    {category === 'transport' ? 'Транспорт' : 
                     category === 'accommodation' ? 'Размещение' :
                     category === 'activities' ? 'Активности' :
                     category === 'food' ? 'Питание' : 'Отходы'}
                  </h3>
                  <span className="text-sm text-gray-600">
                    Сокращение на {data.percentage}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${(data.saved / data.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-sm text-gray-600">Было: {data.total} т</p>
                    <p className="text-sm text-green-600">Стало: {data.total - data.saved} т</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Достижения */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-green-800 mb-6">Ваши эко-достижения</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockCarbonData.achievements.map((achievement, index) => (
              <div key={index} className="p-4 border-2 border-green-100 rounded-lg hover:border-green-300 transition-colors">
                <h3 className="font-semibold text-green-800 mb-2">{achievement.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                <p className="text-sm text-green-600 font-medium">{achievement.impact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Временная шкала */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-green-800 mb-6">Динамика по месяцам</h2>
          
          <div className="space-y-4">
            {mockCarbonData.timeline.map((month, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <CalendarIcon className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">{month.month}</span>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Общий след</p>
                    <p className="font-semibold text-gray-800">{month.footprint} т</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Сэкономлено</p>
                    <p className="font-semibold text-green-600">{month.saved} т</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Рекомендации */}
        <div className="bg-green-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Рекомендации для дальнейшего сокращения</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">🚲 Больше велосипедных туров</h3>
              <p className="text-sm text-gray-600">Может сократить транспортные выбросы еще на 15%</p>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">🏨 Выбирайте эко-отели</h3>
              <p className="text-sm text-gray-600">Отели с сертификатами сокращают выбросы на 20%</p>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">🌱 Участвуйте в посадке деревьев</h3>
              <p className="text-sm text-gray-600">Каждое дерево компенсирует 0.2 т CO₂ в год</p>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">♻️ Сортируйте отходы</h3>
              <p className="text-sm text-gray-600">Переработка сокращает выбросы на 5-10%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 