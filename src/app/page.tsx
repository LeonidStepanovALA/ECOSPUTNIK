'use client';

import React from 'react';
import Link from 'next/link';

const roles = [
  {
    title: 'Турист',
    description: 'Исследуйте экологичные места размещения и маршруты',
    href: '/tourist',
    icon: '🏃‍♂️'
  },
  {
    title: 'Гид',
    description: 'Создавайте и проводите экологичные туры',
    href: '/guide',
    icon: '🎯'
  },
  {
    title: 'Менеджер размещения',
    description: 'Управляйте экологичным местом размещения',
    href: '/accommodation',
    icon: '🏡'
  },
  {
    title: 'Статист',
    description: 'Анализируйте данные и создавайте отчеты',
    href: '/analyst',
    icon: '📊'
  }
];

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-green-800 text-center mb-8">
          Добро пожаловать в Эко Туризм
        </h1>
        <p className="text-lg text-green-700 text-center mb-12">
          Выберите вашу роль для начала работы
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role) => (
            <Link
              key={role.title}
              href={role.href}
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border-2 border-green-100 hover:border-green-300"
            >
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">{role.icon}</span>
                <h2 className="text-2xl font-semibold text-green-800">{role.title}</h2>
              </div>
              <p className="text-green-600">{role.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
