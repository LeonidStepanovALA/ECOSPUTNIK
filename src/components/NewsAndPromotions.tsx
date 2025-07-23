'use client';

import React, { useState } from 'react';
import { TagIcon, NewspaperIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNews, NewsItem } from '@/context/NewsContext';

export default function NewsAndPromotions() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [showNewsModal, setShowNewsModal] = useState(false);

  // Фиксированные примеры новостей и акций для отображения
  const displayEvents: NewsItem[] = [
    {
      id: 'news_1',
      type: 'news',
      title: 'Открытие нового эко-отеля в Алматы',
      description: 'В центре Алматы открылся новый эко-отель "Зеленая долина" с нулевым углеродным следом.',
      date: '2024-07-20',
      region: 'Алматы',
      status: 'active'
    },
    {
      id: 'promotion_1',
      type: 'promotion',
      title: 'Скидка 20% на все эко-туры',
      description: 'Специальное предложение на все экологические туры до конца месяца.',
      date: '2024-07-21',
      region: 'Казахстан',
      status: 'active',
      discount: '20%',
      validUntil: '2024-07-31'
    },
    {
      id: 'news_2',
      type: 'news',
      title: 'Новые велосипедные маршруты в Астане',
      description: 'В Астане открылись новые велосипедные маршруты для туристов.',
      date: '2024-07-22',
      region: 'Астана',
      status: 'active'
    },
    {
      id: 'promotion_2',
      type: 'promotion',
      title: 'Бесплатные эко-экскурсии в выходные',
      description: 'В выходные дни бесплатные экскурсии по эко-маршрутам для всех желающих.',
      date: '2024-07-23',
      region: 'Алматы',
      status: 'active',
      discount: '100%',
      validUntil: '2024-08-31'
    },
    {
      id: 'news_3',
      type: 'news',
      title: 'Запуск программы "Эко-гид"',
      description: 'Запущена новая программа сертификации экологических гидов.',
      date: '2024-07-24',
      region: 'Казахстан',
      status: 'active'
    }
  ];

  // Отладочная информация
  console.log('NewsAndPromotions - отображаемые события:', displayEvents.map(item => ({ id: item.id, title: item.title, type: item.type })));
  console.log('NewsAndPromotions - общее количество событий:', displayEvents.length);

  // Функция для безопасного форматирования даты
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Дата не указана';
      }
      return date.toLocaleDateString('ru-RU');
    } catch (error) {
      return 'Дата не указана';
    }
  };

  const openNewsModal = (news: NewsItem) => {
    setSelectedNews(news);
    setShowNewsModal(true);
  };

  const closeNewsModal = () => {
    setShowNewsModal(false);
    setSelectedNews(null);
  };

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
        {displayEvents.map((item, index) => (
          <div
            key={`${item.id}_${index}`}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => openNewsModal(item)}
          >
            <div className="flex items-start gap-3">
              {item.imageUrl ? (
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                />
              ) : item.type === 'promotion' ? (
                <TagIcon className="w-6 h-6 text-green-600 flex-shrink-0" />
              ) : item.type === 'eco-event' ? (
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 text-xs font-bold">🌱</span>
                </div>
              ) : (
                <NewspaperIcon className="w-6 h-6 text-blue-600 flex-shrink-0" />
              )}
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <h4 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h4>
                  <span className="text-sm text-gray-500">
                    {formatDate(item.date)}
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

      {/* Модальное окно для просмотра новости */}
      {showNewsModal && selectedNews && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                {selectedNews.type === 'promotion' ? (
                  <TagIcon className="w-6 h-6 text-green-600" />
                ) : selectedNews.type === 'eco-event' ? (
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-xs font-bold">🌱</span>
                  </div>
                ) : (
                  <NewspaperIcon className="w-6 h-6 text-blue-600" />
                )}
                <h3 className="text-xl font-semibold text-green-800">
                  {selectedNews.type === 'promotion' ? 'Акция' : 
                   selectedNews.type === 'eco-event' ? 'Эко-событие' : 'Новость'}
                </h3>
              </div>
              <button
                onClick={closeNewsModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-4">
                <div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">
                    {selectedNews.title}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {formatDate(selectedNews.date)}
                  </p>
                </div>
                
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedNews.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span><strong>Регион:</strong> {selectedNews.region}</span>
                  <span><strong>Статус:</strong> {selectedNews.status === 'active' ? 'Активна' : 'Неактивна'}</span>
                </div>

                {selectedNews.type === 'promotion' && selectedNews.discount && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <TagIcon className="w-5 h-5 text-green-600" />
                      <span className="text-green-800 font-semibold">
                        Скидка: {selectedNews.discount}
                      </span>
                    </div>
                    {selectedNews.validUntil && (
                      <p className="text-sm text-green-600 mt-1">
                        Действует до: {new Date(selectedNews.validUntil).toLocaleDateString('ru-RU')}
                      </p>
                    )}
                  </div>
                )}

                {selectedNews.imageUrl && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Изображение:</p>
                    <div className="bg-gray-100 rounded-lg p-4 text-center">
                      <img 
                        src={selectedNews.imageUrl} 
                        alt={selectedNews.title}
                        className="max-w-full h-auto rounded-lg shadow-md"
                        style={{ maxHeight: '300px' }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end p-6 border-t border-gray-200">
              <button
                onClick={closeNewsModal}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 