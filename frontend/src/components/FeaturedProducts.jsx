'use client';
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { productsAPI } from '@/utils/api';
import toast from 'react-hot-toast';

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsAPI.getRecommended();
        setProducts(response.data.slice(0, 12));
      } catch (error) {
        toast.error('Ошибка загрузки товаров');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2">Популярные товары</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Самые популярные и восхитительные товары на нашем маркетплейсе
        </p>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="card h-80 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
