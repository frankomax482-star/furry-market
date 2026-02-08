'use client';
import { useAuthStore } from '@/utils/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { authAPI } from '@/utils/api';
import toast from 'react-hot-toast';
import { FiUser, FiLogOut, FiMapPin, FiPhone } from 'react-icons/fi';

export default function ProfilePage() {
  const { user, setUser, logout } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    address: user?.address || {}
  });

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await authAPI.updateProfile(formData);
      setUser(response.data.user);
      setEditMode(false);
      toast.success('Профиль обновлен!');
    } catch (error) {
      toast.error('Ошибка при обновлении профиля');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    logout();
    router.push('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Личный кабинет</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Profile Card */}
          <div className="card text-center">
            <div className="text-6xl mb-4">👤</div>
            <h2 className="text-xl font-bold mb-2">{user.firstName} {user.lastName}</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex items-center gap-1 justify-center">
              <FiPhone size={14} /> {user.phone}
            </p>
            <button
              onClick={handleLogout}
              className="btn-outline w-full flex items-center justify-center gap-2"
            >
              <FiLogOut /> Выход
            </button>
          </div>

          {/* Profile Info */}
          <div className="md:col-span-3 card space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <FiUser /> Информация профиля
              </h2>
              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className="btn-secondary text-sm"
                >
                  Редактировать
                </button>
              )}
            </div>

            {editMode ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="Имя"
                  className="input"
                />
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Фамилия"
                  className="input"
                />

                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <FiMapPin /> Адрес доставки
                  </h3>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={formData.address?.city || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        address: { ...formData.address, city: e.target.value }
                      })}
                      placeholder="Город"
                      className="input"
                    />
                    <input
                      type="text"
                      value={formData.address?.street || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        address: { ...formData.address, street: e.target.value }
                      })}
                      placeholder="Улица"
                      className="input"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="btn-primary flex-1 disabled:opacity-50"
                  >
                    {loading ? 'Сохранение...' : 'Сохранить'}
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="btn-outline flex-1"
                  >
                    Отмена
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Имя</p>
                  <p className="font-semibold">{user.firstName} {user.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Телефон</p>
                  <p className="font-semibold">{user.phone}</p>
                </div>
                {user.email && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                    <p className="font-semibold">{user.email}</p>
                  </div>
                )}
                {user.address?.city && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Адрес</p>
                    <p className="font-semibold">
                      {user.address.street}, {user.address.city}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Tabs */}
            <div className="border-t dark:border-gray-700 pt-6 mt-6">
              <div className="flex gap-4 mb-6 border-b dark:border-gray-700">
                <button className="px-4 py-2 border-b-2 border-orange-500 font-semibold">
                  История заказов
                </button>
                <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900">
                  Адреса
                </button>
                <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900">
                  Избранное
                </button>
              </div>

              <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                <p>Нет заказов</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
