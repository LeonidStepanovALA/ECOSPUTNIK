'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface NewsItem {
  id: string;
  type: 'news' | 'promotion' | 'holiday' | 'eco-event';
  title: string;
  description: string;
  date: string;
  region: string;
  status: 'active' | 'inactive';
  image?: File | null;
  imageUrl?: string;
  discount?: string;
  validUntil?: string;
}

interface NewsContextType {
  news: NewsItem[];
  addNews: (newsItem: Omit<NewsItem, 'id'>) => void;
  updateNews: (id: string, newsItem: Partial<NewsItem>) => void;
  deleteNews: (id: string) => void;
  deleteNewsByTitle: (title: string) => void;
  getActiveNews: () => NewsItem[];
  forceUpdateNews: (newsData: NewsItem[]) => void;
  clearDuplicates: () => void;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};

interface NewsProviderProps {
  children: ReactNode;
}

export const NewsProvider: React.FC<NewsProviderProps> = ({ children }) => {
  // Начальные данные с примерами новостей, акций и эко-событий
  const initialNews: NewsItem[] = [
    // Эко-события
    {
      id: 'eco_event_1',
      type: 'eco-event',
      title: 'Акция "Посади дерево"',
      description: 'Массовая посадка деревьев в парках и скверах города. Каждое посаженное дерево компенсирует 0.2 т CO₂ в год.',
      date: '2024-07-25',
      region: 'Алматы',
      status: 'active'
    },
    {
      id: 'eco_event_2',
      type: 'eco-event',
      title: 'Уборка мусора на озере Балхаш',
      description: 'Экологическая акция по очистке берегов озера Балхаш от пластикового мусора и загрязнений.',
      date: '2024-07-28',
      region: 'Алматинская область',
      status: 'active'
    },
    {
      id: 'eco_event_3',
      type: 'eco-event',
      title: 'Эко-марафон "Зеленый город"',
      description: 'Велосипедный марафон по экологическим маршрутам города с остановками для уборки мусора.',
      date: '2024-08-05',
      region: 'Астана',
      status: 'active'
    },
    {
      id: 'eco_event_4',
      type: 'eco-event',
      title: 'Семинар "Экологический туризм"',
      description: 'Бесплатный семинар для туристов о принципах экологического туризма и минимизации углеродного следа.',
      date: '2024-08-10',
      region: 'Алматы',
      status: 'active'
    },
    {
      id: 'eco_event_5',
      type: 'eco-event',
      title: 'Акция "Чистые горы"',
      description: 'Волонтерская акция по уборке туристических троп в горах Заилийского Алатау.',
      date: '2024-08-15',
      region: 'Алматинская область',
      status: 'active'
    },
    // Новости
    {
      id: 'news_1',
      type: 'news',
      title: 'Открытие нового эко-отеля в Алматы',
      description: 'В центре Алматы открылся новый эко-отель "Зеленая долина" с нулевым углеродным следом. Отель оснащен солнечными панелями и системой переработки отходов.',
      date: '2024-07-20',
      region: 'Алматы',
      status: 'active'
    },
    {
      id: 'news_2',
      type: 'news',
      title: 'Новые велосипедные маршруты в Астане',
      description: 'В Астане открылись новые велосипедные маршруты для туристов. Общая протяженность маршрутов составляет 50 км.',
      date: '2024-07-22',
      region: 'Астана',
      status: 'active'
    },
    {
      id: 'news_3',
      type: 'news',
      title: 'Запуск программы "Эко-гид"',
      description: 'Запущена новая программа сертификации экологических гидов. Первые 50 гидов уже получили сертификаты.',
      date: '2024-07-24',
      region: 'Казахстан',
      status: 'active'
    },
    {
      id: 'news_4',
      type: 'news',
      title: 'Рекорд по посадке деревьев',
      description: 'В рамках акции "Зеленый Казахстан" посажено более 100,000 деревьев. Цель - посадить 1 миллион деревьев к концу года.',
      date: '2024-07-26',
      region: 'Казахстан',
      status: 'active'
    },
    {
      id: 'news_5',
      type: 'news',
      title: 'Новый эко-маршрут в горах',
      description: 'Открыт новый экологический маршрут в горах Заилийского Алатау. Маршрут проходит через заповедные зоны.',
      date: '2024-07-28',
      region: 'Алматинская область',
      status: 'active'
    },
    // Акции
    {
      id: 'promotion_1',
      type: 'promotion',
      title: 'Скидка 20% на все эко-туры',
      description: 'Специальное предложение на все экологические туры до конца месяца. Включены велосипедные туры, пешие прогулки и эко-экскурсии.',
      date: '2024-07-21',
      region: 'Казахстан',
      status: 'active',
      discount: '20%',
      validUntil: '2024-07-31'
    },
    {
      id: 'promotion_2',
      type: 'promotion',
      title: 'Бесплатные эко-экскурсии в выходные',
      description: 'В выходные дни бесплатные экскурсии по эко-маршрутам для всех желающих. Требуется предварительная регистрация.',
      date: '2024-07-23',
      region: 'Алматы',
      status: 'active',
      discount: '100%',
      validUntil: '2024-08-31'
    },
    {
      id: 'promotion_3',
      type: 'promotion',
      title: 'Скидка 30% на эко-отели',
      description: 'Специальные цены на проживание в эко-отелях по всей стране. Включен завтрак из органических продуктов.',
      date: '2024-07-25',
      region: 'Казахстан',
      status: 'active',
      discount: '30%',
      validUntil: '2024-09-30'
    },
    {
      id: 'promotion_4',
      type: 'promotion',
      title: 'Бонусные эко-баллы за велосипедные туры',
      description: 'Двойные эко-баллы за участие в велосипедных турах. Накопленные баллы можно обменять на скидки.',
      date: '2024-07-27',
      region: 'Казахстан',
      status: 'active',
      discount: '2x баллы',
      validUntil: '2024-08-31'
    },
    {
      id: 'promotion_5',
      type: 'promotion',
      title: 'Скидка 15% на эко-оборудование',
      description: 'Скидки на эко-оборудование для туристов: велосипеды, палатки, рюкзаки из переработанных материалов.',
      date: '2024-07-29',
      region: 'Казахстан',
      status: 'active',
      discount: '15%',
      validUntil: '2024-08-15'
    }
  ];

  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [isLoaded, setIsLoaded] = useState(false);

  // Загружаем данные из localStorage после монтирования компонента
  useEffect(() => {
    const savedNews = localStorage.getItem('eco-tourism-news');
    if (savedNews) {
      try {
        const parsedNews = JSON.parse(savedNews);
        const restoredNews = restoreImageUrls(parsedNews);
        setNews(restoredNews);
        console.log('NewsContext - загружены новости из localStorage:', restoredNews.map(item => ({ id: item.id, title: item.title, type: item.type })));
      } catch (error) {
        console.error('Ошибка при загрузке новостей из localStorage:', error);
        // Если ошибка при загрузке, используем начальные данные
        setNews(initialNews);
        saveNewsToStorage(initialNews);
      }
    } else {
      console.log('NewsContext - localStorage пуст, используем начальные новости');
      setNews(initialNews);
      saveNewsToStorage(initialNews);
    }
    setIsLoaded(true);
  }, []);

  // Функция для сохранения новостей в localStorage
  const saveNewsToStorage = (newsData: NewsItem[]) => {
    if (typeof window !== 'undefined' && isLoaded) {
      console.log('Сохраняем новости в localStorage:', newsData.map(item => ({ id: item.id, title: item.title, type: item.type })));
      localStorage.setItem('eco-tourism-news', JSON.stringify(newsData));
    }
  };

  const addNews = (newsItem: Omit<NewsItem, 'id'>) => {
    let imageUrl = undefined;
    
    // Создаем URL для изображения, если оно есть
    if (newsItem.image) {
      imageUrl = URL.createObjectURL(newsItem.image);
    }
    
    const newNews: NewsItem = {
      ...newsItem,
      id: `news_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      imageUrl
    };
    
    console.log('NewsContext - добавляем новость:', { id: newNews.id, title: newNews.title, type: newNews.type, status: newNews.status });
    
    const updatedNews = [...news, newNews];
    setNews(updatedNews);
    saveNewsToStorage(updatedNews);
    
    console.log('NewsContext - новости после добавления:', updatedNews.map(item => ({ id: item.id, title: item.title, type: item.type, status: item.status })));
  };

  // Функция для восстановления URL изображений после загрузки
  const restoreImageUrls = (newsData: NewsItem[]) => {
    return newsData.map(item => {
      if (item.image && !item.imageUrl) {
        return {
          ...item,
          imageUrl: URL.createObjectURL(item.image)
        };
      }
      return item;
    });
  };

  const updateNews = (id: string, newsItem: Partial<NewsItem>) => {
    const updatedNews = news.map(item => 
      item.id === id ? { ...item, ...newsItem } : item
    );
    setNews(updatedNews);
    saveNewsToStorage(updatedNews);
  };

  const deleteNews = (id: string) => {
    console.log('deleteNews вызвана с ID:', id);
    console.log('Текущие новости:', news.map(item => ({ id: item.id, title: item.title, type: item.type })));
    
    const updatedNews = news.filter(item => item.id !== id);
    console.log('Новости после удаления:', updatedNews.map(item => ({ id: item.id, title: item.title, type: item.type })));
    
    setNews(updatedNews);
    saveNewsToStorage(updatedNews);
  };

  const deleteNewsByTitle = (title: string) => {
    console.log('deleteNewsByTitle вызвана с названием:', title);
    console.log('Текущие новости:', news.map(item => ({ id: item.id, title: item.title, type: item.type })));
    
    const updatedNews = news.filter(item => item.title !== title);
    console.log('Новости после удаления:', updatedNews.map(item => ({ id: item.id, title: item.title, type: item.type })));
    
    setNews(updatedNews);
    saveNewsToStorage(updatedNews);
  };

  const getActiveNews = () => {
    const activeNews = news.filter(item => item.status === 'active');
    console.log('NewsContext - getActiveNews вызвана. Всего новостей:', news.length, 'Активных:', activeNews.length);
    console.log('NewsContext - все новости:', news.map(item => ({ id: item.id, title: item.title, type: item.type, status: item.status })));
    console.log('NewsContext - активные новости:', activeNews.map(item => ({ id: item.id, title: item.title, type: item.type, status: item.status })));
    return activeNews;
  };

  const forceUpdateNews = (newsData: NewsItem[]) => {
    setNews(newsData);
    saveNewsToStorage(newsData);
  };

  const clearDuplicates = () => {
    const seenTitles = new Set<string>();
    const uniqueNews = news.filter(item => {
      if (seenTitles.has(item.title)) {
        console.log('Удаляем дубликат новости:', { id: item.id, title: item.title });
        return false;
      }
      seenTitles.add(item.title);
      return true;
    });
    setNews(uniqueNews);
    saveNewsToStorage(uniqueNews);
    console.log('NewsContext - очищены дубликаты новостей. Осталось:', uniqueNews.length);
  };

  return (
    <NewsContext.Provider value={{
      news,
      addNews,
      updateNews,
      deleteNews,
      deleteNewsByTitle,
      getActiveNews,
      forceUpdateNews,
      clearDuplicates
    }}>
      {children}
    </NewsContext.Provider>
  );
}; 