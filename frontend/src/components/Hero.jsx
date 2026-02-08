'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-orange-500 to-orange-400 dark:from-orange-900 dark:to-orange-800 py-16 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              🦊 Добро пожаловать в FURRY MARKET
            </h1>
            <p className="text-lg text-orange-50">
              Лучший маркетплей для всех фурри-товаров, аксессуаров и сувениров. Качество, надежность и огромный выбор!
            </p>
            <div className="flex gap-4">
              <Link href="/products" className="btn bg-white text-orange-600 hover:bg-gray-100">
                Смотреть товары
                <FiArrowRight />
              </Link>
              <Link href="/about" className="btn-outline border-white text-white hover:bg-white hover:bg-opacity-10">
                Узнать больше
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="hidden md:flex justify-center">
            <div className="text-9xl animate-bounce">🦊</div>
          </div>
        </div>
      </div>
    </section>
  );
}
