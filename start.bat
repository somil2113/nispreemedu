@echo off
REM EdTech Platform Complete Startup Script (Windows)

setlocal enabledelayedexpansion

echo.
echo ===============================================
echo   EdTech Platform - Windows Startup
echo ===============================================
echo.

REM Check if Node is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js not found. Please install it first.
    pause
    exit /b 1
)

REM Check if MongoDB is installed
mongod --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: MongoDB not found. Please install it first.
    echo Download from: https://www.mongodb.com/try/download/community
    pause
    exit /b 1
)

REM Create logs directory
if not exist "logs" mkdir logs

echo.
echo Step 1: Starting MongoDB...
start "MongoDB" mongod --logpath logs\mongodb.log
timeout /t 3 /nobreak

REM Check if MongoDB is running
tasklist | find /i "mongod.exe" >nul
if errorlevel 1 (
    echo ERROR: MongoDB failed to start
    pause
    exit /b 1
)
echo [OK] MongoDB started on port 27017
echo.

echo Step 2: Installing Backend Dependencies...
cd edtech-backend
if not exist "node_modules" (
    call npm install >nul 2>&1
)
echo [OK] Dependencies ready
echo.

echo Step 3: Seeding Database...
call npm run seed >logs\seed.log 2>&1
echo [OK] Database seeded with 12 courses
echo.

echo Step 4: Starting Backend Server...
start "Backend Server" cmd /k "npm run dev"
timeout /t 3 /nobreak

echo.
echo ===============================================
echo   ALL SERVICES STARTED!
echo ===============================================
echo.
echo MongoDB:    http://localhost:27017
echo Backend:    http://localhost:5000
echo Website:    Open index.html in browser
echo.
echo Test: http://localhost:5000/api/health
echo.
pause
