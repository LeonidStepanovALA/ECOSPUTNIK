'use client';

import React, { useState } from 'react';
import { UserIcon, BriefcaseIcon, CalendarIcon, CurrencyDollarIcon, ChartBarIcon, AcademicCapIcon, ChatBubbleLeftIcon, Cog6ToothIcon, StarIcon, XMarkIcon, PlusIcon, PencilIcon, EyeIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function GuideDashboard() {
  const { language, changeLanguage } = useLanguage();
  const t = translations[language];

  const menuItems = [
    {
      id: 'profile',
      title: t.profile,
      icon: UserIcon,
      items: [
        { name: t.personalData, action: 'edit-profile' },
        { name: t.verification, action: 'verification' },
        { name: t.ecoGuideStatus, action: 'eco-status' },
        { name: t.portfolio, action: 'portfolio' }
      ]
    },
    {
      id: 'tours',
      title: t.myTours,
      icon: BriefcaseIcon,
      items: [
        { name: t.createTour, action: 'create-tour' },
        { name: t.editTours, action: 'edit-tours' },
        { name: t.calendar, action: 'calendar' },
        { name: t.statistics, action: 'statistics' }
      ]
    },
    {
      id: 'bookings',
      title: t.bookings,
      icon: CalendarIcon,
      items: [
        { name: t.currentBookings, action: 'current-bookings' },
        { name: t.completedBookings, action: 'completed-bookings' },
        { name: t.chatWithTourists, action: 'chat' },
        { name: t.emergencyContact, action: 'emergency' }
      ]
    },
    {
      id: 'finance',
      title: t.finance,
      icon: CurrencyDollarIcon,
      items: [
        { name: t.balance, action: 'balance' },
        { name: t.paymentHistory, action: 'payment-history' },
        { name: t.paymentMethods, action: 'payment-methods' },
        { name: t.taxReports, action: 'tax-reports' }
      ]
    },
    {
      id: 'analytics',
      title: t.analytics,
      icon: ChartBarIcon,
      items: [
        { name: t.tourPopularity, action: 'tour-popularity' },
        { name: t.ratings, action: 'ratings' },
        { name: t.recommendations, action: 'recommendations' }
      ]
    },
    {
      id: 'education',
      title: t.education,
      icon: AcademicCapIcon,
      items: [
        { name: t.courses, action: 'courses' },
        { name: t.guides, action: 'guides' },
        { name: t.materials, action: 'materials' }
      ]
    },
    {
      id: 'support',
      title: t.support,
      icon: ChatBubbleLeftIcon,
      items: [
        { name: t.supportChat, action: 'support-chat' },
        { name: t.faq, action: 'faq' }
      ]
    },
    {
      id: 'settings',
      title: t.settings,
      icon: Cog6ToothIcon,
      items: [
        { name: t.notifications, action: 'notifications' },
        { name: t.privacy, action: 'privacy' }
      ]
    },
    {
      id: 'eco-rating',
      title: t.ecoRating,
      icon: StarIcon,
      items: [
        { name: t.ecoPoints, action: 'eco-points' },
        { name: t.ecoBadges, action: 'eco-badges' },
        { name: t.co2Calculator, action: 'co2-calculator' }
      ]
    }
  ];

  // Моковые данные для демонстрации
  const mockData = {
    profile: {
      name: 'Анна Петрова',
      email: 'anna.petrova@example.com',
      phone: '+7 (999) 123-45-67',
      experience: '5 лет',
      ecoStatus: 'EcoGuide Gold',
      rating: 4.8,
      toursCompleted: 127
    },
    tours: [
      { id: 1, name: 'Экотропа "Лесные тропинки"', status: 'active', bookings: 15, rating: 4.9 },
      { id: 2, name: 'Велосипедный тур по паркам', status: 'active', bookings: 8, rating: 4.7 },
      { id: 3, name: 'Сплав по реке', status: 'draft', bookings: 0, rating: 0 }
    ],
    bookings: [
      { id: 1, tourist: 'Иван Смирнов', tour: 'Экотропа "Лесные тропинки"', date: '2024-01-15', status: 'confirmed' },
      { id: 2, tourist: 'Мария Козлова', tour: 'Велосипедный тур по паркам', date: '2024-01-16', status: 'pending' }
    ],
    finance: {
      balance: 45000,
      thisMonth: 12500,
      totalEarnings: 234000
    }
  };

  const [activeSection, setActiveSection] = useState('profile');
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleAction = (action: string) => {
    setSelectedAction(action);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAction(null);
  };

  const renderContent = () => {
    const currentSection = menuItems.find(item => item.id === activeSection);
    
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <UserIcon className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-800">{mockData.profile.name}</h3>
                  <p className="text-green-600">{mockData.profile.ecoStatus}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">{t.email}</p>
                  <p className="text-green-800">{mockData.profile.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t.phone}</p>
                  <p className="text-green-800">{mockData.profile.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t.experience}</p>
                  <p className="text-green-800">{mockData.profile.experience}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t.rating}</p>
                  <p className="text-green-800">⭐ {mockData.profile.rating}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentSection?.items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleAction(item.action)}
                  className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100 hover:border-green-300 hover:shadow-lg transition-all duration-200 text-left"
                >
                  <h3 className="text-xl font-semibold text-green-700 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-green-600">
                    {t.clickForDetails}
                  </p>
                </button>
              ))}
            </div>
          </div>
        );

      case 'tours':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-green-800">{t.myTours}</h3>
              <button
                onClick={() => handleAction('create-tour')}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
              >
                <PlusIcon className="w-5 h-5" />
                <span>{t.createTour}</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockData.tours.map((tour) => (
                <div key={tour.id} className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-semibold text-green-800">{tour.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      tour.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {tour.status === 'active' ? t.active : t.draft}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">{t.bookings}: {tour.bookings}</p>
                    <p className="text-sm text-gray-600">{t.rating}: ⭐ {tour.rating}</p>
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

      case 'bookings':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-800 mb-4">{t.currentBookings}</h3>
              <div className="space-y-4">
                {mockData.bookings.map((booking) => (
                  <div key={booking.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0">
                      <div>
                        <p className="font-semibold text-green-800">{booking.tourist}</p>
                        <p className="text-sm text-gray-600">{booking.tour}</p>
                        <p className="text-sm text-gray-500">{booking.date}</p>
                      </div>
                      <div className="flex space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status === 'confirmed' ? t.confirmed : t.pending}
                        </span>
                        <button className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 text-sm">
                          {t.chat}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentSection?.items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleAction(item.action)}
                  className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100 hover:border-green-300 hover:shadow-lg transition-all duration-200 text-left"
                >
                  <h3 className="text-xl font-semibold text-green-700 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-green-600">
                    {t.clickForDetails}
                  </p>
                </button>
              ))}
            </div>
          </div>
        );

      case 'finance':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100">
                <h3 className="text-lg font-semibold text-green-800 mb-2">{t.balance}</h3>
                <p className="text-3xl font-bold text-green-600">{mockData.finance.balance.toLocaleString()} ₽</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100">
                <h3 className="text-lg font-semibold text-green-800 mb-2">{t.thisMonth}</h3>
                <p className="text-3xl font-bold text-green-600">{mockData.finance.thisMonth.toLocaleString()} ₽</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100">
                <h3 className="text-lg font-semibold text-green-800 mb-2">{t.totalEarnings}</h3>
                <p className="text-3xl font-bold text-green-600">{mockData.finance.totalEarnings.toLocaleString()} ₽</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentSection?.items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleAction(item.action)}
                  className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100 hover:border-green-300 hover:shadow-lg transition-all duration-200 text-left"
                >
                  <h3 className="text-xl font-semibold text-green-700 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-green-600">
                    {t.clickForDetails}
                  </p>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentSection?.items.map((item, index) => (
              <button
                key={index}
                onClick={() => handleAction(item.action)}
                className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100 hover:border-green-300 hover:shadow-lg transition-all duration-200 text-left"
              >
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  {item.name}
                </h3>
                <p className="text-green-600">
                  {t.clickForDetails}
                </p>
              </button>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-green-50">
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-green-600 text-white p-2 rounded-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-green-800">{t.guideDashboard}</h1>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          <nav>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-2 p-3 rounded-lg mb-2 transition-all duration-200 ${
                  activeSection === item.id ? 'bg-green-100 text-green-800' : 'text-gray-600 hover:bg-green-50'
                }`}
              >
                <item.icon className="w-6 h-6" />
                <span>{item.title}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Language Switcher */}
          <div className="flex justify-end mb-4">
            <LanguageSwitcher 
              currentLanguage={language} 
              onLanguageChange={changeLanguage}
            />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-6">
            {menuItems.find(item => item.id === activeSection)?.title}
          </h2>
          
          {renderContent()}
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-green-800">
                {selectedAction}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="text-green-600 mb-4">
              {t.functionInDevelopment}
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
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