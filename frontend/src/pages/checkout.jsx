'use client';
import { useAuthStore, useCartStore } from '@/utils/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ordersAPI } from '@/utils/api';
import toast from 'react-hot-toast';
import { FiTruck, FiCreditCard, FiMapPin } from 'react-icons/fi';

export default function CheckoutPage() {
  const { user } = useAuthStore();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    shippingAddress: {
      name: user?.firstName + ' ' + user?.lastName || '',
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      region: user?.address?.region || '',
      postalCode: user?.address?.postalCode || '',
      country: user?.address?.country || 'Russia',
      phone: user?.phone || ''
    },
    deliveryType: 'online',
    paymentMethod: 'sbp'
  });

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const totalPrice = getTotalPrice();

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      shippingAddress: {
        ...prev.shippingAddress,
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        items: items.map(item => ({
          product: item._id,
          quantity: item.quantity,
          price: item.discountPrice || item.price
        })),
        shippingAddress: formData.shippingAddress,
        deliveryType: formData.deliveryType,
        paymentMethod: formData.paymentMethod
      };

      const response = await ordersAPI.create(orderData);
      const order = response.data.order;

      toast.success('Заказ успешно создан!');
      clearCart();

      if (order.paymentLink) {
        window.open(order.paymentLink, '_blank');
      } else if (formData.paymentMethod === 'sbp') {
        toast.info('Перенаправляем на оплату СБП...');
      }

      router.push(`/orders/${order._id}`);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Ошибка при создании заказа');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Оформление заказа</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
            {/* Delivery Address */}
            <div className="card space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FiMapPin />
                Адрес доставки
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={formData.shippingAddress.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="ФИО"
                  className="input col-span-2"
                  required
                />
                <input
                  type="text"
                  value={formData.shippingAddress.street}
                  onChange={(e) => handleChange('street', e.target.value)}
                  placeholder="Улица"
                  className="input col-span-2"
                  required
                />
                <input
                  type="text"
                  value={formData.shippingAddress.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  placeholder="Город"
                  className="input"
                  required
                />
                <input
                  type="text"
                  value={formData.shippingAddress.region}
                  onChange={(e) => handleChange('region', e.target.value)}
                  placeholder="Область"
                  className="input"
                />
                <input
                  type="text"
                  value={formData.shippingAddress.postalCode}
                  onChange={(e) => handleChange('postalCode', e.target.value)}
                  placeholder="Почтовый индекс"
                  className="input"
                  required
                />
                <input
                  type="tel"
                  value={formData.shippingAddress.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="Телефон"
                  className="input"
                  required
                />
              </div>
            </div>

            {/* Delivery Type */}
            <div className="card space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FiTruck />
                Способ доставки
              </h2>

              <div className="space-y-2">
                {['online', 'offline', 'pickup'].map(type => (
                  <label key={type} className="flex items-center gap-2 p-3 border border-gray-300 dark:border-gray-600 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                    <input
                      type="radio"
                      name="deliveryType"
                      value={type}
                      checked={formData.deliveryType === type}
                      onChange={(e) => setFormData({ ...formData, deliveryType: e.target.value })}
                    />
                    <span className="font-medium capitalize">
                      {type === 'online' ? '📦 Почта России' : type === 'offline' ? '🏪 Самовывоз' : '🏢 Пункт выдачи'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="card space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FiCreditCard />
                Способ оплаты
              </h2>

              <div className="space-y-2">
                {[
                  { value: 'sbp', label: '💳 СБП (Система быстрых платежей)' },
                  { value: 'card', label: '🏦 Банковская карта' },
                  { value: 'link', label: '🔗 Оплата по ссылке' },
                  { value: 'cash', label: '💵 Наличные при доставке' }
                ].map(method => (
                  <label key={method.value} className="flex items-center gap-2 p-3 border border-gray-300 dark:border-gray-600 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.value}
                      checked={formData.paymentMethod === method.value}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    />
                    <span className="font-medium">{method.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-lg disabled:opacity-50">
              {loading ? 'Обработка...' : 'Создать заказ'}
            </button>
          </form>

          {/* Summary */}
          <div className="card h-fit space-y-4">
            <h2 className="text-xl font-bold">Сумма заказа</h2>

            <div className="space-y-2 pb-4 border-b dark:border-gray-700">
              {items.map(item => (
                <div key={item._id} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span>₽{(item.discountPrice || item.price) * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Доставка</span>
                <span>₽0</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-orange-500">
                <span>Итого</span>
                <span>₽{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
