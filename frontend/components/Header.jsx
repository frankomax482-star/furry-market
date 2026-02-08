'use client';
import Link from 'next/link';
import { useThemeStore } from '../utils/store';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi';
import { useState } from 'react';

export default function Header() {
  const { isDark, toggleTheme } = useThemeStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🐾 FURRY
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/products" className="hover:text-blue-500 transition">
            Каталог
          </Link>
          <Link href="/products?category=apparel" className="hover:text-blue-500 transition">
            Одежда
          </Link>
          <Link href="/products?category=accessories" className="hover:text-blue-500 transition">
            Аксессуары
          </Link>
          <Link href="/products?category=art" className="hover:text-blue-500 transition">
            Арт
          </Link>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition">
            {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          <Link href="/cart" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition relative">
            <FiShoppingCart size={20} />
            <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              0
            </span>
          </Link>

          <Link href="/profile" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition">
            <FiUser size={20} />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
          >
            {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t dark:border-gray-800 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-3">
            <Link href="/products" className="block hover:text-blue-500 transition">
              Каталог
            </Link>
            <Link href="/cart" className="block hover:text-blue-500 transition">
              Корзина
            </Link>
            <Link href="/profile" className="block hover:text-blue-500 transition">
              Профиль
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
