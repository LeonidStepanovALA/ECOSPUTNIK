import React from 'react';
import { CloudIcon, StarIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/translations';

interface TouristStatsProps {
  className?: string;
}

const mockTouristData = {
  carbonFootprint: {
    total: 2.1,
    saved: 1.8,
    reduction: 46,
    equivalent: 9,
    monthly: 0.3,
    trend: 'down'
  },
  ecoRating: {
    current: 4.7,
    level: 'Gold',
    points: 1250,
    badges: 8,
    achievements: [
      'Эко-путешественник',
      'Защитник природы',
      'Эксперт по переработке',
      'Мастер экономии энергии'
    ]
  },
  stats: {
    toursCompleted: 12,
    ecoTours: 8,
    carbonSaved: 1.8,
    treesPlanted: 9,
    ecoActions: 25
  }
};

export default function TouristStats({ className = '' }: TouristStatsProps) {
  const { language } = useLanguage();
  const t = translations[language];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <span className="text-red-500 text-lg">↗</span>;
      case 'down':
        return <span className="text-green-500 text-lg">↘</span>;
      default:
        return <ChartBarIcon className="w-5 h-5 text-blue-500" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Bronze':
        return 'text-amber-600 bg-amber-100';
      case 'Silver':
        return 'text-gray-600 bg-gray-100';
      case 'Gold':
        return 'text-yellow-600 bg-yellow-100';
      case 'Platinum':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-green-600 bg-green-100';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Основная статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md border-2 border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{t.carbonFootprint}</p>
              <p className="text-2xl font-bold text-green-600">{mockTouristData.carbonFootprint.total} т</p>
            </div>
            <CloudIcon className="w-8 h-8 text-green-500" />
          </div>
          <div className="mt-2 flex items-center space-x-2">
            {getTrendIcon(mockTouristData.carbonFootprint.trend)}
            <span className="text-sm text-green-600">
              {t.reducedBy} {mockTouristData.carbonFootprint.reduction}%
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border-2 border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{t.ecoRating}</p>
              <p className="text-2xl font-bold text-green-600">⭐ {mockTouristData.ecoRating.current}</p>
            </div>
            <StarIcon className="w-8 h-8 text-yellow-500" />
          </div>
          <div className="mt-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(mockTouristData.ecoRating.level)}`}>
              {mockTouristData.ecoRating.level}
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border-2 border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{t.ecoPoints}</p>
              <p className="text-2xl font-bold text-green-600">{mockTouristData.ecoRating.points}</p>
            </div>
            <StarIcon className="w-8 h-8 text-green-500" />
          </div>
          <div className="mt-2">
            <span className="text-sm text-green-600">
              {mockTouristData.ecoRating.badges} {t.badges}
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border-2 border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{t.ecoTours}</p>
              <p className="text-2xl font-bold text-green-600">{mockTouristData.stats.ecoTours}</p>
            </div>
            <ChartBarIcon className="w-8 h-8 text-blue-500" />
          </div>
          <div className="mt-2">
            <span className="text-sm text-green-600">
              {t.fromTours} {mockTouristData.stats.toursCompleted} {t.tourist}
            </span>
          </div>
        </div>
      </div>

      {/* Детальная статистика углеродного следа */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
          <CloudIcon className="w-5 h-5 mr-2" />
          {t.carbonReportTitle}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {mockTouristData.carbonFootprint.saved} т
            </div>
            <p className="text-sm text-gray-600">{t.savedCO2}</p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {mockTouristData.carbonFootprint.equivalent}
            </div>
            <p className="text-sm text-gray-600">{t.treeEquivalent}</p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {mockTouristData.carbonFootprint.monthly} т
            </div>
            <p className="text-sm text-gray-600">{t.perMonth}</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">{t.yourEcoActions}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-700">{t.ecoTransport}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-700">{t.ecoHotels}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-700">{t.ecoToursParticipation}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-700">{t.wasteSorting}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Достижения и бейджи */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
          <StarIcon className="w-5 h-5 mr-2" />
          {t.achievements}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-green-800 mb-3">{t.yourAchievements}</h4>
            <div className="space-y-2">
              {mockTouristData.ecoRating.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg">
                  <StarIcon className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-green-700">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-green-800 mb-3">{t.statistics}</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">{t.ecoActionsCompleted}</span>
                <span className="font-semibold text-green-600">{mockTouristData.stats.ecoActions}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">{t.badgesReceived}</span>
                <span className="font-semibold text-green-600">{mockTouristData.ecoRating.badges}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">{t.treesPlanted}</span>
                <span className="font-semibold text-green-600">{mockTouristData.stats.treesPlanted}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Рекомендации */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-4">{t.recommendations}</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
            <span className="text-blue-500 mt-0.5 text-lg">↗</span>
            <div>
              <p className="font-medium text-blue-800">{t.tryBikeTours}</p>
              <p className="text-sm text-blue-600">{t.bikeToursDesc}</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
            <StarIcon className="w-5 h-5 text-green-500 mt-0.5" />
            <div>
              <p className="font-medium text-green-800">{t.ecoVolunteering}</p>
              <p className="text-sm text-green-600">{t.ecoVolunteeringDesc}</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
            <StarIcon className="w-5 h-5 text-yellow-500 mt-0.5" />
            <div>
              <p className="font-medium text-yellow-800">{t.reachPlatinum}</p>
              <p className="text-sm text-yellow-600">{t.reachPlatinumDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 