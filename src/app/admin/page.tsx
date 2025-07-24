'use client';

import React, { useState } from 'react';
import { 
  AcademicCapIcon, 
  CalendarIcon, 
  PlusIcon, 
  PencilIcon,
  EyeIcon,
  XMarkIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import EcoProjectsReport from '@/components/EcoProjectsReport';
import FinancingStatusReport from '@/components/FinancingStatusReport';
import { useNews } from '@/context/NewsContext';
import { useEffect } from 'react';

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  level: string;
  instructor: string;
  status: 'active' | 'inactive';
}

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'holiday' | 'eco-event' | 'promotion' | 'news';
  region: string;
  status: 'active' | 'inactive';
}

export default function AdminDashboard() {
  const { language, changeLanguage } = useLanguage();
  const t = translations[language];
  const { news, addNews, updateNews, forceUpdateNews, clearDuplicates: clearNewsDuplicates, deleteNews, deleteNewsByTitle } = useNews();

  const [activeSection, setActiveSection] = useState('courses');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'course' | 'event' | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [selectedStatAction, setSelectedStatAction] = useState<string | null>(null);
  const [showStatModal, setShowStatModal] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  
  // Состояние для формы добавления курса/события
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    level: '',
    instructor: '',
    date: '',
    dateFrom: '',
    dateTo: '',
    type: '',
    region: '',
    status: 'active',
    image: null as File | null
  });

  // Функция для сохранения событий в localStorage
  const saveEventsToStorage = (eventsData: CalendarEvent[]) => {
    if (typeof window !== 'undefined' && isDataLoaded) {
      localStorage.setItem('eco-tourism-events', JSON.stringify(eventsData));
    }
  };

  // Функция для сохранения курсов в localStorage
  const saveCoursesToStorage = (coursesData: Course[]) => {
    if (typeof window !== 'undefined' && isDataLoaded) {
      localStorage.setItem('eco-tourism-courses', JSON.stringify(coursesData));
    }
  };

  // Начальные данные для курсов
  const initialCourses: Course[] = [
    {
      id: 1,
      title: t.courseBasicEcoTourism,
      description: t.courseBasicEcoTourismDesc,
      duration: '40 часов',
      level: t.beginner,
      instructor: t.instructorAigul,
      status: 'active'
    },
    {
      id: 2,
      title: t.courseEcoSafety,
      description: t.courseEcoSafetyDesc,
      duration: '60 часов',
      level: t.advanced,
      instructor: t.instructorMarat,
      status: 'active'
    },
    {
      id: 3,
      title: t.courseSustainableDevelopment,
      description: t.courseSustainableDevelopmentDesc,
      duration: '50 часов',
      level: t.intermediate,
      instructor: t.instructorAnna,
      status: 'inactive'
    }
  ];

  // Начальные данные для событий (пустые для ручного добавления)
  const initialEvents: CalendarEvent[] = [];

  // Состояние для списков курсов и событий
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Загружаем данные из localStorage после монтирования компонента
  useEffect(() => {
    const savedCourses = localStorage.getItem('eco-tourism-courses');
    const savedEvents = localStorage.getItem('eco-tourism-events');
    
    if (savedCourses) {
      try {
        const parsedCourses = JSON.parse(savedCourses);
        setCourses(parsedCourses);
      } catch (error) {
        console.error('Ошибка при загрузке курсов из localStorage:', error);
      }
    }
    
    if (savedEvents) {
      try {
        const parsedEvents = JSON.parse(savedEvents);
        setEvents(parsedEvents);
      } catch (error) {
        console.error('Ошибка при загрузке событий из localStorage:', error);
      }
    }
    
    setIsDataLoaded(true);
  }, []);

  // Синхронизируем события с контекстом новостей при загрузке
  useEffect(() => {
    if (isDataLoaded && events.length > 0) {
      console.log('Синхронизация событий с контекстом новостей...');
      
      // Получаем текущие новости из контекста
      const currentNews = news.map(item => item.title);
      console.log('Текущие новости в контексте:', currentNews);
      
      // Добавляем события в контекст новостей, если их там нет
      events.forEach(event => {
        if ((event.type === 'news' || event.type === 'promotion' || event.type === 'eco-event') && 
            !currentNews.includes(event.title)) {
          console.log('Добавляем событие в контекст новостей:', event.title, event.type);
          
          addNews({
            type: event.type as 'news' | 'promotion' | 'eco-event',
            title: event.title,
            description: event.description,
            date: event.date,
            region: event.region,
            status: event.status as 'active' | 'inactive',
            discount: event.type === 'promotion' ? '20%' : undefined,
            validUntil: event.type === 'promotion' ? '2024-12-31' : undefined
          });
        }
      });
    }
  }, [isDataLoaded, events, news, addNews]);

  // Моковые данные для дашборда
  const dashboardData = {
    totalTourists: 15420,
    activeTourists: 8920,
    newRegistrations: 2340,
    touristGeography: {
      'Алматы': 4500,
      'Астана': 3200,
      'Шымкент': 2100,
      'Алматинская область': 2800,
      'Другие регионы': 2820
    },
    totalBookings: 8920,
    confirmedBookings: 6540,
    cancelledBookings: 890,
    pendingBookings: 1490,
    averageCarbonFootprint: 2.4,
    carbonByRegion: {
      'Алматы': 1.8,
      'Астана': 2.1,
      'Шымкент': 2.9,
      'Алматинская область': 3.2,
      'Другие регионы': 2.6
    },
    carbonByTourType: {
      'Эко-туры': 1.2,
      'Горные походы': 2.8,
      'Оздоровительные туры': 1.5,
      'Культурные туры': 2.1,
      'Приключенческие туры': 3.4
    },
    carbonTrends: [
      { month: 'Янв', value: 2.8 },
      { month: 'Фев', value: 2.6 },
      { month: 'Мар', value: 2.4 },
      { month: 'Апр', value: 2.3 },
      { month: 'Май', value: 2.2 },
      { month: 'Июн', value: 2.1 },
      { month: 'Июл', value: 2.0 },
      { month: 'Авг', value: 2.1 },
      { month: 'Сен', value: 2.2 },
      { month: 'Окт', value: 2.3 },
      { month: 'Ноя', value: 2.4 },
      { month: 'Дек', value: 2.5 }
    ],
    co2Compensation: 78.5,
    compensationEffectiveness: 85.2,
    compensationComparison: {
      'Посадка деревьев': 45.3,
      'Солнечные панели': 28.7,
      'Ветровые турбины': 15.2,
      'Переработка отходов': 10.8
    },
    compensationForecast: [
      { month: 'Янв', value: 72.1 },
      { month: 'Фев', value: 73.5 },
      { month: 'Мар', value: 75.2 },
      { month: 'Апр', value: 76.8 },
      { month: 'Май', value: 77.9 },
      { month: 'Июн', value: 78.5 },
      { month: 'Июл', value: 79.2 },
      { month: 'Авг', value: 80.1 },
      { month: 'Сен', value: 81.3 },
      { month: 'Окт', value: 82.7 },
      { month: 'Ноя', value: 83.9 },
      { month: 'Дек', value: 85.2 }
    ]
  };

  // Моковые данные для тепловой карты Казахстана
  const heatMapData = {
    regions: {
      'Алматы': {
        tourists: 4500,
        emissionsReduction: 78.5,
        ecoMeasures: 15,
        intensity: 85
      },
      'Астана': {
        tourists: 3200,
        emissionsReduction: 65.2,
        ecoMeasures: 12,
        intensity: 72
      },
      'Шымкент': {
        tourists: 2100,
        emissionsReduction: 45.8,
        ecoMeasures: 8,
        intensity: 58
      },
      'Алматинская область': {
        tourists: 2800,
        emissionsReduction: 92.1,
        ecoMeasures: 18,
        intensity: 95
      },
      'Актюбинская область': {
        tourists: 1200,
        emissionsReduction: 35.4,
        ecoMeasures: 6,
        intensity: 42
      },
      'Атырауская область': {
        tourists: 800,
        emissionsReduction: 28.7,
        ecoMeasures: 4,
        intensity: 35
      },
      'Восточно-Казахстанская область': {
        tourists: 1500,
        emissionsReduction: 52.3,
        ecoMeasures: 9,
        intensity: 65
      },
      'Жамбылская область': {
        tourists: 1100,
        emissionsReduction: 38.9,
        ecoMeasures: 7,
        intensity: 48
      },
      'Западно-Казахстанская область': {
        tourists: 900,
        emissionsReduction: 32.1,
        ecoMeasures: 5,
        intensity: 38
      },
      'Карагандинская область': {
        tourists: 1800,
        emissionsReduction: 58.7,
        ecoMeasures: 10,
        intensity: 68
      },
      'Костанайская область': {
        tourists: 1300,
        emissionsReduction: 42.5,
        ecoMeasures: 7,
        intensity: 52
      },
      'Кызылординская область': {
        tourists: 700,
        emissionsReduction: 25.3,
        ecoMeasures: 3,
        intensity: 28
      },
      'Мангистауская область': {
        tourists: 600,
        emissionsReduction: 22.8,
        ecoMeasures: 3,
        intensity: 25
      },
      'Павлодарская область': {
        tourists: 1400,
        emissionsReduction: 48.6,
        ecoMeasures: 8,
        intensity: 55
      },
      'Северо-Казахстанская область': {
        tourists: 1000,
        emissionsReduction: 36.2,
        ecoMeasures: 6,
        intensity: 45
      },
      'Туркестанская область': {
        tourists: 1600,
        emissionsReduction: 55.4,
        ecoMeasures: 9,
        intensity: 62
      }
    }
  };

  // Моковые данные для отчетов по регионам
  const regionsData = {
    activityMap: {
      'Алматы': { tourists: 4500, bookings: 3200, ecoRating: 8.5 },
      'Астана': { tourists: 3200, bookings: 2100, ecoRating: 7.8 },
      'Шымкент': { tourists: 2100, bookings: 1500, ecoRating: 6.9 },
      'Алматинская область': { tourists: 2800, bookings: 1900, ecoRating: 9.2 },
      'Актау': { tourists: 1200, bookings: 800, ecoRating: 7.1 },
      'Атырау': { tourists: 900, bookings: 600, ecoRating: 6.5 },
      'Павлодар': { tourists: 1100, bookings: 750, ecoRating: 7.3 },
      'Усть-Каменогорск': { tourists: 1300, bookings: 900, ecoRating: 8.1 }
    },
    topDirections: {
      popularity: [
        { name: 'Алматы - Чимбулак', tourists: 3200, rating: 9.1 },
        { name: 'Астана - Бурабай', tourists: 2800, rating: 8.7 },
        { name: 'Алматы - Балхаш', tourists: 2100, rating: 8.3 },
        { name: 'Шымкент - Сайрам', tourists: 1800, rating: 7.9 },
        { name: 'Алматинская область - Капчагай', tourists: 1600, rating: 8.5 }
      ],
      revenue: [
        { name: 'Алматы - Чимбулак', revenue: 45600000, rating: 9.1 },
        { name: 'Астана - Бурабай', revenue: 38900000, rating: 8.7 },
        { name: 'Алматы - Балхаш', revenue: 28700000, rating: 8.3 },
        { name: 'Шымкент - Сайрам', revenue: 23400000, rating: 7.9 },
        { name: 'Алматинская область - Капчагай', revenue: 19800000, rating: 8.5 }
      ],
      ecoRating: [
        { name: 'Алматинская область - Капчагай', ecoRating: 9.2, tourists: 1600 },
        { name: 'Алматы - Чимбулак', ecoRating: 9.1, tourists: 3200 },
        { name: 'Астана - Бурабай', ecoRating: 8.7, tourists: 2800 },
        { name: 'Алматы - Балхаш', ecoRating: 8.3, tourists: 2100 },
        { name: 'Шымкент - Сайрам', ecoRating: 7.9, tourists: 1800 }
      ]
    },
    greenRegions: {
      ecoInfrastructure: [
        { region: 'Алматинская область', score: 9.2, projects: 15 },
        { region: 'Алматы', score: 8.5, projects: 12 },
        { region: 'Астана', score: 7.8, projects: 8 },
        { region: 'Шымкент', score: 6.9, projects: 5 },
        { region: 'Актау', score: 7.1, projects: 6 }
      ],
      ecoActivities: [
        { region: 'Алматинская область', activities: 25, participants: 3200 },
        { region: 'Алматы', activities: 18, participants: 2800 },
        { region: 'Астана', activities: 12, participants: 1900 },
        { region: 'Шымкент', activities: 8, participants: 1200 },
        { region: 'Актау', activities: 6, participants: 800 }
      ],
      ecoCertificates: [
        { region: 'Алматинская область', certificates: 8, hotels: 12 },
        { region: 'Алматы', certificates: 6, hotels: 15 },
        { region: 'Астана', certificates: 4, hotels: 8 },
        { region: 'Шымкент', certificates: 3, hotels: 5 },
        { region: 'Актау', certificates: 2, hotels: 3 }
      ]
    }
  };



  // Моковые данные для статистики гидов
  const guidesData = {
    totalGuides: 156,
    activeGuides: 142,
    newGuides: 23,
    guidesByRegion: {
      'Алматы': 45,
      'Астана': 32,
      'Шымкент': 28,
      'Алматинская область': 25,
      'Другие регионы': 26
    },
    guidesByLevel: {
      'Начинающий': 45,
      'Средний': 67,
      'Продвинутый': 44
    },
    ratingDistribution: {
      '5 звезд': 23,
      '4 звезды': 67,
      '3 звезды': 45,
      '2 звезды': 15,
      '1 звезда': 6
    },
    coursesCompleted: {
      'Основы экологического туризма': 89,
      'Экологическая безопасность': 67,
      'Устойчивое развитие туризма': 45,
      'Первая помощь в походах': 78,
      'Экологическое законодательство': 34
    },
    certificationStatus: {
      'Сертифицированные': 89,
      'В процессе сертификации': 34,
      'Не сертифицированные': 33
    },
    performanceMetrics: {
      averageRating: 4.2,
      totalTours: 1247,
      averageToursPerGuide: 8.8,
      customerSatisfaction: 92.5
    },
    topGuides: [
      { name: 'Айгуль Сатпаева', rating: 4.9, tours: 45, region: 'Алматы' },
      { name: 'Марат Жумабаев', rating: 4.8, tours: 38, region: 'Астана' },
      { name: 'Анна Ким', rating: 4.7, tours: 42, region: 'Шымкент' },
      { name: 'Данияр Нурланов', rating: 4.6, tours: 35, region: 'Алматинская область' },
      { name: 'Елена Петрова', rating: 4.5, tours: 31, region: 'Алматы' }
    ],
    trainingProgress: {
      'Завершили базовый курс': 89,
      'Завершили продвинутый курс': 67,
      'Проходят обучение': 23,
      'Не начали обучение': 12
    },
    specializations: {
      'Горные походы': 45,
      'Эко-туры': 38,
      'Культурные туры': 32,
      'Приключенческие туры': 28,
      'Оздоровительные туры': 13
    }
  };

  // Моковые данные для статистики
  const menuItems = [
    {
      id: 'dashboard',
      title: 'Дашборд',
      icon: ChartBarIcon,
      items: [
        { 
          name: 'Общее количество туристов', 
          action: 'total-tourists',
          subItems: [
            { name: t.activeTourists, action: 'active-tourists' },
                          { name: t.newRegistrations, action: 'new-registrations' },
              { name: t.touristGeography, action: 'tourist-geography' }
          ]
        },
        { 
          name: t.totalBookings, 
          action: 'total-bookings',
          subItems: [
            { name: t.confirmedBookings, action: 'confirmed-bookings' },
            { name: t.cancelledBookings, action: 'cancelled-bookings' },
            { name: t.pendingBookings, action: 'pending-bookings' }
          ]
        },
        { 
          name: 'Средний углеродный след', 
          action: 'carbon-footprint',
          subItems: [
            { name: 'Углерод по регионам', action: 'carbon-by-region' },
            { name: 'Углерод по типам туров', action: 'carbon-by-tour-type' },
            { name: 'Тенденции углерода', action: 'carbon-trends' }
          ]
        },
        { 
          name: 'Процент компенсации CO2', 
          action: 'co2-compensation',
          subItems: [
            { name: 'Эффективность компенсации', action: 'compensation-effectiveness' },
            { name: 'Сравнение компенсации', action: 'compensation-comparison' },
            { name: 'Прогноз компенсации', action: 'compensation-forecast' }
          ]
        }
      ]
    },
    {
      id: 'guides',
      title: 'Статистика по гидам',
      icon: ChartBarIcon,
      items: [
        { 
          name: t.guidesOverview, 
          action: 'guides-overview',
          subItems: [
            { name: 'Количество гидов по регионам', action: 'guides-by-region' },
            { name: 'Количество гидов по уровням', action: 'guides-by-level' },
            { name: 'Новые гиды', action: 'new-guides' }
          ]
        },
        { 
          name: 'Рейтинги и отзывы', 
          action: 'guides-ratings',
          subItems: [
            { name: 'Распределение рейтингов', action: 'rating-distribution' },
            { name: 'Топ гиды', action: 'top-guides' },
            { name: 'Удовлетворенность клиентов', action: 'customer-satisfaction' }
          ]
        },
        { 
          name: 'Обучение и сертификация', 
          action: 'guides-training',
          subItems: [
            { name: 'Завершенные курсы', action: 'completed-courses' },
            { name: 'Статус сертификации', action: 'certification-status' },
            { name: 'Прогресс обучения', action: 'training-progress' }
          ]
        },
        { 
          name: 'Производительность', 
          action: 'guides-performance',
          subItems: [
            { name: 'Количество туров', action: 'tours-count' },
            { name: 'Средний рейтинг', action: 'average-rating' },
            { name: 'Специализации', action: 'specializations' }
          ]
        }
      ]
    },
    {
      id: 'regions',
      title: 'Отчеты по регионам',
      icon: ChartBarIcon,
      items: [
        { 
          name: 'Карта активности', 
          action: 'activity-map',
          subItems: [
            { name: 'Интерактивная карта', action: 'interactive-map' },
            { name: 'Тепловая карта', action: 'heat-map' },
            { name: 'Концентрация туристов', action: 'tourist-concentration' }
          ]
        },
        { 
          name: 'Топ-5 направлений', 
          action: 'top-directions',
          subItems: [
            { name: 'Рейтинг популярности', action: 'popularity-ranking' },
            { name: 'Рейтинг доходов', action: 'revenue-ranking' },
            { name: 'Рейтинг эко-оценки', action: 'eco-rating-ranking' }
          ]
        },
        { 
          name: 'Топ-5 зеленых регионов', 
          action: 'green-regions',
          subItems: [
            { name: 'Эко-инфраструктура', action: 'eco-infrastructure' },
            { name: 'Эко-активности', action: 'eco-activities' },
            { name: 'Эко-сертификаты', action: 'eco-certificates' }
          ]
        }
      ]
    },
    {
      id: 'ecoProjects',
      title: 'Отчет по эко-проектам',
      icon: ChartBarIcon,
      items: [
        { 
          name: 'Ожидающие зеленого финансирования', 
          action: 'awaiting-green-financing',
          subItems: [
            { name: 'Статус финансирования', action: 'financing-status' },
            { name: 'Сумма финансирования', action: 'funding-amount' },
            { name: 'Прогресс проекта', action: 'project-progress' }
          ]
        },
        { 
          name: 'Получившие зеленое финансирование', 
          action: 'received-green-financing',
          subItems: [
            { name: 'Процент реализации', action: 'implementation-rate' },
            { name: 'Процент успеха', action: 'success-rate' },
            { name: 'Прогресс проекта', action: 'project-progress' }
          ]
        },
        { 
          name: 'Реализованные проекты', 
          action: 'implemented-projects',
          subItems: [
            { name: 'Процент успеха', action: 'success-rate' },
            { name: 'Эко-влияние', action: 'eco-impact' },
            { name: 'Затраты-выгоды', action: 'cost-benefit' }
          ]
        },
        { 
          name: 'Проекты в процессе', 
          action: 'projects-in-progress',
          subItems: [
            { name: 'Прогресс проекта', action: 'project-progress' },
            { name: 'Прогноз завершения', action: 'completion-forecast' },
            { name: 'Распределение ресурсов', action: 'resource-allocation' }
          ]
        }
      ]
    },
    {
      id: 'accommodationEcoMeasures',
      title: t.accommodationEcoMeasures,
      icon: ChartBarIcon,
      items: [
        { 
          name: t.energyEfficiency, 
          action: 'energy-efficiency',
          subItems: [
            { name: t.solarEnergy, action: 'solar-energy' },
            { name: t.windEnergy, action: 'wind-energy' },
            { name: t.geothermalEnergy, action: 'geothermal-energy' },
            { name: t.energyStorage, action: 'energy-storage' },
            { name: t.smartLighting, action: 'smart-lighting' },
            { name: t.energyMonitoring, action: 'energy-monitoring' }
          ]
        },
        { 
          name: t.waterConservation, 
          action: 'water-conservation',
          subItems: [
            { name: t.waterRecycling, action: 'water-recycling' },
            { name: t.rainwaterCollection, action: 'rainwater-collection' },
            { name: t.waterFiltration, action: 'water-filtration' },
            { name: t.waterEfficientFixtures, action: 'water-efficient-fixtures' },
            { name: t.greywaterSystems, action: 'greywater-systems' },
            { name: t.waterConservationPrograms, action: 'water-conservation-programs' }
          ]
        },
        { 
          name: t.wasteManagement, 
          action: 'waste-management',
          subItems: [
            { name: t.wasteReductionMeasures, action: 'waste-reduction-measures' },
            { name: t.compostingSystems, action: 'composting-systems' },
            { name: t.recyclingPrograms, action: 'recycling-programs' },
            { name: t.zeroWaste, action: 'zero-waste' },
            { name: t.wasteAudit, action: 'waste-audit' },
            { name: t.wasteEducation, action: 'waste-education' }
          ]
        },
        { 
          name: t.sustainableFood, 
          action: 'sustainable-food',
          subItems: [
            { name: t.organicFood, action: 'organic-food' },
            { name: t.localSuppliers, action: 'local-suppliers' },
            { name: t.seasonalMenu, action: 'seasonal-menu' },
            { name: t.foodWasteReduction, action: 'food-waste-reduction' },
            { name: t.sustainableFishing, action: 'sustainable-fishing' },
            { name: t.vegetarianOptions, action: 'vegetarian-options' }
          ]
        },
        { 
          name: t.ecoTransport, 
          action: 'eco-transport',
          subItems: [
            { name: t.electricVehicles, action: 'electric-vehicles' },
            { name: t.bicycleInfrastructure, action: 'bicycle-infrastructure' },
            { name: t.publicTransport, action: 'public-transport' },
            { name: t.carpooling, action: 'carpooling' },
            { name: t.walkingPaths, action: 'walking-paths' },
            { name: t.ecoShuttle, action: 'eco-shuttle' }
          ]
        },
        { 
          name: t.greenBuilding, 
          action: 'green-building',
          subItems: [
            { name: t.greenMaterials, action: 'green-materials' },
            { name: t.naturalVentilation, action: 'natural-ventilation' },
            { name: t.greenRoof, action: 'green-roof' },
            { name: t.passiveDesign, action: 'passive-design' },
            { name: t.sustainableConstruction, action: 'sustainable-construction' },
            { name: t.ecoCertification, action: 'eco-certification' }
          ]
        },
        { 
          name: t.biodiversity, 
          action: 'biodiversity',
          subItems: [
            { name: t.nativePlants, action: 'native-plants' },
            { name: t.wildlifeHabitat, action: 'wildlife-habitat' },
            { name: t.birdSanctuary, action: 'bird-sanctuary' },
            { name: t.butterflyGarden, action: 'butterfly-garden' },
            { name: t.organicGardening, action: 'organic-gardening' },
            { name: t.biodiversityMonitoring, action: 'biodiversity-monitoring' }
          ]
        },
        { 
          name: t.communityEngagement, 
          action: 'community-engagement',
          subItems: [
            { name: t.localEmployment, action: 'local-employment' },
            { name: t.culturalPreservation, action: 'cultural-preservation' },
            { name: t.communityProjects, action: 'community-projects' },
            { name: t.educationalPrograms, action: 'educational-programs' },
            { name: t.volunteerOpportunities, action: 'volunteer-opportunities' },
            { name: t.localPartnerships, action: 'local-partnerships' }
          ]
        },
        { 
          name: t.carbonNeutrality, 
          action: 'carbon-neutrality',
          subItems: [
            { name: t.carbonOffsetting, action: 'carbon-offsetting' },
            { name: t.carbonAudit, action: 'carbon-audit' },
            { name: t.carbonReduction, action: 'carbon-reduction' },
            { name: t.carbonNeutralCertification, action: 'carbon-neutral-certification' },
            { name: t.carbonReporting, action: 'carbon-reporting' },
            { name: t.carbonEducation, action: 'carbon-education' }
          ]
        }
      ]
    }
  ];

  const handleAddNew = (type: 'course' | 'event') => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType(null);
    setEditingEventId(null);
    setFormData({
      title: '',
      description: '',
      duration: '',
      level: '',
      instructor: '',
      date: '',
      dateFrom: '',
      dateTo: '',
      type: '',
      region: '',
      status: 'active',
      image: null
    });
  };

  const handleInputChange = (field: string, value: string | File) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (modalType === 'course') {
      const newCourse: Course = {
        id: courses.length + 1,
        title: formData.title,
        description: formData.description,
        duration: formData.duration,
        level: formData.level,
        instructor: formData.instructor,
        status: formData.status as 'active' | 'inactive'
      };
      const updatedCourses = [...courses, newCourse];
      setCourses(updatedCourses);
      saveCoursesToStorage(updatedCourses);
      console.log('Сохранен новый курс:', newCourse);
    } else if (modalType === 'event') {
      // Определяем дату в зависимости от типа события
      let eventDate = formData.date;
      if (formData.type === 'eco-event') {
        eventDate = `${formData.dateFrom} - ${formData.dateTo}`;
      } else if (formData.type === 'news') {
        eventDate = new Date().toISOString().split('T')[0]; // Текущая дата для новостей
      }

      if (editingEventId) {
        // Режим редактирования - обновляем существующее событие
        const updatedEvents = events.map(event => 
          event.id === editingEventId 
            ? {
                ...event,
                title: formData.title,
                description: formData.description,
                date: eventDate,
                type: formData.type as 'holiday' | 'eco-event' | 'promotion' | 'news',
                region: formData.region,
                status: formData.status as 'active' | 'inactive'
              }
            : event
        );
        setEvents(updatedEvents);
        saveEventsToStorage(updatedEvents);
        
        // Обновляем в контексте новостей, если это новость, акция или эко-событие
        if (formData.type === 'news' || formData.type === 'promotion' || formData.type === 'eco-event') {
          // Находим старое событие
          const oldEvent = events.find(event => event.id === editingEventId);
          if (oldEvent && (oldEvent.type === 'news' || oldEvent.type === 'promotion' || oldEvent.type === 'eco-event')) {
            // Находим соответствующую новость в контексте
            const existingNewsItem = news.find(item => item.title === oldEvent.title);
            
            // Определяем правильную дату для новостей
            let newsDate = formData.date;
            if (formData.type === 'eco-event' && formData.dateFrom && formData.dateTo) {
              // Для эко-событий используем дату начала
              newsDate = formData.dateFrom;
            } else if (formData.type === 'news') {
              // Для новостей используем текущую дату
              newsDate = new Date().toISOString().split('T')[0];
            }
            
            if (existingNewsItem) {
              // Обновляем существующую новость вместо создания новой
              const updatedNewsItem = {
                ...existingNewsItem,
                title: formData.title,
                description: formData.description,
                type: formData.type as 'news' | 'promotion' | 'eco-event',
                date: newsDate,
                region: formData.region,
                status: formData.status as 'active' | 'inactive',
                image: formData.image,
                discount: formData.type === 'promotion' ? '20%' : undefined,
                validUntil: formData.type === 'promotion' ? '2024-12-31' : undefined
              };
              
              // Обновляем в контексте
              updateNews(existingNewsItem.id, updatedNewsItem);
              console.log('Обновлена существующая новость:', formData.title);
            } else {
              // Если не нашли существующую новость, добавляем новую
              addNews({
                type: formData.type as 'news' | 'promotion' | 'eco-event',
                title: formData.title,
                description: formData.description,
                date: newsDate,
                region: formData.region,
                status: formData.status as 'active' | 'inactive',
                image: formData.image,
                discount: formData.type === 'promotion' ? '20%' : undefined,
                validUntil: formData.type === 'promotion' ? '2024-12-31' : undefined
              });
              console.log('Добавлена новая новость:', formData.title, 'тип:', formData.type, 'статус:', formData.status);
            }
          }
        }
        
        console.log('Обновлено событие:', formData.title);
        
        // Автоматически очищаем дубликаты после обновления
        setTimeout(() => {
          console.log('Автоматическая очистка дубликатов после обновления...');
          clearNewsDuplicates();
          console.log('Дубликаты новостей удалены автоматически');
        }, 100);
      } else {
        // Режим создания - добавляем новое событие
        const newEvent: CalendarEvent = {
          id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          title: formData.title,
          description: formData.description,
          date: eventDate,
          type: formData.type as 'holiday' | 'eco-event' | 'promotion' | 'news',
          region: formData.region,
          status: formData.status as 'active' | 'inactive'
        };
        const updatedEvents = [...events, newEvent];
        setEvents(updatedEvents);
        saveEventsToStorage(updatedEvents);
        
        // Также добавляем в контекст новостей, если это новость, акция или эко-событие
        if (formData.type === 'news' || formData.type === 'promotion' || formData.type === 'eco-event') {
          // Определяем правильную дату для новостей
          let newsDate = formData.date;
          if (formData.type === 'eco-event' && formData.dateFrom && formData.dateTo) {
            // Для эко-событий используем дату начала
            newsDate = formData.dateFrom;
          } else if (formData.type === 'news') {
            // Для новостей используем текущую дату
            newsDate = new Date().toISOString().split('T')[0];
          }
          
          addNews({
            type: formData.type as 'news' | 'promotion' | 'eco-event',
            title: formData.title,
            description: formData.description,
            date: newsDate,
            region: formData.region,
            status: formData.status as 'active' | 'inactive',
            image: formData.image,
            discount: formData.type === 'promotion' ? '20%' : undefined,
            validUntil: formData.type === 'promotion' ? '2024-12-31' : undefined
          });
          console.log('Добавлена новая новость:', formData.title, 'тип:', formData.type, 'статус:', formData.status);
        }
        
        console.log('Сохранено новое событие:', newEvent);
      }
    }
    closeModal();
  };

  const handleStatAction = (action: string) => {
    setSelectedStatAction(action);
    setShowStatModal(true);
  };

  // Функция для принудительной очистки дубликатов
  const clearDuplicates = () => {
    console.log('=== НАЧАЛО ОЧИСТКИ ДУБЛИКАТОВ ===');
    
    // Проверяем дубликаты в событиях
    const eventTitles = events.map(event => event.title);
    const duplicateEventTitles = eventTitles.filter((title, index) => eventTitles.indexOf(title) !== index);
    console.log('Дубликаты в событиях:', duplicateEventTitles);
    
    // Удаляем дубликаты событий (оставляем только первое)
    const uniqueEvents = events.filter((event, index, self) => 
      index === self.findIndex(e => e.title === event.title)
    );
    
    if (uniqueEvents.length !== events.length) {
      console.log(`Удалено ${events.length - uniqueEvents.length} дубликатов событий`);
      setEvents(uniqueEvents);
      saveEventsToStorage(uniqueEvents);
    }
    
    // Очищаем дубликаты новостей через контекст
    clearNewsDuplicates();
    
    // Синхронизируем события с новостями
    console.log('Синхронизация событий с новостями...');
    const eventNewsTitles = uniqueEvents
      .filter(event => event.type === 'news' || event.type === 'promotion' || event.type === 'eco-event')
      .map(event => event.title);
    
    const currentNewsTitles = news.map(item => item.title);
    
    // Добавляем события в новости, если их там нет
    uniqueEvents.forEach(event => {
      if ((event.type === 'news' || event.type === 'promotion' || event.type === 'eco-event') && 
          !currentNewsTitles.includes(event.title)) {
        console.log('Добавляем событие в новости:', event.title, event.type);
        
        // Определяем правильную дату для новостей
        let newsDate = event.date;
        if (event.type === 'eco-event' && event.date.includes(' - ')) {
          // Для эко-событий берем дату начала из диапазона
          newsDate = event.date.split(' - ')[0];
        }
        
        addNews({
          type: event.type as 'news' | 'promotion' | 'eco-event',
          title: event.title,
          description: event.description,
          date: newsDate,
          region: event.region,
          status: event.status as 'active' | 'inactive',
          discount: event.type === 'promotion' ? '20%' : undefined,
          validUntil: event.type === 'promotion' ? '2024-12-31' : undefined
        });
      }
    });
    
    console.log('=== ОЧИСТКА ДУБЛИКАТОВ ЗАВЕРШЕНА ===');
    console.log('Итоговое количество событий:', uniqueEvents.length);
    console.log('Итоговое количество новостей:', news.length);
    
    // Показываем уведомление пользователю
    alert(`Очистка завершена!\nУдалено дубликатов событий: ${events.length - uniqueEvents.length}\nДубликаты новостей очищены автоматически`);
  };

  const closeStatModal = () => {
    setShowStatModal(false);
    setSelectedStatAction(null);
  };

  const toggleExpanded = (itemName: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemName)) {
      newExpanded.delete(itemName);
    } else {
      newExpanded.add(itemName);
    }
    setExpandedItems(newExpanded);
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setModalType('event');
    setEditingEventId(event.id);
    
    // Находим соответствующую новость в контексте для получения изображения
    const newsItem = news.find(item => item.title === event.title);
    
    setFormData({
      title: event.title,
      description: event.description,
      duration: '',
      level: '',
      instructor: '',
      date: event.date.includes(' - ') ? '' : event.date,
      dateFrom: event.date.includes(' - ') ? event.date.split(' - ')[0] : '',
      dateTo: event.date.includes(' - ') ? event.date.split(' - ')[1] : '',
      type: event.type,
      region: event.region,
      status: event.status,
      image: newsItem?.image || null
    });
    setShowModal(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    if (confirm('Вы уверены, что хотите удалить это событие?')) {
      const updatedEvents = events.filter(event => event.id !== eventId);
      setEvents(updatedEvents);
      saveEventsToStorage(updatedEvents);
      
      // Также удаляем из контекста новостей, если это новость, акция или эко-событие
      const eventToDelete = events.find(event => event.id === eventId);
      if (eventToDelete && (eventToDelete.type === 'news' || eventToDelete.type === 'promotion' || eventToDelete.type === 'eco-event')) {
        console.log('Удаляем событие из контекста:', eventToDelete.title, eventToDelete.type);
        
        // Удаляем все новости с таким же названием (на случай дублирования)
        const newsToDelete = news.filter(item => item.title === eventToDelete.title);
        console.log('Найдено новостей для удаления:', newsToDelete.length);
        
        newsToDelete.forEach(newsItem => {
          console.log('Удаляем новость по ID:', newsItem.id, newsItem.title);
          deleteNews(newsItem.id);
        });
        
        // Также удаляем по названию для надежности
        console.log('Удаляем по названию:', eventToDelete.title);
        deleteNewsByTitle(eventToDelete.title);
        
        // Принудительно обновляем состояние
        setTimeout(() => {
          console.log('Принудительное обновление состояния после удаления');
          const currentNews = news.filter(item => item.title !== eventToDelete.title);
          console.log('Оставшиеся новости:', currentNews.map(item => ({ id: item.id, title: item.title, type: item.type })));
        }, 100);
      }
    }
  };

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-green-800">{t.coursesForGuides}</h3>
        <button
          onClick={() => handleAddNew('course')}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Добавить курс</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-lg font-semibold text-green-800">{course.title}</h4>
              <span className={`px-2 py-1 rounded-full text-xs ${
                course.status === 'active' ? 'bg-green-100 text-green-800' :
                course.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {course.status === 'active' ? 'Активен' : 
                 course.status === 'inactive' ? 'Неактивен' : 'Архив'}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600"><strong>Длительность:</strong> {course.duration}</p>
              <p className="text-sm text-gray-600"><strong>Уровень:</strong> {course.level}</p>
              <p className="text-sm text-gray-600"><strong>Инструктор:</strong> {course.instructor}</p>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 bg-green-100 text-green-800 py-2 rounded-lg hover:bg-green-200 flex items-center justify-center space-x-1">
                <EyeIcon className="w-4 h-4" />
                <span>Просмотр</span>
              </button>
              <button className="flex-1 bg-blue-100 text-blue-800 py-2 rounded-lg hover:bg-blue-200 flex items-center justify-center space-x-1">
                <PencilIcon className="w-4 h-4" />
                <span>Редактировать</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCalendar = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-green-800">{t.eventCalendarFull}</h3>
        <div className="flex space-x-2">
          <button
            onClick={checkNewsState}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <span>Проверить состояние</span>
          </button>
          <button
            onClick={clearDuplicates}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Очистить дубликаты
          </button>
          <button
            onClick={clearNewsDuplicates}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Очистить дубликаты новостей
          </button>
          <button
            onClick={clearAllNewsAndEvents}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center space-x-2"
          >
            <span>Очистить ВСЕ</span>
          </button>
          <button
            onClick={() => handleAddNew('event')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Добавить событие/новость</span>
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={`${event.id}_${index}`} className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-lg font-semibold text-green-800">{event.title}</h4>
              <div className="flex space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  event.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {event.status === 'active' ? 'Активно' : 'Неактивно'}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  event.type === 'holiday' ? 'bg-blue-100 text-blue-800' :
                  event.type === 'eco-event' ? 'bg-green-100 text-green-800' :
                  event.type === 'news' ? 'bg-purple-100 text-purple-800' :
                  event.type === 'promotion' ? 'bg-orange-100 text-orange-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {event.type === 'holiday' ? 'Праздник' : 
                   event.type === 'eco-event' ? 'Эко-событие' :
                   event.type === 'news' ? 'Новость' :
                   event.type === 'promotion' ? 'Акция' : 'Событие'}
                </span>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{event.description}</p>
            <div className="flex justify-between items-center">
              <div className="flex space-x-4 text-sm text-gray-600">
                <span>Дата: {event.date}</span>
                <span>Регион: {event.region}</span>
                {event.type === 'news' && <span>Категория: Новость</span>}
                {event.type === 'promotion' && <span>Категория: Акция</span>}
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleEditEvent(event)}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded hover:bg-green-200 text-sm"
                >
                  Редактировать
                </button>
                <button 
                  onClick={() => handleDeleteEvent(event.id)}
                  className="bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200 text-sm"
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStatistics = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-green-800">{t.statisticsAndAnalytics}</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((section) => (
          <div key={section.id} className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-green-800">{section.title}</h3>
              <button
                onClick={() => toggleExpanded(section.title)}
                className="text-green-600 hover:text-green-800"
              >
                {expandedItems.has(section.title) ? (
                  <ChevronDownIcon className="w-5 h-5" />
                ) : (
                  <ChevronRightIcon className="w-5 h-5" />
                )}
              </button>
            </div>
            
            {expandedItems.has(section.title) && (
              <div className="space-y-2 mt-4">
                {section.items.map((item, index) => (
                  <div key={index} className="border-l-2 border-green-200 pl-4">
                    <button
                      onClick={() => handleStatAction(item.action)}
                      className="w-full text-left p-2 bg-green-50 rounded hover:bg-green-100 transition-colors mb-2"
                    >
                      <span className="text-sm font-medium text-green-700">{item.name}</span>
                    </button>
                    <div className="ml-4 space-y-1">
                      {item.subItems.map((subItem, subIndex) => (
                        <button
                          key={subIndex}
                          onClick={() => handleStatAction(subItem.action)}
                          className="w-full text-left p-2 text-xs text-green-600 hover:bg-green-50 rounded transition-colors"
                        >
                          {subItem.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderDashboard = (action: string) => {
    switch (action) {
      case 'total-tourists':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-blue-800 mb-2">Всего туристов</h4>
                <p className="text-3xl font-bold text-blue-600">{dashboardData.totalTourists.toLocaleString()}</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-green-800 mb-2">{t.activeTourists}</h4>
                <p className="text-3xl font-bold text-green-600">{dashboardData.activeTourists.toLocaleString()}</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-purple-800 mb-2">Новые регистрации</h4>
                <p className="text-3xl font-bold text-purple-600">{dashboardData.newRegistrations.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">География туристов</h4>
              <div className="space-y-3">
                {Object.entries(dashboardData.touristGeography).map(([region, count]) => (
                  <div key={region} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">{region}</span>
                    <span className="text-lg font-bold text-blue-600">{count.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'total-bookings':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-blue-800 mb-2">{t.totalBookings}</h4>
                <p className="text-3xl font-bold text-blue-600">{dashboardData.totalBookings.toLocaleString()}</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-green-800 mb-2">Подтвержденные</h4>
                <p className="text-3xl font-bold text-green-600">{dashboardData.confirmedBookings.toLocaleString()}</p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-yellow-800 mb-2">Ожидающие</h4>
                <p className="text-3xl font-bold text-yellow-600">{dashboardData.pendingBookings.toLocaleString()}</p>
              </div>
              <div className="bg-red-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-red-800 mb-2">Отмененные</h4>
                <p className="text-3xl font-bold text-red-600">{dashboardData.cancelledBookings.toLocaleString()}</p>
              </div>
            </div>
          </div>
        );
        
      case 'carbon-footprint':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Средний углеродный след: {dashboardData.averageCarbonFootprint} т CO2</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-700 mb-3">По регионам</h5>
                  <div className="space-y-2">
                    {Object.entries(dashboardData.carbonByRegion).map(([region, carbon]) => (
                      <div key={region} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-600">{region}</span>
                        <span className="font-semibold text-green-600">{carbon} т CO2</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-700 mb-3">По типам туров</h5>
                  <div className="space-y-2">
                    {Object.entries(dashboardData.carbonByTourType).map(([type, carbon]) => (
                      <div key={type} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-600">{type}</span>
                        <span className="font-semibold text-green-600">{carbon} т CO2</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Тенденции углеродного следа</h4>
              <div className="flex space-x-2 overflow-x-auto">
                {dashboardData.carbonTrends.map((trend, index) => (
                  <div key={index} className="flex flex-col items-center min-w-[60px]">
                    <div className="w-8 bg-green-500 rounded-t" style={{ height: `${(trend.value / 3.4) * 100}px` }}></div>
                    <span className="text-xs text-gray-600 mt-1">{trend.month}</span>
                    <span className="text-xs font-semibold text-green-600">{trend.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'co2-compensation':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-green-800 mb-2">Компенсация CO2</h4>
                <p className="text-3xl font-bold text-green-600">{dashboardData.co2Compensation}%</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-blue-800 mb-2">Эффективность</h4>
                <p className="text-3xl font-bold text-blue-600">{dashboardData.compensationEffectiveness}%</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Сравнение методов компенсации</h4>
              <div className="space-y-3">
                {Object.entries(dashboardData.compensationComparison).map(([method, percentage]) => (
                  <div key={method} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">{method}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                      </div>
                      <span className="text-lg font-bold text-green-600">{percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Прогноз компенсации</h4>
              <div className="flex space-x-2 overflow-x-auto">
                {dashboardData.compensationForecast.map((forecast, index) => (
                  <div key={index} className="flex flex-col items-center min-w-[60px]">
                    <div className="w-8 bg-green-500 rounded-t" style={{ height: `${(forecast.value / 85.2) * 100}px` }}></div>
                    <span className="text-xs text-gray-600 mt-1">{forecast.month}</span>
                    <span className="text-xs font-semibold text-green-600">{forecast.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Обзор дашборда</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-blue-800 mb-2">Всего туристов</h5>
                  <p className="text-2xl font-bold text-blue-600">15,420</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-green-800 mb-2">{t.activeTourists}</h5>
                  <p className="text-2xl font-bold text-green-600">8,920</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-purple-800 mb-2">Новые регистрации</h5>
                  <p className="text-2xl font-bold text-purple-600">2,340</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-orange-800 mb-2">Средний углеродный след</h5>
                  <p className="text-2xl font-bold text-orange-600">2.4 т CO2</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Топ регионов по активности</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Алматы</span>
                  <span className="text-lg font-bold text-blue-600">4,500 туристов</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Астана</span>
                  <span className="text-lg font-bold text-blue-600">3,200 туристов</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Шымкент</span>
                  <span className="text-lg font-bold text-blue-600">2,100 туристов</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Экологические показатели</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-700 mb-3">Компенсация CO2</h5>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '78.5%' }}></div>
                    </div>
                    <span className="text-lg font-bold text-green-600">78.5%</span>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-700 mb-3">Эффективность компенсации</h5>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85.2%' }}></div>
                    </div>
                    <span className="text-lg font-bold text-blue-600">85.2%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  const renderRegionsReport = (action: string) => {
    switch (action) {
      case 'activity-map':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Карта активности регионов</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(regionsData.activityMap).map(([region, data]) => (
                  <div key={region} className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-gray-800 mb-2">{region}</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t.tourists}:</span>
                        <span className="font-semibold text-blue-600">{data.tourists.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Бронирования:</span>
                        <span className="font-semibold text-green-600">{data.bookings.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Эко-рейтинг:</span>
                        <span className="font-semibold text-purple-600">{data.ecoRating}/10</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'heat-map':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Тепловая карта Казахстана</h4>
              <p className="text-sm text-gray-600 mb-6">Интенсивность цвета показывает соотношение количества туристов к примененным мерам по снижению выбросов</p>
              
              {/* Легенда */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h5 className="font-semibold text-gray-800 mb-3">Легенда интенсивности</h5>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-red-100 border-2 border-red-300 rounded"></div>
                    <span>Низкая интенсивность (0-30%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-yellow-100 border-2 border-yellow-300 rounded"></div>
                    <span>Средняя интенсивность (31-60%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-green-100 border-2 border-green-300 rounded"></div>
                    <span>Высокая интенсивность (61-100%)</span>
                  </div>
                </div>
              </div>
              
              {/* Подкрашенный список регионов */}
              <div className="space-y-3">
                {Object.entries(heatMapData.regions)
                  .sort(([,a], [,b]) => b.intensity - a.intensity) // Сортировка по интенсивности
                  .map(([region, data]) => {
                    // Определяем цветовую схему на основе интенсивности
                    let bgColor, borderColor, textColor;
                    if (data.intensity >= 70) {
                      bgColor = 'bg-green-50';
                      borderColor = 'border-green-200';
                      textColor = 'text-green-800';
                    } else if (data.intensity >= 40) {
                      bgColor = 'bg-yellow-50';
                      borderColor = 'border-yellow-200';
                      textColor = 'text-yellow-800';
                    } else {
                      bgColor = 'bg-red-50';
                      borderColor = 'border-red-200';
                      textColor = 'text-red-800';
                    }
                    
                    return (
                      <div key={region} className={`${bgColor} ${borderColor} border-2 rounded-lg p-4 hover:shadow-md transition-shadow`}>
                        <div className="flex justify-between items-start mb-3">
                          <h6 className={`font-semibold ${textColor} text-lg`}>{region}</h6>
                          <div className="flex items-center space-x-2">
                            <div className={`w-4 h-4 ${bgColor.replace('bg-', 'bg-').replace('-50', '-300')} border border-gray-300 rounded-full`}></div>
                            <span className={`font-bold ${textColor}`}>{data.intensity}%</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="bg-white p-3 rounded-lg">
                            <div className="text-sm text-gray-600 mb-1">{t.tourists}</div>
                            <div className="text-xl font-bold text-blue-600">{data.tourists.toLocaleString()}</div>
                          </div>
                          
                          <div className="bg-white p-3 rounded-lg">
                            <div className="text-sm text-gray-600 mb-1">Снижение выбросов</div>
                            <div className="text-xl font-bold text-green-600">{data.emissionsReduction}%</div>
                          </div>
                          
                          <div className="bg-white p-3 rounded-lg">
                            <div className="text-sm text-gray-600 mb-1">Эко-меры</div>
                            <div className="text-xl font-bold text-purple-600">{data.ecoMeasures}</div>
                          </div>
                          
                          <div className="bg-white p-3 rounded-lg">
                            <div className="text-sm text-gray-600 mb-1">Эффективность</div>
                            <div className="text-xl font-bold text-orange-600">
                              {Math.round((data.tourists * data.emissionsReduction) / 100)} т CO2
                            </div>
                          </div>
                        </div>
                        
                        {/* Прогресс-бар интенсивности */}
                        <div className="mt-3">
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Интенсивность активности</span>
                            <span>{data.intensity}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                data.intensity >= 70 ? 'bg-green-500' : 
                                data.intensity >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${data.intensity}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              
              {/* Общая статистика */}
              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <h5 className="font-semibold text-gray-800 mb-3">{t.generalKazakhstanStatistics}</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {Object.values(heatMapData.regions).reduce((sum, data) => sum + data.tourists, 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Всего туристов</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {Math.round(Object.values(heatMapData.regions).reduce((sum, data) => sum + data.emissionsReduction, 0) / Object.keys(heatMapData.regions).length)}%
                    </div>
                    <div className="text-sm text-gray-600">Среднее снижение выбросов</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {Object.values(heatMapData.regions).reduce((sum, data) => sum + data.ecoMeasures, 0)}
                    </div>
                    <div className="text-sm text-gray-600">Всего эко-мер</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'top-directions':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Топ-5 направлений по популярности</h4>
              <div className="space-y-3">
                {regionsData.topDirections.popularity.map((direction, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-bold text-gray-500">#{index + 1}</span>
                      <div>
                        <h5 className="font-semibold text-gray-800">{direction.name}</h5>
                        <p className="text-sm text-gray-600">Рейтинг: {direction.rating}/10</p>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-blue-600">{direction.tourists.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Топ-5 направлений по доходам</h4>
              <div className="space-y-3">
                {regionsData.topDirections.revenue.map((direction, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-bold text-gray-500">#{index + 1}</span>
                      <div>
                        <h5 className="font-semibold text-gray-800">{direction.name}</h5>
                        <p className="text-sm text-gray-600">Рейтинг: {direction.rating}/10</p>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-green-600">{direction.revenue.toLocaleString()} ₸</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Топ-5 направлений по эко-рейтингу</h4>
              <div className="space-y-3">
                {regionsData.topDirections.ecoRating.map((direction, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-bold text-gray-500">#{index + 1}</span>
                      <div>
                        <h5 className="font-semibold text-gray-800">{direction.name}</h5>
                        <p className="text-sm text-gray-600">{t.tourists}: {direction.tourists.toLocaleString()}</p>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-purple-600">{direction.ecoRating}/10</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'green-regions':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Эко-инфраструктура по регионам</h4>
              <div className="space-y-3">
                {regionsData.greenRegions.ecoInfrastructure.map((region, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-bold text-gray-500">#{index + 1}</span>
                      <div>
                        <h5 className="font-semibold text-gray-800">{region.region}</h5>
                        <p className="text-sm text-gray-600">Проектов: {region.projects}</p>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-green-600">{region.score}/10</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Эко-активности по регионам</h4>
              <div className="space-y-3">
                {regionsData.greenRegions.ecoActivities.map((region, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-bold text-gray-500">#{index + 1}</span>
                      <div>
                        <h5 className="font-semibold text-gray-800">{region.region}</h5>
                        <p className="text-sm text-gray-600">Активностей: {region.activities}</p>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-blue-600">{region.participants.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Эко-сертификаты по регионам</h4>
              <div className="space-y-3">
                {regionsData.greenRegions.ecoCertificates.map((region, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-bold text-gray-500">#{index + 1}</span>
                      <div>
                        <h5 className="font-semibold text-gray-800">{region.region}</h5>
                        <p className="text-sm text-gray-600">Отелей: {region.hotels}</p>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-purple-600">{region.certificates}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Обзор региональной активности</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-blue-800 mb-2">Алматы</h5>
                  <p className="text-lg font-bold text-blue-600">4,500 туристов</p>
                  <p className="text-sm text-gray-600">Эко-рейтинг: 8.5/10</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-green-800 mb-2">Астана</h5>
                  <p className="text-lg font-bold text-green-600">3,200 туристов</p>
                  <p className="text-sm text-gray-600">Эко-рейтинг: 7.8/10</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-purple-800 mb-2">Шымкент</h5>
                  <p className="text-lg font-bold text-purple-600">2,100 туристов</p>
                  <p className="text-sm text-gray-600">Эко-рейтинг: 6.9/10</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-orange-800 mb-2">Алматинская область</h5>
                  <p className="text-lg font-bold text-orange-600">2,800 туристов</p>
                  <p className="text-sm text-gray-600">Эко-рейтинг: 9.2/10</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Топ направлений</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h5 className="font-semibold text-gray-800">Алматы - Чимбулак</h5>
                    <p className="text-sm text-gray-600">Рейтинг: 9.1/10</p>
                  </div>
                  <span className="text-lg font-bold text-blue-600">3,200 туристов</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h5 className="font-semibold text-gray-800">Астана - Бурабай</h5>
                    <p className="text-sm text-gray-600">Рейтинг: 8.7/10</p>
                  </div>
                  <span className="text-lg font-bold text-blue-600">2,800 туристов</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h5 className="font-semibold text-gray-800">Алматы - Балхаш</h5>
                    <p className="text-sm text-gray-600">Рейтинг: 8.3/10</p>
                  </div>
                  <span className="text-lg font-bold text-blue-600">2,100 туристов</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Эко-инфраструктура</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-700 mb-3">Лучшие регионы</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-600">Алматинская область</span>
                      <span className="font-semibold text-green-600">9.2/10</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-600">Алматы</span>
                      <span className="font-semibold text-green-600">8.5/10</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-600">Астана</span>
                      <span className="font-semibold text-green-600">7.8/10</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-700 mb-3">Эко-активности</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-600">Алматинская область</span>
                      <span className="font-semibold text-blue-600">25 активностей</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-600">Алматы</span>
                      <span className="font-semibold text-blue-600">18 активностей</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-600">Астана</span>
                      <span className="font-semibold text-blue-600">12 активностей</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  const renderGuidesReport = (action: string) => {
    switch (action) {
      case 'guides-overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-blue-800 mb-2">Всего гидов</h4>
                <p className="text-3xl font-bold text-blue-600">{guidesData.totalGuides.toLocaleString()}</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-green-800 mb-2">Активные гиды</h4>
                <p className="text-3xl font-bold text-green-600">{guidesData.activeGuides.toLocaleString()}</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-purple-800 mb-2">Новые гиды</h4>
                <p className="text-3xl font-bold text-purple-600">{guidesData.newGuides.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Гиды по регионам</h4>
                <div className="space-y-3">
                  {Object.entries(guidesData.guidesByRegion).map(([region, count]) => (
                    <div key={region} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-700">{region}</span>
                      <span className="text-lg font-bold text-blue-600">{count.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Гиды по уровням</h4>
                <div className="space-y-3">
                  {Object.entries(guidesData.guidesByLevel).map(([level, count]) => (
                    <div key={level} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-700">{level}</span>
                      <span className="text-lg font-bold text-green-600">{count.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'guides-ratings':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Распределение рейтингов</h4>
              <div className="space-y-3">
                {Object.entries(guidesData.ratingDistribution).map(([rating, count]) => (
                  <div key={rating} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">{rating}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${(count / 156) * 100}%` }}></div>
                      </div>
                      <span className="text-lg font-bold text-yellow-600">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Топ гиды</h4>
              <div className="space-y-3">
                {guidesData.topGuides.map((guide, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-bold text-gray-500">#{index + 1}</span>
                      <div>
                        <h5 className="font-semibold text-gray-800">{guide.name}</h5>
                        <p className="text-sm text-gray-600">{guide.region} • {guide.tours} туров</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-yellow-600">{guide.rating} ⭐</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Удовлетворенность клиентов</h4>
              <div className="text-center">
                <p className="text-4xl font-bold text-green-600">{guidesData.performanceMetrics.customerSatisfaction}%</p>
                <p className="text-gray-600 mt-2">Средний показатель удовлетворенности</p>
              </div>
            </div>
          </div>
        );
        
      case 'guides-training':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Завершенные курсы</h4>
              <div className="space-y-3">
                {Object.entries(guidesData.coursesCompleted).map(([course, count]) => (
                  <div key={course} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">{course}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(count / 156) * 100}%` }}></div>
                      </div>
                      <span className="text-lg font-bold text-blue-600">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Статус сертификации</h4>
              <div className="space-y-3">
                {Object.entries(guidesData.certificationStatus).map(([status, count]) => (
                  <div key={status} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">{status}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(count / 156) * 100}%` }}></div>
                      </div>
                      <span className="text-lg font-bold text-green-600">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Прогресс обучения</h4>
              <div className="space-y-3">
                {Object.entries(guidesData.trainingProgress).map(([progress, count]) => (
                  <div key={progress} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">{progress}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${(count / 156) * 100}%` }}></div>
                      </div>
                      <span className="text-lg font-bold text-purple-600">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'guides-performance':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-blue-800 mb-2">Средний рейтинг</h4>
                <p className="text-3xl font-bold text-blue-600">{guidesData.performanceMetrics.averageRating}</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-green-800 mb-2">Всего туров</h4>
                <p className="text-3xl font-bold text-green-600">{guidesData.performanceMetrics.totalTours.toLocaleString()}</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-purple-800 mb-2">Среднее туров на гида</h4>
                <p className="text-3xl font-bold text-purple-600">{guidesData.performanceMetrics.averageToursPerGuide}</p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-yellow-800 mb-2">Удовлетворенность</h4>
                <p className="text-3xl font-bold text-yellow-600">{guidesData.performanceMetrics.customerSatisfaction}%</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Специализации гидов</h4>
              <div className="space-y-3">
                {Object.entries(guidesData.specializations).map(([specialization, count]) => (
                  <div key={specialization} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">{specialization}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${(count / 156) * 100}%` }}></div>
                      </div>
                      <span className="text-lg font-bold text-orange-600">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'energy-efficiency':
      case 'water-conservation':
      case 'waste-management':
      case 'sustainable-food':
      case 'eco-transport':
      case 'green-building':
      case 'biodiversity':
      case 'community-engagement':
      case 'carbon-neutrality':
        return renderAccommodationEcoMeasures(action);
        
      default:
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">{t.guidesOverview}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-blue-800 mb-2">Всего гидов</h5>
                  <p className="text-lg font-bold text-blue-600">{guidesData.totalGuides}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-green-800 mb-2">Активные гиды</h5>
                  <p className="text-lg font-bold text-green-600">{guidesData.activeGuides}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-purple-800 mb-2">Средний рейтинг</h5>
                  <p className="text-lg font-bold text-purple-600">{guidesData.performanceMetrics.averageRating}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-yellow-800 mb-2">Удовлетворенность</h5>
                  <p className="text-lg font-bold text-yellow-600">{guidesData.performanceMetrics.customerSatisfaction}%</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Топ гиды по рейтингу</h4>
              <div className="space-y-3">
                {guidesData.topGuides.slice(0, 3).map((guide, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-bold text-gray-500">#{index + 1}</span>
                      <div>
                        <h5 className="font-semibold text-gray-800">{guide.name}</h5>
                        <p className="text-sm text-gray-600">{guide.region} • {guide.tours} туров</p>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-yellow-600">{guide.rating} ⭐</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Обучение и сертификация</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-700 mb-3">Статус сертификации</h5>
                  <div className="space-y-2">
                    {Object.entries(guidesData.certificationStatus).map(([status, count]) => (
                      <div key={status} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-600">{status}</span>
                        <span className="font-semibold text-green-600">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-700 mb-3">Прогресс обучения</h5>
                  <div className="space-y-2">
                    {Object.entries(guidesData.trainingProgress).map(([progress, count]) => (
                      <div key={progress} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-600">{progress}</span>
                        <span className="font-semibold text-blue-600">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  const renderAccommodationEcoMeasures = (action: string) => {
    // Моковые данные для экологических мер точек размещения
    const ecoMeasuresData = {
      energyEfficiency: {
        totalAccommodations: 150,
        implementingMeasures: 89,
        solarEnergy: 45,
        windEnergy: 23,
        geothermalEnergy: 12,
        energyStorage: 34,
        smartLighting: 67,
        energyMonitoring: 78
      },
      waterConservation: {
        totalAccommodations: 150,
        implementingMeasures: 112,
        waterRecycling: 56,
        rainwaterCollection: 78,
        waterFiltration: 89,
        waterEfficientFixtures: 134,
        greywaterSystems: 45,
        waterConservationPrograms: 67
      },
      wasteManagement: {
        totalAccommodations: 150,
        implementingMeasures: 98,
        wasteReduction: 67,
        compostingSystems: 45,
        recyclingPrograms: 89,
        zeroWaste: 23,
        wasteAudit: 56,
        wasteEducation: 78
      },
      sustainableFood: {
        totalAccommodations: 150,
        implementingMeasures: 134,
        organicFood: 89,
        localSuppliers: 112,
        seasonalMenu: 78,
        foodWasteReduction: 67,
        sustainableFishing: 45,
        vegetarianOptions: 98
      },
      ecoTransport: {
        totalAccommodations: 150,
        implementingMeasures: 67,
        electricVehicles: 34,
        bicycleInfrastructure: 56,
        publicTransport: 89,
        carpooling: 45,
        walkingPaths: 78,
        ecoShuttle: 23
      },
      greenBuilding: {
        totalAccommodations: 150,
        implementingMeasures: 89,
        greenMaterials: 67,
        naturalVentilation: 78,
        greenRoof: 34,
        passiveDesign: 45,
        sustainableConstruction: 56,
        ecoCertification: 89
      },
      biodiversity: {
        totalAccommodations: 150,
        implementingMeasures: 78,
        nativePlants: 67,
        wildlifeHabitat: 45,
        birdSanctuary: 34,
        butterflyGarden: 23,
        organicGardening: 89,
        biodiversityMonitoring: 56
      },
      communityEngagement: {
        totalAccommodations: 150,
        implementingMeasures: 112,
        localEmployment: 134,
        culturalPreservation: 89,
        communityProjects: 67,
        educationalPrograms: 78,
        volunteerOpportunities: 56,
        localPartnerships: 98
      },
      carbonNeutrality: {
        totalAccommodations: 150,
        implementingMeasures: 45,
        carbonOffsetting: 34,
        carbonAudit: 56,
        carbonReduction: 67,
        carbonNeutralCertification: 23,
        carbonReporting: 45,
        carbonEducation: 78
      }
    };

    // Конкретные примеры точек размещения с их мерами
    const accommodationExamples = {
      energyEfficiency: [
        { name: "Eco Hotel Almaty", region: "Алматы", score: 95, measures: ["Солнечные панели 50 кВт", "Умное освещение LED", "Система мониторинга энергии"], status: "Лидер" },
        { name: "Green Resort Shymkent", region: "Шымкент", score: 88, measures: ["Ветровые турбины", "Геотермальное отопление", "Аккумуляторы энергии"], status: "Активный" },
        { name: "Solar Lodge Astana", region: "Астана", score: 82, measures: ["Солнечные коллекторы", "Энергоэффективные окна", "Автоматизация систем"], status: "Развивающийся" },
        { name: "Wind Eco Hotel", region: "Алматинская область", score: 78, measures: ["Ветровая энергия", "Умные термостаты", "Энергосберегающие приборы"], status: "Активный" },
        { name: "Smart Energy Resort", region: "Алматы", score: 75, measures: ["Гибридная система", "Мониторинг в реальном времени", "Оптимизация нагрузки"], status: "Развивающийся" },
        { name: "Eco Power Lodge", region: "Шымкент", score: 72, measures: ["Микро-ГЭС", "Солнечные панели", "Система управления"], status: "Активный" },
        { name: "Green Energy Hotel", region: "Астана", score: 68, measures: ["Биомассовые котлы", "Тепловые насосы", "Энергоаудит"], status: "Развивающийся" },
        { name: "Sustainable Power Inn", region: "Алматинская область", score: 65, measures: ["Солнечные водонагреватели", "Энергоэффективная вентиляция", "Умные счетчики"], status: "Активный" },
        { name: "Eco Energy Resort", region: "Алматы", score: 62, measures: ["Ветровые генераторы", "Геотермальные системы", "Автоматизация"], status: "Развивающийся" },
        { name: "Green Power Lodge", region: "Шымкент", score: 58, measures: ["Солнечные панели", "Энергосберегающие технологии", "Мониторинг"], status: "Активный" }
      ],
      waterConservation: [
        { name: "Aqua Eco Hotel", region: "Алматы", score: 96, measures: ["Система очистки воды", "Сбор дождевой воды", "Водосберегающая сантехника"], status: "Лидер" },
        { name: "Water Wise Resort", region: "Шымкент", score: 91, measures: ["Система серой воды", "Фильтрация воды", "Программы экономии"], status: "Активный" },
        { name: "Eco Water Lodge", region: "Астана", score: 87, measures: ["Переработка воды", "Умные краны", "Мониторинг расхода"], status: "Развивающийся" },
        { name: "Sustainable Water Inn", region: "Алматинская область", score: 84, measures: ["Система рециркуляции", "Водосберегающие души", "Образовательные программы"], status: "Активный" },
        { name: "Green Water Hotel", region: "Алматы", score: 81, measures: ["Очистка сточных вод", "Система орошения", "Контроль утечек"], status: "Развивающийся" },
        { name: "Eco Aqua Resort", region: "Шымкент", score: 78, measures: ["Система фильтрации", "Водосберегающие туалеты", "Мониторинг качества"], status: "Активный" },
        { name: "Water Conservation Lodge", region: "Астана", score: 75, measures: ["Система сбора дождевой воды", "Экономичные смесители", "Обучение персонала"], status: "Развивающийся" },
        { name: "Sustainable Aqua Inn", region: "Алматинская область", score: 72, measures: ["Система очистки", "Водосберегающие технологии", "Программы осведомленности"], status: "Активный" },
        { name: "Green Water Resort", region: "Алматы", score: 69, measures: ["Система рециркуляции", "Умные счетчики воды", "Контроль качества"], status: "Развивающийся" },
        { name: "Eco Water Inn", region: "Шымкент", score: 66, measures: ["Система фильтрации", "Водосберегающая сантехника", "Мониторинг"], status: "Активный" }
      ],
      wasteManagement: [
        { name: "Zero Waste Hotel", region: "Алматы", score: 98, measures: ["Полная переработка отходов", "Компостирование", "Система сортировки"], status: "Лидер" },
        { name: "Eco Waste Resort", region: "Шымкент", score: 92, measures: ["Программы переработки", "Система компостирования", "Образовательные программы"], status: "Активный" },
        { name: "Green Waste Lodge", region: "Астана", score: 88, measures: ["Сортировка отходов", "Компостирование", "Сокращение пластика"], status: "Развивающийся" },
        { name: "Sustainable Waste Inn", region: "Алматинская область", score: 85, measures: ["Переработка бумаги", "Система компостирования", "Обучение персонала"], status: "Активный" },
        { name: "Eco Waste Hotel", region: "Алматы", score: 82, measures: ["Сортировка отходов", "Переработка стекла", "Сокращение отходов"], status: "Развивающийся" },
        { name: "Green Waste Resort", region: "Шымкент", score: 79, measures: ["Система компостирования", "Переработка пластика", "Образовательные программы"], status: "Активный" },
        { name: "Zero Waste Lodge", region: "Астана", score: 76, measures: ["Полная переработка", "Компостирование", "Сокращение отходов"], status: "Развивающийся" },
        { name: "Sustainable Waste Inn", region: "Алматинская область", score: 73, measures: ["Сортировка отходов", "Переработка", "Обучение"], status: "Активный" },
        { name: "Eco Waste Resort", region: "Алматы", score: 70, measures: ["Система компостирования", "Переработка", "Сокращение отходов"], status: "Развивающийся" },
        { name: "Green Waste Hotel", region: "Шымкент", score: 67, measures: ["Сортировка отходов", "Компостирование", "Образовательные программы"], status: "Активный" }
      ],
      sustainableFood: [
        { name: "Organic Farm Hotel", region: "Алматы", score: 97, measures: ["Собственная органическая ферма", "Местные поставщики", "Сезонное меню"], status: "Лидер" },
        { name: "Farm to Table Resort", region: "Шымкент", score: 93, measures: ["Партнерство с местными фермерами", "Органические продукты", "Сокращение пищевых отходов"], status: "Активный" },
        { name: "Eco Food Lodge", region: "Астана", score: 89, measures: ["Органические ингредиенты", "Вегетарианские опции", "Устойчивое рыболовство"], status: "Развивающийся" },
        { name: "Sustainable Food Inn", region: "Алматинская область", score: 86, measures: ["Местные поставщики", "Сезонное меню", "Сокращение отходов"], status: "Активный" },
        { name: "Green Food Hotel", region: "Алматы", score: 83, measures: ["Органические продукты", "Вегетарианские блюда", "Образовательные программы"], status: "Развивающийся" },
        { name: "Eco Food Resort", region: "Шымкент", score: 80, measures: ["Местные поставщики", "Органические ингредиенты", "Сокращение пищевых отходов"], status: "Активный" },
        { name: "Sustainable Food Lodge", region: "Астана", score: 77, measures: ["Органические продукты", "Сезонное меню", "Вегетарианские опции"], status: "Развивающийся" },
        { name: "Green Food Inn", region: "Алматинская область", score: 74, measures: ["Местные поставщики", "Органические ингредиенты", "Сокращение отходов"], status: "Активный" },
        { name: "Eco Food Resort", region: "Алматы", score: 71, measures: ["Органические продукты", "Вегетарианские блюда", "Образовательные программы"], status: "Развивающийся" },
        { name: "Sustainable Food Hotel", region: "Шымкент", score: 68, measures: ["Местные поставщики", "Органические ингредиенты", "Сокращение пищевых отходов"], status: "Активный" }
      ],
      ecoTransport: [
        { name: "Electric Vehicle Hotel", region: "Алматы", score: 94, measures: ["Электромобили для гостей", "Зарядные станции", "Велосипедная инфраструктура"], status: "Лидер" },
        { name: "Bike Friendly Resort", region: "Шымкент", score: 90, measures: ["Прокат велосипедов", "Велосипедные дорожки", "Общественный транспорт"], status: "Активный" },
        { name: "Eco Transport Lodge", region: "Астана", score: 86, measures: ["Эко-шаттл", "Пешеходные дорожки", "Карпулинг"], status: "Развивающийся" },
        { name: "Sustainable Transport Inn", region: "Алматинская область", score: 83, measures: ["Электромобили", "Велосипедная инфраструктура", "Общественный транспорт"], status: "Активный" },
        { name: "Green Transport Hotel", region: "Алматы", score: 80, measures: ["Зарядные станции", "Прокат велосипедов", "Пешеходные дорожки"], status: "Развивающийся" },
        { name: "Eco Transport Resort", region: "Шымкент", score: 77, measures: ["Эко-шаттл", "Велосипедная инфраструктура", "Карпулинг"], status: "Активный" },
        { name: "Sustainable Transport Lodge", region: "Астана", score: 74, measures: ["Электромобили", "Общественный транспорт", "Пешеходные дорожки"], status: "Развивающийся" },
        { name: "Green Transport Inn", region: "Алматинская область", score: 71, measures: ["Зарядные станции", "Прокат велосипедов", "Общественный транспорт"], status: "Активный" },
        { name: "Eco Transport Resort", region: "Алматы", score: 68, measures: ["Эко-шаттл", "Велосипедная инфраструктура", "Пешеходные дорожки"], status: "Развивающийся" },
        { name: "Sustainable Transport Hotel", region: "Шымкент", score: 65, measures: ["Электромобили", "Прокат велосипедов", "Карпулинг"], status: "Активный" }
      ],
      greenBuilding: [
        { name: "LEED Certified Hotel", region: "Алматы", score: 96, measures: ["Зеленые материалы", "Естественная вентиляция", "Зеленая крыша"], status: "Лидер" },
        { name: "Green Building Resort", region: "Шымкент", score: 92, measures: ["Пассивный дизайн", "Устойчивое строительство", "Эко-сертификация"], status: "Активный" },
        { name: "Sustainable Building Lodge", region: "Астана", score: 88, measures: ["Зеленые материалы", "Зеленая крыша", "Естественная вентиляция"], status: "Развивающийся" },
        { name: "Eco Building Inn", region: "Алматинская область", score: 85, measures: ["Пассивный дизайн", "Устойчивое строительство", "Эко-сертификация"], status: "Активный" },
        { name: "Green Building Hotel", region: "Алматы", score: 82, measures: ["Зеленые материалы", "Естественная вентиляция", "Зеленая крыша"], status: "Развивающийся" },
        { name: "Sustainable Building Resort", region: "Шымкент", score: 79, measures: ["Пассивный дизайн", "Устойчивое строительство", "Эко-сертификация"], status: "Активный" },
        { name: "Eco Building Lodge", region: "Астана", score: 76, measures: ["Зеленые материалы", "Зеленая крыша", "Естественная вентиляция"], status: "Развивающийся" },
        { name: "Green Building Inn", region: "Алматинская область", score: 73, measures: ["Пассивный дизайн", "Устойчивое строительство", "Эко-сертификация"], status: "Активный" },
        { name: "Sustainable Building Resort", region: "Алматы", score: 70, measures: ["Зеленые материалы", "Естественная вентиляция", "Зеленая крыша"], status: "Развивающийся" },
        { name: "Eco Building Hotel", region: "Шымкент", score: 67, measures: ["Пассивный дизайн", "Устойчивое строительство", "Эко-сертификация"], status: "Активный" }
      ],
      biodiversity: [
        { name: "Wildlife Sanctuary Hotel", region: "Алматы", score: 95, measures: ["Местные растения", "Среда обитания диких животных", "Птичий заповедник"], status: "Лидер" },
        { name: "Biodiversity Resort", region: "Шымкент", score: 91, measures: ["Сад бабочек", "Органическое садоводство", "Мониторинг биоразнообразия"], status: "Активный" },
        { name: "Eco Wildlife Lodge", region: "Астана", score: 87, measures: ["Местные растения", "Среда обитания", "Органическое садоводство"], status: "Развивающийся" },
        { name: "Sustainable Wildlife Inn", region: "Алматинская область", score: 84, measures: ["Птичий заповедник", "Сад бабочек", "Мониторинг биоразнообразия"], status: "Активный" },
        { name: "Green Wildlife Hotel", region: "Алматы", score: 81, measures: ["Местные растения", "Среда обитания диких животных", "Органическое садоводство"], status: "Развивающийся" },
        { name: "Eco Wildlife Resort", region: "Шымкент", score: 78, measures: ["Сад бабочек", "Мониторинг биоразнообразия", "Местные растения"], status: "Активный" },
        { name: "Sustainable Wildlife Lodge", region: "Астана", score: 75, measures: ["Птичий заповедник", "Органическое садоводство", "Среда обитания"], status: "Развивающийся" },
        { name: "Green Wildlife Inn", region: "Алматинская область", score: 72, measures: ["Местные растения", "Сад бабочек", "Мониторинг биоразнообразия"], status: "Активный" },
        { name: "Eco Wildlife Resort", region: "Алматы", score: 69, measures: ["Среда обитания диких животных", "Органическое садоводство", "Местные растения"], status: "Развивающийся" },
        { name: "Sustainable Wildlife Hotel", region: "Шымкент", score: 66, measures: ["Птичий заповедник", "Сад бабочек", "Органическое садоводство"], status: "Активный" }
      ],
      communityEngagement: [
        { name: "Community Hotel Almaty", region: "Алматы", score: 94, measures: ["Местная занятость 95%", "Сохранение культуры", "Общественные проекты"], status: "Лидер" },
        { name: "Local Partnership Resort", region: "Шымкент", score: 90, measures: ["Образовательные программы", "Возможности для волонтерства", "Местные партнерства"], status: "Активный" },
        { name: "Cultural Heritage Lodge", region: "Астана", score: 86, measures: ["Сохранение культуры", "Местная занятость", "Общественные проекты"], status: "Развивающийся" },
        { name: "Community Engagement Inn", region: "Алматинская область", score: 83, measures: ["Образовательные программы", "Местные партнерства", "Возможности для волонтерства"], status: "Активный" },
        { name: "Local Community Hotel", region: "Алматы", score: 80, measures: ["Местная занятость", "Сохранение культуры", "Общественные проекты"], status: "Развивающийся" },
        { name: "Eco Community Resort", region: "Шымкент", score: 77, measures: ["Образовательные программы", "Возможности для волонтерства", "Местные партнерства"], status: "Активный" },
        { name: "Sustainable Community Lodge", region: "Астана", score: 74, measures: ["Сохранение культуры", "Местная занятость", "Общественные проекты"], status: "Развивающийся" },
        { name: "Green Community Inn", region: "Алматинская область", score: 71, measures: ["Образовательные программы", "Местные партнерства", "Возможности для волонтерства"], status: "Активный" },
        { name: "Eco Community Resort", region: "Алматы", score: 68, measures: ["Местная занятость", "Сохранение культуры", "Общественные проекты"], status: "Развивающийся" },
        { name: "Sustainable Community Hotel", region: "Шымкент", score: 65, measures: ["Образовательные программы", "Возможности для волонтерства", "Местные партнерства"], status: "Активный" }
      ],
      carbonNeutrality: [
        { name: "Carbon Neutral Hotel", region: "Алматы", score: 96, measures: ["Компенсация углерода 100%", "Аудит углерода", "Сертификация углеродной нейтральности"], status: "Лидер" },
        { name: "Zero Carbon Resort", region: "Шымкент", score: 89, measures: ["Сокращение углерода", "Отчетность по углероду", "Обучение по углероду"], status: "Активный" },
        { name: "Eco Carbon Lodge", region: "Астана", score: 82, measures: ["Аудит углерода", "Компенсация углерода", "Сокращение углерода"], status: "Развивающийся" },
        { name: "Sustainable Carbon Inn", region: "Алматинская область", score: 78, measures: ["Отчетность по углероду", "Обучение по углероду", "Сертификация углеродной нейтральности"], status: "Активный" },
        { name: "Green Carbon Hotel", region: "Алматы", score: 75, measures: ["Компенсация углерода", "Аудит углерода", "Сокращение углерода"], status: "Развивающийся" },
        { name: "Eco Carbon Resort", region: "Шымкент", score: 72, measures: ["Отчетность по углероду", "Обучение по углероду", "Компенсация углерода"], status: "Активный" },
        { name: "Sustainable Carbon Lodge", region: "Астана", score: 69, measures: ["Аудит углерода", "Сокращение углерода", "Сертификация углеродной нейтральности"], status: "Развивающийся" },
        { name: "Green Carbon Inn", region: "Алматинская область", score: 66, measures: ["Отчетность по углероду", "Обучение по углероду", "Компенсация углерода"], status: "Активный" },
        { name: "Eco Carbon Resort", region: "Алматы", score: 63, measures: ["Аудит углерода", "Сокращение углерода", "Отчетность по углероду"], status: "Развивающийся" },
        { name: "Sustainable Carbon Hotel", region: "Шымкент", score: 60, measures: ["Обучение по углероду", "Компенсация углерода", "Сертификация углеродной нейтральности"], status: "Активный" }
      ]
    };

    const getMeasureData = (action: string) => {
      switch (action) {
        case 'energy-efficiency': return ecoMeasuresData.energyEfficiency;
        case 'water-conservation': return ecoMeasuresData.waterConservation;
        case 'waste-management': return ecoMeasuresData.wasteManagement;
        case 'sustainable-food': return ecoMeasuresData.sustainableFood;
        case 'eco-transport': return ecoMeasuresData.ecoTransport;
        case 'green-building': return ecoMeasuresData.greenBuilding;
        case 'biodiversity': return ecoMeasuresData.biodiversity;
        case 'community-engagement': return ecoMeasuresData.communityEngagement;
        case 'carbon-neutrality': return ecoMeasuresData.carbonNeutrality;
        default: return ecoMeasuresData.energyEfficiency;
      }
    };

    const getMeasureTitle = (action: string) => {
      switch (action) {
        case 'energy-efficiency': return t.energyEfficiency;
        case 'water-conservation': return t.waterConservation;
        case 'waste-management': return t.wasteManagement;
        case 'sustainable-food': return t.sustainableFood;
        case 'eco-transport': return t.ecoTransport;
        case 'green-building': return t.greenBuilding;
        case 'biodiversity': return t.biodiversity;
        case 'community-engagement': return t.communityEngagement;
        case 'carbon-neutrality': return t.carbonNeutrality;
        default: return t.energyEfficiency;
      }
    };

    const getAccommodationExamples = (action: string) => {
      switch (action) {
        case 'energy-efficiency': return accommodationExamples.energyEfficiency;
        case 'water-conservation': return accommodationExamples.waterConservation;
        case 'waste-management': return accommodationExamples.wasteManagement;
        case 'sustainable-food': return accommodationExamples.sustainableFood;
        case 'eco-transport': return accommodationExamples.ecoTransport;
        case 'green-building': return accommodationExamples.greenBuilding;
        case 'biodiversity': return accommodationExamples.biodiversity;
        case 'community-engagement': return accommodationExamples.communityEngagement;
        case 'carbon-neutrality': return accommodationExamples.carbonNeutrality;
        default: return accommodationExamples.energyEfficiency;
      }
    };

    const data = getMeasureData(action);
    const title = getMeasureTitle(action);
    const examples = getAccommodationExamples(action);

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-blue-800 mb-2">Всего точек размещения</h4>
            <p className="text-3xl font-bold text-blue-600">{data.totalAccommodations.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-green-800 mb-2">Внедряют меры</h4>
            <p className="text-3xl font-bold text-green-600">{data.implementingMeasures.toLocaleString()}</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-purple-800 mb-2">Процент внедрения</h4>
            <p className="text-3xl font-bold text-purple-600">{Math.round((data.implementingMeasures / data.totalAccommodations) * 100)}%</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">{title} - Детальная статистика</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(data).filter(([key]) => key !== 'totalAccommodations' && key !== 'implementingMeasures').map(([measure, count]) => (
              <div key={measure} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700">{getMeasureTitle(measure)}</span>
                  <span className="text-lg font-bold text-green-600">{count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${(count / data.totalAccommodations) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {Math.round((count / data.totalAccommodations) * 100)}% от общего числа
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Топ-10 точек размещения по {title.toLowerCase()}</h4>
          <div className="space-y-3">
            {examples.map((accommodation, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold text-gray-500">#{index + 1}</span>
                  <div>
                    <h5 className="font-semibold text-gray-800">{accommodation.name}</h5>
                    <p className="text-sm text-gray-600">{accommodation.region} • {accommodation.measures.length} мер</p>
                    <div className="mt-1">
                      {accommodation.measures.map((measure, idx) => (
                        <span key={idx} className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-1 mb-1">
                          {measure}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">{accommodation.score}%</p>
                  <p className="text-sm text-gray-500">Эко-рейтинг</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    accommodation.status === 'Лидер' ? 'bg-yellow-100 text-yellow-800' :
                    accommodation.status === 'Активный' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {accommodation.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'courses':
        return renderCourses();
      case 'calendar':
        return renderCalendar();
      case 'statistics':
        return renderStatistics();
      default:
        return renderCourses();
    }
  };

  // Функция для проверки состояния новостей и событий
  const checkNewsState = () => {
    console.log('=== ПРОВЕРКА СОСТОЯНИЯ ===');
    console.log('События в админ панели:', events.map(event => ({ id: event.id, title: event.title, type: event.type })));
    console.log('Новости в контексте:', news.map(item => ({ id: item.id, title: item.title, type: item.type })));
    
    // Проверяем синхронизацию
    const eventNewsTitles = events
      .filter(event => event.type === 'news' || event.type === 'promotion' || event.type === 'eco-event')
      .map(event => event.title);
    
    const newsTitles = news.map(item => item.title);
    
    const missingInNews = eventNewsTitles.filter(title => !newsTitles.includes(title));
    const missingInEvents = newsTitles.filter(title => !eventNewsTitles.includes(title));
    
    console.log('События, отсутствующие в новостях:', missingInNews);
    console.log('Новости, отсутствующие в событиях:', missingInEvents);
    console.log('=== ПРОВЕРКА ЗАВЕРШЕНА ===');
  };

  // Функция для полной очистки всех новостей и событий
  const clearAllNewsAndEvents = () => {
    console.log('=== ПОЛНАЯ ОЧИСТКА ВСЕХ НОВОСТЕЙ И СОБЫТИЙ ===');
    
    // Очищаем все события
    setEvents([]);
    saveEventsToStorage([]);
    console.log('Все события удалены');
    
    // Очищаем все новости
    forceUpdateNews([]);
    console.log('Все новости удалены');
    
    // Очищаем localStorage
    localStorage.removeItem('eco-tourism-events');
    localStorage.removeItem('eco-tourism-news');
    console.log('localStorage очищен');
    
    console.log('=== ОЧИСТКА ЗАВЕРШЕНА ===');
    console.log('Теперь можете добавлять новые события и новости вручную');
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl md:text-3xl font-bold text-green-800">
              {t.adminDashboard}
            </h1>
          </div>
          <LanguageSwitcher 
            currentLanguage={language} 
            onLanguageChange={changeLanguage}
          />
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setActiveSection('courses')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeSection === 'courses' 
                  ? 'bg-green-100 text-green-800' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <AcademicCapIcon className="w-5 h-5" />
              <span>{t.coursesForGuides}</span>
            </button>
            <button
              onClick={() => setActiveSection('calendar')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeSection === 'calendar' 
                  ? 'bg-green-100 text-green-800' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <CalendarIcon className="w-5 h-5" />
              <span>{t.eventCalendar}</span>
            </button>
            <button
              onClick={() => setActiveSection('statistics')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeSection === 'statistics' 
                  ? 'bg-green-100 text-green-800' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ChartBarIcon className="w-5 h-5" />
              <span>{t.adminStatistics}</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {renderContent()}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-green-800">
                {modalType === 'course' ? t.addCourse :
                 modalType === 'event' ? (editingEventId ? 'Редактировать событие' : t.addEvent) : ''}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
            
            {modalType === 'course' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.courseName}</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder={t.courseNamePlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.description}</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows={3}
                    placeholder={t.courseDescriptionPlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.duration}</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder={t.durationPlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.level}</label>
                  <select 
                    value={formData.level}
                    onChange={(e) => handleInputChange('level', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">{t.selectLevel}</option>
                    <option value="beginner">{t.beginner}</option>
                    <option value="intermediate">{t.intermediate}</option>
                    <option value="advanced">{t.advanced}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Инструктор</label>
                  <input
                    type="text"
                    value={formData.instructor}
                    onChange={(e) => handleInputChange('instructor', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Введите имя инструктора"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.eventStatus}</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="active">{t.activeStatus}</option>
                    <option value="inactive">{t.inactiveStatus}</option>
                  </select>
                </div>
              </div>
            )}
            
            {modalType === 'event' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.eventType}</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">{t.selectEventType}</option>
                    <option value="holiday">{t.holiday}</option>
                    <option value="eco-event">{t.ecoEvent}</option>
                    <option value="news">{t.eventNews}</option>
                    <option value="promotion">{t.promotion}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.eventName}</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder={t.eventNamePlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.description}</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows={3}
                    placeholder={t.eventDescriptionPlaceholder}
                  />
                </div>
                {/* Динамические поля дат в зависимости от типа события */}
                {formData.type === 'news' ? (
                  // Для новостей дата не нужна
                  null
                ) : formData.type === 'eco-event' ? (
                  // Для эко-событий нужен промежуток дат
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Дата начала</label>
                      <input
                        type="date"
                        value={formData.dateFrom}
                        onChange={(e) => handleInputChange('dateFrom', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Дата окончания</label>
                      <input
                        type="date"
                        value={formData.dateTo}
                        onChange={(e) => handleInputChange('dateTo', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                ) : (
                  // Для остальных типов событий одна дата
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.eventDate}</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.eventRegion}</label>
                  <select 
                    value={formData.region}
                    onChange={(e) => handleInputChange('region', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">{t.selectEventRegion}</option>
                    <option value="Все регионы">{t.allRegions}</option>
                    <option value="Алматы">Алматы</option>
                    <option value="Астана">Астана</option>
                    <option value="Шымкент">Шымкент</option>
                    <option value="Алматинская область">Алматинская область</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.eventStatus}</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="active">{t.activeStatus}</option>
                    <option value="inactive">{t.inactiveStatus}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Изображение</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleInputChange('image', file);
                      }
                    }}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  {formData.image && (
                    <div className="mt-2">
                      <p className="text-sm text-green-600">✓ Файл выбран: {formData.image.name}</p>
                      {formData.image instanceof File && (
                        <div className="mt-2">
                          <img 
                            src={URL.createObjectURL(formData.image)} 
                            alt="Предварительный просмотр"
                            className="max-w-full h-auto rounded-lg shadow-md"
                            style={{ maxHeight: '200px' }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
            
            </div>
            
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                {t.cancel}
              </button>
              <button 
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                {t.save}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Statistics Modal */}
      {showStatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-green-800">
                {selectedStatAction?.includes('financing-status') ? t.financingStatus :
                 selectedStatAction?.includes('green-financing') ? t.greenFinancing :
                 selectedStatAction?.includes('implemented-projects') ? t.implementedProjects :
                 selectedStatAction?.includes('projects-in-progress') ? t.projectsInProgress :
                 selectedStatAction?.includes('eco-projects') ? t.ecoProjects :
                 selectedStatAction?.includes('funding-amount') ? t.fundingAmount :
                 selectedStatAction?.includes('project-progress') ? t.projectProgress :
                 selectedStatAction?.includes('implementation-rate') ? t.implementationRate :
                 selectedStatAction?.includes('success-rate') ? t.successRate :
                 selectedStatAction?.includes('eco-impact') ? t.ecoImpact :
                 selectedStatAction?.includes('cost-benefit') ? t.costBenefit :
                 selectedStatAction?.includes('completion-forecast') ? t.completionForecast :
                 selectedStatAction?.includes('resource-allocation') ? t.resourceAllocation :
                 selectedStatAction?.includes('guides-overview') ? t.guidesOverview :
                 selectedStatAction?.includes('guides-ratings') ? t.guidesRatings :
                 selectedStatAction?.includes('guides-training') ? t.guidesTraining :
                 selectedStatAction?.includes('guides-performance') ? t.guidesPerformance :
                 selectedStatAction?.includes('guides-by-region') ? t.guidesByRegion :
                 selectedStatAction?.includes('guides-by-level') ? t.guidesByLevel :
                 selectedStatAction?.includes('new-guides') ? t.newGuides :
                 selectedStatAction?.includes('rating-distribution') ? t.ratingDistribution :
                 selectedStatAction?.includes('top-guides') ? t.topGuides :
                 selectedStatAction?.includes('customer-satisfaction') ? t.customerSatisfaction :
                 selectedStatAction?.includes('completed-courses') ? t.completedCourses :
                 selectedStatAction?.includes('certification-status') ? t.certificationStatus :
                 selectedStatAction?.includes('training-progress') ? t.trainingProgress :
                 selectedStatAction?.includes('tours-count') ? t.toursCount :
                 selectedStatAction?.includes('average-rating') ? t.averageRating :
                 selectedStatAction?.includes('specializations') ? t.specializations :
                 selectedStatAction?.includes('energy-efficiency') ? t.energyEfficiency :
                 selectedStatAction?.includes('water-conservation') ? t.waterConservation :
                 selectedStatAction?.includes('waste-management') ? t.wasteManagement :
                 selectedStatAction?.includes('sustainable-food') ? t.sustainableFood :
                 selectedStatAction?.includes('eco-transport') ? t.ecoTransport :
                 selectedStatAction?.includes('green-building') ? t.greenBuilding :
                 selectedStatAction?.includes('biodiversity') ? t.biodiversity :
                 selectedStatAction?.includes('community-engagement') ? t.communityEngagement :
                 selectedStatAction?.includes('carbon-neutrality') ? t.carbonNeutrality :
                 selectedStatAction?.includes('solar-energy') ? t.solarEnergy :
                 selectedStatAction?.includes('wind-energy') ? t.windEnergy :
                 selectedStatAction?.includes('geothermal-energy') ? t.geothermalEnergy :
                 selectedStatAction?.includes('energy-storage') ? t.energyStorage :
                 selectedStatAction?.includes('smart-lighting') ? t.smartLighting :
                 selectedStatAction?.includes('energy-monitoring') ? t.energyMonitoring :
                 selectedStatAction?.includes('water-recycling') ? t.waterRecycling :
                 selectedStatAction?.includes('rainwater-collection') ? t.rainwaterCollection :
                 selectedStatAction?.includes('water-filtration') ? t.waterFiltration :
                 selectedStatAction?.includes('water-efficient-fixtures') ? t.waterEfficientFixtures :
                 selectedStatAction?.includes('greywater-systems') ? t.greywaterSystems :
                 selectedStatAction?.includes('water-conservation-programs') ? t.waterConservationPrograms :
                 selectedStatAction?.includes('waste-reduction-measures') ? t.wasteReductionMeasures :
                 selectedStatAction?.includes('composting-systems') ? t.compostingSystems :
                 selectedStatAction?.includes('recycling-programs') ? t.recyclingPrograms :
                 selectedStatAction?.includes('zero-waste') ? t.zeroWaste :
                 selectedStatAction?.includes('waste-audit') ? t.wasteAudit :
                 selectedStatAction?.includes('waste-education') ? t.wasteEducation :
                 selectedStatAction?.includes('organic-food') ? t.organicFood :
                 selectedStatAction?.includes('local-suppliers') ? t.localSuppliers :
                 selectedStatAction?.includes('seasonal-menu') ? t.seasonalMenu :
                 selectedStatAction?.includes('food-waste-reduction') ? t.foodWasteReduction :
                 selectedStatAction?.includes('sustainable-fishing') ? t.sustainableFishing :
                 selectedStatAction?.includes('vegetarian-options') ? t.vegetarianOptions :
                 selectedStatAction?.includes('electric-vehicles') ? t.electricVehicles :
                 selectedStatAction?.includes('bicycle-infrastructure') ? t.bicycleInfrastructure :
                 selectedStatAction?.includes('public-transport') ? t.publicTransport :
                 selectedStatAction?.includes('carpooling') ? t.carpooling :
                 selectedStatAction?.includes('walking-paths') ? t.walkingPaths :
                 selectedStatAction?.includes('eco-shuttle') ? t.ecoShuttle :
                 selectedStatAction?.includes('green-materials') ? t.greenMaterials :
                 selectedStatAction?.includes('natural-ventilation') ? t.naturalVentilation :
                 selectedStatAction?.includes('green-roof') ? t.greenRoof :
                 selectedStatAction?.includes('passive-design') ? t.passiveDesign :
                 selectedStatAction?.includes('sustainable-construction') ? t.sustainableConstruction :
                 selectedStatAction?.includes('eco-certification') ? t.ecoCertification :
                 selectedStatAction?.includes('native-plants') ? t.nativePlants :
                 selectedStatAction?.includes('wildlife-habitat') ? t.wildlifeHabitat :
                 selectedStatAction?.includes('bird-sanctuary') ? t.birdSanctuary :
                 selectedStatAction?.includes('butterfly-garden') ? t.butterflyGarden :
                 selectedStatAction?.includes('organic-gardening') ? t.organicGardening :
                 selectedStatAction?.includes('biodiversity-monitoring') ? t.biodiversityMonitoring :
                 selectedStatAction?.includes('local-employment') ? t.localEmployment :
                 selectedStatAction?.includes('cultural-preservation') ? t.culturalPreservation :
                 selectedStatAction?.includes('community-projects') ? t.communityProjects :
                 selectedStatAction?.includes('educational-programs') ? t.educationalPrograms :
                 selectedStatAction?.includes('volunteer-opportunities') ? t.volunteerOpportunities :
                 selectedStatAction?.includes('local-partnerships') ? t.localPartnerships :
                 selectedStatAction?.includes('carbon-offsetting') ? t.carbonOffsetting :
                 selectedStatAction?.includes('carbon-audit') ? t.carbonAudit :
                 selectedStatAction?.includes('carbon-reduction') ? t.carbonReduction :
                 selectedStatAction?.includes('carbon-neutral-certification') ? t.carbonNeutralCertification :
                 selectedStatAction?.includes('carbon-reporting') ? t.carbonReporting :
                 selectedStatAction?.includes('carbon-education') ? t.carbonEducation :
                 selectedStatAction}
              </h3>
              <button
                onClick={closeStatModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            {/* Financing Status Report */}
            {selectedStatAction?.includes('financing-status') && (
              <FinancingStatusReport />
            )}
            
            {/* Eco Projects Report */}
            {(selectedStatAction?.includes('green-financing') || 
              selectedStatAction?.includes('implemented-projects') || 
              selectedStatAction?.includes('projects-in-progress') ||
              selectedStatAction?.includes('eco-projects') ||
              selectedStatAction?.includes('funding-amount') ||
              selectedStatAction?.includes('project-progress') ||
              selectedStatAction?.includes('implementation-rate') ||
              selectedStatAction?.includes('success-rate') ||
              selectedStatAction?.includes('eco-impact') ||
              selectedStatAction?.includes('cost-benefit') ||
              selectedStatAction?.includes('completion-forecast') ||
              selectedStatAction?.includes('resource-allocation')) && (
              <EcoProjectsReport 
                filter={
                  selectedStatAction?.includes('awaiting-green-financing') ? 'awaiting' :
                  selectedStatAction?.includes('received-green-financing') ? 'received' :
                  selectedStatAction?.includes('implemented-projects') ? 'implemented' :
                  selectedStatAction?.includes('projects-in-progress') ? 'in-progress' :
                  selectedStatAction?.includes('funding-amount') ? 'all' :
                  selectedStatAction?.includes('project-progress') ? 'all' :
                  selectedStatAction?.includes('implementation-rate') ? 'received' :
                  selectedStatAction?.includes('success-rate') ? 'implemented' :
                  selectedStatAction?.includes('eco-impact') ? 'implemented' :
                  selectedStatAction?.includes('cost-benefit') ? 'implemented' :
                  selectedStatAction?.includes('completion-forecast') ? 'in-progress' :
                  selectedStatAction?.includes('resource-allocation') ? 'in-progress' :
                  'all'
                }
              />
            )}
            
            {/* Dashboard Reports */}
            {(selectedStatAction?.includes('total-tourists') ||
              selectedStatAction?.includes('total-bookings') ||
              selectedStatAction?.includes('carbon-footprint') ||
              selectedStatAction?.includes('co2-compensation') ||
              selectedStatAction?.includes('active-tourists') ||
              selectedStatAction?.includes('new-registrations') ||
              selectedStatAction?.includes('tourist-geography') ||
              selectedStatAction?.includes('confirmed-bookings') ||
              selectedStatAction?.includes('cancelled-bookings') ||
              selectedStatAction?.includes('pending-bookings') ||
              selectedStatAction?.includes('carbon-by-region') ||
              selectedStatAction?.includes('carbon-by-tour-type') ||
              selectedStatAction?.includes('carbon-trends') ||
              selectedStatAction?.includes('compensation-effectiveness') ||
              selectedStatAction?.includes('compensation-comparison') ||
              selectedStatAction?.includes('compensation-forecast')) && (
              renderDashboard(selectedStatAction)
            )}
            
            {/* Regions Reports */}
            {(selectedStatAction?.includes('activity-map') ||
              selectedStatAction?.includes('top-directions') ||
              selectedStatAction?.includes('green-regions') ||
              selectedStatAction?.includes('interactive-map') ||
              selectedStatAction?.includes('heat-map') ||
              selectedStatAction?.includes('tourist-concentration') ||
              selectedStatAction?.includes('popularity-ranking') ||
              selectedStatAction?.includes('revenue-ranking') ||
              selectedStatAction?.includes('eco-rating-ranking') ||
              selectedStatAction?.includes('eco-infrastructure') ||
              selectedStatAction?.includes('eco-activities') ||
              selectedStatAction?.includes('eco-certificates')) && (
              renderRegionsReport(selectedStatAction)
            )}
            
            {/* Guides Reports */}
            {(selectedStatAction?.includes('guides-overview') ||
              selectedStatAction?.includes('guides-ratings') ||
              selectedStatAction?.includes('guides-training') ||
              selectedStatAction?.includes('guides-performance') ||
              selectedStatAction?.includes('guides-by-region') ||
              selectedStatAction?.includes('guides-by-level') ||
              selectedStatAction?.includes('new-guides') ||
              selectedStatAction?.includes('rating-distribution') ||
              selectedStatAction?.includes('top-guides') ||
              selectedStatAction?.includes('customer-satisfaction') ||
              selectedStatAction?.includes('completed-courses') ||
              selectedStatAction?.includes('certification-status') ||
              selectedStatAction?.includes('training-progress') ||
              selectedStatAction?.includes('tours-count') ||
              selectedStatAction?.includes('average-rating') ||
              selectedStatAction?.includes('specializations')) && (
              renderGuidesReport(selectedStatAction)
            )}
            
            {/* Accommodation Eco Measures Reports */}
            {(selectedStatAction?.includes('energy-efficiency') ||
              selectedStatAction?.includes('water-conservation') ||
              selectedStatAction?.includes('waste-management') ||
              selectedStatAction?.includes('sustainable-food') ||
              selectedStatAction?.includes('eco-transport') ||
              selectedStatAction?.includes('green-building') ||
              selectedStatAction?.includes('biodiversity') ||
              selectedStatAction?.includes('community-engagement') ||
              selectedStatAction?.includes('carbon-neutrality') ||
              selectedStatAction?.includes('solar-energy') ||
              selectedStatAction?.includes('wind-energy') ||
              selectedStatAction?.includes('geothermal-energy') ||
              selectedStatAction?.includes('energy-storage') ||
              selectedStatAction?.includes('smart-lighting') ||
              selectedStatAction?.includes('energy-monitoring') ||
              selectedStatAction?.includes('water-recycling') ||
              selectedStatAction?.includes('rainwater-collection') ||
              selectedStatAction?.includes('water-filtration') ||
              selectedStatAction?.includes('water-efficient-fixtures') ||
              selectedStatAction?.includes('greywater-systems') ||
              selectedStatAction?.includes('water-conservation-programs') ||
              selectedStatAction?.includes('waste-reduction-measures') ||
              selectedStatAction?.includes('composting-systems') ||
              selectedStatAction?.includes('recycling-programs') ||
              selectedStatAction?.includes('zero-waste') ||
              selectedStatAction?.includes('waste-audit') ||
              selectedStatAction?.includes('waste-education') ||
              selectedStatAction?.includes('organic-food') ||
              selectedStatAction?.includes('local-suppliers') ||
              selectedStatAction?.includes('seasonal-menu') ||
              selectedStatAction?.includes('food-waste-reduction') ||
              selectedStatAction?.includes('sustainable-fishing') ||
              selectedStatAction?.includes('vegetarian-options') ||
              selectedStatAction?.includes('electric-vehicles') ||
              selectedStatAction?.includes('bicycle-infrastructure') ||
              selectedStatAction?.includes('public-transport') ||
              selectedStatAction?.includes('carpooling') ||
              selectedStatAction?.includes('walking-paths') ||
              selectedStatAction?.includes('eco-shuttle') ||
              selectedStatAction?.includes('green-materials') ||
              selectedStatAction?.includes('natural-ventilation') ||
              selectedStatAction?.includes('green-roof') ||
              selectedStatAction?.includes('passive-design') ||
              selectedStatAction?.includes('sustainable-construction') ||
              selectedStatAction?.includes('eco-certification') ||
              selectedStatAction?.includes('native-plants') ||
              selectedStatAction?.includes('wildlife-habitat') ||
              selectedStatAction?.includes('bird-sanctuary') ||
              selectedStatAction?.includes('butterfly-garden') ||
              selectedStatAction?.includes('organic-gardening') ||
              selectedStatAction?.includes('biodiversity-monitoring') ||
              selectedStatAction?.includes('local-employment') ||
              selectedStatAction?.includes('cultural-preservation') ||
              selectedStatAction?.includes('community-projects') ||
              selectedStatAction?.includes('educational-programs') ||
              selectedStatAction?.includes('volunteer-opportunities') ||
              selectedStatAction?.includes('local-partnerships') ||
              selectedStatAction?.includes('carbon-offsetting') ||
              selectedStatAction?.includes('carbon-audit') ||
              selectedStatAction?.includes('carbon-reduction') ||
              selectedStatAction?.includes('carbon-neutral-certification') ||
              selectedStatAction?.includes('carbon-reporting') ||
              selectedStatAction?.includes('carbon-education')) && (
              renderAccommodationEcoMeasures(selectedStatAction)
            )}
            
            {/* Default development message for other actions */}
            {!selectedStatAction?.includes('green-financing') && 
             !selectedStatAction?.includes('implemented-projects') && 
             !selectedStatAction?.includes('projects-in-progress') &&
             !selectedStatAction?.includes('eco-projects') &&
             !selectedStatAction?.includes('financing-status') &&
             !selectedStatAction?.includes('funding-amount') &&
             !selectedStatAction?.includes('project-progress') &&
             !selectedStatAction?.includes('implementation-rate') &&
             !selectedStatAction?.includes('success-rate') &&
             !selectedStatAction?.includes('eco-impact') &&
             !selectedStatAction?.includes('cost-benefit') &&
             !selectedStatAction?.includes('completion-forecast') &&
             !selectedStatAction?.includes('resource-allocation') &&
             !selectedStatAction?.includes('total-tourists') &&
             !selectedStatAction?.includes('total-bookings') &&
             !selectedStatAction?.includes('carbon-footprint') &&
             !selectedStatAction?.includes('co2-compensation') &&
             !selectedStatAction?.includes('active-tourists') &&
             !selectedStatAction?.includes('new-registrations') &&
             !selectedStatAction?.includes('tourist-geography') &&
             !selectedStatAction?.includes('confirmed-bookings') &&
             !selectedStatAction?.includes('cancelled-bookings') &&
             !selectedStatAction?.includes('pending-bookings') &&
             !selectedStatAction?.includes('carbon-by-region') &&
             !selectedStatAction?.includes('carbon-by-tour-type') &&
             !selectedStatAction?.includes('carbon-trends') &&
             !selectedStatAction?.includes('compensation-effectiveness') &&
             !selectedStatAction?.includes('compensation-comparison') &&
             !selectedStatAction?.includes('compensation-forecast') &&
             !selectedStatAction?.includes('activity-map') &&
             !selectedStatAction?.includes('top-directions') &&
             !selectedStatAction?.includes('green-regions') &&
             !selectedStatAction?.includes('interactive-map') &&
             !selectedStatAction?.includes('heat-map') &&
             !selectedStatAction?.includes('tourist-concentration') &&
             !selectedStatAction?.includes('popularity-ranking') &&
             !selectedStatAction?.includes('revenue-ranking') &&
             !selectedStatAction?.includes('eco-rating-ranking') &&
             !selectedStatAction?.includes('eco-infrastructure') &&
             !selectedStatAction?.includes('eco-activities') &&
             !selectedStatAction?.includes('eco-certificates') &&
             !selectedStatAction?.includes('guides-overview') &&
             !selectedStatAction?.includes('guides-ratings') &&
             !selectedStatAction?.includes('guides-training') &&
             !selectedStatAction?.includes('guides-performance') &&
             !selectedStatAction?.includes('guides-by-region') &&
             !selectedStatAction?.includes('guides-by-level') &&
             !selectedStatAction?.includes('new-guides') &&
             !selectedStatAction?.includes('rating-distribution') &&
             !selectedStatAction?.includes('top-guides') &&
             !selectedStatAction?.includes('customer-satisfaction') &&
             !selectedStatAction?.includes('completed-courses') &&
             !selectedStatAction?.includes('certification-status') &&
             !selectedStatAction?.includes('training-progress') &&
             !selectedStatAction?.includes('tours-count') &&
             !selectedStatAction?.includes('average-rating') &&
             !selectedStatAction?.includes('specializations') &&
             !selectedStatAction?.includes('energy-efficiency') &&
             !selectedStatAction?.includes('water-conservation') &&
             !selectedStatAction?.includes('waste-management') &&
             !selectedStatAction?.includes('sustainable-food') &&
             !selectedStatAction?.includes('eco-transport') &&
             !selectedStatAction?.includes('green-building') &&
             !selectedStatAction?.includes('biodiversity') &&
             !selectedStatAction?.includes('community-engagement') &&
             !selectedStatAction?.includes('carbon-neutrality') &&
             !selectedStatAction?.includes('solar-energy') &&
             !selectedStatAction?.includes('wind-energy') &&
             !selectedStatAction?.includes('geothermal-energy') &&
             !selectedStatAction?.includes('energy-storage') &&
             !selectedStatAction?.includes('smart-lighting') &&
             !selectedStatAction?.includes('energy-monitoring') &&
             !selectedStatAction?.includes('water-recycling') &&
             !selectedStatAction?.includes('rainwater-collection') &&
             !selectedStatAction?.includes('water-filtration') &&
             !selectedStatAction?.includes('water-efficient-fixtures') &&
             !selectedStatAction?.includes('greywater-systems') &&
             !selectedStatAction?.includes('water-conservation-programs') &&
             !selectedStatAction?.includes('waste-reduction-measures') &&
             !selectedStatAction?.includes('composting-systems') &&
             !selectedStatAction?.includes('recycling-programs') &&
             !selectedStatAction?.includes('zero-waste') &&
             !selectedStatAction?.includes('waste-audit') &&
             !selectedStatAction?.includes('waste-education') &&
             !selectedStatAction?.includes('organic-food') &&
             !selectedStatAction?.includes('local-suppliers') &&
             !selectedStatAction?.includes('seasonal-menu') &&
             !selectedStatAction?.includes('food-waste-reduction') &&
             !selectedStatAction?.includes('sustainable-fishing') &&
             !selectedStatAction?.includes('vegetarian-options') &&
             !selectedStatAction?.includes('electric-vehicles') &&
             !selectedStatAction?.includes('bicycle-infrastructure') &&
             !selectedStatAction?.includes('public-transport') &&
             !selectedStatAction?.includes('carpooling') &&
             !selectedStatAction?.includes('walking-paths') &&
             !selectedStatAction?.includes('eco-shuttle') &&
             !selectedStatAction?.includes('green-materials') &&
             !selectedStatAction?.includes('natural-ventilation') &&
             !selectedStatAction?.includes('green-roof') &&
             !selectedStatAction?.includes('passive-design') &&
             !selectedStatAction?.includes('sustainable-construction') &&
             !selectedStatAction?.includes('eco-certification') &&
             !selectedStatAction?.includes('native-plants') &&
             !selectedStatAction?.includes('wildlife-habitat') &&
             !selectedStatAction?.includes('bird-sanctuary') &&
             !selectedStatAction?.includes('butterfly-garden') &&
             !selectedStatAction?.includes('organic-gardening') &&
             !selectedStatAction?.includes('biodiversity-monitoring') &&
             !selectedStatAction?.includes('local-employment') &&
             !selectedStatAction?.includes('cultural-preservation') &&
             !selectedStatAction?.includes('community-projects') &&
             !selectedStatAction?.includes('educational-programs') &&
             !selectedStatAction?.includes('volunteer-opportunities') &&
             !selectedStatAction?.includes('local-partnerships') &&
             !selectedStatAction?.includes('carbon-offsetting') &&
             !selectedStatAction?.includes('carbon-audit') &&
             !selectedStatAction?.includes('carbon-reduction') &&
             !selectedStatAction?.includes('carbon-neutral-certification') &&
             !selectedStatAction?.includes('carbon-reporting') &&
             !selectedStatAction?.includes('carbon-education') && (
              <div className="text-green-600 mb-4">
                {t.functionInDevelopment}
              </div>
            )}
            
            <div className="flex justify-end mt-4">
              <button
                onClick={closeStatModal}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 