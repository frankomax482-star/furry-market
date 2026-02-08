@echo off
rem FURRY MARKET - Полный маркетплей
rem Скрипт для запуска backend и frontend

echo 🦊 Запуск FURRY MARKET...
echo.

rem Запуск backend
echo 📦 Запуск backend на порту 5000...
start "FURRY MARKET Backend" cmd /k "cd backend && npm install && npm run dev"

rem Ожидание 3 сек
timeout /t 3 /nobreak

rem Запуск frontend
echo 🎨 Запуск frontend на порту 3000...
start "FURRY MARKET Frontend" cmd /k "cd frontend && npm install && npm run dev"

echo.
echo ✅ Оба приложения запущены:
echo    - Backend: http://localhost:5000
echo    - Frontend: http://localhost:3000
echo.
echo Окна консолей откроются автоматически
