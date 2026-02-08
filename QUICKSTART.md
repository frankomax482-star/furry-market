# Быстрый старт - FURRY MARKET

## Требования
- Node.js 16+
- MongoDB локально или облако
- npm или yarn

## 1️⃣ Установка Backend

```bash
cd backend
npm install
```

### Настройка .env
Скопируйте `.env.example` в `.env` и заполните:

```bash
cp .env.example .env
```

Отредактируйте `.env`:
```env
PORT=5000
MONGODB_URL=mongodb://localhost:27017/furry-market
JWT_SECRET=your_secret_key_12345
NODE_ENV=development
```

### Запуск Backend
```bash
npm run dev
```

Сервер запустится на `http://localhost:5000`

---

## 2️⃣ Установка Frontend

```bash
cd frontend
npm install
```

### Запуск Frontend
```bash
npm run dev
```

Приложение откроется на `http://localhost:3000`

---

## 3️⃣ Первый запуск

### Создайте тестовый аккаунт администратора

**Вариант 1: Через API**
```bash
curl -X POST http://localhost:5000/api/auth/register/phone \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+7 (999) 999-99-99",
    "firstName": "Admin",
    "lastName": "User",
    "password": "admin123",
    "confirmPassword": "admin123"
  }'
```

**Вариант 2: Через MongoDB (установить роль admin)**
```javascript
db.users.updateOne(
  { phone: "+7 (999) 999-99-99" },
  { $set: { role: "admin" } }
)
```

### Используйте статус пользователя

После входа проверьте роль в `/admin` (если admin, то увидите admin panel)

---

## 📦 Установка MongoDB локально

### Windows
1. Скачайте с https://www.mongodb.com/try/download/community
2. Запустите установщик
3. Запустите MongoDB:
```bash
mongod
```

### macOS
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Linux
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

---

## 🧪 Тестирование

### API Endpoints

**Тестирование регистрации:**
```bash
POST http://localhost:5000/api/auth/register/phone
```

**Тестирование поиска товаров:**
```bash
GET http://localhost:5000/api/products?search=furry&page=1
```

**Тестирование админ панели:**
```bash
GET http://localhost:5000/api/admin/stats/dashboard
# Требует JWT токен администратора
```

### Используйте Postman
1. Импортируйте коллекцию: `backend/postman_collection.json` (если есть)
2. Или создайте вручную запросы выше

---

## 🔐 Тестовые данные

### Пользователь
- Номер: `+7 (999) 999-99-99`
- Пароль: `user123`
- Роль: user

### Администратор
- Номер: `+7 (888) 888-88-88`
- Пароль: `admin123`
- Роль: admin

---

## 🆘 Решение проблем

### Ошибка: "Cannot connect to MongoDB"
```bash
# Проверь, что MongoDB запущен
mongod --version
# Или запусти
mongod
```

### Ошибка: "Port 5000/3000 is already in use"
```bash
# Найди процесс на порту (Windows)
netstat -ano | findstr :5000

# Заверши процесс
taskkill /PID <PID> /F

# Или используй другой порт в .env
PORT=5001
```

### CORS ошибка в браузере
Убедись, что backend запущен и доступен по адресу из переменной `NEXT_PUBLIC_API_URL` в frontend

### Cookie/Token не сохраняется
Проверь localStorage в DevTools (`F12` → Application → Storage)

---

## 📚 Полезные ссылки

- [Next.js документация](https://nextjs.org/docs)
- [Express документация](https://expressjs.com)
- [MongoDB документация](https://docs.mongodb.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand](https://github.com/pmndrs/zustand)

---

## 🚀 Production развертывание

### Backend (Heroku)
```bash
git push heroku main
```

### Frontend (Vercel)
```bash
npm install -g vercel
vercel
```

---

## ✅ Чеклист перед запуском

- [ ] Node.js установлен
- [ ] MongoDB запущена
- [ ] Backend `.env` настроен
- [ ] Зависимости установлены (`npm install`)
- [ ] Backend запущен (`npm run dev`)
- [ ] Frontend запущен (`npm run dev`)
- [ ] Приложение открывается на `localhost:3000`
- [ ] Можешь зарегистрироваться
- [ ] Админ панель доступна при admin rolle

---

Готово! 🎉 Приложение готово к использованию!
