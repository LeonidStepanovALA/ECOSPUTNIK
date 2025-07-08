import React from 'react';
import { TagIcon, NewspaperIcon } from '@heroicons/react/24/outline';

interface NewsItem {
  id: number;
  type: 'news' | 'promotion';
  title: string;
  description: string;
  date: string;
  discount?: string;
  validUntil?: string;
}

const mockNews: NewsItem[] = [
  {
    id: 1,
    type: 'promotion',
    title: 'Скидка 20% на эко-туры в горы',
    description: 'Забронируйте тур в горы с проживанием в эко-отеле и получите скидку 20%',
    date: '2024-03-15',
    discount: '20%',
    validUntil: '2024-04-15'
  },
  {
    id: 2,
    type: 'news',
    title: 'Новый эко-маршрут открыт',
    description: 'В заповеднике открылся новый маршрут для наблюдения за птицами',
    date: '2024-03-10'
  },
  {
    id: 3,
    type: 'promotion',
    title: 'Бонусы за эко-активность',
    description: 'Получайте дополнительные баллы за использование многоразовой посуды в турах',
    date: '2024-03-08',
    validUntil: '2024-12-31'
  }
];

export default function NewsAndPromotions() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-green-800">
          Акции и новости
        </h3>
        <button className="text-green-600 hover:text-green-700 text-sm font-medium">
          Показать все
        </button>
      </div>

      <div className="space-y-4">
        {mockNews.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start gap-3">
              {item.type === 'promotion' ? (
                <TagIcon className="w-6 h-6 text-green-600 flex-shrink-0" />
              ) : (
                <NewspaperIcon className="w-6 h-6 text-blue-600 flex-shrink-0" />
              )}
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <h4 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h4>
                  <span className="text-sm text-gray-500">
                    {new Date(item.date).toLocaleDateString('ru-RU')}
                  </span>
                </div>
                <p className="text-gray-600 mt-1">
                  {item.description}
                </p>
                {item.type === 'promotion' && (
                  <div className="mt-2 flex items-center gap-4">
                    {item.discount && (
                      <span className="text-green-600 font-semibold">
                        Скидка: {item.discount}
                      </span>
                    )}
                    {item.validUntil && (
                      <span className="text-sm text-gray-500">
                        Действует до: {new Date(item.validUntil).toLocaleDateString('ru-RU')}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 