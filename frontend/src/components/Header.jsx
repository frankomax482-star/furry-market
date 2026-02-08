'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX, FiSearch, FiShoppingCart, FiUser, FiMoon, FiSun } from 'react-icons/fi';
import { useThemeStore, useCartStore, useAuthStore } from '@/utils/store';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useThemeStore();
  const { items } = useCartStore();
  const { user, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-orange-500">
            🦊 FURRY MARKET
          </Link>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex flex-1 mx-8">
            <div className="relative w-full">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск товаров..."
                className="input pl-10 w-full"
              />
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
            >
              {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
            </button>

            {/* Basket */}
            <Link href="/cart" className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition">
              <FiShoppingCart size={20} />
              {items.length > 0 && (
                <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>

            {/* Account */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link href="/profile" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                  <FiUser size={20} />
                </Link>
                <button
                  onClick={logout}
                  className="btn-outline text-sm px-3 py-1"
                >
                  Выход
                </button>
              </div>
            ) : (
              <div className="hidden md:flex gap-2">
                <Link href="/login" className="btn-outline text-sm px-3 py-1">
                  Вход
                </Link>
                <Link href="/register" className="btn-primary text-sm px-3 py-1">
                  Регистрация
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Поиск..."
                className="input w-full"
              />
              {!user && (
                <>
                  <Link href="/login" className="btn-outline w-full text-center">
                    Вход
                  </Link>
                  <Link href="/register" className="btn-primary w-full text-center">
                    Регистрация
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
