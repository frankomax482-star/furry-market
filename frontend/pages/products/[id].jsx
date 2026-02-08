'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { productsAPI } from '../../utils/api';
import { useCartStore } from '../../utils/store';
import toast from 'react-hot-toast';
import { FiHeart, FiMessageCircle } from 'react-icons/fi';

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await productsAPI.getById(id);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
        toast.error('Товар не найден');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem({ ...product, quantity });
      toast.success('Товар добавлен в корзину');
      setQuantity(1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-gray-600 dark:text-gray-400">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-gray-600 dark:text-gray-400">Товар не найден</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div>
            <div className="sticky top-24">
              <img
                src={product.mainImage || '/placeholder.jpg'}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="grid grid-cols-4 gap-2 mt-4">
                {product.images?.map((img, i) => (
                  <img key={i} src={img} alt="" className="h-20 object-cover rounded cursor-pointer opacity-60 hover:opacity-100" />
                ))}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-gray-600 dark:text-gray-400">{product.description}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {product.rating?.toFixed(1) || '0'}/5 ({product.reviews || 0} отзывов)
              </span>
            </div>

            {/* Price */}
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Цена</div>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold">₽{product.discountPrice || product.price}</span>
                {product.discountPrice && (
                  <span className="text-lg text-gray-500 line-through">₽{product.price}</span>
                )}
              </div>
              {product.stock > 0 ? (
                <p className="text-green-600 mt-2">✓ В наличии ({product.stock} шт.)</p>
              ) : (
                <p className="text-red-600 mt-2">✗ Нет в наличии</p>
              )}
            </div>

            {/* Add to cart */}
            <div className="space-y-3">
              <div className="flex gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="btn-outline px-4 py-2"
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="input flex-1 text-center"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="btn-outline px-4 py-2"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="btn-primary w-full py-3 disabled:opacity-50"
              >
                Добавить в корзину
              </button>
            </div>

            {/* Features */}
            <div className="border-t dark:border-gray-700 pt-6">
              <h3 className="font-bold mb-3">Характеристики</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Категория</span>
                  <span className="font-medium">{product.category?.name || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Производитель</span>
                  <span className="font-medium">{product.manufacturer || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Артикул</span>
                  <span className="font-medium">{product.sku || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
