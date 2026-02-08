'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '../utils/store';
import { ordersAPI } from '../utils/api';

export default function OrdersPage() {
  const router = useRouter();
  const { user, token } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await ordersAPI.getUserOrders();
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, router]);

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-gray-600 dark:text-gray-400">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Мои заказы</h1>

        {orders.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">У вас пока нет заказов</p>
            <a href="/products" className="btn-primary inline-block">
              Перейти к товарам
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="card">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Номер заказа</p>
                    <p className="font-bold">#{order._id.slice(-8).toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Дата</p>
                    <p>{new Date(order.createdAt).toLocaleDateString('ru-RU')}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Статус</p>
                    <p className="font-semibold">
                      {
                        order.status === 'pending' ? '⏳ В ожидании' :
                        order.status === 'confirmed' ? '✓ Подтвержден' :
                        order.status === 'shipped' ? '🚚 Отправлен' :
                        order.status === 'delivered' ? '📦 Доставлен' :
                        'Отменен'
                      }
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Сумма</p>
                    <p className="font-bold">₽{order.totalAmount?.toFixed(2) || '0.00'}</p>
                  </div>
                  <div>
                    <a href={`/orders/${order._id}`} className="btn-primary px-4 py-1 text-xs text-center block">
                      Подробнее
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
