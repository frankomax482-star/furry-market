#!/bin/bash

# FURRY MARKET - Полный маркетплей
# Скрипт для запуска backend и frontend одновременно

echo "🦊 Запуск FURRY MARKET..."

# Запуск backend
echo "📦 Запуск backend на порту 5000..."
cd backend
npm install
npm run dev &
BACKEND_PID=$!

# Запуск frontend
echo "🎨 Запуск frontend на порту 3000..."
cd ../frontend
npm install
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Оба приложения запущены:"
echo "  - Backend: http://localhost:5000"
echo "  - Frontend: http://localhost:3000"
echo ""
echo "Нажмите Ctrl+C для остановки"

wait

# Завершение процессов при выходе
trap "kill $BACKEND_PID $FRONTEND_PID" EXIT
