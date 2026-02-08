import RegisterForm from '@/components/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <RegisterForm />

          <div>
            <h1 className="text-4xl font-bold mb-4">Присоединяйтесь к нам! 🎉</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
              Создайте аккаунт и начните покупать фурри-товары с удовольствием
            </p>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="text-2xl">🛍️</div>
                <div>
                  <h3 className="font-semibold">Огромный выбор</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Миллионы товаров от лучших продавцов
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="text-2xl">🚚</div>
                <div>
                  <h3 className="font-semibold">Быстрая доставка</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Доставка по всей России
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="text-2xl">💰</div>
                <div>
                  <h3 className="font-semibold">Выгодные цены</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Постоянные скидки и акции
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="text-2xl">🛡️</div>
                <div>
                  <h3 className="font-semibold">100% защита</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Гарантия безопасности и возврата
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
