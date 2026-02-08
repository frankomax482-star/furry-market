'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { useCartStore } from '../utils/store';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const { addItem } = useCartStore();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem({ ...product, quantity: 1 });
    toast.success('Товар добавлен в корзину!');
  };

  return (
    <Link href={`/products/${product._id}`}>
      <div className="card h-full overflow-hidden hover:shadow-lg transition group cursor-pointer">
        {/* Image */}
        <div className="relative h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <img
            src={product.mainImage || '/placeholder.jpg'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition"
          />
          
          {product.discountPrice && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
              {Math.round((1 - product.discountPrice / product.price) * 100)}%
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <h3 className="font-semibold line-clamp-2 text-sm">{product.name}</h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-xs ${i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              ({product.reviews || 0})
            </span>
          </div>

          {/* Price */}
          <div>
            <div className="flex gap-2 items-end">
              <span className="font-bold text-lg">₽{product.discountPrice || product.price}</span>
              {product.discountPrice && (
                <span className="text-xs text-gray-500 line-through">₽{product.price}</span>
              )}
            </div>
          </div>

          {/* Stock */}
          <div className="text-xs">
            {product.stock > 0 ? (
              <span className="text-green-600">✓ В наличии</span>
            ) : (
              <span className="text-red-600">✗ Нет в наличии</span>
            )}
          </div>

          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="btn-primary w-full py-2 text-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <FiShoppingCart size={14} />
            В корзину
          </button>
        </div>
      </div>
    </Link>
  );
}
