# Deployment Guide для FURRY MARKET

## Frontend Deployment (Vercel)

1. Установите Vercel CLI:
```bash
npm install -g vercel
```

2. Задеплойте фронтенд:
```bash
cd frontend
vercel
```

3. При вопросах выберите:
- `Next.js` framework
- Используйте default settings

## Backend Deployment (Railway.app)

1. Перейдите на https://railway.app
2. Sign up с GitHub
3. Создайте новый проект
4. Добавьте MongoDB плагин
5. Добавьте репозиторий GitHub

6. Или используйте Render.com:
   - https://render.com/deploy
   - Connect GitHub repo
   - Choose Node environment

## Environment Variables для Production

**Frontend (.env.production):**
```
NEXT_PUBLIC_API_URL=https://your-backend-url/api
```

**Backend (.env.production):**
```
MONGODB_URI=your-mongodb-atlas-uri
JWT_SECRET=your-super-secret-key
CORS_ORIGIN=https://your-frontend-url
PORT=5000
```

## Создание Админ Аккаунта

Локально:
```bash
cd backend
node scripts/create-admin.js
```

На production (через SSH или консоль хостинга):
```bash
node scripts/create-admin.js
```

**Учетные данные админа:**
- Email: admin@furrymarket.ru
- Password: admin123456

🔐 После первого входа измените пароль!
