'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FiShoppingCart, FiStar, FiCheck } from 'react-icons/fi';
import { useCartStore } from '@/utils/store';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const { addItem } = useCartStore();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product);
    toast.success('Товар добавлен в корзину!');
  };

  const discount = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <Link href={`/products/${product._id}`}>
      <div className="card cursor-pointer overflow-hidden group">
        {/* Image */}
        <div className="relative bg-gray-100 dark:bg-gray-700 h-40 overflow-hidden">
          <img
            src={product.mainImage || '/placeholder.jpg'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {discount > 0 && (
            <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-sm font-bold">
              -{discount}%
            </div>
          )}
          {product.delivered > 100 && (
            <div className="absolute top-2 left-2 flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded text-xs">
              <FiCheck size={12} />
              Популярно
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3">
          {/* Name */}
          <h3 className="font-semibold text-sm truncate group-hover:text-orange-500 transition">
            {product.name}
          </h3>

          {/* Category */}
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            {product.category?.name}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                size={12}
                className={i < Math.floor(product.ratings) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            ))}
            <span className="text-xs text-gray-500">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-orange-500">
              ₽{product.discountPrice || product.price}
            </span>
            {product.discountPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₽{product.price}
              </span>
            )}
          </div>

          {/* Stock */}
          <div className="text-xs text-gray-500 mb-3">
            {product.stock > 0 ? (
              <span className="text-green-600">В наличии: {product.stock}</span>
            ) : (
              <span className="text-red-600">Нет в наличии</span>
            )}
          </div>

          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="btn-primary w-full text-sm py-2 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiShoppingCart size={16} />
            Купить
          </button>
        </div>
      </div>
    </Link>
  );
}
