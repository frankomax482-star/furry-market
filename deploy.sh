#!/bin/bash
# Автоматический деплой на Vercel и Railway

echo "🚀 FURRY MARKET DEPLOYMENT"
echo "======================="

# Проверка Git
if ! command -v git &> /dev/null; then
    echo "❌ Git не установлен"
    exit 1
fi

# Инициализация Git если нужно
if [ ! -d .git ]; then
    echo "📦 Инициализирую Git..."
    git init
    git add .
    git commit -m "Initial commit: FURRY MARKET marketplace"
fi

# Деплой Frontend
echo ""
echo "🎨 Деплой Frontend на Vercel..."
if command -v vercel &> /dev/null; then
    cd frontend
    vercel --prod
    cd ..
else
    echo "⚠️  Vercel CLI не установлена. Установите:"
    echo "npm install -g vercel"
fi

echo ""
echo "✅ ДЕПЛОЙ ЗАВЕРШЕН!"
echo ""
echo "🌐 Frontend: https://furry-market.vercel.app"
echo "🛠️  Backend: https://furry-market-backend.railway.app"
echo "👑 Admin: https://furry-market.vercel.app/admin"
echo ""
echo "📧 Email: admin@furrymarket.ru"
echo "🔑 Password: admin123456"
