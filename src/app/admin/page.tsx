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

  const [activeSection, setActiveSection] = useState('courses');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'course' | 'event' | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [selectedStatAction, setSelectedStatAction] = useState<string | null>(null);
  const [showStatModal, setShowStatModal] = useState(false);

  // Состояние для формы курса
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    duration: '',
    level: 'beginner',
    instructor: 'Айгуль Садыкова',
    status: 'active' as 'active' | 'inactive'
  });
  
  // Состояние для формы события
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    date: '',
    type: 'eco-event' as 'holiday' | 'eco-event' | 'promotion' | 'news',
    region: 'Все регионы',
    status: 'active' as 'active' | 'inactive'
  });

  // Моковые данные
  const mockCourses: Course[] = [
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

  const mockEvents: CalendarEvent[] = [
    {
      id: '1',
      title: t.eventIndependenceDay,
      description: t.eventIndependenceDayDesc,
      date: '2024-12-16',
      type: 'holiday',
      region: t.allRegions,
      status: 'active'
    },
    {
      id: '2',
      title: t.eventPlantTree,
      description: t.eventPlantTreeDesc,
      date: '2024-10-15',
      type: 'eco-event',
      region: t.regionAlmaty,
      status: 'active'
    },
    {
      id: '3',
      title: t.eventCleanBalkhash,
      description: t.eventCleanBalkhashDesc,
      date: '2024-09-20',
      type: 'eco-event',
      region: t.regionAlmatyOblast,
      status: 'active'
    },
    {
      id: '4',
      title: t.eventNewEcoHotel,
      description: t.eventNewEcoHotelDesc,
      date: '2024-11-01',
      type: 'news',
      region: t.regionAlmaty,
      status: 'active'
    },
    {
      id: '5',
      title: t.eventEcoToursDiscount,
      description: t.eventEcoToursDiscountDesc,
      date: '2024-10-25',
      type: 'promotion',
      region: t.allRegions,
      status: 'active'
    },
    {
      id: '6',
      title: t.eventNewBikeRoutes,
      description: t.eventNewBikeRoutesDesc,
      date: '2024-10-10',
      type: 'news',
      region: t.regionAstana,
      status: 'active'
    },
    {
      id: '7',
      title: t.eventFreeEcoTours,
      description: t.eventFreeEcoToursDesc,
      date: '2024-10-28',
      type: 'promotion',
      region: t.regionShymkent,
      status: 'active'
    }
  ];

  // Моковые данные для дашборда
  const dashboardData = {
    totalTourists: 15420,
    activeTourists: 8920,
    newRegistrations: 2340,
    touristGeography: {
      [language === 'ru' ? 'Алматы' : 'Almaty']: 4500,
      [language === 'ru' ? 'Астана' : 'Astana']: 3200,
      [language === 'ru' ? 'Шымкент' : 'Shymkent']: 2100,
      [language === 'ru' ? 'Алматинская область' : 'Almaty Region']: 2800,
      [language === 'ru' ? 'Другие регионы' : 'Other Regions']: 2820
    },
    totalBookings: 8920,
    confirmedBookings: 6540,
    cancelledBookings: 890,
    pendingBookings: 1490,
    averageCarbonFootprint: 2.4,
    carbonByRegion: {
      [language === 'ru' ? 'Алматы' : 'Almaty']: 1.8,
      [language === 'ru' ? 'Астана' : 'Astana']: 2.1,
      [language === 'ru' ? 'Шымкент' : 'Shymkent']: 2.9,
      [language === 'ru' ? 'Алматинская область' : 'Almaty Region']: 3.2,
      [language === 'ru' ? 'Другие регионы' : 'Other Regions']: 2.6
    },
    carbonByTourType: {
      [language === 'ru' ? 'Эко-туры' : 'Eco Tours']: 1.2,
      [language === 'ru' ? 'Горные походы' : 'Mountain Hiking']: 2.8,
      [language === 'ru' ? 'Оздоровительные туры' : 'Wellness Tours']: 1.5,
      [language === 'ru' ? 'Культурные туры' : 'Cultural Tours']: 2.1,
      [language === 'ru' ? 'Приключенческие туры' : 'Adventure Tours']: 3.4
    },
    carbonTrends: [
      { month: language === 'ru' ? 'Янв' : 'Jan', value: 2.8 },
      { month: language === 'ru' ? 'Фев' : 'Feb', value: 2.6 },
      { month: language === 'ru' ? 'Мар' : 'Mar', value: 2.4 },
      { month: language === 'ru' ? 'Апр' : 'Apr', value: 2.3 },
      { month: language === 'ru' ? 'Май' : 'May', value: 2.2 },
      { month: language === 'ru' ? 'Июн' : 'Jun', value: 2.1 },
      { month: language === 'ru' ? 'Июл' : 'Jul', value: 2.0 },
      { month: language === 'ru' ? 'Авг' : 'Aug', value: 2.1 },
      { month: language === 'ru' ? 'Сен' : 'Sep', value: 2.2 },
      { month: language === 'ru' ? 'Окт' : 'Oct', value: 2.3 },
      { month: language === 'ru' ? 'Ноя' : 'Nov', value: 2.4 },
      { month: language === 'ru' ? 'Дек' : 'Dec', value: 2.5 }
    ],
    co2Compensation: 78.5,
    compensationEffectiveness: 85.2,
    compensationComparison: {
      [language === 'ru' ? 'Посадка деревьев' : 'Tree Planting']: 45.3,
      [language === 'ru' ? 'Солнечные панели' : 'Solar Panels']: 28.7,
      [language === 'ru' ? 'Ветровые турбины' : 'Wind Turbines']: 15.2,
      [language === 'ru' ? 'Переработка отходов' : 'Waste Recycling']: 10.8
    },
    compensationForecast: [
      { month: language === 'ru' ? 'Янв' : 'Jan', value: 72.1 },
      { month: language === 'ru' ? 'Фев' : 'Feb', value: 73.5 },
      { month: language === 'ru' ? 'Мар' : 'Mar', value: 75.2 },
      { month: language === 'ru' ? 'Апр' : 'Apr', value: 76.8 },
      { month: language === 'ru' ? 'Май' : 'May', value: 77.9 },
      { month: language === 'ru' ? 'Июн' : 'Jun', value: 78.5 },
      { month: language === 'ru' ? 'Июл' : 'Jul', value: 79.2 },
      { month: language === 'ru' ? 'Авг' : 'Aug', value: 80.1 },
      { month: language === 'ru' ? 'Сен' : 'Sep', value: 81.3 },
      { month: language === 'ru' ? 'Окт' : 'Oct', value: 82.7 },
      { month: language === 'ru' ? 'Ноя' : 'Nov', value: 83.9 },
      { month: language === 'ru' ? 'Дек' : 'Dec', value: 85.2 }
    ]
  };

  // Моковые данные для тепловой карты Казахстана
  const heatMapData = {
    regions: {
      [language === 'ru' ? 'Алматы' : 'Almaty']: {
        tourists: 4500,
        emissionsReduction: 78.5,
        ecoMeasures: 15,
        intensity: 85
      },
      [language === 'ru' ? 'Астана' : 'Astana']: {
        tourists: 3200,
        emissionsReduction: 65.2,
        ecoMeasures: 12,
        intensity: 72
      },
      [language === 'ru' ? 'Шымкент' : 'Shymkent']: {
        tourists: 2100,
        emissionsReduction: 45.8,
        ecoMeasures: 8,
        intensity: 58
      },
      [language === 'ru' ? 'Алматинская область' : 'Almaty Region']: {
        tourists: 2800,
        emissionsReduction: 92.1,
        ecoMeasures: 18,
        intensity: 95
      },
      [language === 'ru' ? 'Актюбинская область' : 'Aktobe Region']: {
        tourists: 1200,
        emissionsReduction: 35.4,
        ecoMeasures: 6,
        intensity: 42
      },
      [language === 'ru' ? 'Атырауская область' : 'Atyrau Region']: {
        tourists: 800,
        emissionsReduction: 28.7,
        ecoMeasures: 4,
        intensity: 35
      },
      [language === 'ru' ? 'Восточно-Казахстанская область' : 'East Kazakhstan Region']: {
        tourists: 1500,
        emissionsReduction: 52.3,
        ecoMeasures: 9,
        intensity: 65
      },
      [language === 'ru' ? 'Жамбылская область' : 'Zhambyl Region']: {
        tourists: 1100,
        emissionsReduction: 38.9,
        ecoMeasures: 7,
        intensity: 48
      },
      [language === 'ru' ? 'Западно-Казахстанская область' : 'West Kazakhstan Region']: {
        tourists: 900,
        emissionsReduction: 32.1,
        ecoMeasures: 5,
        intensity: 38
      },
      [language === 'ru' ? 'Карагандинская область' : 'Karaganda Region']: {
        tourists: 1800,
        emissionsReduction: 58.7,
        ecoMeasures: 10,
        intensity: 68
      },
      [language === 'ru' ? 'Костанайская область' : 'Kostanay Region']: {
        tourists: 1300,
        emissionsReduction: 42.5,
        ecoMeasures: 7,
        intensity: 52
      },
      [language === 'ru' ? 'Кызылординская область' : 'Kyzylorda Region']: {
        tourists: 700,
        emissionsReduction: 25.3,
        ecoMeasures: 3,
        intensity: 28
      },
      [language === 'ru' ? 'Мангистауская область' : 'Mangystau Region']: {
        tourists: 600,
        emissionsReduction: 22.8,
        ecoMeasures: 3,
        intensity: 25
      },
      [language === 'ru' ? 'Павлодарская область' : 'Pavlodar Region']: {
        tourists: 1400,
        emissionsReduction: 48.6,
        ecoMeasures: 8,
        intensity: 55
      },
      [language === 'ru' ? 'Северо-Казахстанская область' : 'North Kazakhstan Region']: {
        tourists: 1000,
        emissionsReduction: 36.2,
        ecoMeasures: 6,
        intensity: 45
      },
      [language === 'ru' ? 'Туркестанская область' : 'Turkestan Region']: {
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
      [language === 'ru' ? 'Алматы' : 'Almaty']: { tourists: 4500, bookings: 3200, ecoRating: 8.5 },
      [language === 'ru' ? 'Астана' : 'Astana']: { tourists: 3200, bookings: 2100, ecoRating: 7.8 },
      [language === 'ru' ? 'Шымкент' : 'Shymkent']: { tourists: 2100, bookings: 1500, ecoRating: 6.9 },
      [language === 'ru' ? 'Алматинская область' : 'Almaty Region']: { tourists: 2800, bookings: 1900, ecoRating: 9.2 },
      [language === 'ru' ? 'Актау' : 'Aktau']: { tourists: 1200, bookings: 800, ecoRating: 7.1 },
      [language === 'ru' ? 'Атырау' : 'Atyrau']: { tourists: 900, bookings: 600, ecoRating: 6.5 },
      [language === 'ru' ? 'Павлодар' : 'Pavlodar']: { tourists: 1100, bookings: 750, ecoRating: 7.3 },
      [language === 'ru' ? 'Усть-Каменогорск' : 'Ust-Kamenogorsk']: { tourists: 1300, bookings: 900, ecoRating: 8.1 }
    },
    topDirections: {
      popularity: [
        { name: language === 'ru' ? 'Алматы - Чимбулак' : 'Almaty - Chimbulak', tourists: 3200, rating: 9.1 },
        { name: language === 'ru' ? 'Астана - Бурабай' : 'Astana - Burabay', tourists: 2800, rating: 8.7 },
        { name: language === 'ru' ? 'Алматы - Балхаш' : 'Almaty - Balkhash', tourists: 2100, rating: 8.3 },
        { name: language === 'ru' ? 'Шымкент - Сайрам' : 'Shymkent - Sairam', tourists: 1800, rating: 7.9 },
        { name: language === 'ru' ? 'Алматинская область - Капчагай' : 'Almaty Region - Kapchagay', tourists: 1600, rating: 8.5 }
      ],
      revenue: [
        { name: language === 'ru' ? 'Алматы - Чимбулак' : 'Almaty - Chimbulak', revenue: 45600000, rating: 9.1 },
        { name: language === 'ru' ? 'Астана - Бурабай' : 'Astana - Burabay', revenue: 38900000, rating: 8.7 },
        { name: language === 'ru' ? 'Алматы - Балхаш' : 'Almaty - Balkhash', revenue: 28700000, rating: 8.3 },
        { name: language === 'ru' ? 'Шымкент - Сайрам' : 'Shymkent - Sairam', revenue: 23400000, rating: 7.9 },
        { name: language === 'ru' ? 'Алматинская область - Капчагай' : 'Almaty Region - Kapchagay', revenue: 19800000, rating: 8.5 }
      ],
      ecoRating: [
        { name: language === 'ru' ? 'Алматинская область - Капчагай' : 'Almaty Region - Kapchagay', ecoRating: 9.2, tourists: 1600 },
        { name: language === 'ru' ? 'Алматы - Чимбулак' : 'Almaty - Chimbulak', ecoRating: 9.1, tourists: 3200 },
        { name: language === 'ru' ? 'Астана - Бурабай' : 'Astana - Burabay', ecoRating: 8.7, tourists: 2800 },
        { name: language === 'ru' ? 'Алматы - Балхаш' : 'Almaty - Balkhash', ecoRating: 8.3, tourists: 2100 },
        { name: language === 'ru' ? 'Шымкент - Сайрам' : 'Shymkent - Sairam', ecoRating: 7.9, tourists: 1800 }
      ]
    },
    greenRegions: {
      ecoInfrastructure: [
        { region: language === 'ru' ? 'Алматинская область' : 'Almaty Region', score: 9.2, projects: 15 },
        { region: language === 'ru' ? 'Алматы' : 'Almaty', score: 8.5, projects: 12 },
        { region: language === 'ru' ? 'Астана' : 'Astana', score: 7.8, projects: 8 },
        { region: language === 'ru' ? 'Шымкент' : 'Shymkent', score: 6.9, projects: 5 },
        { region: language === 'ru' ? 'Актау' : 'Aktau', score: 7.1, projects: 6 }
      ],
      ecoActivities: [
        { region: language === 'ru' ? 'Алматинская область' : 'Almaty Region', activities: 25, participants: 3200 },
        { region: language === 'ru' ? 'Алматы' : 'Almaty', activities: 18, participants: 2800 },
        { region: language === 'ru' ? 'Астана' : 'Astana', activities: 12, participants: 1900 },
        { region: language === 'ru' ? 'Шымкент' : 'Shymkent', activities: 8, participants: 1200 },
        { region: language === 'ru' ? 'Актау' : 'Aktau', activities: 6, participants: 800 }
      ],
      ecoCertificates: [
        { region: language === 'ru' ? 'Алматинская область' : 'Almaty Region', certificates: 8, hotels: 12 },
        { region: language === 'ru' ? 'Алматы' : 'Almaty', certificates: 6, hotels: 15 },
        { region: language === 'ru' ? 'Астана' : 'Astana', certificates: 4, hotels: 8 },
        { region: language === 'ru' ? 'Шымкент' : 'Shymkent', certificates: 3, hotels: 5 },
        { region: language === 'ru' ? 'Актау' : 'Aktau', certificates: 2, hotels: 3 }
      ]
    }
  };

  // Моковые данные для статистики гидов
  const guidesData = {
    totalGuides: 156,
    activeGuides: 142,
    newGuides: 23,
    guidesByRegion: {
      [language === 'ru' ? 'Алматы' : 'Almaty']: 45,
      [language === 'ru' ? 'Астана' : 'Astana']: 32,
      [language === 'ru' ? 'Шымкент' : 'Shymkent']: 28,
      [language === 'ru' ? 'Алматинская область' : 'Almaty Region']: 25,
      [language === 'ru' ? 'Другие регионы' : 'Other Regions']: 26
    },
    guidesByLevel: {
      [language === 'ru' ? 'Начинающий' : 'Beginner']: 45,
      [language === 'ru' ? 'Средний' : 'Intermediate']: 67,
      [language === 'ru' ? 'Продвинутый' : 'Advanced']: 44
    },
    ratingDistribution: {
      [language === 'ru' ? '5 звезд' : '5 stars']: 23,
      [language === 'ru' ? '4 звезды' : '4 stars']: 67,
      [language === 'ru' ? '3 звезды' : '3 stars']: 45,
      [language === 'ru' ? '2 звезды' : '2 stars']: 15,
      [language === 'ru' ? '1 звезда' : '1 star']: 6
    },
    coursesCompleted: {
      [language === 'ru' ? 'Основы экологического туризма' : 'Basics of Ecological Tourism']: 89,
      [language === 'ru' ? 'Экологическая безопасность' : 'Ecological Safety']: 67,
      [language === 'ru' ? 'Устойчивое развитие туризма' : 'Sustainable Tourism Development']: 45,
      [language === 'ru' ? 'Первая помощь в походах' : 'First Aid in Hiking']: 78,
      [language === 'ru' ? 'Экологическое законодательство' : 'Environmental Legislation']: 34
    },
    certificationStatus: {
      [language === 'ru' ? 'Сертифицированные' : 'Certified']: 89,
      [language === 'ru' ? 'В процессе сертификации' : 'In Certification Process']: 34,
      [language === 'ru' ? 'Не сертифицированные' : 'Not Certified']: 33
    },
    performanceMetrics: {
      averageRating: 4.2,
      totalTours: 1247,
      averageToursPerGuide: 8.8,
      customerSatisfaction: 92.5
    },
    topGuides: [
      { name: language === 'ru' ? 'Айгуль Сатпаева' : 'Aigul Satpaeva', rating: 4.9, tours: 45, region: language === 'ru' ? 'Алматы' : 'Almaty' },
      { name: language === 'ru' ? 'Марат Жумабаев' : 'Marat Zhumabaev', rating: 4.8, tours: 38, region: language === 'ru' ? 'Астана' : 'Astana' },
      { name: language === 'ru' ? 'Анна Ким' : 'Anna Kim', rating: 4.7, tours: 42, region: language === 'ru' ? 'Шымкент' : 'Shymkent' },
      { name: language === 'ru' ? 'Данияр Нурланов' : 'Daniyar Nurlyanov', rating: 4.6, tours: 35, region: language === 'ru' ? 'Алматинская область' : 'Almaty Region' },
      { name: language === 'ru' ? 'Елена Петрова' : 'Elena Petrova', rating: 4.5, tours: 31, region: language === 'ru' ? 'Алматы' : 'Almaty' }
    ],
    trainingProgress: {
      [language === 'ru' ? 'Завершили базовый курс' : 'Completed Basic Course']: 89,
      [language === 'ru' ? 'Завершили продвинутый курс' : 'Completed Advanced Course']: 67,
      [language === 'ru' ? 'Проходят обучение' : 'Currently Training']: 23,
      [language === 'ru' ? 'Не начали обучение' : 'Not Started Training']: 12
    },
    specializations: {
      [language === 'ru' ? 'Горные походы' : 'Mountain Hiking']: 45,
      [language === 'ru' ? 'Эко-туры' : 'Eco Tours']: 38,
      [language === 'ru' ? 'Культурные туры' : 'Cultural Tours']: 32,
      [language === 'ru' ? 'Приключенческие туры' : 'Adventure Tours']: 28,
      [language === 'ru' ? 'Оздоровительные туры' : 'Wellness Tours']: 13
    }
  };

  // Моковые данные для статистики
  const menuItems = [
    {
      id: 'dashboard',
      title: t.dashboardMenu,
      icon: ChartBarIcon,
      items: [
        { 
          name: t.totalTouristsMenu, 
          action: 'total-tourists',
          subItems: [
            { name: t.activeTouristsSubmenu, action: 'active-tourists' },
            { name: t.newRegistrationsSubmenu, action: 'new-registrations' },
            { name: t.touristGeographySubmenu, action: 'tourist-geography' }
          ]
        },
        { 
          name: t.totalBookingsMenu, 
          action: 'total-bookings',
          subItems: [
            { name: t.confirmedBookingsSubmenu, action: 'confirmed-bookings' },
            { name: t.cancelledBookingsSubmenu, action: 'cancelled-bookings' },
            { name: t.pendingBookingsSubmenu, action: 'pending-bookings' }
          ]
        },
        { 
          name: t.averageCarbonFootprintMenu, 
          action: 'carbon-footprint',
          subItems: [
            { name: t.carbonByRegionSubmenu, action: 'carbon-by-region' },
            { name: t.carbonByTourTypeSubmenu, action: 'carbon-by-tour-type' },
            { name: t.carbonTrendsSubmenu, action: 'carbon-trends' }
          ]
        },
        { 
          name: t.co2CompensationMenu, 
          action: 'co2-compensation',
          subItems: [
            { name: t.compensationEffectivenessSubmenu, action: 'compensation-effectiveness' },
            { name: t.compensationComparisonSubmenu, action: 'compensation-comparison' },
            { name: t.compensationForecastSubmenu, action: 'compensation-forecast' }
          ]
        }
      ]
    },
    {
      id: 'guides',
      title: t.guidesMenu,
      icon: ChartBarIcon,
      items: [
        { 
          name: t.guidesOverviewMenu, 
          action: 'guides-overview',
          subItems: [
            { name: t.guidesByRegionSubmenu, action: 'guides-by-region' },
            { name: t.guidesByLevelSubmenu, action: 'guides-by-level' },
            { name: t.newGuidesSubmenu, action: 'new-guides' }
          ]
        },
        { 
          name: t.guidesRatingsMenu, 
          action: 'guides-ratings',
          subItems: [
            { name: t.ratingDistributionSubmenu, action: 'rating-distribution' },
            { name: t.topGuidesSubmenu, action: 'top-guides' },
            { name: t.customerSatisfactionSubmenu, action: 'customer-satisfaction' }
          ]
        },
        { 
          name: t.guidesTrainingMenu, 
          action: 'guides-training',
          subItems: [
            { name: t.completedCoursesSubmenu, action: 'completed-courses' },
            { name: t.certificationStatusSubmenu, action: 'certification-status' },
            { name: t.trainingProgressSubmenu, action: 'training-progress' }
          ]
        },
        { 
          name: t.guidesPerformanceMenu, 
          action: 'guides-performance',
          subItems: [
            { name: t.toursCountSubmenu, action: 'tours-count' },
            { name: t.averageRatingSubmenu, action: 'average-rating' },
            { name: t.specializationsSubmenu, action: 'specializations' }
          ]
        }
      ]
    },
    {
      id: 'regions',
      title: t.regionsMenu,
      icon: ChartBarIcon,
      items: [
        { 
          name: t.activityMapMenu, 
          action: 'activity-map',
          subItems: [
            { name: t.interactiveMapSubmenu, action: 'interactive-map' },
            { name: t.heatMapSubmenu, action: 'heat-map' },
            { name: t.touristConcentrationSubmenu, action: 'tourist-concentration' }
          ]
        },
        { 
          name: t.topDirectionsMenu, 
          action: 'top-directions',
          subItems: [
            { name: t.popularityRankingSubmenu, action: 'popularity-ranking' },
            { name: t.revenueRankingSubmenu, action: 'revenue-ranking' },
            { name: t.ecoRatingRankingSubmenu, action: 'eco-rating-ranking' }
          ]
        },
        { 
          name: t.greenRegionsMenu, 
          action: 'green-regions',
          subItems: [
            { name: t.ecoInfrastructureSubmenu, action: 'eco-infrastructure' },
            { name: t.ecoActivitiesSubmenu, action: 'eco-activities' },
            { name: t.ecoCertificatesSubmenu, action: 'eco-certificates' }
          ]
        }
      ]
    },
    {
      id: 'ecoProjects',
      title: t.ecoProjectsMenu,
      icon: ChartBarIcon,
      items: [
        { 
          name: t.awaitingGreenFinancingMenu, 
          action: 'awaiting-green-financing',
          subItems: [
            { name: t.financingStatusSubmenu, action: 'financing-status' },
            { name: t.fundingAmountSubmenu, action: 'funding-amount' },
            { name: t.projectProgressSubmenu, action: 'project-progress' }
          ]
        },
        { 
          name: t.receivedGreenFinancingMenu, 
          action: 'received-green-financing',
          subItems: [
            { name: t.implementationRateSubmenu, action: 'implementation-rate' },
            { name: t.successRateSubmenu, action: 'success-rate' },
            { name: t.projectProgressSubmenu, action: 'project-progress' }
          ]
        },
        { 
          name: t.implementedProjectsMenu, 
          action: 'implemented-projects',
          subItems: [
            { name: t.successRateSubmenu, action: 'success-rate' },
            { name: t.ecoImpactSubmenu, action: 'eco-impact' },
            { name: t.costBenefitSubmenu, action: 'cost-benefit' }
          ]
        },
        { 
          name: t.projectsInProgressMenu, 
          action: 'projects-in-progress',
          subItems: [
            { name: t.projectProgressSubmenu, action: 'project-progress' },
            { name: t.completionForecastSubmenu, action: 'completion-forecast' },
            { name: t.resourceAllocationSubmenu, action: 'resource-allocation' }
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
    // Сброс форм
    setCourseForm({
      title: '',
      description: '',
      duration: '',
      level: 'beginner',
      instructor: 'Айгуль Садыкова',
      status: 'active'
    });
    setEventForm({
      title: '',
      description: '',
      date: '',
      type: 'eco-event',
      region: 'Все регионы',
      status: 'active'
    });
  };

  const handleStatAction = (action: string) => {
    setSelectedStatAction(action);
    setShowStatModal(true);
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

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-green-800">{t.coursesForGuides}</h3>
        <button
          onClick={() => handleAddNew('course')}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
        >
          <PlusIcon className="w-5 h-5" />
                        <span>{t.addCourse}</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCourses.map((course) => (
          <div key={course.id} className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-lg font-semibold text-green-800">{course.title}</h4>
              <span className={`px-2 py-1 rounded-full text-xs ${
                course.status === 'active' ? 'bg-green-100 text-green-800' :
                course.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {course.status === 'active' ? t.activeStatus : 
                 course.status === 'inactive' ? t.inactiveStatus : 'Archive'}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600"><strong>{t.duration}:</strong> {course.duration}</p>
              <p className="text-sm text-gray-600"><strong>{t.level}:</strong> {course.level}</p>
              <p className="text-sm text-gray-600"><strong>{t.instructorAigul.split(' ')[0]}:</strong> {course.instructor}</p>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 bg-green-100 text-green-800 py-2 rounded-lg hover:bg-green-200 flex items-center justify-center space-x-1">
                <EyeIcon className="w-4 h-4" />
                <span>{t.view}</span>
              </button>
              <button className="flex-1 bg-blue-100 text-blue-800 py-2 rounded-lg hover:bg-blue-200 flex items-center justify-center space-x-1">
                <PencilIcon className="w-4 h-4" />
                <span>{t.edit}</span>
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
        <button
          onClick={() => handleAddNew('event')}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
        >
          <PlusIcon className="w-5 h-5" />
                        <span>{t.addEvent}</span>
        </button>
      </div>
      
      <div className="space-y-4">
        {mockEvents.map((event) => (
          <div key={event.id} className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-lg font-semibold text-green-800">{event.title}</h4>
              <div className="flex space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  event.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {event.status === 'active' ? t.activeStatus : t.inactiveStatus}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  event.type === 'holiday' ? 'bg-blue-100 text-blue-800' :
                  event.type === 'eco-event' ? 'bg-green-100 text-green-800' :
                  event.type === 'news' ? 'bg-purple-100 text-purple-800' :
                  event.type === 'promotion' ? 'bg-orange-100 text-orange-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {event.type === 'holiday' ? t.holiday : 
                   event.type === 'eco-event' ? t.ecoEvent :
                   event.type === 'news' ? t.newsItem :
                   event.type === 'promotion' ? t.promotion : 'Event'}
                </span>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{event.description}</p>
            <div className="flex justify-between items-center">
              <div className="flex space-x-4 text-sm text-gray-600">
                <span>{t.eventDate}: {event.date}</span>
                <span>{t.eventRegion}: {event.region}</span>
                {event.type === 'news' && <span>{t.category}: {t.newsItem}</span>}
                {event.type === 'promotion' && <span>{t.category}: {t.promotion}</span>}
              </div>
              <div className="flex space-x-2">
                <button className="bg-green-100 text-green-800 px-3 py-1 rounded hover:bg-green-200 text-sm">
                  {t.edit}
                </button>
                <button className="bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200 text-sm">
                  {t.delete}
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
                <h4 className="text-lg font-semibold text-blue-800 mb-2">{t.totalTouristsStats}</h4>
                <p className="text-3xl font-bold text-blue-600">{dashboardData.totalTourists.toLocaleString()}</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-green-800 mb-2">{t.activeTourists}</h4>
                <p className="text-3xl font-bold text-green-600">{dashboardData.activeTourists.toLocaleString()}</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-purple-800 mb-2">{t.newRegistrationsStats}</h4>
                <p className="text-3xl font-bold text-purple-600">{dashboardData.newRegistrations.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">{t.touristGeographyStats}</h4>
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
                <h4 className="text-lg font-semibold text-green-800 mb-2">{t.confirmedBookingsStats}</h4>
                <p className="text-3xl font-bold text-green-600">{dashboardData.confirmedBookings.toLocaleString()}</p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-yellow-800 mb-2">{t.pendingBookingsStats}</h4>
                <p className="text-3xl font-bold text-yellow-600">{dashboardData.pendingBookings.toLocaleString()}</p>
              </div>
              <div className="bg-red-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-red-800 mb-2">{t.cancelledBookingsStats}</h4>
                <p className="text-3xl font-bold text-red-600">{dashboardData.cancelledBookings.toLocaleString()}</p>
              </div>
            </div>
          </div>
        );
        
      case 'carbon-footprint':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">{t.averageCarbonFootprint}: {dashboardData.averageCarbonFootprint} т CO2</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-700 mb-3">{t.byRegions}</h5>
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
                  <h5 className="font-semibold text-gray-700 mb-3">{t.byTourTypes}</h5>
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
              <h4 className="text-lg font-semibold text-gray-800 mb-4">{t.carbonFootprintTrends}</h4>
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
                <h4 className="text-lg font-semibold text-green-800 mb-2">{t.co2Compensation}</h4>
                <p className="text-3xl font-bold text-green-600">{dashboardData.co2Compensation}%</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-blue-800 mb-2">{t.effectiveness}</h4>
                <p className="text-3xl font-bold text-blue-600">{dashboardData.compensationEffectiveness}%</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">{t.compensationMethodsComparison}</h4>
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
              <h4 className="text-lg font-semibold text-gray-800 mb-4">{t.compensationForecast}</h4>
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
                  <h5 className="font-semibold text-blue-800 mb-2">{t.totalTourists}</h5>
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
              <h4 className="text-lg font-semibold text-gray-800 mb-4">{t.heatMapKazakhstan}</h4>
              <p className="text-sm text-gray-600 mb-6">{t.intensityColorDescription}</p>
              
              {/* Легенда */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h5 className="font-semibold text-gray-800 mb-3">{t.intensityLegend}</h5>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-red-100 border-2 border-red-300 rounded"></div>
                    <span>{t.lowIntensity}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-yellow-100 border-2 border-yellow-300 rounded"></div>
                    <span>{t.mediumIntensity}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-green-100 border-2 border-green-300 rounded"></div>
                    <span>{t.highIntensity}</span>
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
                            <div className="text-sm text-gray-600 mb-1">{t.emissionsReduction}</div>
                            <div className="text-xl font-bold text-green-600">{data.emissionsReduction}%</div>
                          </div>
                          
                          <div className="bg-white p-3 rounded-lg">
                            <div className="text-sm text-gray-600 mb-1">{t.ecoMeasures}</div>
                            <div className="text-xl font-bold text-purple-600">{data.ecoMeasures}</div>
                          </div>
                          
                          <div className="bg-white p-3 rounded-lg">
                            <div className="text-sm text-gray-600 mb-1">{t.effectiveness}</div>
                            <div className="text-xl font-bold text-orange-600">
                              {Math.round((data.tourists * data.emissionsReduction) / 100)} т CO2
                            </div>
                          </div>
                        </div>
                        
                        {/* Прогресс-бар интенсивности */}
                        <div className="mt-3">
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>{t.intensityActivity}</span>
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
                    <div className="text-sm text-gray-600">{t.totalTourists}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {Math.round(Object.values(heatMapData.regions).reduce((sum, data) => sum + data.emissionsReduction, 0) / Object.keys(heatMapData.regions).length)}%
                    </div>
                    <div className="text-sm text-gray-600">{t.averageEmissionsReduction}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {Object.values(heatMapData.regions).reduce((sum, data) => sum + data.ecoMeasures, 0)}
                    </div>
                    <div className="text-sm text-gray-600">{t.totalEcoMeasures}</div>
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
                        <p className="text-sm text-gray-600">{t.projects}: {region.projects}</p>
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
                        <p className="text-sm text-gray-600">{t.activities}: {region.activities}</p>
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
                        <p className="text-sm text-gray-600">{t.hotels}: {region.hotels}</p>
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

  const handleCourseFormChange = (field: string, value: string) => {
    setCourseForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEventFormChange = (field: string, value: string) => {
    setEventForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveCourse = () => {
    if (courseForm.title && courseForm.description && courseForm.duration) {
      const newCourse: Course = {
        id: mockCourses.length + 1,
        title: courseForm.title,
        description: courseForm.description,
        duration: courseForm.duration + ' часов',
        level: courseForm.level,
        instructor: courseForm.instructor,
        status: courseForm.status
      };
      
      // В реальном приложении здесь был бы API вызов
      // mockCourses.push(newCourse);
      
      // Показываем уведомление об успешном добавлении
      alert(t.courseAddedSuccessfully || 'Курс успешно добавлен!');
      closeModal();
    } else {
      alert(t.pleaseFillAllFields || 'Пожалуйста, заполните все поля!');
    }
  };

  const handleSaveEvent = () => {
    if (eventForm.title && eventForm.description && eventForm.date) {
      const newEvent: CalendarEvent = {
        id: (mockEvents.length + 1).toString(),
        title: eventForm.title,
        description: eventForm.description,
        date: eventForm.date,
        type: eventForm.type,
        region: eventForm.region,
        status: eventForm.status
      };
      
      // В реальном приложении здесь был бы API вызов
      // mockEvents.push(newEvent);
      
      // Показываем уведомление об успешном добавлении
      alert(t.eventAddedSuccessfully || 'Событие успешно добавлено!');
      closeModal();
    } else {
      alert(t.pleaseFillAllFields || 'Пожалуйста, заполните все поля!');
    }
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
              <span>{t.statistics}</span>
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
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-green-800">
                {modalType === 'course' ? t.addCourse :
                 modalType === 'event' ? t.addEvent : ''}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            {modalType === 'course' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.courseName}</label>
                  <input
                    type="text"
                    value={courseForm.title}
                    onChange={(e) => handleCourseFormChange('title', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder={t.courseNamePlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.description}</label>
                  <textarea
                    value={courseForm.description}
                    onChange={(e) => handleCourseFormChange('description', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows={3}
                    placeholder={t.courseDescriptionPlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.duration}</label>
                  <input
                    type="number"
                    value={courseForm.duration}
                    onChange={(e) => handleCourseFormChange('duration', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder={t.durationPlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.level}</label>
                  <select 
                    value={courseForm.level}
                    onChange={(e) => handleCourseFormChange('level', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="beginner">{t.beginner}</option>
                    <option value="intermediate">{t.intermediate}</option>
                    <option value="advanced">{t.advanced}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.instructor}</label>
                  <select 
                    value={courseForm.instructor}
                    onChange={(e) => handleCourseFormChange('instructor', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="Айгуль Садыкова">{t.instructorAigul}</option>
                    <option value="Марат Нурланов">{t.instructorMarat}</option>
                    <option value="Анна Петрова">{t.instructorAnna}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.status}</label>
                  <select 
                    value={courseForm.status}
                    onChange={(e) => handleCourseFormChange('status', e.target.value)}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.eventName}</label>
                  <input
                    type="text"
                    value={eventForm.title}
                    onChange={(e) => handleEventFormChange('title', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder={t.eventNamePlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.description}</label>
                  <textarea
                    value={eventForm.description}
                    onChange={(e) => handleEventFormChange('description', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows={3}
                    placeholder={t.eventDescriptionPlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.eventDate}</label>
                  <input
                    type="date"
                    value={eventForm.date}
                    onChange={(e) => handleEventFormChange('date', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.eventType}</label>
                  <select 
                    value={eventForm.type}
                    onChange={(e) => handleEventFormChange('type', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="holiday">{t.holiday}</option>
                    <option value="eco-event">{t.ecoEvent}</option>
                    <option value="news">{t.news}</option>
                    <option value="promotion">{t.promotion}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.eventRegion}</label>
                  <select 
                    value={eventForm.region}
                    onChange={(e) => handleEventFormChange('region', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
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
                    value={eventForm.status}
                    onChange={(e) => handleEventFormChange('status', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="active">{t.activeStatus}</option>
                    <option value="inactive">{t.inactiveStatus}</option>
                  </select>
                </div>
              </div>
            )}
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                {t.cancel}
              </button>
              <button 
                onClick={modalType === 'course' ? handleSaveCourse : handleSaveEvent}
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
             !selectedStatAction?.includes('specializations') && (
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