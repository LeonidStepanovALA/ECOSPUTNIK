# Скрипт для запуска сервера в фоновом режиме
Write-Host "Запуск сервера ECOSPUTNIK..." -ForegroundColor Green

# Переходим в директорию проекта
Set-Location "C:\Users\User\Desktop\ECO Sputnik\APP\EcoSputnik\ECOSPUTNIK"

# Запускаем сервер в фоновом режиме
$process = Start-Process -FilePath "npm" -ArgumentList "run", "dev" -WindowStyle Hidden -PassThru

Write-Host "Сервер запущен в фоновом режиме!" -ForegroundColor Green
Write-Host "Адрес: http://localhost:3000" -ForegroundColor Yellow
Write-Host "Для остановки сервера используйте: taskkill /f /im node.exe" -ForegroundColor Red

# Отображаем информацию о процессе
if ($process) {
    Write-Host "Process ID: $($process.Id)" -ForegroundColor Cyan
    Write-Host "Process Name: $($process.ProcessName)" -ForegroundColor Cyan
}

# Ждем немного и открываем браузер
Start-Sleep -Seconds 10
Start-Process "http://localhost:3000"

Write-Host "Браузер открыт!" -ForegroundColor Green 