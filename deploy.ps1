# Eco-Tourism Platform Deployment Script
Write-Host "========================================" -ForegroundColor Green
Write-Host "    Eco-Tourism Platform Deployment" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

try {
    Write-Host "[1/5] Initializing Git repository..." -ForegroundColor Yellow
    git init
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to initialize Git repository"
    }

    Write-Host "[2/5] Adding files to Git..." -ForegroundColor Yellow
    git add .
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to add files to Git"
    }

    Write-Host "[3/5] Creating initial commit..." -ForegroundColor Yellow
    git commit -m "Initial commit: Eco-Tourism Platform v1.0.0"
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to create commit"
    }

    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "    Git repository initialized!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Create a new repository on GitHub:" -ForegroundColor White
    Write-Host "   - Go to https://github.com" -ForegroundColor Gray
    Write-Host "   - Click 'New repository'" -ForegroundColor Gray
    Write-Host "   - Name it: eco-tourism-platform" -ForegroundColor Gray
    Write-Host "   - Make it Public or Private" -ForegroundColor Gray
    Write-Host "   - DON'T add README, .gitignore, or license" -ForegroundColor Gray
    Write-Host "   - Click 'Create repository'" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Connect your local repository:" -ForegroundColor White
    Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/eco-tourism-platform.git" -ForegroundColor Gray
    Write-Host "   git branch -M main" -ForegroundColor Gray
    Write-Host "   git push -u origin main" -ForegroundColor Gray
    Write-Host ""
    Write-Host "3. Deploy to Vercel:" -ForegroundColor White
    Write-Host "   - Go to https://vercel.com" -ForegroundColor Gray
    Write-Host "   - Sign in with GitHub" -ForegroundColor Gray
    Write-Host "   - Click 'New Project'" -ForegroundColor Gray
    Write-Host "   - Select your repository" -ForegroundColor Gray
    Write-Host "   - Click 'Deploy'" -ForegroundColor Gray
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "    Deployment script completed!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green

} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Please check your Git installation and try again." -ForegroundColor Red
}

Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 