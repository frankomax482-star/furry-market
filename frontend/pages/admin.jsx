'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '../utils/store';
import { productsAPI, ordersAPI, categoriesAPI } from '../utils/api';
import toast from 'react-hot-toast';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

export default function AdminPage() {
  const router = useRouter();
  const { user, token } = useAuthStore();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || user?.role !== 'admin') {
      router.push('/');
      return;
    }

    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes, ordersRes] = await Promise.all([
          productsAPI.getAll({ limit: 1000 }),
          categoriesAPI.getAll(),
          ordersAPI.getAllOrders()
        ]);

        setProducts(productsRes.data?.products || []);
        setCategories(categoriesRes.data || []);
        setOrders(ordersRes.data || []);
      } catch (error) {
        console.error(error);
        toast.error('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, user, router]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">👑 Панель администратора</h1>
          <button onClick={() => router.push('/')} className="btn-outline">
            ← На главную
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b dark:border-gray-700 overflow-x-auto">
          {['products', 'categories', 'orders', 'users', 'promos'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 border-b-2 transition ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent text-gray-600 dark:text-gray-400'
              }`}
            >
              {tab === 'products' && '📦 Товары'}
              {tab === 'categories' && '📁 Категории'}
              {tab === 'orders' && '📋 Заказы'}
              {tab === 'users' && '👥 Пользователи'}
              {tab === 'promos' && '🎁 Промокоды'}
            </button>
          ))}
        </div>

        {/* Products */}
        {activeTab === 'products' && (
          <div className="card space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Управление товарами</h2>
              <button className="btn-primary flex items-center gap-2">
                <FiPlus /> Добавить товар
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b dark:border-gray-700">
                  <tr>
                    <th className="text-left py-2">Название</th>
                    <th className="text-left py-2">Цена</th>
                    <th className="text-left py-2">Кол-во</th>
                    <th className="text-left py-2">Категория</th>
                    <th className="text-left py-2">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="border-b dark:border-gray-700">
                      <td className="py-2">{product.name}</td>
                      <td className="py-2">₽{product.price}</td>
                      <td className="py-2">{product.stock}</td>
                      <td className="py-2">{product.category?.name || 'N/A'}</td>
                      <td className="py-2">
                        <div className="flex gap-2">
                          <button className="text-blue-500 hover:text-blue-700">
                            <FiEdit2 size={16} />
                          </button>
                          <button className="text-red-500 hover:text-red-700">
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Categories */}
        {activeTab === 'categories' && (
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Категории</h2>
              <button className="btn-primary flex items-center gap-2">
                <FiPlus /> Добавить категорию
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((cat) => (
                <div key={cat._id} className="border dark:border-gray-700 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{cat.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{cat.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-blue-500">
                      <FiEdit2 />
                    </button>
                    <button className="text-red-500">
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders */}
        {activeTab === 'orders' && (
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Все заказы</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b dark:border-gray-700">
                  <tr>
                    <th className="text-left py-2">№ Заказа</th>
                    <th className="text-left py-2">Покупатель</th>
                    <th className="text-left py-2">Статус</th>
                    <th className="text-left py-2">Сумма</th>
                    <th className="text-left py-2">Дата</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b dark:border-gray-700">
                      <td className="py-2">#{order._id.slice(-6).toUpperCase()}</td>
                      <td className="py-2">{order.user?.email || 'N/A'}</td>
                      <td className="py-2">{order.status}</td>
                      <td className="py-2">₽{order.totalAmount?.toFixed(2) || '0'}</td>
                      <td className="py-2">{new Date(order.createdAt).toLocaleDateString('ru-RU')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
