@echo off
title ECOSPUTNIK Permanent Server
color 0A
echo.
echo ========================================
echo    ECOSPUTNIK SERVER - PERMANENT
echo ========================================
echo.
echo Сервер запущен в отдельном окне
echo НЕ ЗАКРЫВАЙТЕ ЭТО ОКНО!
echo.
echo Адрес: http://localhost:3000
echo Сетевой адрес: http://172.20.10.2:3000
echo.
echo Для остановки сервера закройте это окно
echo или нажмите Ctrl+C
echo.
echo ========================================
echo.

cd /d "C:\Users\User\Desktop\ECO Sputnik\APP\EcoSputnik\ECOSPUTNIK"

echo Запуск сервера...
npm run dev

echo.
echo Сервер остановлен.
pause 