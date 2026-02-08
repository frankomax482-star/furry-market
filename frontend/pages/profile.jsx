'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '../utils/store';
import { ordersAPI } from '../utils/api';
import Link from 'next/link';

export default function ProfilePage() {
  const router = useRouter();
  const { user, token, logout } = useAuthStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Мой профиль</h1>
          <button
            onClick={handleLogout}
            className="btn-outline px-4 py-2"
          >
            Выход
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="card">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4 flex items-center justify-center text-4xl text-white">
                {user.firstName?.[0] || 'U'}
              </div>
              <h2 className="text-xl font-bold">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{user.email || user.phone}</p>
              <div className="mt-4 p-2 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded text-sm">
                {user.role === 'admin' ? '👑 Администратор' : '👤 Покупатель'}
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="md:col-span-2 space-y-4">
            <div className="card">
              <h3 className="text-lg font-bold mb-4">Личная информация</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Имя</p>
                  <p className="font-medium">{user.firstName}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Фамилия</p>
                  <p className="font-medium">{user.lastName}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Телефон</p>
                  <p className="font-medium">{user.phone}</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold mb-4">Быстрые ссылки</h3>
              <div className="space-y-2">
                <Link href="/orders" className="block btn-outline text-center py-2">
                  📦 Мои заказы
                </Link>
                <Link href="/cartpage" className="block btn-outline text-center py-2">
                  🛒 Корзина
                </Link>
                {user.role === 'admin' && (
                  <Link href="/admin" className="block btn-outline text-center py-2 bg-purple-500 text-white">
                    ⚙️ Панель администратора
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
