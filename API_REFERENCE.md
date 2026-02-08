# 🦊 FURRY MARKET - Справка по API

## 🔐 Аутентификация

Все защищенные роуты требуют JWT токена в заголовке:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 📝 Аутентификация (Auth)

### Регистрация с номером

```http
POST /api/auth/register/phone
Content-Type: application/json

{
  "phone": "+7 99 999 9999",
  "firstName": "Иван",
  "lastName": "Петров",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "123abc...",
    "phone": "+7 999 999 9999",
    "firstName": "Иван",
    "lastName": "Петров",
    "role": "user"
  }
}
```

### Вход с номером

```http
POST /api/auth/login/phone
Content-Type: application/json

{
  "phone": "+7 999 999 9999",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "123abc...",
    "phone": "+7 999 999 9999",
    "firstName": "Иван",
    "lastName": "Петров",
    "role": "user",
    "preferences": {
      "theme": "light",
      "notifications": true
    }
  }
}
```

### Google Auth

```http
POST /api/auth/auth/google
Content-Type: application/json

{
  "googleId": "google_id_123",
  "email": "user@example.com",
  "firstName": "Иван",
  "lastName": "Петров"
}
```

### Получить профиль (защищен)

```http
GET /api/auth/profile
Authorization: Bearer TOKEN
```

**Response (200):**
```json
{
  "id": "123abc...",
  "firstName": "Иван",
  "lastName": "Петров",
  "email": "user@example.com",
  "phone": "+7 999 999 9999",
  "role": "user",
  "address": {
    "street": "ул. Пушкина",
    "city": "Москва",
    "region": "Московская область",
    "postalCode": "123456",
    "country": "Russia"
  },
  "preferences": {
    "theme": "light",
    "notifications": true
  }
}
```

### Обновить профиль (защищен)

```http
PUT /api/auth/profile
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "firstName": "Владимир",
  "lastName": "Сидоров",
  "address": {
    "street": "ул. Толстого",
    "city": "Санкт-Петербург",
    "region": "Ленинградская область",
    "postalCode": "654321",
    "country": "Russia"
  },
  "preferences": {
    "theme": "dark",
    "notifications": true
  }
}
```

---

## 📦 Товары (Products)

### Получить список товаров

```http
GET /api/products?search=furry&category=123&minPrice=100&maxPrice=1000&rating=4&page=1&limit=20
```

**Query Parameters:**
- `search` - Поиск по названию/описанию
- `category` - ID категории
- `minPrice` - Минимальная цена
- `maxPrice` - Максимальная цена
- `rating` - Минимальный рейтинг (0-5)
- `page` - Номер страницы
- `limit` - Товаров на странице
- `sort` - Сортировка (default: `-createdAt`)

**Response (200):**
```json
{
  "total": 100,
  "pages": 5,
  "currentPage": 1,
  "products": [
    {
      "_id": "prod123...",
      "name": "Фурри костюм",
      "description": "Удобный фурри костюм",
      "price": 500,
      "discountPrice": 400,
      "category": "cat_id",
      "mainImage": "https://...",
      "images": [
        {
          "url": "https://...",
          "altText": "фото 1"
        }
      ],
      "stock": 50,
      "ratings": 4.5,
      "reviewCount": 25,
      "attributes": {
        "size": ["S", "M", "L", "XL"],
        "color": ["Красный", "Синий"],
        "material": "Полиэстер"
      },
      "delivered": 150,
      "seller": "seller_id",
      "isActive": true,
      "tags": ["фурри", "костюм", "косплей"],
      "createdAt": "2024-02-08T10:00:00Z"
    }
  ]
}
```

### Получить товар по ID

```http
GET /api/products/prod123
```

**Response (200):** Полный объект товара (см выше)

### Получить товары по категории

```http
GET /api/products/category/cat_id?page=1&limit=20
```

### Получить рекомендованные товары

```http
GET /api/products/recommended/top
```

---

## 📂 Категории (Categories)

### Получить все категории

```http
GET /api/categories
```

**Response (200):**
```json
[
  {
    "_id": "cat123",
    "name": "Костюмы",
    "description": "Фурри костюмы",
    "image": "https://...",
    "slug": "kostyumy",
    "icon": "👔",
    "isActive": true,
    "order": 1
  }
]
```

### Получить категорию с подкатегориями

```http
GET /api/categories/cat123
```

**Response (200):**
```json
{
  "category": { ... },
  "subcategories": [ ... ]
}
```

---

## 🛒 Заказы (Orders)

### Создать заказ (защищен)

```http
POST /api/orders
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "items": [
    {
      "product": "prod123",
      "quantity": 2,
      "price": 500
    }
  ],
  "shippingAddress": {
    "name": "Иван Петров",
    "street": "ул. Пушкина, д. 10",
    "city": "Москва",
    "region": "Московская область",
    "postalCode": "123456",
    "country": "Russia",
    "phone": "+7 999 999 9999"
  },
  "deliveryType": "online",
  "paymentMethod": "sbp",
  "promoCode": "PROMO2024"
}
```

**Response (201):**
```json
{
  "message": "Order created successfully",
  "order": {
    "_id": "order123",
    "orderNumber": "ORD-1707387600000",
    "user": "user_id",
    "items": [ ... ],
    "totalAmount": 1000,
    "discount": 100,
    "finalAmount": 900,
    "shippingAddress": { ... },
    "deliveryType": "online",
    "paymentMethod": "sbp",
    "paymentStatus": "pending",
    "paymentLink": "https://payment.furrymarket.com/pay/order123",
    "status": "pending",
    "createdAt": "2024-02-08T10:00:00Z"
  }
}
```

### Получить мои заказы (защищен)

```http
GET /api/orders
Authorization: Bearer TOKEN
```

### Получить заказ по ID (защищен)

```http
GET /api/orders/order123
Authorization: Bearer TOKEN
```

### Обновить статус заказа (защищен, админ)

```http
PUT /api/orders/order123/status
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json

{
  "status": "shipped"
}
```

**Статусы:** pending, confirmed, shipped, delivered, cancelled, returned

### Валидировать промокод (защищен)

```http
POST /api/orders/validate-promo
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "code": "PROMO2024",
  "amount": 1000
}
```

**Response (200):**
```json
{
  "valid": true,
  "discount": 100,
  "finalAmount": 900
}
```

---

## 🎁 Промокоды (Promos)

### Получить активные промокоды

```http
GET /api/promos
```

**Response (200):**
```json
[
  {
    "_id": "promo123",
    "code": "PROMO2024",
    "discountType": "percentage",
    "discountValue": 10,
    "maxDiscount": 500,
    "minPurchaseAmount": 500,
    "validFrom": "2024-02-01T00:00:00Z",
    "validUntil": "2024-02-28T23:59:59Z"
  }
]
```

---

## 🔐 Админ API (требует role: admin)

### Добавить товар

```http
POST /api/admin/products
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json

{
  "name": "Новый товар",
  "description": "Описание",
  "price": 1000,
  "discountPrice": 800,
  "category": "cat_id",
  "images": [
    {
      "url": "https://...",
      "altText": "фото 1"
    }
  ],
  "stock": 100,
  "attributes": {
    "size": ["S", "M", "L"],
    "color": ["Красный", "Синий"],
    "material": "Хлопок"
  },
  "tags": ["новое", "акция"]
}
```

### Редактировать товар

```http
PUT /api/admin/products/prod123
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json

{ ... данные для обновления ... }
```

### Удалить товар

```http
DELETE /api/admin/products/prod123
Authorization: Bearer ADMIN_TOKEN
```

### Добавить категорию

```http
POST /api/admin/categories
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json

{
  "name": "Новая категория",
  "description": "Описание",
  "image": "https://...",
  "slug": "novaya-kategoriya",
  "icon": "📦"
}
```

### Добавить администратора

```http
POST /api/admin/admins
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json

{
  "phone": "+7 888 888 8888",
  "email": "admin@example.com",
  "firstName": "Владимир",
  "lastName": "Админов",
  "password": "secure_password"
}
```

### Создать промокод

```http
POST /api/admin/promos
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json

{
  "code": "SUMMER2024",
  "description": "Летняя акция",
  "discountType": "percentage",
  "discountValue": 20,
  "maxDiscount": 1000,
  "minPurchaseAmount": 500,
  "usageLimit": 100,
  "userUsageLimit": 1,
  "validFrom": "2024-06-01T00:00:00Z",
  "validUntil": "2024-08-31T23:59:59Z"
}
```

### Получить статистику

```http
GET /api/admin/stats/dashboard
Authorization: Bearer ADMIN_TOKEN
```

**Response (200):**
```json
{
  "totalProducts": 250,
  "totalCategories": 15,
  "totalAdmins": 3,
  "totalUsers": 1500
}
```

---

## 👤 Пользователь (User)

### Получить профиль пользователя (защищен)

```http
GET /api/users/profile
Authorization: Bearer TOKEN
```

### Обновить профиль (защищен)

```http
PUT /api/users/profile
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "firstName": "Новое имя",
  "lastName": "Новая фамилия",
  "email": "newemail@example.com",
  "address": { ... },
  "dateOfBirth": "1990-01-01"
}
```

### Переключить тему (защищен)

```http
PUT /api/users/theme
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "theme": "dark"
}
```

---

## ❌ Ошибки

### 400 Bad Request
```json
{
  "error": "Missing required fields"
}
```

### 401 Unauthorized
```json
{
  "error": "No token provided"
}
```

### 403 Forbidden
```json
{
  "error": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "details": "Error message"
}
```

---

## 🧪 Тестирование с cURL

### Регистрация
```bash
curl -X POST http://localhost:5000/api/auth/register/phone \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+7 999 999 9999",
    "firstName": "Иван",
    "lastName": "Петров",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

### Получить товары
```bash
curl "http://localhost:5000/api/products?search=furry&page=1&limit=10"
```

### Создать заказ
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{
      "product": "prod123",
      "quantity": 1,
      "price": 500
    }],
    "shippingAddress": {
      "name": "Иван Петров",
      "street": "ул. Пушкина",
      "city": "Москва",
      "phone": "+7 999 999 9999"
    },
    "deliveryType": "online",
    "paymentMethod": "sbp"
  }'
```

---

## 📊 Платежные методы

| Метод | Значение | Описание |
|-------|----------|---------|
| СБП | `sbp` | Система быстрых платежей |
| Карта | `card` | Банковская карта |
| Ссылка | `link` | Оплата по ссылке |
| Наличные | `cash` | При доставке |

## 🚚 Виды доставки

| Тип | Значение | Описание |
|-----|----------|---------|
| Онлайн | `online` | Почта/Курьер |
| Самовывоз | `offline` | В магазине |
| Пункт | `pickup` | Пункт выдачи |

## 📋 Статусы заказа

| Статус | Описание |
|--------|---------|
| pending | Ожидание подтверждения |
| confirmed | Подтвержден |
| shipped | Отправлен |
| delivered | Доставлен |
| cancelled | Отменен |
| returned | Возвращен |

---

**Документировано и завершено!** 🎉
