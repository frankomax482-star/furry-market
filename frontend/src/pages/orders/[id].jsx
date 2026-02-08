'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ordersAPI } from '@/utils/api';
import toast from 'react-hot-toast';
import { FiPackage, FiTruck, FiCreditCard } from 'react-icons/fi';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  returned: 'bg-gray-100 text-gray-800'
};

const statusLabels = {
  pending: '⏳ Ожидание',
  confirmed: '✓ Подтверждено',
  shipped: '🚚 Отправлено',
  delivered: '✓ Доставлено',
  cancelled: '✗ Отменено',
  returned: '↩️ Возвращено'
};

export default function OrderPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await ordersAPI.getById(params.id);
        setOrder(response.data);
      } catch (error) {
        if (error.response?.status === 403) {
          toast.error('Доступ запрещен');
          router.push('/');
        } else {
          toast.error('Ошибка загрузки заказа');
        }
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchOrder();
    }
  }, [params.id, router]);

  if (loading) {
    return <div className="min-h-screen py-12"><div className="max-w-4xl mx-auto px-4 animate-pulse">Загрузка...</div></div>;
  }

  if (!order) {
    return <div className="min-h-screen py-12"><div className="max-w-4xl mx-auto px-4">Заказ не найден</div></div>;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Заказ #{order.orderNumber}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            От {new Date(order.createdAt).toLocaleDateString('ru-RU')}
          </p>
        </div>

        {/* Status Timeline */}
        <div className="card mb-8 p-6">
          <h2 className="font-bold mb-4 flex items-center gap-2">
            <FiPackage /> Статус заказа
          </h2>
          <div className="flex justify-between items-center">
            {['pending', 'confirmed', 'shipped', 'delivered'].map((status, idx) => (
              <div key={status} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                    ['pending', 'confirmed', 'shipped', 'delivered'].indexOf(order.status) >= idx
                      ? 'bg-orange-500'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  {idx + 1}
                </div>
                <div
                  className={`flex-1 h-1 mx-2 ${
                    ['pending', 'confirmed', 'shipped', 'delivered'].indexOf(order.status) > idx
                      ? 'bg-orange-500'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
            <span>Ожидание</span>
            <span>Подтверждено</span>
            <span>Отправлено</span>
            <span>Доставлено</span>
          </div>

          <div className={`mt-6 px-4 py-3 rounded-lg ${statusColors[order.status]}`}>
            <p className="font-semibold">{statusLabels[order.status]}</p>
            {order.trackingNumber && (
              <p className="text-sm mt-1">Трек-номер: {order.trackingNumber}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2 space-y-8">
            {/* Items */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Товары в заказе</h2>
              <div className="space-y-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex gap-4 pb-4 border-b dark:border-gray-700 last:border-b-0">
                    <img
                      src={item.product?.mainImage || '/placeholder.jpg'}
                      alt={item.product?.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.product?.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Кол-во: {item.quantity} шт. × ₽{item.price}
                      </p>
                    </div>
                    <div className="text-right font-semibold">
                      ₽{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Address */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FiTruck /> Адрес доставки
              </h2>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p className="font-semibold">{order.shippingAddress?.name}</p>
                <p>{order.shippingAddress?.street}</p>
                <p>{order.shippingAddress?.city}, {order.shippingAddress?.region}</p>
                <p>{order.shippingAddress?.postalCode}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Телефон: {order.shippingAddress?.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Summary & Info */}
          <div className="space-y-6">
            {/* Payment Info */}
            <div className="card">
              <h2 className="font-bold mb-4 flex items-center gap-2">
                <FiCreditCard /> Оплата
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Сумма</span>
                  <span className="font-semibold">₽{order.totalAmount}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Скидка</span>
                    <span>-₽{order.discount}</span>
                  </div>
                )}
                <div className="border-t dark:border-gray-700 pt-3 flex justify-between text-lg font-bold">
                  <span>Итого</span>
                  <span className="text-orange-500">₽{order.finalAmount}</span>
                </div>
                <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Способ оплаты</p>
                  <p className="font-semibold capitalize">{order.paymentMethod}</p>
                </div>
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Статус платежа</p>
                  <div className={`font-semibold px-2 py-1 rounded text-white w-fit ${
                    order.paymentStatus === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}>
                    {order.paymentStatus === 'completed' ? '✓ Оплачено' : '⏳ Ожидание'}
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Type */}
            <div className="card">
              <h2 className="font-bold mb-4">Доставка</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Способ</p>
              <p className="font-semibold capitalize">
                {order.deliveryType === 'online' ? '📦 Почта России' : order.deliveryType === 'offline' ? '🏪 Самовывоз' : '🏢 Пункт выдачи'}
              </p>
            </div>

            {/* Actions */}
            <button
              onClick={() => router.push('/products')}
              className="btn-primary w-full py-3 justify-center"
            >
              Продолжить покупки
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
