'use client';
import { useEffect, useState } from 'react';
import { productsAPI, categoriesAPI } from '../utils/api';
import ProductCard from '../components/ProductCard';
import { FiFilter, FiX } from 'react-icons/fi';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    rating: '',
    page: 1,
    limit: 20
  });
  const [showFilters, setShowFilters] = useState(false);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesAPI.getAll();
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await productsAPI.getAll(filters);
        setProducts(response.data.products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchProducts, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
      page: 1
    });
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      rating: '',
      page: 1,
      limit: 20
    });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Каталог товаров</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters - Desktop */}
          <div className="hidden lg:block card h-fit space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Фильтры</h2>
              <button onClick={handleResetFilters} className="text-sm text-blue-500 hover:underline">
                Сбросить
              </button>
            </div>

            {/* Search */}
            <div>
              <label className="block text-sm font-medium mb-2">Поиск</label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Найти товар..."
                className="input"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2">Категория</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="input"
              >
                <option value="">Все категории</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium mb-2">Цена</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  placeholder="От"
                  className="input w-1/2"
                />
                <input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  placeholder="До"
                  className="input w-1/2"
                />
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium mb-2">Минимальный рейтинг</label>
              <select
                value={filters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
                className="input"
              >
                <option value="">Любой</option>
                <option value="4">4★ и выше</option>
                <option value="3">3★ и выше</option>
                <option value="2">2★ и выше</option>
              </select>
            </div>
          </div>

          {/* Mobile Filters Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 mb-4 btn-outline"
          >
            <FiFilter />
            Фильтры
          </button>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden card space-y-4 mb-4">
              {/* Filters content */}
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Найти товар..."
                className="input"
              />
              <button onClick={() => setShowFilters(false)} className="btn-outline w-full">
                <FiX /> Закрыть
              </button>
            </div>
          )}

          {/* Products */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="card h-80 animate-pulse"></div>
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
                {products.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-600 dark:text-gray-400">Товары не найдены</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
