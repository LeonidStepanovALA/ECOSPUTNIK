# Скрипт для просмотра логов сервера ECOSPUTNIK
Write-Host "Просмотр логов сервера ECOSPUTNIK..." -ForegroundColor Green

$logFile = "C:\Users\User\Desktop\ECO Sputnik\APP\EcoSputnik\ECOSPUTNIK\server.log"

if (Test-Path $logFile) {
    Write-Host "Лог файл найден: $logFile" -ForegroundColor Cyan
    Write-Host "Последние 50 строк лога:" -ForegroundColor Yellow
    Write-Host "=" * 50 -ForegroundColor Gray
    
    # Показываем последние 50 строк
    Get-Content $logFile -Tail 50
    
    Write-Host "=" * 50 -ForegroundColor Gray
    Write-Host "Для просмотра логов в реальном времени используйте: Get-Content $logFile -Wait" -ForegroundColor Magenta
} else {
    Write-Host "Лог файл не найден: $logFile" -ForegroundColor Red
    Write-Host "Возможно, сервер не запущен или лог файл не создан." -ForegroundColor Yellow
}

# Проверяем статус сервера
$nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    Write-Host "Найдены процессы Node.js:" -ForegroundColor Green
    foreach ($process in $nodeProcesses) {
        Write-Host "PID: $($process.Id), Время запуска: $($process.StartTime)" -ForegroundColor Cyan
    }
} else {
    Write-Host "Процессы Node.js не найдены. Сервер не запущен." -ForegroundColor Red
} 