'use client';

import React, { useState } from 'react';
import { PhoneIcon, ExclamationTriangleIcon, MapPinIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/translations';

export default function EmergencyContact() {
  const { language } = useLanguage();
  const t = translations[language];
  
  const [isSendingEmergency, setIsSendingEmergency] = useState(false);
  const [emergencyMessage, setEmergencyMessage] = useState('');
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);
  const [emergencyPhoto, setEmergencyPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const emergencyContacts = [
    {
      id: 1,
      title: t.emergencyService,
      phone: '112',
      description: t.emergencyServiceDesc
    },
    {
      id: 2,
      title: t.ecoTourismHotline,
      phone: '8-800-123-45-67',
      description: t.ecoTourismHotlineDesc
    },
    {
      id: 3,
      title: t.medicalHelp,
      phone: '103',
      description: t.medicalHelpDesc
    }
  ];

  // Функция для получения текущего местоположения
  const getCurrentLocation = (): Promise<{lat: number, lng: number}> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Геолокация не поддерживается'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ lat: latitude, lng: longitude });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    });
  };

  // Функция для отправки Emergency
  const sendEmergency = async () => {
    setIsSendingEmergency(true);
    try {
      // Получаем текущее местоположение
      const location = await getCurrentLocation();
      setCurrentLocation(location);

      // Формируем сообщение с координатами
      const coordinates = `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`;
      const fullMessage = `Emergency! Экстренная ситуация!\n\nКоординаты: ${coordinates}\n\nСообщение: ${emergencyMessage || 'Требуется экстренная помощь'}\n\nВремя отправки: ${new Date().toLocaleString('ru-RU')}`;

      // Имитация отправки сообщения
      console.log('Отправка Emergency сообщения:', fullMessage);
      
      // Здесь можно добавить реальную отправку на сервер
      // await fetch('/api/emergency/emergency', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     coordinates: location,
      //     message: emergencyMessage,
      //     timestamp: new Date().toISOString()
      //   })
      // });

      // Показываем уведомление об успешной отправке
      alert(t.emergencySuccessMessage);
      
      // Закрываем модальное окно
      setShowEmergencyModal(false);
      setEmergencyMessage('');
      setEmergencyPhoto(null);
      setPhotoPreview(null);
      
    } catch (error) {
      console.error('Ошибка при отправке Emergency:', error);
      alert(t.emergencyErrorMessage);
    } finally {
      setIsSendingEmergency(false);
    }
  };

  // Функция для открытия модального окна Emergency
  const openEmergencyModal = () => {
    setShowEmergencyModal(true);
  };

  // Функция для обработки загрузки фото
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setEmergencyPhoto(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Функция для удаления фото
  const removePhoto = () => {
    setEmergencyPhoto(null);
    setPhotoPreview(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
        <h3 className="text-xl font-semibold text-gray-800">
          {t.emergencyContact}
        </h3>
      </div>

      {/* Кнопка Emergency */}
      <div className="mb-6">
        <button
          onClick={openEmergencyModal}
          className="w-full bg-red-600 text-white py-4 px-6 rounded-lg hover:bg-red-700 transition-colors font-bold text-lg flex items-center justify-center gap-3 shadow-lg"
        >
          <ExclamationTriangleIcon className="w-6 h-6" />
          <span>{t.emergencyHelp}</span>
        </button>
        <p className="text-xs text-gray-500 mt-2 text-center">
          {t.emergencyDescription}
        </p>
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
          {t.emergencyInfo}
        </p>
      </div>

      {/* Модальное окно Emergency */}
      {showEmergencyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                {t.emergencyMessageTitle}
              </h3>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.emergencySituationDesc}
              </label>
              <textarea
                value={emergencyMessage}
                onChange={(e) => setEmergencyMessage(e.target.value)}
                placeholder={t.emergencySituationPlaceholder}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                rows={4}
              />
            </div>

            {/* Загрузка фото */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.attachPhoto}
              </label>
              <div className="space-y-3">
                {!photoPreview ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-red-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center gap-2">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span className="text-sm text-gray-600">{t.clickToSelectPhoto}</span>
                        <span className="text-xs text-gray-500">{t.photoFormats}</span>
                      </div>
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={photoPreview}
                      alt="Emergency photo preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>

                          {currentLocation && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-800">
                      {t.coordinates}: {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
                    </span>
                  </div>
                </div>
              )}

            <div className="flex gap-3">
              <button
                onClick={() => setShowEmergencyModal(false)}
                className="flex-1 py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                {t.cancel}
              </button>
              <button
                onClick={sendEmergency}
                disabled={isSendingEmergency}
                className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSendingEmergency ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {t.sending}
                  </>
                ) : (
                  <>
                    <PaperAirplaneIcon className="w-4 h-4" />
                    {t.sendEmergency}
                  </>
                )}
              </button>
            </div>

            <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
              <p className="text-xs text-yellow-800">
                {t.emergencyWarning}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 