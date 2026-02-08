'use client';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">🐾 FURRY MARKET</h3>
            <p className="text-gray-400">
              Лучший маркетплей фурри-товаров и аксессуаров в России
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4">Информация</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/products" className="hover:text-white transition">Каталог</Link></li>
              <li><Link href="/about" className="hover:text-white transition">О нас</Link></li>
              <li><Link href="/blog" className="hover:text-white transition">Блог</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4">Помощь</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
              <li><Link href="/support" className="hover:text-white transition">Поддержка</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Контакты</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Контакты</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📧 support@furrymarket.ru</li>
              <li>📱 +7 (999) 999-99-99</li>
              <li>📍 Москва, Россия</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; {currentYear} FURRY MARKET. Все права защищены.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition">Политика конфиденциальности</Link>
            <Link href="/terms" className="hover:text-white transition">Условия использования</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
