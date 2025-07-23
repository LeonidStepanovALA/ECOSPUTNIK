'use client';

import React, { useState } from 'react';
import { ChartBarIcon, MapIcon, RocketLaunchIcon, CloudIcon, UserGroupIcon, XMarkIcon, ChevronRightIcon, ChevronDownIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import EcoProjectsReport from '@/components/EcoProjectsReport';
import FinancingStatusReport from '@/components/FinancingStatusReport';
import InteractiveMap from '@/components/InteractiveMap';
import TopDirections from '@/components/TopDirections';

export default function AnalystDashboard() {
  const { language, changeLanguage } = useLanguage();
  const t = translations[language];

const menuItems = [
  {
    id: 'dashboard',
      title: t.dashboard,
    icon: ChartBarIcon,
    items: [
        { 
          name: t.totalTourists, 
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
          name: t.averageCarbonFootprint, 
          action: 'carbon-footprint',
          subItems: [
            { name: t.carbonByRegion, action: 'carbon-by-region' },
            { name: t.carbonByTourType, action: 'carbon-by-tour-type' },
            { name: t.carbonTrends, action: 'carbon-trends' }
          ]
        },
        { 
          name: t.co2CompensationPercent, 
          action: 'co2-compensation',
          subItems: [
            { name: t.compensationEffectiveness, action: 'compensation-effectiveness' },
            { name: t.compensationComparison, action: 'compensation-comparison' },
            { name: t.compensationForecast, action: 'compensation-forecast' }
          ]
        }
    ]
  },
  {
    id: 'regions',
      title: t.regionReports,
    icon: MapIcon,
    items: [
        { 
          name: t.activityMap, 
          action: 'activity-map',
          subItems: [
            { name: t.interactiveMap, action: 'interactive-map' },
            { name: t.heatMap, action: 'heat-map' },
            { name: t.touristConcentration, action: 'tourist-concentration' }
          ]
        },
        { 
          name: t.top5Directions, 
          action: 'top-directions',
          subItems: [
            { name: t.popularityRanking, action: 'popularity-ranking' },
            { name: t.revenueRanking, action: 'revenue-ranking' },
            { name: t.ecoRatingRanking, action: 'eco-rating-ranking' }
          ]
        },
        { 
          name: t.top5GreenRegions, 
          action: 'green-regions',
          subItems: [
            { name: t.ecoInfrastructure, action: 'eco-infrastructure' },
            { name: t.ecoActivities, action: 'eco-activities' },
            { name: t.ecoCertificates, action: 'eco-certificates' }
          ]
        },
        { 
          name: t.countryDetails, 
          action: 'country-details',
          subItems: [
            { name: t.countryStatistics, action: 'country-statistics' },
            { name: t.visaRequirements, action: 'visa-requirements' },
            { name: t.culturalFeatures, action: 'cultural-features' }
          ]
        }
    ]
  },
  {
    id: 'directions',
      title: t.directionAnalysis,
    icon: RocketLaunchIcon,
    items: [
        { 
          name: t.categoryComparison, 
          action: 'category-comparison',
          subItems: [
            { name: t.toursVsAccommodation, action: 'tours-vs-accommodation' },
            { name: t.ecoVsRegular, action: 'eco-vs-regular' },
            { name: t.seasonalTrends, action: 'seasonal-trends' }
          ]
        },
        { 
          name: t.ecoRoutesPopularity, 
          action: 'eco-routes-popularity',
          subItems: [
            { name: t.routesRanking, action: 'routes-ranking' },
            { name: t.touristReviews, action: 'tourist-reviews' },
            { name: t.routeRecommendations, action: 'route-recommendations' }
          ]
        },
        { 
          name: t.trends, 
          action: 'trends',
          subItems: [
            { name: t.growingDirections, action: 'growing-directions' },
            { name: t.newTrends, action: 'new-trends' },
            { name: t.seasonalPeaks, action: 'seasonal-peaks' }
          ]
        },
        { 
          name: t.seasonality, 
          action: 'seasonality',
          subItems: [
            { name: t.seasonCalendar, action: 'season-calendar' },
            { name: t.peakPeriods, action: 'peak-periods' },
            { name: t.lowSeason, action: 'low-season' }
          ]
        }
    ]
  },
  {
    id: 'carbon',
      title: t.carbonFootprint,
    icon: CloudIcon,
    items: [
        { 
          name: t.co2Statistics, 
          action: 'co2-statistics',
          subItems: [
            { name: t.emissionsBySector, action: 'emissions-by-sector' },
            { name: t.emissionSources, action: 'emission-sources' },
            { name: t.emissionDynamics, action: 'emission-dynamics' }
          ]
        },
        { 
          name: t.emissionsCompensation, 
          action: 'emissions-compensation',
          subItems: [
            { name: t.treePlanting, action: 'tree-planting' },
            { name: t.renewableEnergy, action: 'renewable-energy' },
            { name: t.ecoProjects, action: 'eco-projects' }
          ]
        },
        { 
          name: t.treeEquivalent, 
          action: 'tree-equivalent',
          subItems: [
            { name: t.treeCount, action: 'tree-count' },
            { name: t.forestArea, action: 'forest-area' },
            { name: t.growthTime, action: 'growth-time' }
          ]
        },
        { 
          name: t.measuresEffectiveness, 
          action: 'measures-effectiveness',
          subItems: [
            { name: t.methodComparison, action: 'method-comparison' },
            { name: t.ecoMeasuresRoi, action: 'eco-measures-roi' },
            { name: t.effectivenessRecommendations, action: 'effectiveness-recommendations' }
          ]
        }
    ]
  },
  {
    id: 'users',
      title: t.userAnalytics,
    icon: UserGroupIcon,
    items: [
        { 
          name: t.touristProfile, 
          action: 'tourist-profile',
          subItems: [
            { name: t.demographics, action: 'demographics' },
            { name: t.behavioralPatterns, action: 'behavioral-patterns' },
            { name: t.preferences, action: 'preferences' }
          ]
        },
        { 
          name: t.engagement, 
          action: 'engagement',
          subItems: [
            { name: t.platformActivity, action: 'platform-activity' },
            { name: t.appUsageTime, action: 'app-usage-time' },
            { name: t.interactivity, action: 'interactivity' }
          ]
        }
      ]
    },
    {
      id: 'ecoProjects',
      title: t.ecoProjectsReport,
      icon: BuildingOfficeIcon,
      items: [
        { 
          name: t.awaitingGreenFinancing, 
          action: 'awaiting-green-financing',
          subItems: [
            { name: t.financingStatus, action: 'financing-status' },
            { name: t.fundingAmount, action: 'funding-amount' },
            { name: t.projectProgress, action: 'project-progress' }
          ]
        },
        { 
          name: t.receivedGreenFinancing, 
          action: 'received-green-financing',
          subItems: [
            { name: t.implementationRate, action: 'implementation-rate' },
            { name: t.successRate, action: 'success-rate' },
            { name: t.projectProgress, action: 'project-progress' }
          ]
        },
        { 
          name: t.implementedProjects, 
          action: 'implemented-projects',
          subItems: [
            { name: t.successRate, action: 'success-rate' },
            { name: t.ecoImpact, action: 'eco-impact' },
            { name: t.costBenefit, action: 'cost-benefit' }
          ]
        },
        { 
          name: t.projectsInProgress, 
          action: 'projects-in-progress',
          subItems: [
            { name: t.projectProgress, action: 'project-progress' },
            { name: t.completionForecast, action: 'completion-forecast' },
            { name: t.resourceAllocation, action: 'resource-allocation' }
          ]
        }
      ]
    }
  ];

  const [activeSection, setActiveSection] = useState('dashboard');
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
            <h1 className="text-2xl font-bold text-green-800">{t.analystDashboard}</h1>
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
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-green-800">
                {selectedAction?.includes('awaiting-green-financing') ? t.awaitingGreenFinancing :
                 selectedAction?.includes('received-green-financing') ? t.receivedGreenFinancing :
                 selectedAction?.includes('implemented-projects') ? t.implementedProjects :
                 selectedAction?.includes('projects-in-progress') ? t.projectsInProgress :
                 selectedAction?.includes('financing-status') ? t.financingStatus :
                 selectedAction?.includes('funding-amount') ? t.fundingAmount :
                 selectedAction?.includes('project-progress') ? t.projectProgress :
                 selectedAction?.includes('implementation-rate') ? t.implementationRate :
                 selectedAction?.includes('success-rate') ? t.successRate :
                 selectedAction?.includes('eco-impact') ? t.ecoImpact :
                 selectedAction?.includes('cost-benefit') ? t.costBenefit :
                 selectedAction?.includes('completion-forecast') ? t.completionForecast :
                 selectedAction?.includes('resource-allocation') ? t.resourceAllocation :
                 selectedAction}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            {/* Financing Status Report */}
            {selectedAction?.includes('financing-status') && (
              <FinancingStatusReport />
            )}
            
            {/* Interactive Map */}
            {selectedAction?.includes('interactive-map') && (
              <InteractiveMap />
            )}
            
            {/* Top Directions */}
            {(selectedAction?.includes('popularity-ranking') || 
              selectedAction?.includes('revenue-ranking') || 
              selectedAction?.includes('eco-rating-ranking')) && (
              <TopDirections />
            )}
            
            {/* Eco Projects Report */}
            {(selectedAction?.includes('green-financing') || 
              selectedAction?.includes('implemented-projects') || 
              selectedAction?.includes('projects-in-progress') ||
              selectedAction?.includes('eco-projects') ||
              selectedAction?.includes('funding-amount') ||
              selectedAction?.includes('project-progress') ||
              selectedAction?.includes('implementation-rate') ||
              selectedAction?.includes('success-rate') ||
              selectedAction?.includes('eco-impact') ||
              selectedAction?.includes('cost-benefit') ||
              selectedAction?.includes('completion-forecast') ||
              selectedAction?.includes('resource-allocation')) && (
              <EcoProjectsReport 
                filter={
                  selectedAction?.includes('awaiting-green-financing') ? 'awaiting' :
                  selectedAction?.includes('received-green-financing') ? 'received' :
                  selectedAction?.includes('implemented-projects') ? 'implemented' :
                  selectedAction?.includes('projects-in-progress') ? 'in-progress' :
                  selectedAction?.includes('funding-amount') ? 'all' :
                  selectedAction?.includes('project-progress') ? 'all' :
                  selectedAction?.includes('implementation-rate') ? 'received' :
                  selectedAction?.includes('success-rate') ? 'implemented' :
                  selectedAction?.includes('eco-impact') ? 'implemented' :
                  selectedAction?.includes('cost-benefit') ? 'implemented' :
                  selectedAction?.includes('completion-forecast') ? 'in-progress' :
                  selectedAction?.includes('resource-allocation') ? 'in-progress' :
                  'all'
                }
              />
            )}
            
            {/* Default development message for other actions */}
            {!selectedAction?.includes('green-financing') && 
             !selectedAction?.includes('implemented-projects') && 
             !selectedAction?.includes('projects-in-progress') &&
             !selectedAction?.includes('eco-projects') &&
             !selectedAction?.includes('financing-status') &&
             !selectedAction?.includes('interactive-map') &&
             !selectedAction?.includes('popularity-ranking') &&
             !selectedAction?.includes('revenue-ranking') &&
             !selectedAction?.includes('eco-rating-ranking') &&
             !selectedAction?.includes('funding-amount') &&
             !selectedAction?.includes('project-progress') &&
             !selectedAction?.includes('implementation-rate') &&
             !selectedAction?.includes('success-rate') &&
             !selectedAction?.includes('eco-impact') &&
             !selectedAction?.includes('cost-benefit') &&
             !selectedAction?.includes('completion-forecast') &&
             !selectedAction?.includes('resource-allocation') && (
              <div className="text-green-600 mb-4">
                {t.functionInDevelopment}
              </div>
            )}
            
            <div className="flex justify-end mt-4">
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