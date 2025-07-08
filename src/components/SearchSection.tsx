'use client';

import React from 'react';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import SearchResults from './SearchResults';

type FilterType = 'all' | 'accommodation' | 'guide' | 'tour' | 'transport' | 'equipment' | 'food';
type PriceRange = 'all' | 'budget' | 'medium' | 'premium' | 'luxury';
type EcoRating = 'all' | '3+' | '4+' | '5';
type Duration = 'all' | 'day' | 'weekend' | 'week' | 'long';
type Difficulty = 'all' | 'easy' | 'medium' | 'hard' | 'expert';
type Region = 'all' | 'almaty' | 'astana' | 'shymkent' | 'other';
type TourType = 'all' | 'beach' | 'ski' | 'excursion' | 'eco' | 'gastro' | 'sport' | 'cultural';

interface FilterState {
  type: FilterType;
  priceRange: PriceRange;
  ecoRating: EcoRating;
  duration: Duration;
  difficulty: Difficulty;
  region: Region;
  tourType: TourType;
}

export default function SearchSection() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedFilters, setSelectedFilters] = React.useState<FilterState>({
    type: 'all',
    priceRange: 'all',
    ecoRating: 'all',
    duration: 'all',
    difficulty: 'all',
    region: 'all',
    tourType: 'all'
  });
  const [isSearching, setIsSearching] = React.useState(false);
  const [showResults, setShowResults] = React.useState(true);

  const filterOptions = {
    type: ['all', 'accommodation', 'guide', 'tour', 'transport', 'equipment', 'food'] as FilterType[],
    priceRange: ['all', 'budget', 'medium', 'premium', 'luxury'] as PriceRange[],
    ecoRating: ['all', '3+', '4+', '5'] as EcoRating[],
    duration: ['all', 'day', 'weekend', 'week', 'long'] as Duration[],
    difficulty: ['all', 'easy', 'medium', 'hard', 'expert'] as Difficulty[],
    region: ['all', 'almaty', 'astana', 'shymkent', 'other'] as Region[],
    tourType: ['all', 'beach', 'ski', 'excursion', 'eco', 'gastro', 'sport', 'cultural'] as TourType[]
  };

  const typeLabels: Record<FilterType, string> = {
    all: 'Все категории',
    accommodation: 'Проживание',
    guide: 'Услуги гида',
    tour: 'Туры',
    transport: 'Эко-транспорт',
    equipment: 'Снаряжение',
    food: 'Эко-питание'
  };

  const priceLabels: Record<PriceRange, string> = {
    all: 'Любая стоимость',
    budget: 'До 50,000 тенге',
    medium: '50,000 - 150,000 тенге',
    premium: '150,000 - 500,000 тенге',
    luxury: 'От 500,000 тенге'
  };

  const ratingLabels: Record<EcoRating, string> = {
    all: 'Любой рейтинг',
    '3+': '3+ звезды (хороший)',
    '4+': '4+ звезды (отличный)',
    '5': '5 звезд (превосходный)'
  };

  const durationLabels: Record<Duration, string> = {
    all: 'Любая длительность',
    day: 'Однодневный',
    weekend: '2-3 дня',
    week: '4-7 дней',
    long: 'Более недели'
  };

  const difficultyLabels: Record<Difficulty, string> = {
    all: 'Любая сложность',
    easy: 'Легкий (начинающий)',
    medium: 'Средний (любитель)',
    hard: 'Сложный (опытный)',
    expert: 'Экспертный (профи)'
  };

  const regionLabels: Record<Region, string> = {
    all: 'Все регионы',
    almaty: 'Алматы и область',
    astana: 'Астана и область',
    shymkent: 'Шымкент и область',
    other: 'Другие регионы'
  };

  const tourTypeLabels: Record<TourType, string> = {
    all: 'Все направления',
    beach: 'Пляжный отдых',
    ski: 'Горнолыжный',
    excursion: 'Экскурсионный',
    eco: 'Экотуризм',
    gastro: 'Гастрономический',
    sport: 'Спортивный',
    cultural: 'Культурное наследие'
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setShowResults(false);

    // Имитируем задержку поиска
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSearching(false);
    setShowResults(true);
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <form onSubmit={handleSearch} className="space-y-4 md:space-y-6">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по эко-турам, гидам и размещению..."
            className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-green-100 focus:border-green-500 focus:outline-none text-sm md:text-base"
          />
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-600" />
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <AdjustmentsHorizontalIcon className="w-5 h-5 text-green-600" />
            <span className="font-medium text-gray-700 text-sm md:text-base">Фильтры</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Категория
              </label>
              <select
                value={selectedFilters.type}
                onChange={(e) => setSelectedFilters({...selectedFilters, type: e.target.value as FilterType})}
                className="w-full p-2 rounded border border-gray-300 focus:border-green-500 focus:outline-none text-sm"
              >
                {filterOptions.type.map((type) => (
                  <option key={type} value={type}>
                    {typeLabels[type]}
                  </option>
                ))}
              </select>
            </div>

            {selectedFilters.type === 'tour' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Направление туризма
                </label>
                <select
                  value={selectedFilters.tourType}
                  onChange={(e) => setSelectedFilters({...selectedFilters, tourType: e.target.value as TourType})}
                  className="w-full p-2 rounded border border-gray-300 focus:border-green-500 focus:outline-none text-sm"
                >
                  {filterOptions.tourType.map((tourType) => (
                    <option key={tourType} value={tourType}>
                      {tourTypeLabels[tourType]}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ценовой диапазон
              </label>
              <select
                value={selectedFilters.priceRange}
                onChange={(e) => setSelectedFilters({...selectedFilters, priceRange: e.target.value as PriceRange})}
                className="w-full p-2 rounded border border-gray-300 focus:border-green-500 focus:outline-none text-sm"
              >
                {filterOptions.priceRange.map((range) => (
                  <option key={range} value={range}>
                    {priceLabels[range]}
                  </option>
                ))}
              </select>
            </div>

            {selectedFilters.type !== 'equipment' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Эко-рейтинг
                </label>
                <select
                  value={selectedFilters.ecoRating}
                  onChange={(e) => setSelectedFilters({...selectedFilters, ecoRating: e.target.value as EcoRating})}
                  className="w-full p-2 rounded border border-gray-300 focus:border-green-500 focus:outline-none text-sm"
                >
                  {filterOptions.ecoRating.map((rating) => (
                    <option key={rating} value={rating}>
                      {ratingLabels[rating]}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Длительность
              </label>
              <select
                value={selectedFilters.duration}
                onChange={(e) => setSelectedFilters({...selectedFilters, duration: e.target.value as Duration})}
                className="w-full p-2 rounded border border-gray-300 focus:border-green-500 focus:outline-none text-sm"
              >
                <option value="all">Любая длительность</option>
                <option value="day">Однодневный</option>
                <option value="weekend">2-3 дня</option>
                <option value="week">4-7 дней</option>
                <option value="long">Более недели</option>
              </select>
            </div>

            {selectedFilters.type === 'tour' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Сложность
                </label>
                <select
                  value={selectedFilters.difficulty}
                  onChange={(e) => setSelectedFilters({...selectedFilters, difficulty: e.target.value as Difficulty})}
                  className="w-full p-2 rounded border border-gray-300 focus:border-green-500 focus:outline-none text-sm"
                >
                  <option value="all">Любая сложность</option>
                  <option value="easy">Легкий</option>
                  <option value="medium">Средний</option>
                  <option value="hard">Сложный</option>
                  <option value="expert">Экспертный</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Регион
              </label>
              <select
                value={selectedFilters.region}
                onChange={(e) => setSelectedFilters({...selectedFilters, region: e.target.value as Region})}
                className="w-full p-2 rounded border border-gray-300 focus:border-green-500 focus:outline-none text-sm"
              >
                <option value="all">Все регионы</option>
                <option value="almaty">Алматы и область</option>
                <option value="astana">Астана и область</option>
                <option value="shymkent">Шымкент и область</option>
                <option value="other">Другие регионы</option>
              </select>
            </div>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center text-sm md:text-base"
          disabled={isSearching}
        >
          {isSearching ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Поиск...
            </>
          ) : (
            'Найти'
          )}
        </button>
      </form>

      {isSearching && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      )}

      {showResults && !isSearching && (
        <SearchResults 
          isLoading={false} 
          filters={selectedFilters}
          results={[]}
        />
      )}
    </div>
  );
} 