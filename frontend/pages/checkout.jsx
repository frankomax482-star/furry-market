'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '../utils/store';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const { user, token } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: '',
    city: '',
    postalCode: '',
    deliveryType: 'delivery', // delivery or pickup
    paymentMethod: 'sbp', // sbp, card, cash, link
    notes: ''
  });

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async () => {
    setLoading(true);
    try {
      // In real implementation, would call ordersAPI.create(orderData)
      alert('Заказ создан! Ваш заказ находится в обработке.');
      router.push('/orders');
    } catch (error) {
      alert(error.response?.data?.error || 'Ошибка при создании заказа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Оформление заказа</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Form */}
          <div className="md:col-span-2 space-y-8">
            {/* Delivery */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Доставка</h2>
              <div className="space-y-4">
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="deliveryType"
                    value="delivery"
                    checked={orderData.deliveryType === 'delivery'}
                    onChange={handleChange}
                  />
                  <span>Доставка курьером</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="deliveryType"
                    value="pickup"
                    checked={orderData.deliveryType === 'pickup'}
                    onChange={handleChange}
                  />
                  <span>Самовывоз из пункта</span>
                </label>

                {orderData.deliveryType === 'delivery' && (
                  <div className="space-y-4 ml-6 mt-4">
                    <input
                      type="text"
                      name="address"
                      value={orderData.address}
                      onChange={handleChange}
                      placeholder="Адрес доставки"
                      className="input"
                    />
                    <input
                      type="text"
                      name="city"
                      value={orderData.city}
                      onChange={handleChange}
                      placeholder="Город"
                      className="input"
                    />
                    <input
                      type="text"
                      name="postalCode"
                      value={orderData.postalCode}
                      onChange={handleChange}
                      placeholder="Почтовый индекс"
                      className="input"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Контактная информация</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    value={orderData.firstName}
                    onChange={handleChange}
                    placeholder="Имя"
                    className="input"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={orderData.lastName}
                    onChange={handleChange}
                    placeholder="Фамилия"
                    className="input"
                  />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={orderData.phone}
                  onChange={handleChange}
                  placeholder="+7 (999) 999-99-99"
                  className="input"
                />
                <input
                  type="email"
                  name="email"
                  value={orderData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="input"
                />
              </div>
            </div>

            {/* Payment */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Способ оплаты</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="sbp"
                    checked={orderData.paymentMethod === 'sbp'}
                    onChange={handleChange}
                  />
                  <span>СБП (через QR-код)</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={orderData.paymentMethod === 'card'}
                    onChange={handleChange}
                  />
                  <span>Карта (Visa, Mastercard)</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="link"
                    checked={orderData.paymentMethod === 'link'}
                    onChange={handleChange}
                  />
                  <span>Ссылка на оплату</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={orderData.paymentMethod === 'cash'}
                    onChange={handleChange}
                  />
                  <span>Наличные при получении</span>
                </label>
              </div>
            </div>

            {/* Notes */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Комментарий к заказу</h2>
              <textarea
                name="notes"
                value={orderData.notes}
                onChange={handleChange}
                placeholder="Дополнительная информация для доставки..."
                className="input h-24"
              />
            </div>
          </div>

          {/* Summary */}
          <div className="card h-fit space-y-4">
            <h2 className="text-xl font-bold">Итог</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Товары</span>
                <span>₽ 5999.99</span>
              </div>
              <div className="flex justify-between">
                <span>Доставка</span>
                <span>₽ 299.99</span>
              </div>
            </div>
            <div className="border-t dark:border-gray-700 pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Итого</span>
                <span>₽ 6299.98</span>
              </div>
            </div>

            <button
              onClick={handleSubmitOrder}
              disabled={loading}
              className="btn-primary w-full py-3 disabled:opacity-50"
            >
              {loading ? 'Обработка...' : 'Отправить заказ'}
            </button>

            <Link href="/products" className="btn-outline w-full text-center py-3">
              Назад к товарам
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
