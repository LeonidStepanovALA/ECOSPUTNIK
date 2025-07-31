import React from 'react';
import { TagIcon, NewspaperIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/translations';

interface NewsItem {
  id: number;
  type: 'news' | 'promotion';
  title: string;
  description: string;
  date: string;
  discount?: string;
  validUntil?: string;
}



export default function NewsAndPromotions() {
  const { language } = useLanguage();
  const t = translations[language];

  // Mock news with bilingual support
  const mockNews: NewsItem[] = [
    {
      id: 1,
      type: 'promotion',
      title: language === 'ru' ? 'Скидка 20% на эко-туры в горы' : '20% discount on eco-tours in mountains',
      description: language === 'ru'
        ? 'Забронируйте тур в горы с проживанием в эко-отеле и получите скидку 20%'
        : 'Book a mountain tour with accommodation in eco-hotel and get 20% discount',
      date: '2024-03-15',
      discount: '20%',
      validUntil: '2024-04-15'
    },
    {
      id: 2,
      type: 'news',
      title: language === 'ru' ? 'Новый эко-маршрут открыт' : 'New eco-route opened',
      description: language === 'ru'
        ? 'В заповеднике открылся новый маршрут для наблюдения за птицами'
        : 'A new route for bird watching opened in the nature reserve',
      date: '2024-03-10'
    },
    {
      id: 3,
      type: 'promotion',
      title: language === 'ru' ? 'Бонусы за эко-активность' : 'Bonuses for eco-activity',
      description: language === 'ru'
        ? 'Получайте дополнительные баллы за использование многоразовой посуды в турах'
        : 'Get additional points for using reusable dishes on tours',
      date: '2024-03-08',
      validUntil: '2024-12-31'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-green-800">
          {t.promotionsAndNews}
        </h3>
        <button className="text-green-600 hover:text-green-700 text-sm font-medium">
          {t.showAll}
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
                    {new Date(item.date).toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US')}
                  </span>
                </div>
                <p className="text-gray-600 mt-1">
                  {item.description}
                </p>
                {item.type === 'promotion' && (
                  <div className="mt-2 flex items-center gap-4">
                    {item.discount && (
                      <span className="text-green-600 font-semibold">
                        {language === 'ru' ? 'Скидка' : 'Discount'}: {item.discount}
                      </span>
                    )}
                    {item.validUntil && (
                      <span className="text-sm text-gray-500">
                        {language === 'ru' ? 'Действует до' : 'Valid until'}: {new Date(item.validUntil).toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US')}
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