# Скрипт для остановки сервера ECOSPUTNIK
Write-Host "Остановка сервера ECOSPUTNIK..." -ForegroundColor Yellow

# Проверяем наличие файла с PID
if (Test-Path "server.pid") {
    $pid = Get-Content "server.pid" -ErrorAction SilentlyContinue
    if ($pid) {
        try {
            $process = Get-Process -Id $pid -ErrorAction SilentlyContinue
            if ($process) {
                Write-Host "Останавливаем процесс с PID: $pid" -ForegroundColor Cyan
                Stop-Process -Id $pid -Force
                Write-Host "Процесс остановлен!" -ForegroundColor Green
            } else {
                Write-Host "Процесс с PID $pid не найден" -ForegroundColor Yellow
            }
        } catch {
            Write-Host "Ошибка при остановке процесса: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
    # Удаляем файл PID
    Remove-Item "server.pid" -ErrorAction SilentlyContinue
}

# Останавливаем все процессы node, связанные с npm
$nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object {
    $_.ProcessName -eq "node" -and $_.MainWindowTitle -eq ""
}
if ($nodeProcesses) {
    Write-Host "Останавливаем все процессы Node.js..." -ForegroundColor Cyan
    foreach ($process in $nodeProcesses) {
        try {
            Write-Host "Останавливаем процесс: $($process.Id)" -ForegroundColor Yellow
            Stop-Process -Id $process.Id -Force
        } catch {
            Write-Host "Не удалось остановить процесс $($process.Id): $($_.Exception.Message)" -ForegroundColor Red
        }
    }
    Write-Host "Все процессы Node.js остановлены!" -ForegroundColor Green
} else {
    Write-Host "Процессы Node.js не найдены" -ForegroundColor Yellow
}

# Проверяем, что порт 3000 свободен
$portCheck = netstat -an | findstr :3000
if ($portCheck) {
    Write-Host "Порт 3000 все еще занят. Попробуйте перезагрузить компьютер." -ForegroundColor Red
} else {
    Write-Host "Порт 3000 свободен!" -ForegroundColor Green
}

Write-Host "Сервер остановлен!" -ForegroundColor Green 