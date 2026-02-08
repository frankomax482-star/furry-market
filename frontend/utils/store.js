import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Auth Store
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      
      setAuth: (user, token) => {
        localStorage.setItem('token', token);
        set({ user, token });
      },
      
      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null });
      },
      
      updateUser: (user) => set({ user })
    }),
    {
      name: 'auth-storage'
    }
  )
);

// Cart Store
export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => {
        const { items } = get();
        const existingItem = items.find(item => item._id === product._id);
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                : item
            )
          });
        } else {
          set({ items: [...items, product] });
        }
      },
      
      removeItem: (productId) => {
        set({ items: get().items.filter(item => item._id !== productId) });
      },
      
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
        } else {
          set({
            items: get().items.map(item =>
              item._id === productId ? { ...item, quantity } : item
            )
          });
        }
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = item.discountPrice || item.price;
          return total + (price * (item.quantity || 1));
        }, 0);
      }
    }),
    {
      name: 'cart-storage'
    }
  )
);

// Theme Store
export const useThemeStore = create(
  persist(
    (set) => ({
      isDark: false,
      
      toggleTheme: () => {
        set((state) => ({
          isDark: !state.isDark
        }));
        
        // Update HTML element
        if (typeof document !== 'undefined') {
          const isDark = !document.documentElement.classList.contains('dark');
          if (isDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      },
      
      setTheme: (isDark) => {
        set({ isDark });
        if (typeof document !== 'undefined') {
          if (isDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      }
    }),
    {
      name: 'theme-storage'
    }
  )
);

// Filters Store
export const useFiltersStore = create((set) => ({
  filters: {
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    rating: '',
    page: 1,
    limit: 20
  },
  
  setFilters: (newFilters) => {
    set({ filters: newFilters });
  },
  
  updateFilter: (key, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
        page: 1
      }
    }));
  },
  
  resetFilters: () => {
    set({
      filters: {
        search: '',
        category: '',
        minPrice: '',
        maxPrice: '',
        rating: '',
        page: 1,
        limit: 20
      }
    });
  }
}));

// Notifications Store
export const useNotificationsStore = create((set) => ({
  notifications: [],
  
  addNotification: (notification) => {
    const id = Math.random().toString(36).substr(2, 9);
    set((state) => ({
      notifications: [...state.notifications, { ...notification, id }]
    }));
    
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      }));
    }, 3000);
  }
}));
