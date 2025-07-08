import React from 'react';
import { StarIcon, MapPinIcon, UserGroupIcon } from '@heroicons/react/24/outline';

interface Recommendation {
  id: number;
  title: string;
  description: string;
  type: 'location' | 'activity' | 'guide';
  rating: number;
  imageUrl: string;
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
    imageUrl: '/eco-hotel.jpg',
    ecoRating: 5,
    price: 'от 5000₽/ночь'
  },
  {
    id: 2,
    title: 'Пеший тур по заповеднику',
    description: 'Познавательная экскурсия по уникальным природным местам с опытным гидом-экологом.',
    type: 'activity',
    rating: 4.9,
    imageUrl: '/hiking.jpg',
    ecoRating: 5,
    price: '3000₽/человек'
  },
  {
    id: 3,
    title: 'Гид Анна Петрова',
    description: 'Профессиональный эко-гид с 5-летним опытом проведения природных туров.',
    type: 'guide',
    rating: 4.7,
    imageUrl: '/guide.jpg',
    ecoRating: 4.8,
    price: 'от 2500₽/час'
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

export default function PersonalizedRecommendations() {
  return (
    <div className="space-y-6">
      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          Ваши интересы
        </h3>
        <div className="flex gap-2">
          {['Экотуризм', 'Пешие прогулки', 'Фотография', 'Наблюдение за птицами'].map((interest) => (
            <span
              key={interest}
              className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockRecommendations.map((rec) => (
          <div
            key={rec.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="h-48 bg-gray-200 relative">
              <div className="absolute top-2 right-2 bg-white rounded-full p-2">
                <TypeIcon type={rec.type} />
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-lg font-semibold text-green-800 mb-2">
                {rec.title}
              </h4>
              <p className="text-gray-600 text-sm mb-3">
                {rec.description}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-1">
                  <StarIcon className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm font-medium">{rec.rating}</span>
                </div>
                <span className="text-green-600 font-medium">
                  {rec.price}
                </span>
              </div>
              <div className="mt-3 pt-3 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Эко-рейтинг</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-4 h-4 rounded-full mx-0.5 ${
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