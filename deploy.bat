@echo off
echo ========================================
echo    Eco-Tourism Platform Deployment
echo ========================================
echo.

echo [1/5] Initializing Git repository...
git init
if %errorlevel% neq 0 (
    echo Error: Failed to initialize Git repository
    pause
    exit /b 1
)

echo [2/5] Adding files to Git...
git add .
if %errorlevel% neq 0 (
    echo Error: Failed to add files to Git
    pause
    exit /b 1
)

echo [3/5] Creating initial commit...
git commit -m "Initial commit: Eco-Tourism Platform v1.0.0"
if %errorlevel% neq 0 (
    echo Error: Failed to create commit
    pause
    exit /b 1
)

echo.
echo ========================================
echo    Git repository initialized!
echo ========================================
echo.
echo Next steps:
echo 1. Create a new repository on GitHub:
echo    - Go to https://github.com
echo    - Click "New repository"
echo    - Name it: eco-tourism-platform
echo    - Make it Public or Private
echo    - DON'T add README, .gitignore, or license
echo    - Click "Create repository"
echo.
echo 2. Connect your local repository:
echo    git remote add origin https://github.com/YOUR_USERNAME/eco-tourism-platform.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 3. Deploy to Vercel:
echo    - Go to https://vercel.com
echo    - Sign in with GitHub
echo    - Click "New Project"
echo    - Select your repository
echo    - Click "Deploy"
echo.
echo ========================================
echo    Deployment script completed!
echo ========================================
pause 