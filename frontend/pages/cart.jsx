'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useCartStore } from '../utils/store';
import Link from 'next/link';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import { ordersAPI } from '../utils/api';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const totalPrice = getTotalPrice();
  const finalPrice = totalPrice - discount;

  const handleApplyPromo = async () => {
    if (!promoCode) return;
    setLoading(true);
    try {
      const response = await ordersAPI.validatePromo({
        code: promoCode,
        amount: totalPrice
      });
      setDiscount(response.data.discount);
    } catch (error) {
      alert(error.response?.data?.error || 'Промокод не найден');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Корзина пуста</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Добавьте товары и вернитесь сюда
          </p>
          <Link href="/products" className="btn-primary">
            Перейти к товарам
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Корзина покупок</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2">
            <div className="card space-y-6">
              {items.map((item) => (
                <div key={item._id} className="flex gap-4 pb-6 border-b dark:border-gray-700 last:border-b-0 last:pb-0">
                  <img
                    src={item.mainImage || '/placeholder.jpg'}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ₽{item.discountPrice || item.price}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    >
                      <FiMinus size={16} />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    >
                      <FiPlus size={16} />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      ₽{(item.discountPrice || item.price) * item.quantity}
                    </p>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-red-500 hover:text-red-700 mt-2"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="card h-fit space-y-4">
            <h2 className="text-xl font-bold">Сумма</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Товары ({items.length})</span>
                <span>₽{totalPrice.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Скидка</span>
                  <span>-₽{discount.toFixed(2)}</span>
                </div>
              )}
            </div>

            <div className="border-t dark:border-gray-700 pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Итого</span>
                <span>₽{finalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Promo code */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Промокод</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  placeholder="EXAMPLE2024"
                  className="input text-sm"
                />
                <button
                  onClick={handleApplyPromo}
                  disabled={loading}
                  className="btn-outline px-3 py-2 text-sm disabled:opacity-50"
                >
                  OK
                </button>
              </div>
            </div>

            {/* Checkout */}
            <button
              onClick={() => router.push('/checkout')}
              className="btn-primary w-full py-3 justify-center"
            >
              Оформить заказ
            </button>

            <Link href="/products" className="btn-outline w-full text-center py-3">
              Продолжить покупки
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
