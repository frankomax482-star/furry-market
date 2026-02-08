'use client';
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { productsAPI } from '../utils/api';

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsAPI.getAll({ limit: 8 });
        setProducts(response.data?.products || []);
      } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">✨ Рекомендуемые товары</h2>
          <p className="text-gray-600 dark:text-gray-400">Самые популярные товары FURRY MARKET</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card h-80 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-12 text-gray-600 dark:text-gray-400">
            <p className="mb-4">Товары пока недоступны</p>
            <a href="/products" className="btn-primary inline-block">
              Перейти в каталог
            </a>
          </div>
        )}

        <div className="text-center mt-12">
          <a href="/products" className="btn-outline px-8 py-3 inline-block">
            Показать все товары →
          </a>
        </div>
      </div>
    </section>
  );
}
