import React from 'react';
import { StarIcon, MapPinIcon, UserGroupIcon } from '@heroicons/react/24/outline';

interface Recommendation {
  id: number;
  title: string;
  description: string;
  type: 'location' | 'activity' | 'guide';
  rating: number;
  ecoRating: number;
  price: string;
}

const mockRecommendations: Recommendation[] = [
  {
    id: 1,
    title: 'Эко-отель "Зеленая долина"',
    description: 'Уютный отель с солнечными панелями и органическим садом. Идеально подходит для спокойного отдыха на природе.',
    type: 'location',
    rating: 4.8,
    ecoRating: 5,
    price: 'от 5000₽/ночь'
  },
  {
    id: 2,
    title: 'Пеший тур по заповеднику',
    description: 'Познавательная экскурсия по уникальным природным местам с опытным гидом-экологом.',
    type: 'activity',
    rating: 4.9,
    ecoRating: 5,
    price: '3000₽/человек'
  },
  {
    id: 3,
    title: 'Гид Анна Петрова',
    description: 'Профессиональный эко-гид с 5-летним опытом проведения природных туров.',
    type: 'guide',
    rating: 4.7,
    ecoRating: 4.8,
    price: 'от 2500₽/час'
  },
  {
    id: 4,
    title: 'Акция "Посади дерево"',
    description: 'Участвуйте в экологической акции по высадке деревьев в городских парках и заповедниках. Каждое посаженное дерево компенсирует 0.2 т CO₂ в год. Присоединяйтесь к акциям в парках, заповедниках и городских зонах.',
    type: 'activity',
    rating: 4.6,
    ecoRating: 5,
    price: 'Бесплатно'
  }
];

const TypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'location':
      return <MapPinIcon className="w-6 h-6 text-green-600" />;
    case 'activity':
      return <StarIcon className="w-6 h-6 text-green-600" />;
    case 'guide':
      return <UserGroupIcon className="w-6 h-6 text-green-600" />;
    default:
      return null;
  }
};

const PlaceholderImage = ({ type }: { type: string }) => {
  const getImageContent = () => {
    switch (type) {
      case 'location':
        return (
          <svg width="100%" height="100%" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#f0f9ff"/>
            <rect x="50" y="150" width="300" height="120" fill="#10b981" stroke="#059669" strokeWidth="2"/>
            <rect x="70" y="130" width="60" height="80" fill="#10b981" stroke="#059669" strokeWidth="2"/>
            <rect x="150" y="110" width="80" height="100" fill="#10b981" stroke="#059669" strokeWidth="2"/>
            <rect x="250" y="130" width="60" height="80" fill="#10b981" stroke="#059669" strokeWidth="2"/>
            <circle cx="200" cy="80" r="20" fill="#fbbf24"/>
          </svg>
        );
      case 'activity':
        return (
          <svg width="100%" height="100%" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#f0fdf4"/>
            <path d="M50 250 Q100 200 150 180 Q200 160 250 170 Q300 180 350 200 L350 250 Z" fill="#22c55e"/>
            <path d="M50 250 Q100 200 150 180 Q200 160 250 170 Q300 180 350 200 L350 250 Z" fill="none" stroke="#16a34a" strokeWidth="3"/>
            <circle cx="100" cy="200" r="8" fill="#059669"/>
            <circle cx="200" cy="180" r="8" fill="#059669"/>
            <circle cx="300" cy="190" r="8" fill="#059669"/>
            <circle cx="200" cy="100" r="15" fill="#fbbf24"/>
          </svg>
        );
      case 'guide':
        return (
          <svg width="100%" height="100%" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#f0f9ff"/>
            <circle cx="200" cy="120" r="40" fill="#10b981"/>
            <rect x="160" y="160" width="80" height="100" fill="#10b981"/>
            <circle cx="200" cy="100" r="25" fill="#ffffff"/>
            <circle cx="190" cy="110" r="3" fill="#10b981"/>
            <circle cx="210" cy="110" r="3" fill="#10b981"/>
            <path d="M185 130 Q200 140 215 130" stroke="#10b981" strokeWidth="2" fill="none"/>
          </svg>
        );
      default:
        return (
          <svg width="100%" height="100%" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#f3f4f6"/>
            <text x="200" y="150" textAnchor="middle" fontFamily="Arial" fontSize="16" fill="#6b7280">Изображение</text>
          </svg>
        );
    }
  };

  return (
    <div className="w-full h-full">
      {getImageContent()}
    </div>
  );
};

export default function PersonalizedRecommendations() {
  return (
    <div className="space-y-6">
      <div className="bg-green-50 p-4 md:p-6 rounded-lg">
        <h3 className="text-lg md:text-xl font-semibold text-green-800 mb-3 md:mb-4">
          Ваши интересы
        </h3>
        <div className="flex flex-wrap gap-2 md:gap-3">
          {['Экотуризм', 'Пешие прогулки', 'Фотография', 'Наблюдение за птицами', 'Высадка деревьев'].map((interest) => (
            <span
              key={interest}
              className="px-3 py-1 md:px-4 md:py-2 bg-green-100 text-green-700 rounded-full text-sm md:text-base"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {mockRecommendations.map((rec) => (
          <div
            key={rec.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="h-48 md:h-56 bg-gray-200 relative">
              <div className="absolute top-2 right-2 bg-white rounded-full p-2">
                <TypeIcon type={rec.type} />
              </div>
              <PlaceholderImage type={rec.type} />
            </div>
            <div className="p-4 md:p-6">
              <h4 className="text-lg md:text-xl font-semibold text-green-800 mb-2 md:mb-3">
                {rec.title}
              </h4>
              <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4">
                {rec.description}
              </p>
              <div className="flex justify-between items-center mb-3 md:mb-4">
                <div className="flex items-center space-x-1">
                  <StarIcon className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm md:text-base font-medium">{rec.rating}</span>
                </div>
                <span className="text-green-600 font-medium text-sm md:text-base">
                  {rec.price}
                </span>
              </div>
              <div className="pt-3 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm md:text-base text-gray-500">Эко-рейтинг</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 md:w-4 md:h-4 rounded-full mx-0.5 ${
                          i < Math.floor(rec.ecoRating)
                            ? 'bg-green-500'
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}