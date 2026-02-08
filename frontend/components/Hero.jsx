'use client';
export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">🐾 Добро пожаловать в FURRY MARKET</h1>
        <p className="text-xl mb-8 text-blue-100">Лучший маркетплей фурри-товаров и аксессуаров</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg">
            <div className="text-4xl mb-3">🛍️</div>
            <h3 className="font-bold text-lg mb-2">Огромный выбор</h3>
            <p className="text-sm text-blue-100">Миллионы товаров от лучших продавцов</p>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg">
            <div className="text-4xl mb-3">🚚</div>
            <h3 className="font-bold text-lg mb-2">Быстрая доставка</h3>
            <p className="text-sm text-blue-100">Доставка по всей России за 1-3 дня</p>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg">
            <div className="text-4xl mb-3">💰</div>
            <h3 className="font-bold text-lg mb-2">Выгодные цены</h3>
            <p className="text-sm text-blue-100">Постоянные скидки и специальные предложения</p>
          </div>
        </div>

        <a href="/products" className="mt-8 inline-block bg-white text-blue-600 font-bold px-8 py-3 rounded-lg hover:bg-blue-50 transition">
          Начать покупки →
        </a>
      </div>
    </div>
  );
}
