@echo off
echo Starting deployment...

echo Initializing Git...
git init

echo Adding files...
git add .

echo Creating commit...
git commit -m "Initial commit: Eco-Tourism Platform v1.0.0"

echo.
echo Git repository initialized successfully!
echo.
echo Next steps:
echo 1. Create repository on GitHub: eco-tourism-platform
echo 2. Run: git remote add origin https://github.com/YOUR_USERNAME/eco-tourism-platform.git
echo 3. Run: git branch -M main
echo 4. Run: git push -u origin main
echo.
pause 