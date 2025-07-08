import React from 'react';
import { PhoneIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function EmergencyContact() {
  const emergencyContacts = [
    {
      id: 1,
      title: 'Экстренная служба',
      phone: '112',
      description: 'Единый номер службы спасения'
    },
    {
      id: 2,
      title: 'Горячая линия эко-туризма',
      phone: '8-800-123-45-67',
      description: 'Круглосуточная поддержка туристов'
    },
    {
      id: 3,
      title: 'Медицинская помощь',
      phone: '103',
      description: 'Скорая медицинская помощь'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
        <h3 className="text-xl font-semibold text-gray-800">
          Экстренная связь
        </h3>
      </div>

      <div className="space-y-4">
        {emergencyContacts.map((contact) => (
          <div
            key={contact.id}
            className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="bg-red-100 p-2 rounded-full">
              <PhoneIcon className="w-5 h-5 text-red-600" />
            </div>
            
            <div className="flex-grow">
              <h4 className="font-medium text-gray-900">
                {contact.title}
              </h4>
              <p className="text-gray-600 text-sm mt-1">
                {contact.description}
              </p>
              <a
                href={`tel:${contact.phone}`}
                className="inline-flex items-center gap-2 mt-2 text-red-600 hover:text-red-700 font-medium"
              >
                <span>{contact.phone}</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-red-50 rounded-lg">
        <p className="text-sm text-red-700">
          В случае чрезвычайной ситуации немедленно свяжитесь с экстренными службами. 
          Сохраните эти номера в телефоне для быстрого доступа.
        </p>
      </div>
    </div>
  );
} 