'use client';
import { useAuthStore } from '@/utils/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { adminAPI } from '@/utils/api';
import toast from 'react-hot-toast';
import { FiBox, FiUsers, FiTag, FiBarChart3 } from 'react-icons/fi';

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [currentTab, setCurrentTab] = useState('products');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/');
    }
  }, [user, router]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await adminAPI.getDashboardStats();
        setStats(response.data);
      } catch (error) {
        toast.error('Ошибка загрузки статистики');
      }
    };
    fetchStats();
  }, []);

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">📊 Admin Dashboard</h1>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="card flex items-center gap-4">
              <div className="text-4xl">📦</div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Товары</p>
                <p className="text-3xl font-bold">{stats.totalProducts}</p>
              </div>
            </div>
            <div className="card flex items-center gap-4">
              <div className="text-4xl">📂</div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Категории</p>
                <p className="text-3xl font-bold">{stats.totalCategories}</p>
              </div>
            </div>
            <div className="card flex items-center gap-4">
              <div className="text-4xl">👥</div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Пользователи</p>
                <p className="text-3xl font-bold">{stats.totalUsers}</p>
              </div>
            </div>
            <div className="card flex items-center gap-4">
              <div className="text-4xl">🔐</div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Администраторы</p>
                <p className="text-3xl font-bold">{stats.totalAdmins}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-4 mb-8 border-b dark:border-gray-700 overflow-x-auto">
          {[
            { id: 'products', label: '📦 Товары', icon: FiBox },
            { id: 'categories', label: '📂 Категории', icon: FiTag },
            { id: 'admins', label: '👥 Администраторы', icon: FiUsers },
            { id: 'promos', label: '🎁 Промокоды', icon: FiTag }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`px-4 py-2 font-medium border-b-2 whitespace-nowrap transition ${
                currentTab === tab.id
                  ? 'border-orange-500 text-orange-500'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="card min-h-96">
          {currentTab === 'products' && (
            <AdminProducts />
          )}
          {currentTab === 'categories' && (
            <AdminCategories />
          )}
          {currentTab === 'admins' && (
            <AdminUsers />
          )}
          {currentTab === 'promos' && (
            <AdminPromos />
          )}
        </div>
      </div>
    </div>
  );
}

// Admin Products Component
function AdminProducts() {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await adminAPI.getAllProducts();
        setProducts(response.data);
      } catch (error) {
        toast.error('Ошибка загрузки товаров');
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Управление товарами</h2>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          + Добавить товар
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th className="text-left py-3">Товар</th>
              <th className="text-left py-3">Цена</th>
              <th className="text-left py-3">Склад</th>
              <th className="text-left py-3">Действия</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="py-3">{product.name}</td>
                <td className="py-3">₽{product.price}</td>
                <td className="py-3">{product.stock}</td>
                <td className="py-3">
                  <button className="text-blue-500 hover:underline mr-3">Редактировать</button>
                  <button className="text-red-500 hover:underline">Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Admin Categories Component
function AdminCategories() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Управление категориями</h2>
        <button className="btn-primary">+ Добавить категорию</button>
      </div>
      <p className="text-gray-600 dark:text-gray-400">
        Функция добавления категорий будет реализована
      </p>
    </div>
  );
}

// Admin Users Component
function AdminUsers() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Управление администраторами</h2>
        <button className="btn-primary">+ Добавить администратора</button>
      </div>
      <p className="text-gray-600 dark:text-gray-400">
        Функция управления администраторами будет реализована
      </p>
    </div>
  );
}

// Admin Promos Component
function AdminPromos() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Управление промокодами</h2>
        <button className="btn-primary">+ Создать промокод</button>
      </div>
      <p className="text-gray-600 dark:text-gray-400">
        Функция управления промокодами будет реализована
      </p>
    </div>
  );
}
