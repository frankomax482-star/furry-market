# 🦊 FURRY MARKET - Полный маркетплей

Полнофункциональное веб-приложение маркетплея, вдохновленное OZON, специализирующееся на фурри-товарах и аксессуарах.

## 🎯 Что было создано

### Backend (Node.js + Express + MongoDB)
```
backend/
├── src/
│   ├── models/ - MongoDB схемы
│   │   ├── User.js - Пользователи
│   │   ├── Product.js - Товары
│   │   ├── Category.js - Категории
│   │   ├── Order.js - Заказы
│   │   └── PromoCode.js - Промокоды
│   ├── routes/ - API эндпоинты
│   │   ├── authRoutes.js - Аутентификация
│   │   ├── productRoutes.js - Товары
│   │   ├── orderRoutes.js - Заказы
│   │   ├── adminRoutes.js - Админ панель
│   │   ├── categoryRoutes.js - Категории
│   │   ├── promoRoutes.js - Промокоды
│   │   └── userRoutes.js - Профиль
│   ├── middleware/
│   │   └── auth.js - JWT аутентификация
│   └── server.js - Главный файл
├── package.json
└── .env.example
```

### Frontend (Next.js + React + Tailwind)
```
frontend/
├── src/
│   ├── pages/ - Страницы
│   │   ├── layout.jsx - Главный layout
│   │   ├── index.jsx - Главная
│   │   ├── login.jsx - Вход
│   │   ├── register.jsx - Регистрация
│   │   ├── products.jsx - Каталог
│   │   ├── [id].jsx - Деталь товара
│   │   ├── cart.jsx - Корзина
│   │   ├── checkout.jsx - Оформление
│   │   ├── orders/[id].jsx - Статус заказа
│   │   ├── profile.jsx - Профиль
│   │   └── admin.jsx - Админ панель
│   ├── components/ - React компоненты
│   │   ├── Header.jsx - Шапка
│   │   ├── Footer.jsx - Подвал
│   │   ├── Hero.jsx - Баннер
│   │   ├── ProductCard.jsx - Карточка товара
│   │   ├── LoginForm.jsx - Форма входа
│   │   ├── RegisterForm.jsx - Форма регистрации
│   │   └── FeaturedProducts.jsx - Рекомендации
│   ├── utils/
│   │   ├── api.js - API клиент
│   │   └── store.js - Zustand store
│   ├── context/
│   │   └── ThemeProvider.jsx - Управление темой
│   └── styles/
│       ├── globals.css - Глобальные стили
│       └── theme.js - Конфигурация темы
├── tailwind.config.js
├── next.config.js
└── postcss.config.js
```

## ✨ Реализованные функции

### 👤 Пользователи
- ✅ Регистрация с номером телефона
- ✅ Вход с номером/паролем
- ✅ Google OAuth (подготовка)
- ✅ Личный кабинет
- ✅ История заказов
- ✅ Сохранение адресов
- ✅ Управление профилем

### 🛍️ Каталог
- ✅ Полный каталог товаров
- ✅ Поиск по название/описанию
- ✅ Фильтры по цене
- ✅ Фильтры по категориям
- ✅ Фильтры по рейтингу
- ✅ Пагинация
- ✅ Карточки товаров
- ✅ Страница детали товара
- ✅ Отображение рейтинга и отзывов
- ✅ Показатель «В наличии»

### 🛒 Корзина и оформление
- ✅ Добавление товаров в корзину
- ✅ Изменение количества
- ✅ Удаление товаров
- ✅ Расчет суммы
- ✅ Применение промокодов
- ✅ Калькулятор скидки

### 💳 Оплата и доставка
- ✅ СБП (Система быстрых платежей)
- ✅ Оплата банковской картой
- ✅ Оплата по ссылке
- ✅ Наличные при доставке
- ✅ Три вида доставки (онлайн/офлайн/пункт выдачи)
- ✅ Выбор адреса доставки
- ✅ Фиксация статуса оплаты

### 🎁 Промокоды
- ✅ Создание промокодов
- ✅ Два типа скидок (процент/сумма)
- ✅ Максимальная скидка
- ✅ Минимальная сумма покупки
- ✅ Лимит использования
- ✅ Сроки действия
- ✅ Валидация при оформлении

### 🌓 Темы
- ✅ Светлая тема (по умолчанию)
- ✅ Темная тема
- ✅ Переключение в реальном времени
- ✅ Сохранение выбора в localStorage

### 🔐 Админ-панель
- ✅ Защита роль-based
- ✅ Добавление товаров
- ✅ Редактирование товаров
- ✅ Удаление товаров
- ✅ Управление категориями
- ✅ Управление администраторами
- ✅ Управление промокодами
- ✅ Просмотр статистики

## 🚀 Быстрый старт

### Требования
- Node.js 16+
- MongoDB (локально или MongoDB Atlas)
- npm или yarn

### Способ 1: Автоматический запуск

**Windows:**
```bash
start.bat
```

**Mac/Linux:**
```bash
chmod +x start.sh
./start.sh
```

### Способ 2: Запуск вручную

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### Доступ
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000/api`

## 🔑 Тестовые учетные данные

### Обычный пользователь
- Номер: `+7 (999) 999-99-99`
- Пароль: `user123`

### Администратор
- Номер: `+7 (888) 888-88-88`
- Пароль: `admin123`

## 📚 Основные API эндпоинты

### Аутентификация
```
POST /api/auth/register/phone
POST /api/auth/login/phone
POST /api/auth/auth/google
GET /api/auth/profile
PUT /api/auth/profile
```

### Товары
```
GET /api/products - Список с фильтрацией
GET /api/products/:id - Деталь
GET /api/products/category/:categoryId - По категории
GET /api/products/recommended/top - Популярные
```

### Заказы
```
POST /api/orders - Создать
GET /api/orders - Список
GET /api/orders/:id - Деталь
POST /api/orders/validate-promo - Проверить прокомод
```

### Админ
```
POST /admin/products - Добавить товар
PUT /admin/products/:id - Редактировать товар
DELETE /admin/products/:id - Удалить товар
POST /admin/promos - Создать промокод
GET /admin/stats/dashboard - Статистика
```

## 🛠️ Технологии

### Backend
- Express.js - Web framework
- MongoDB - NoSQL БД
- Mongoose - MongoDB ORM
- JWT - Аутентификация
- Bcryptjs - Хеширование паролей
- CORS - Кросс-доменные запросы
- Nodemailer - Email рассылка

### Frontend
- Next.js 13 - React framework
- React 18 - UI library
- Tailwind CSS - CSS framework
- Zustand - State management
- Axios - HTTP client
- React Icons - Icon library
- React Hot Toast - Notifications

## 📱 Адаптивность

Приложение полностью адаптивно для всех устройств:
- 📱 Мобильные (320px+)
- 📱 Планшеты (768px+)
- 💻 Десктопы (1024px+)
- 🖥️ Большие экраны (1280px+)

## 🎨 Дизайн

- Современный и интуитивный интерфейс
- Темная и светлая темы
- Гладкие анимации и переходы
- Продуманная навигация
- Удобные формы
- Информативные сообщения об ошибках

## 📊 Файловая структура проекта

```
furry-market/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── controllers/
│   │   ├── utils/
│   │   └── server.js
│   ├── package.json
│   ├── .env.example
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── utils/
│   │   ├── context/
│   │   └── styles/
│   ├── package.json
│   ├── next.config.js
│   └── tailwind.config.js
├── README.md
├── QUICKSTART.md
├── ARCHITECTURE.md (этот файл)
├── start.sh
└── start.bat
```

## 🔄 Поток данных

```
Frontend (Next.js/React)
    ↓
API Client (Axios)
    ↓
Backend API (Express)
    ↓
Database (MongoDB)
    ↓
Models & Logic
    ↓
Response
    ↓
Frontend Store (Zustand)
    ↓
UI Update
```

## 🔐 Безопасность

- JWT токены для аутентификации
- Bcryptjs для хеширования паролей
- CORS защита
- Валидация входных данных
- Role-based access control
- Защита от XSS
- Защита от CSRF

## 🚀 Масштабирование

Приложение подготовлено для масштабирования:
- Модульная архитектура
- RESTful API
- Отделение фронтенда от бэкенда
- Кеширование запросов готово
- Подготовка к микросервисам
- Готово к облачному развертыванию

## 📝 Лицензия

MIT License - используйте свободно!

---

**Создано для фурри-сообщества с ❤️**

Для вопросов и поддержки обратитесь в документацию или создайте issue.
