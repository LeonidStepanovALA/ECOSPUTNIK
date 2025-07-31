@echo off
title ECOSPUTNIK Development Server
color 0A
echo.
echo ========================================
echo    ECOSPUTNIK DEVELOPMENT SERVER
echo ========================================
echo.
echo Запуск сервера разработки...
echo.
echo Адрес: http://localhost:3000
echo.
echo НЕ ЗАКРЫВАЙТЕ ЭТО ОКНО!
echo Для остановки сервера закройте это окно
echo или нажмите Ctrl+C
echo.
echo ========================================
echo.

cd /d "C:\Users\User\Desktop\ECO Sputnik\APP\EcoSputnik\ECOSPUTNIK"
npm run dev

echo.
echo Сервер остановлен.
pause 