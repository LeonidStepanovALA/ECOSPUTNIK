# Script for permanent server startup ECOSPUTNIK
Write-Host "Starting ECOSPUTNIK server in permanent mode..." -ForegroundColor Green

# Navigate to project directory
Set-Location "C:\Users\User\Desktop\ECO Sputnik\APP\EcoSputnik\ECOSPUTNIK"

# Check if server is already running
$existingProcess = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object {$_.ProcessName -eq "node"}
if ($existingProcess) {
    Write-Host "Server is already running! Process ID: $($existingProcess.Id)" -ForegroundColor Yellow
    Write-Host "Address: http://localhost:3000" -ForegroundColor Cyan
    Start-Process "http://localhost:3000"
    exit
}

# Create log files for tracking
$logFile = "C:\Users\User\Desktop\ECO Sputnik\APP\EcoSputnik\ECOSPUTNIK\server.log"
$errorLogFile = "C:\Users\User\Desktop\ECO Sputnik\APP\EcoSputnik\ECOSPUTNIK\server-error.log"

# Start server using cmd to avoid PowerShell issues
$process = Start-Process -FilePath "cmd.exe" -ArgumentList "/c", "npm run dev" -WindowStyle Hidden -PassThru -RedirectStandardOutput $logFile -RedirectStandardError $errorLogFile

Write-Host "Server started in permanent mode!" -ForegroundColor Green
Write-Host "Address: http://localhost:3000" -ForegroundColor Yellow
Write-Host "Log file: $logFile" -ForegroundColor Cyan
Write-Host "Error log file: $errorLogFile" -ForegroundColor Cyan

# Display process information
if ($process) {
    Write-Host "Process ID: $($process.Id)" -ForegroundColor Cyan
    Write-Host "Process Name: $($process.ProcessName)" -ForegroundColor Cyan
    
    # Save PID to file for later management
    $process.Id | Out-File -FilePath "server.pid" -Encoding UTF8
    Write-Host "PID saved to file: server.pid" -ForegroundColor Green
}

Write-Host "To stop server use: .\stop-server.ps1" -ForegroundColor Red
Write-Host "To view logs use: Get-Content $logFile -Wait" -ForegroundColor Magenta

# Wait a bit and open browser
Start-Sleep -Seconds 8
Start-Process "http://localhost:3000"

Write-Host "Browser opened! Server will continue running even after closing this window." -ForegroundColor Green 