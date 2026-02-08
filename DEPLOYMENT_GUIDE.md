# FURRY MARKET - Полный гайд деплоя

## 📍 Шаг 1: Подготовка репозитория GitHub

```bash
git init
git add .
git commit -m "Initial commit: FURRY MARKET marketplace"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/furry-market.git
git push -u origin main
```

---

## 🎨 Шаг 2: Деплой Frontend на Vercel

### 2.1 Создание проекта на Vercel
1. Перейдите на https://vercel.com
2. Нажмите **"Sign Up"** → **"Continue with GitHub"**
3. Авторизуйтесь в GitHub
4. Нажмите **"+ New Project"**
5. Выберите репозиторий `furry-market`
6. Vercel автоматически определит Next.js

### 2.2 Настройка переменных окружения
В разделе **"Environment Variables"** добавьте:

```
NEXT_PUBLIC_API_URL = https://furry-market-backend.railway.app/api
```

### 2.3 Deploy
Нажмите **"Deploy"** и ждите завершения (~2 минуты)

**Результат:** https://furry-market.vercel.app ✅

---

## 🛠️ Шаг 3: Деплой Backend на Railway

### 3.1 Создание проекта на Railway
1. Перейдите на https://railway.app
2. Нажмите **"Start Project"**
3. Выберите **"Deploy from GitHub repo"**
4. Авторизуйтесь в GitHub
5. Выберите репозиторий `furry-market`
6. Выберите папку `/backend`

### 3.2 Добавление MongoDB
1. В проекте нажмите **"+ Add"**
2. Выберите **"Database"** → **"MongoDB"**
3. Railway автоматически добавит `MONGODB_URI`

### 3.3 Добавление переменных окружения
В разделе **"Variables"** добавьте:

```
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
CORS_ORIGIN=https://furry-market.vercel.app
PORT=5000
NODE_ENV=production
```

### 3.4 Deploy
Railway автоматически задеплоит при push в main ветку

**Результат:** https://furry-market-backend.railway.app ✅

---

## 🔐 Шаг 4: Создание Админ Аккаунта

### Способ 1: Через Railway Console
1. Откройте проект на Railway
2. Перейдите в **"Deploy"**
3. Нажмите **"Connect"** → **"Railway CLI"**
4. В синем экране запустите:

```bash
npm run script:create-admin
```

Или напрямую через MongoDB Compass:
```bash
node scripts/create-admin.js
```

### Способ 2: Через MongoDB Atlas
1. Откройте MongoDB Atlas
2. Перейдите в Collections
3. Вставьте документ вручную:

```json
{
  "firstName": "Admin",
  "lastName": "FURRY MARKET",
  "email": "admin@furrymarket.ru",
  "phone": "+7 (999) 999-99-99",
  "password": "$2a$10$...", // bcrypt хеш "admin123456"
  "role": "admin",
  "createdAt": new Date()
}
```

**Учетные данные:**
- Email: `admin@furrymarket.ru`
- Password: `admin123456`

---

## ✅ Проверка деплоя

1. **Frontend:** https://furry-market.vercel.app
   - Должна загрузиться главная страница с товарами
   
2. **Backend API:** https://furry-market-backend.railway.app/api
   - Должен вернуть JSON ответ

3. **Админ панель:** 
   - Перейдите на https://furry-market.vercel.app/login
   - Введите: `admin@furrymarket.ru` / `admin123456`
   - Откройте https://furry-market.vercel.app/admin

---

## 🚨 Решение проблем

### "Cannot reach backend"
- Проверьте что `NEXT_PUBLIC_API_URL` совпадает с URL бэка на Railway
- Убедитесь что Backend поднялся (проверьте Logs на Railway)

### "MongoDB connection failed"
- Проверьте что MongoDB плагин добавлен в Railway проект
- Убедитесь что `MONGODB_URI` присутствует в переменных

### "Admin не может войти"
- Проверьте что админ создан в БД
- Убедитесь что пароль хеширован bcrypt

---

## 📊 Production URLs

**Frontend:** https://furry-market.vercel.app
**Backend:** https://furry-market-backend.railway.app
**Admin:** https://furry-market.vercel.app/admin

---

## 🔄 CI/CD

Оба сервиса автоматически пересоберут и задеплоят при каждом push в `main` ветку! 🚀
