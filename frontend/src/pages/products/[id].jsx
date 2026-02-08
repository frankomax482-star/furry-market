'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { productsAPI } from '@/utils/api';
import { useCartStore } from '@/utils/store';
import { FiShoppingCart, FiStar, FiChevronDown } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tabs, setTabs] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productsAPI.getById(params.id);
        setProduct(response.data);
      } catch (error) {
        toast.error('Ошибка загрузки товара');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  if (loading) {
    return <div className="min-h-screen py-12"><div className="max-w-7xl mx-auto px-4 animate-pulse">Загрузка...</div></div>;
  }

  if (!product) {
    return <div className="min-h-screen py-12"><div className="max-w-7xl mx-auto px-4">Товар не найден</div></div>;
  }

  const discount = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast.success(`${quantity} товар(ов) добавлено в корзину!`);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden h-96">
              <img
                src={product.mainImage || '/placeholder.jpg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, idx) => (
                  <div key={idx} className="bg-gray-100 dark:bg-gray-800 rounded overflow-hidden cursor-pointer">
                    <img src={img.url} alt={img.altText} className="w-full h-20 object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {product.category?.name} / {product.name}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    size={20}
                    className={i < Math.floor(product.ratings) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-400">
                {product.ratings.toFixed(1)} ({product.reviewCount} отзывов)
              </span>
              <span className="text-green-600 flex items-center gap-1">
                {product.delivered} продано
              </span>
            </div>

            {/* Price */}
            <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-orange-500">
                  ₽{product.discountPrice || product.price}
                </span>
                {product.discountPrice && (
                  <>
                    <span className="text-2xl text-gray-500 line-through">₽{product.price}</span>
                    <span className="badge-success">-{discount}%</span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Экономия: ₽{Math.round(product.price - (product.discountPrice || product.price))}
              </p>
            </div>

            {/* Stock */}
            <div className="p-4 border border-gray-300 dark:border-gray-600 rounded">
              {product.stock > 0 ? (
                <div>
                  <p className="text-green-600 font-semibold">✓ В наличии</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {product.stock} шт. доступно
                  </p>
                </div>
              ) : (
                <p className="text-red-600 font-semibold">✗ Нет в наличии</p>
              )}
            </div>

            {/* Quantity & Add to cart */}
            <div className="flex gap-4">
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  −
                </button>
                <span className="px-6 py-2 border-l border-r border-gray-300 dark:border-gray-600">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="btn-primary flex-1 py-3 text-lg gap-2 disabled:opacity-50"
              >
                <FiShoppingCart /> Добавить в корзину
              </button>
            </div>

            {/* Seller */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Продавец</p>
              <p className="font-semibold">
                {product.seller?.firstName} {product.seller?.lastName}
              </p>
            </div>

            {/* Features */}
            <div className="border-t dark:border-gray-700 pt-4 space-y-2">
              <div className="flex items-center gap-3">
                <div className="text-2xl">🚚</div>
                <div>
                  <p className="font-semibold">Бесплатная доставка</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">При заказе от 500₽</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-2xl">✓</div>
                <div>
                  <p className="font-semibold">Гарантия возврата</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">30 дней без вопросов</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b dark:border-gray-700 mb-8">
          <div className="flex gap-8">
            <button
              onClick={() => setTabs('description')}
              className={`py-4 font-medium border-b-2 transition ${
                tabs === 'description'
                  ? 'border-orange-500 text-orange-500'
                  : 'border-transparent text-gray-600 dark:text-gray-400'
              }`}
            >
              Описание
            </button>
            <button
              onClick={() => setTabs('reviews')}
              className={`py-4 font-medium border-b-2 transition ${
                tabs === 'reviews'
                  ? 'border-orange-500 text-orange-500'
                  : 'border-transparent text-gray-600 dark:text-gray-400'
              }`}
            >
              Отзывы ({product.reviewCount})
            </button>
            <button
              onClick={() => setTabs('specs')}
              className={`py-4 font-medium border-b-2 transition ${
                tabs === 'specs'
                  ? 'border-orange-500 text-orange-500'
                  : 'border-transparent text-gray-600 dark:text-gray-400'
              }`}
            >
              Характеристики
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="card">
          {tabs === 'description' && (
            <div className="prose dark:prose-invert max-w-none">
              <p>{product.description}</p>
            </div>
          )}
          {tabs === 'reviews' && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">Отзывы будут загружены здесь</p>
            </div>
          )}
          {tabs === 'specs' && (
            <div className="space-y-4">
              {product.attributes?.material && (
                <div className="flex gap-4">
                  <span className="font-semibold min-w-32">Материал:</span>
                  <span>{product.attributes.material}</span>
                </div>
              )}
              {product.attributes?.size && (
                <div className="flex gap-4">
                  <span className="font-semibold min-w-32">Размеры:</span>
                  <span>{product.attributes.size.join(', ')}</span>
                </div>
              )}
              {product.attributes?.color && (
                <div className="flex gap-4">
                  <span className="font-semibold min-w-32">Цвета:</span>
                  <span>{product.attributes.color.join(', ')}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
