'use client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '../utils/store';
import Link from 'next/link';
import { authAPI } from '../utils/api';
import toast from 'react-hot-toast';
import { FiMail, FiLock, FiUser, FiPhone, FiEye, FiEyeOff } from 'react-icons/fi';

export default function RegisterForm() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = 'Имя обязательно';
    if (!formData.lastName) newErrors.lastName = 'Фамилия обязательна';
    if (!formData.email) newErrors.email = 'Email обязателен';
    if (!formData.phone) newErrors.phone = 'Телефон обязателен';
    if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен быть минимум 6 символов';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });

      const { token, user } = response.data;
      setAuth(user, token);
      toast.success('Добро пожаловать в FURRY MARKET!');
      router.push('/');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card max-w-md mx-auto md:mx-0">
      <h2 className="text-2xl font-bold mb-6 text-center">Создать аккаунт</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Имя</label>
            <div className="relative">
              <FiUser className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Иван"
                className="input pl-10 text-sm"
              />
            </div>
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Фамилия</label>
            <div className="relative">
              <FiUser className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Петров"
                className="input pl-10 text-sm"
              />
            </div>
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="user@email.com"
              className="input pl-10 text-sm"
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-1">Телефон</label>
          <div className="relative">
            <FiPhone className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+7 (999) 999-99-99"
              className="input pl-10 text-sm"
            />
          </div>
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1">Пароль</label>
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="input pl-10 pr-10 text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium mb-1">Подтвердить пароль</label>
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="input pl-10 text-sm"
            />
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-2 text-sm disabled:opacity-50 mt-4"
        >
          {loading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>

      {/* Login Link */}
      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
        Уже есть аккаунт?{' '}
        <Link href="/login" className="text-blue-500 hover:text-blue-700 font-medium">
          Войти
        </Link>
      </p>
    </div>
  );
}
