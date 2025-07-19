'use client';

import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/translations';

interface FinancingData {
  totalProjects: number;
  totalFunding: number;
  averageFunding: number;
  fundingDistribution: {
    awaiting: { count: number; amount: number; percentage: number };
    received: { count: number; amount: number; percentage: number };
    implemented: { count: number; amount: number; percentage: number };
    inProgress: { count: number; amount: number; percentage: number };
  };
  topFundedProjects: Array<{
    name: string;
    amount: number;
    status: string;
    region: string;
  }>;
}

const mockFinancingData: FinancingData = {
  totalProjects: 12,
  totalFunding: 425000000,
  averageFunding: 35416667,
  fundingDistribution: {
    awaiting: { count: 3, amount: 205000000, percentage: 48.2 },
    received: { count: 3, amount: 100000000, percentage: 23.5 },
    implemented: { count: 3, amount: 35000000, percentage: 8.2 },
    inProgress: { count: 3, amount: 115000000, percentage: 27.1 }
  },
  topFundedProjects: [
    { name: 'Геотермальная станция в Алатау', amount: 120000000, status: 'awaiting', region: 'Алматинская область' },
    { name: 'Ветровая электростанция в Астане', amount: 75000000, status: 'in-progress', region: 'Астана' },
    { name: 'Биогазовая установка в Шымкенте', amount: 45000000, status: 'received', region: 'Шымкент' },
    { name: 'Система переработки отходов в Актау', amount: 30000000, status: 'received', region: 'Актау' },
    { name: 'Эко-отель "Зеленые горы"', amount: 25000000, status: 'received', region: 'Алматинская область' }
  ]
};

export default function FinancingStatusReport() {
  const { language } = useLanguage();
  const t = translations[language];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'KZT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'awaiting': return 'bg-yellow-100 text-yellow-800';
      case 'received': return 'bg-blue-100 text-blue-800';
      case 'implemented': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'awaiting': return t.awaitingGreenFinancing;
      case 'received': return t.receivedGreenFinancing;
      case 'implemented': return t.implementedProjects;
      case 'in-progress': return t.projectsInProgress;
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold text-green-800 mb-4 md:mb-6">
          {t.financingStatus}
        </h2>
        
        {/* Общая статистика */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-blue-50 p-4 md:p-6 rounded-lg">
            <h3 className="text-base md:text-lg font-semibold text-blue-800 mb-2">Всего проектов</h3>
            <p className="text-2xl md:text-3xl font-bold text-blue-600">{mockFinancingData.totalProjects}</p>
          </div>
          <div className="bg-green-50 p-4 md:p-6 rounded-lg">
            <h3 className="text-base md:text-lg font-semibold text-green-800 mb-2">Общая сумма финансирования</h3>
            <p className="text-lg md:text-2xl font-bold text-green-600">{formatCurrency(mockFinancingData.totalFunding)}</p>
          </div>
          <div className="bg-purple-50 p-4 md:p-6 rounded-lg sm:col-span-2 lg:col-span-1">
            <h3 className="text-base md:text-lg font-semibold text-purple-800 mb-2">Среднее финансирование</h3>
            <p className="text-lg md:text-2xl font-bold text-purple-600">{formatCurrency(mockFinancingData.averageFunding)}</p>
          </div>
        </div>

        {/* Распределение финансирования */}
        <div className="mb-6 md:mb-8">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Распределение финансирования по статусам</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <div className="bg-yellow-50 p-3 md:p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs md:text-sm font-medium text-yellow-800">{t.awaitingGreenFinancing}</span>
                <span className="text-sm md:text-lg font-bold text-yellow-600">{mockFinancingData.fundingDistribution.awaiting.count}</span>
              </div>
              <p className="text-lg md:text-2xl font-bold text-yellow-600">{formatCurrency(mockFinancingData.fundingDistribution.awaiting.amount)}</p>
              <p className="text-xs md:text-sm text-yellow-600">{mockFinancingData.fundingDistribution.awaiting.percentage}% от общей суммы</p>
            </div>
            
            <div className="bg-blue-50 p-3 md:p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs md:text-sm font-medium text-blue-800">{t.receivedGreenFinancing}</span>
                <span className="text-sm md:text-lg font-bold text-blue-600">{mockFinancingData.fundingDistribution.received.count}</span>
              </div>
              <p className="text-lg md:text-2xl font-bold text-blue-600">{formatCurrency(mockFinancingData.fundingDistribution.received.amount)}</p>
              <p className="text-xs md:text-sm text-blue-600">{mockFinancingData.fundingDistribution.received.percentage}% от общей суммы</p>
            </div>
            
            <div className="bg-green-50 p-3 md:p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs md:text-sm font-medium text-green-800">{t.implementedProjects}</span>
                <span className="text-sm md:text-lg font-bold text-green-600">{mockFinancingData.fundingDistribution.implemented.count}</span>
              </div>
              <p className="text-lg md:text-2xl font-bold text-green-600">{formatCurrency(mockFinancingData.fundingDistribution.implemented.amount)}</p>
              <p className="text-xs md:text-sm text-green-600">{mockFinancingData.fundingDistribution.implemented.percentage}% от общей суммы</p>
            </div>
            
            <div className="bg-orange-50 p-3 md:p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs md:text-sm font-medium text-orange-800">{t.projectsInProgress}</span>
                <span className="text-sm md:text-lg font-bold text-orange-600">{mockFinancingData.fundingDistribution.inProgress.count}</span>
              </div>
              <p className="text-lg md:text-2xl font-bold text-orange-600">{formatCurrency(mockFinancingData.fundingDistribution.inProgress.amount)}</p>
              <p className="text-xs md:text-sm text-orange-600">{mockFinancingData.fundingDistribution.inProgress.percentage}% от общей суммы</p>
            </div>
          </div>
        </div>

        {/* Топ проектов по финансированию */}
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Топ проектов по объему финансирования</h3>
          <div className="space-y-3">
            {mockFinancingData.topFundedProjects.map((project, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3 md:p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 md:gap-3">
                  <div className="flex items-center">
                    <span className="text-base md:text-lg font-bold text-gray-600 mr-2 md:mr-3">#{index + 1}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm md:text-base">{project.name}</h4>
                      <p className="text-xs md:text-sm text-gray-600">{project.region}</p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-lg md:text-xl font-bold text-green-600">{formatCurrency(project.amount)}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {getStatusText(project.status)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 