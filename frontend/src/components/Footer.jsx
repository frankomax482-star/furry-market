'use client';
import Link from 'next/link';
import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">FURRY MARKET</h3>
            <p className="text-gray-400">
              Лучший маркетплей для фурри-товаров и аксессуаров. Качество, надежность и удобство.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Компания</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-white transition">О нас</Link></li>
              <li><Link href="/contacts" className="hover:text-white transition">Контакты</Link></li>
              <li><Link href="/careers" className="hover:text-white transition">Карьера</Link></li>
              <li><Link href="/blog" className="hover:text-white transition">Блог</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Поддержка</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/help" className="hover:text-white transition">Справка</Link></li>
              <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
              <li><Link href="/returns" className="hover:text-white transition">Возвраты</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition">Доставка</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Следите за нами</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FiInstagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex justify-between items-center text-gray-400">
          <p>&copy; 2024 FURRY MARKET. Все права защищены.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition">Приватность</Link>
            <Link href="/terms" className="hover:text-white transition">Условия</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
