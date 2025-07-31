'use client';

import React from 'react';
import Image from 'next/image';
import { StarIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/translations';

interface SearchResult {
  id: number;
  type: string;
  title: string;
  description: string;
  image: string;
  price: number;
  ecoRating: number;
  location: string;
  duration?: string;
  difficulty?: string;
  region: string;
  tourType?: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  filters?: {
    type: string;
    priceRange: string;
    ecoRating: string;
    duration: string;
    difficulty: string;
    region: string;
    tourType: string;
  };
}

  // Mock results with bilingual support
  const mockResults: SearchResult[] = [
    {
      id: 1,
      type: 'tour',
      title: language === 'ru' ? 'Треккинг в горах Алматы' : 'Trekking in Almaty Mountains',
      description: language === 'ru' 
        ? 'Двухдневный поход по живописным маршрутам с профессиональным гидом и экологическим обучением'
        : 'Two-day hike through scenic routes with professional guide and environmental education',
      image: '/hiking.svg',
      price: 45000,
      ecoRating: 5,
      location: language === 'ru' ? 'Алматы, ущелье Бутаковка' : 'Almaty, Butakovka Gorge',
      duration: language === 'ru' ? '2 дня' : '2 days',
      difficulty: 'medium',
      region: 'almaty',
      tourType: 'eco'
    },
    {
      id: 2,
      type: 'accommodation',
      title: language === 'ru' ? 'Эко-отель "Горный воздух"' : 'Eco-Hotel "Mountain Air"',
      description: language === 'ru'
        ? 'Уютный отель с солнечными панелями, системой очистки воды и органическим садом'
        : 'Cozy hotel with solar panels, water purification system and organic garden',
      image: '/eco-hotel.svg',
      price: 25000,
      ecoRating: 4,
      location: language === 'ru' ? 'Алматинская область, Талгар' : 'Almaty Region, Talgar',
      region: 'almaty'
    },
    {
      id: 3,
      type: 'guide',
      title: language === 'ru' ? 'Гид-натуралист' : 'Naturalist Guide',
      description: language === 'ru'
        ? 'Профессиональный гид-натуралист с опытом работы в заповедниках'
        : 'Professional naturalist guide with experience in nature reserves',
      image: 'https://via.placeholder.com/400x300/92C291/FFFFFF?text=Гид-натуралист',
      price: 15000,
      ecoRating: 5,
      location: language === 'ru' ? 'Алматы' : 'Almaty',
      duration: language === 'ru' ? '1 день' : '1 day',
      difficulty: 'easy',
      region: 'almaty'
    },
    {
      id: 4,
      type: 'equipment',
      title: language === 'ru' ? 'Эко-снаряжение' : 'Eco Equipment',
      description: language === 'ru'
        ? 'Прокат экологичного туристического снаряжения из переработанных материалов'
        : 'Rental of eco-friendly tourist equipment made from recycled materials',
      image: 'https://via.placeholder.com/400x300/92C291/FFFFFF?text=Эко-снаряжение',
      price: 8000,
      ecoRating: 4,
      location: language === 'ru' ? 'Алматы, центр' : 'Almaty, center',
      region: 'almaty'
    },
    {
      id: 5,
      type: 'tour',
      title: language === 'ru' ? 'Горнолыжный тур в Шымбулак' : 'Ski Tour in Shymbulak',
      description: language === 'ru'
        ? 'Захватывающий горнолыжный тур с инструктором и проживанием в эко-отеле'
        : 'Exciting ski tour with instructor and accommodation in eco-hotel',
      image: '/ski-tour.svg',
      price: 75000,
      ecoRating: 4,
      location: language === 'ru' ? 'Алматы, Шымбулак' : 'Almaty, Shymbulak',
      duration: language === 'ru' ? '3 дня' : '3 days',
      difficulty: 'medium',
      region: 'almaty',
      tourType: 'ski'
    },
    {
      id: 6,
      type: 'tour',
      title: language === 'ru' ? 'Гастрономический тур по Алматы' : 'Gastronomic Tour in Almaty',
      description: language === 'ru'
        ? 'Знакомство с местной кухней, посещение органических ферм и кулинарные мастер-классы'
        : 'Introduction to local cuisine, visiting organic farms and culinary master classes',
      image: 'https://via.placeholder.com/400x300/92C291/FFFFFF?text=Гастротур',
      price: 35000,
      ecoRating: 5,
      location: language === 'ru' ? 'Алматы' : 'Almaty',
      duration: language === 'ru' ? '2 дня' : '2 days',
      difficulty: 'easy',
      region: 'almaty',
      tourType: 'gastro'
    },
    {
      id: 7,
      type: 'transport',
      title: language === 'ru' ? 'Электровелосипед' : 'Electric Bicycle',
      description: language === 'ru'
        ? 'Аренда электровелосипедов для экологичных путешествий'
        : 'Electric bicycle rental for eco-friendly travel',
      image: 'https://via.placeholder.com/400x300/92C291/FFFFFF?text=Электровелосипед',
      price: 5000,
      ecoRating: 5,
      location: language === 'ru' ? 'Алматы, Медеу' : 'Almaty, Medeu',
      region: 'almaty'
    },
    {
      id: 8,
      type: 'transport',
      title: language === 'ru' ? 'Tesla Model Y' : 'Tesla Model Y',
      description: language === 'ru'
        ? 'Аренда электромобиля Tesla для экологичных поездок'
        : 'Tesla electric car rental for eco-friendly trips',
      image: 'https://via.placeholder.com/400x300/92C291/FFFFFF?text=Tesla',
      price: 45000,
      ecoRating: 5,
      location: language === 'ru' ? 'Алматы, центр' : 'Almaty, center',
      region: 'almaty'
    },
    {
      id: 9,
      type: 'transport',
      title: language === 'ru' ? 'Эко-трансфер' : 'Eco Transfer',
      description: language === 'ru'
        ? 'Групповой трансфер на электробусе'
        : 'Group transfer by electric bus',
      image: 'https://via.placeholder.com/400x300/92C291/FFFFFF?text=Эко-трансфер',
      price: 3000,
      ecoRating: 4,
      location: language === 'ru' ? 'Алматы' : 'Almaty',
      region: 'almaty'
    },
    {
      id: 10,
      type: 'food',
      title: language === 'ru' ? 'Эко-кафе' : 'Eco Cafe',
      description: language === 'ru'
        ? 'Органическое кафе с местными продуктами'
        : 'Organic cafe with local products',
      image: 'https://via.placeholder.com/400x300/92C291/FFFFFF?text=Эко-кафе',
      price: 5000,
      ecoRating: 5,
      location: language === 'ru' ? 'Алматы, центр' : 'Almaty, center',
      region: 'almaty'
    },
    {
      id: 11,
      type: 'food',
      title: language === 'ru' ? 'Ланчбокс' : 'Lunch Box',
      description: language === 'ru'
        ? 'Эко-ланчбоксы для походов из органических продуктов'
        : 'Eco lunch boxes for hiking made from organic products',
      image: 'https://via.placeholder.com/400x300/92C291/FFFFFF?text=Ланчбокс',
      price: 4500,
      ecoRating: 4,
      location: language === 'ru' ? 'Алматы' : 'Almaty',
      region: 'almaty'
    },
    {
      id: 12,
      type: 'food',
      title: language === 'ru' ? 'Фермерский завтрак' : 'Farm Breakfast',
      description: language === 'ru'
        ? 'Завтрак из свежих фермерских продуктов'
        : 'Breakfast from fresh farm products',
      image: 'https://via.placeholder.com/400x300/92C291/FFFFFF?text=Фермерский+завтрак',
      price: 3500,
      ecoRating: 5,
      location: language === 'ru' ? 'Алматы' : 'Almaty',
      region: 'almaty'
    },
    {
      id: 13,
      type: 'food',
      title: language === 'ru' ? 'Кулинарный мастер-класс' : 'Culinary Master Class',
      description: language === 'ru'
        ? 'Мастер-класс по приготовлению блюд из органических продуктов'
        : 'Master class on cooking dishes from organic products',
      image: 'https://via.placeholder.com/400x300/92C291/FFFFFF?text=Мастер-класс',
      price: 15000,
      ecoRating: 4,
      location: language === 'ru' ? 'Алматы' : 'Almaty',
      duration: language === 'ru' ? '3 часа' : '3 hours',
      region: 'almaty'
    },
    {
      id: 14,
      type: 'guide',
      title: language === 'ru' ? 'Фотограф дикой природы' : 'Wildlife Photographer',
      description: language === 'ru'
        ? 'Профессиональный фотограф для съемки природы и животных'
        : 'Professional photographer for nature and wildlife photography',
      image: 'https://via.placeholder.com/400x300/92C291/FFFFFF?text=Фотограф',
      price: 25000,
      ecoRating: 5,
      location: language === 'ru' ? 'Алматы' : 'Almaty',
      duration: language === 'ru' ? '1 день' : '1 day',
      region: 'almaty'
    },
    {
      id: 15,
      type: 'accommodation',
      title: language === 'ru' ? 'Глэмпинг в горах' : 'Glamping in the Mountains',
      description: language === 'ru'
        ? 'Комфортное проживание на природе с минимальным воздействием на окружающую среду'
        : 'Comfortable accommodation in nature with minimal impact on the environment',
      image: 'https://via.placeholder.com/400x300/92C291/FFFFFF?text=Глэмпинг',
      price: 35000,
      ecoRating: 5,
      location: language === 'ru' ? 'Алматинская область, Тургень' : 'Almaty Region, Turgen',
      region: 'almaty'
    }
];

export default function SearchResults({ results, isLoading = false, filters }: SearchResultsProps) {
  const { language } = useLanguage();
  const t = translations[language];
  const [sortBy, setSortBy] = React.useState('relevance');

  // Используем переданные результаты или mockResults, если результаты не переданы
  const initialResults = results && results.length > 0 ? results : mockResults;

  const filterResults = (items: SearchResult[]) => {
    if (!filters) return items;

    return items.filter(item => {
      if (filters.type !== 'all' && item.type !== filters.type) return false;
      
      if (filters.region !== 'all' && item.region !== filters.region) return false;
      
      if (filters.ecoRating !== 'all' && item.type !== 'equipment') {
        const minRating = parseInt(filters.ecoRating.replace('+', ''));
        if (item.ecoRating < minRating) return false;
      }

      if (filters.priceRange !== 'all') {
        switch (filters.priceRange) {
          case 'budget':
            if (item.price > 50000) return false;
            break;
          case 'medium':
            if (item.price < 50000 || item.price > 150000) return false;
            break;
          case 'premium':
            if (item.price < 150000 || item.price > 500000) return false;
            break;
          case 'luxury':
            if (item.price < 500000) return false;
            break;
        }
      }

      if (filters.duration !== 'all' && item.duration) {
        switch (filters.duration) {
          case 'day':
            if (!item.duration.includes('часов') && !item.duration.includes('день')) return false;
            break;
          case 'weekend':
            if (!item.duration.includes('2') && !item.duration.includes('3')) return false;
            break;
          case 'week':
            if (!item.duration.includes('4') && !item.duration.includes('5') && !item.duration.includes('6') && !item.duration.includes('7')) return false;
            break;
          case 'long':
            if (!item.duration.includes('неделя') && !item.duration.includes('недель')) return false;
            break;
        }
      }
      
      if (filters.difficulty !== 'all' && item.type === 'tour' && item.difficulty && item.difficulty !== filters.difficulty) return false;

      if (filters.tourType !== 'all' && item.type === 'tour') {
        if (!item.tourType || item.tourType !== filters.tourType) return false;
      }

      return true;
    });
  };

  const sortResults = (items: SearchResult[]) => {
    const sorted = [...items];
    switch (sortBy) {
      case 'price_asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.ecoRating - a.ecoRating);
        break;
      default:
        // По умолчанию сортировка по релевантности (оставляем как есть)
        break;
    }
    return sorted;
  };

  const filteredResults = React.useMemo(() => {
    const filtered = filterResults(initialResults);
    return sortResults(filtered);
  }, [initialResults, filterResults, sortResults]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('kk-KZ', {
      style: 'currency',
      currency: 'KZT',
      maximumFractionDigits: 0
    }).format(price);
  };

  const renderEcoRating = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      index < rating ? (
        <StarIconSolid key={index} className="w-5 h-5 text-green-500" />
      ) : (
        <StarIcon key={index} className="w-5 h-5 text-gray-300" />
      )
    ));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Найдено результатов: {filteredResults.length}
        </h2>
        <select 
          className="border rounded-lg px-3 py-2 text-gray-700"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="relevance">По релевантности</option>
          <option value="price_asc">Сначала дешевле</option>
          <option value="price_desc">Сначала дороже</option>
          <option value="rating">По рейтингу</option>
        </select>
      </div>

      {filteredResults.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            По вашему запросу ничего не найдено. Попробуйте изменить параметры поиска.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.map((result) => (
            <div 
              key={result.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={result.image}
                  alt={result.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-2 left-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                  {result.type === 'tour' && 'Тур'}
                  {result.type === 'accommodation' && 'Проживание'}
                  {result.type === 'guide' && 'Гид'}
                  {result.type === 'equipment' && 'Снаряжение'}
                  {result.type === 'transport' && 'Транспорт'}
                  {result.type === 'food' && 'Питание'}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <h3 className="text-lg font-semibold text-white">
                    {result.title}
                  </h3>
                </div>
              </div>

              <div className="p-4">
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {result.description}
                </p>

                <div className="flex items-center gap-1 mb-2">
                  {renderEcoRating(result.ecoRating)}
                  <span className="text-sm text-gray-600 ml-2">
                    Эко-рейтинг
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <MapPinIcon className="w-5 h-5" />
                  <span className="text-sm">{result.location}</span>
                </div>

                {result.duration && (
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <ClockIcon className="w-5 h-5" />
                    <span className="text-sm">{result.duration}</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  {result.difficulty && (
                    <div className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                      {result.difficulty === 'easy' && 'Легкий'}
                      {result.difficulty === 'medium' && 'Средний'}
                      {result.difficulty === 'hard' && 'Сложный'}
                      {result.difficulty === 'expert' && 'Экспертный'}
                    </div>
                  )}
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div className="text-lg font-bold text-green-600">
                    {formatPrice(result.price)}
                    <span className="text-sm text-gray-500 ml-1">
                      {result.type === 'guide' && '/день'}
                      {result.type === 'accommodation' && '/ночь'}
                    </span>
                  </div>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                    Подробнее
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 