# Автоматический деплой Eco-Tourism Platform
param(
    [Parameter(Mandatory=$true)]
    [string]$GitHubUsername,
    
    [Parameter(Mandatory=$true)]
    [string]$RepositoryName = "eco-tourism-platform"
)

Write-Host "========================================" -ForegroundColor Green
Write-Host "    Eco-Tourism Platform Auto Deploy" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "GitHub Username: $GitHubUsername" -ForegroundColor Cyan
Write-Host "Repository Name: $RepositoryName" -ForegroundColor Cyan
Write-Host ""

# Проверка Git
Write-Host "[1/8] Checking Git installation..." -ForegroundColor Yellow
try {
    $gitVersion = git --version
    Write-Host "Git version: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "Error: Git is not installed. Please install Git first." -ForegroundColor Red
    Write-Host "Download from: https://git-scm.com/" -ForegroundColor Red
    exit 1
}

# Проверка Node.js
Write-Host "[2/8] Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "Error: Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    Write-Host "Download from: https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Проверка npm
Write-Host "[3/8] Checking npm installation..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "Error: npm is not installed." -ForegroundColor Red
    exit 1
}

# Инициализация Git
Write-Host "[4/8] Initializing Git repository..." -ForegroundColor Yellow
try {
    git init
    Write-Host "Git repository initialized successfully" -ForegroundColor Green
} catch {
    Write-Host "Error: Failed to initialize Git repository" -ForegroundColor Red
    exit 1
}

# Добавление файлов
Write-Host "[5/8] Adding files to Git..." -ForegroundColor Yellow
try {
    git add .
    Write-Host "Files added successfully" -ForegroundColor Green
} catch {
    Write-Host "Error: Failed to add files to Git" -ForegroundColor Red
    exit 1
}

# Создание коммита
Write-Host "[6/8] Creating initial commit..." -ForegroundColor Yellow
try {
    git commit -m "Initial commit: Eco-Tourism Platform v1.0.0"
    Write-Host "Initial commit created successfully" -ForegroundColor Green
} catch {
    Write-Host "Error: Failed to create commit" -ForegroundColor Red
    exit 1
}

# Подключение к GitHub
Write-Host "[7/8] Connecting to GitHub..." -ForegroundColor Yellow
$remoteUrl = "https://github.com/$GitHubUsername/$RepositoryName.git"
try {
    git remote add origin $remoteUrl
    git branch -M main
    Write-Host "Connected to GitHub repository: $remoteUrl" -ForegroundColor Green
} catch {
    Write-Host "Error: Failed to connect to GitHub" -ForegroundColor Red
    Write-Host "Please make sure the repository exists on GitHub" -ForegroundColor Red
    exit 1
}

# Отправка на GitHub
Write-Host "[8/8] Pushing to GitHub..." -ForegroundColor Yellow
try {
    git push -u origin main
    Write-Host "Successfully pushed to GitHub!" -ForegroundColor Green
} catch {
    Write-Host "Error: Failed to push to GitHub" -ForegroundColor Red
    Write-Host "Please check your GitHub credentials and repository permissions" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "    GitHub deployment completed!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps for Vercel deployment:" -ForegroundColor Cyan
Write-Host "1. Go to https://vercel.com" -ForegroundColor White
Write-Host "2. Sign in with GitHub" -ForegroundColor White
Write-Host "3. Click 'New Project'" -ForegroundColor White
Write-Host "4. Select your repository: $RepositoryName" -ForegroundColor White
Write-Host "5. Click 'Deploy'" -ForegroundColor White
Write-Host ""
Write-Host "Your repository URL: https://github.com/$GitHubUsername/$RepositoryName" -ForegroundColor Cyan
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "    Auto deployment completed!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 