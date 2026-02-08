@echo off
REM Автоматический деплой на Vercel и Railway для Windows

echo.
echo ============================================
echo   FURRY MARKET DEPLOYMENT
echo ============================================
echo.

REM Проверка Git
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [X] Git не установлен
    exit /b 1
)

REM Инициализация Git если нужно
if not exist .git (
    echo [*] Инициализирую Git...
    git init
    git add .
    git commit -m "Initial commit: FURRY MARKET marketplace"
)

echo.
echo [*] Установите переменные окружения перед деплоем:
echo.
echo === Frontend (Vercel) ===
echo NEXT_PUBLIC_API_URL=https://furry-market-backend.railway.app/api
echo.
echo === Backend (Railway) ===
echo JWT_SECRET=your-secret-key
echo MONGODB_URI=mongodb+srv://...
echo CORS_ORIGIN=https://furry-market.vercel.app
echo.

echo [*] Деплой Frontend на Vercel...
cd frontend
call npm run build
cd ..

echo.
echo [+] Деплой готов!
echo.
echo === Production URLs ===
echo Frontend: https://furry-market.vercel.app
echo Backend:  https://furry-market-backend.railway.app
echo Admin:    https://furry-market.vercel.app/admin
echo.
echo === Admin Credentials ===
echo Email:    admin@furrymarket.ru
echo Password: admin123456
echo.

pause
