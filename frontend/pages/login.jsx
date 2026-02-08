import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">Добро пожаловать обратно! 👋</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
              Войдите в свой аккаунт, чтобы продолжить покупки в FURRY MARKET
            </p>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="text-2xl">✓</div>
                <div>
                  <h3 className="font-semibold">Безопасная аутентификация</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Защита ваших данных - наш приоритет
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="text-2xl">✓</div>
                <div>
                  <h3 className="font-semibold">История заказов</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Отслеживайте все ваши покупки
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="text-2xl">✓</div>
                <div>
                  <h3 className="font-semibold">Личные предложения</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Специальные скидки для вас
                  </p>
                </div>
              </div>
            </div>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
