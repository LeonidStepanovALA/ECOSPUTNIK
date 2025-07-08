'use client';

import React, { useState } from 'react';
import { HomeIcon, LightBulbIcon, DocumentCheckIcon, CalendarIcon, ChartBarIcon, AcademicCapIcon, ChatBubbleLeftIcon, ShoppingBagIcon, XMarkIcon, PlusIcon, PencilIcon, EyeIcon, CheckCircleIcon, ExclamationTriangleIcon, ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function AccommodationDashboard() {
  const { language, changeLanguage } = useLanguage();
  const t = translations[language];

  const menuItems = [
    {
      id: 'info',
      title: t.basicInfo,
      icon: HomeIcon,
      items: [
        { 
          name: t.nameAndDescription, 
          action: 'edit-info',
          subItems: [
            { name: t.editName, action: 'edit-name' },
            { name: t.changeDescription, action: 'edit-description' },
            { name: t.addKeywords, action: 'add-keywords' }
          ]
        },
        { 
          name: t.photosAndVideos, 
          action: 'upload-media',
          subItems: [
            { name: t.uploadPhotos, action: 'upload-photos' },
            { name: t.addVideos, action: 'upload-videos' },
            { name: t.manageGallery, action: 'manage-gallery' }
          ]
        },
        { 
          name: t.location, 
          action: 'set-location',
          subItems: [
            { name: t.setCoordinates, action: 'set-coordinates' },
            { name: t.addAddress, action: 'add-address' },
            { name: t.mapAndRoutes, action: 'map-routes' }
          ]
        },
        { 
          name: t.category, 
          action: 'set-category',
          subItems: [
            { name: t.selectType, action: 'select-type' },
            { name: t.setStars, action: 'set-stars' },
            { name: t.specialization, action: 'specialization' }
          ]
        },
        { 
          name: t.ecoStatus, 
          action: 'eco-status',
          subItems: [
            { name: t.checkEcoRating, action: 'check-eco-rating' },
            { name: t.improveMetrics, action: 'improve-metrics' },
            { name: t.getCertificate, action: 'get-certificate' }
          ]
        }
      ]
    },
    {
      id: 'eco-measures',
      title: t.ecoMeasures,
      icon: LightBulbIcon,
      items: [
        { 
          name: t.energy, 
          action: 'energy-measures',
          subItems: [
            { name: t.solarPanels, action: 'solar-panels' },
            { name: t.energySaving, action: 'energy-saving' },
            { name: t.smartSystems, action: 'smart-systems' }
          ]
        },
        { 
          name: t.water, 
          action: 'water-measures',
          subItems: [
            { name: t.waterPurification, action: 'water-purification' },
            { name: t.rainwaterHarvesting, action: 'rainwater-harvesting' },
            { name: t.waterConservation, action: 'water-conservation' }
          ]
        },
        { 
          name: t.waste, 
          action: 'waste-measures',
          subItems: [
            { name: t.recycling, action: 'recycling' },
            { name: t.composting, action: 'composting' },
            { name: t.wasteSorting, action: 'waste-sorting' }
          ]
        },
        { 
          name: t.food, 
          action: 'food-measures',
          subItems: [
            { name: t.organicFood, action: 'organic-food' },
            { name: t.localSuppliers, action: 'local-suppliers' },
            { name: t.zeroWasteKitchen, action: 'zero-waste-kitchen' }
          ]
        },
        { 
          name: t.transport, 
          action: 'transport-measures',
          subItems: [
            { name: t.electricCars, action: 'electric-cars' },
            { name: t.bicycles, action: 'bicycles' },
            { name: t.ecoTransfer, action: 'eco-transfer' }
          ]
        }
      ]
    },
    {
      id: 'certificates',
      title: t.certificates,
      icon: DocumentCheckIcon,
      items: [
        { 
          name: 'LEED', 
          action: 'leed-cert',
          subItems: [
            { name: t.applyLeed, action: 'apply-leed' },
            { name: t.prepareLeedDocs, action: 'prepare-leed-docs' },
            { name: t.leedAudit, action: 'leed-audit' }
          ]
        },
        { 
          name: 'Green Key', 
          action: 'green-key-cert',
          subItems: [
            { name: t.registerGreenKey, action: 'register-green-key' },
            { name: t.fillGreenKeyForm, action: 'fill-green-key-form' },
            { name: t.getGreenKeyAssessment, action: 'get-green-key-assessment' }
          ]
        },
        { 
          name: 'Biosphere', 
          action: 'biosphere-cert',
          subItems: [
            { name: t.applyBiosphere, action: 'apply-biosphere' },
            { name: t.prepareBiosphereReport, action: 'prepare-biosphere-report' },
            { name: t.biosphereInspection, action: 'biosphere-inspection' }
          ]
        },
        { 
          name: t.uploadDocs, 
          action: 'upload-docs',
          subItems: [
            { name: t.uploadCertificates, action: 'upload-certificates' },
            { name: t.addReports, action: 'add-reports' },
            { name: t.manageFiles, action: 'manage-files' }
          ]
        }
      ]
    },
    {
      id: 'bookings',
      title: t.bookingManagement,
      icon: CalendarIcon,
      items: [
        { 
          name: t.availabilityCalendar, 
          action: 'calendar',
          subItems: [
            { name: t.setPrices, action: 'set-prices' },
            { name: t.blockDates, action: 'block-dates' },
            { name: t.specialOffers, action: 'special-offers' }
          ]
        },
        { 
          name: t.confirmBookings, 
          action: 'confirm-bookings',
          subItems: [
            { name: t.autoConfirm, action: 'auto-confirm' },
            { name: t.manualConfirm, action: 'manual-confirm' },
            { name: t.bookingRules, action: 'booking-rules' }
          ]
        },
        { 
          name: t.cancelBookings, 
          action: 'cancel-bookings',
          subItems: [
            { name: t.cancellationPolicy, action: 'cancellation-policy' },
            { name: t.refundProcess, action: 'refund-process' },
            { name: t.cancellationNotifications, action: 'cancellation-notifications' }
          ]
        },
        { 
          name: t.guestChat, 
          action: 'guest-chat',
          subItems: [
            { name: t.openChat, action: 'open-chat' },
            { name: t.messageTemplates, action: 'message-templates' },
            { name: t.chatHistory, action: 'chat-history' }
          ]
        }
      ]
    },
    {
      id: 'analytics',
      title: t.analytics,
      icon: ChartBarIcon,
      items: [
        { 
          name: 'Статистика бронирований', 
          action: 'booking-stats',
          subItems: [
            { name: t.monthlyOccupancy, action: 'monthly-occupancy' },
            { name: t.averageBill, action: 'average-bill' },
            { name: t.popularDates, action: 'popular-dates' }
          ]
        },
        { 
          name: 'Отзывы гостей', 
          action: 'guest-reviews',
          subItems: [
            { name: t.ratingByCategory, action: 'rating-by-category' },
            { name: t.textReviews, action: 'text-reviews' },
            { name: t.reviewResponses, action: 'review-responses' }
          ]
        },
        { 
          name: 'Эко-метрики', 
          action: 'eco-metrics',
          subItems: [
            { name: t.energySavings, action: 'energy-savings' },
            { name: t.wasteReduction, action: 'waste-reduction' },
            { name: t.ecoRating, action: 'eco-rating' }
          ]
        }
      ]
    }
  ];

  const [activeSection, setActiveSection] = useState('info');
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleAction = (action: string) => {
    setSelectedAction(action);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAction(null);
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

  const renderContent = () => {
    const currentSection = menuItems.find(item => item.id === activeSection);
    
    if (!currentSection) return null;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentSection.items.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-green-800">{item.name}</h3>
                <button
                  onClick={() => toggleExpanded(item.name)}
                  className="text-green-600 hover:text-green-800"
                >
                  {expandedItems.has(item.name) ? (
                    <ChevronDownIcon className="w-5 h-5" />
                  ) : (
                    <ChevronRightIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              {expandedItems.has(item.name) && (
                <div className="space-y-2 mt-4">
                  {item.subItems.map((subItem, subIndex) => (
                    <button
                      key={subIndex}
                      onClick={() => handleAction(subItem.action)}
                      className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <span className="text-sm text-green-700">{subItem.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
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
            <h1 className="text-2xl font-bold text-green-800">{t.accommodationDashboard}</h1>
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