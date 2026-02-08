'use client';
import { useState } from 'react';
import Link from 'next/link';
import { authAPI } from '@/utils/api';
import { useAuthStore } from '@/utils/store';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FiPhone, FiLock, FiUser } from 'react-icons/fi';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    phone: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const { setUser, setToken } = useAuthStore();
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Пароли не совпадают');
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.registerPhone(formData);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);

      toast.success('Успешная регистрация!');
      router.push('/');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold mb-6">Регистрация</h2>

      {/* Name */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Имя</label>
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Имя"
              className="input pl-10"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Фамилия</label>
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Фамилия"
              className="input pl-10"
              required
            />
          </div>
        </div>
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium mb-2">Номер телефона</label>
        <div className="relative">
          <FiPhone className="absolute left-3 top-3 text-gray-400" />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+7 (999) 999-99-99"
            className="input pl-10"
            required
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium mb-2">Пароль</label>
        <div className="relative">
          <FiLock className="absolute left-3 top-3 text-gray-400" />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Введите пароль"
            className="input pl-10"
            required
          />
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium mb-2">Подтверждение пароля</label>
        <div className="relative">
          <FiLock className="absolute left-3 top-3 text-gray-400" />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Подтвердите пароль"
            className="input pl-10"
            required
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full py-3 disabled:opacity-50"
      >
        {loading ? 'Загрузка...' : 'Зарегистрироваться'}
      </button>

      {/* Login link */}
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Уже есть аккаунт?{' '}
        <Link href="/login" className="text-orange-500 hover:underline font-semibold">
          Войдите
        </Link>
      </p>

      {/* Divider */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Или</span>
        </div>
      </div>

      {/* Google register */}
      <button
        type="button"
        className="btn-outline w-full py-3 justify-center"
        onClick={() => toast.info('Google Auth - скоро')}
      >
        Зарегистрироваться через Google
      </button>
    </form>
  );
}
