'use client';
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  loading: false,
  
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setLoading: (loading) => set({ loading }),
  
  logout: () => set({ user: null, token: null }),
  
  isAuthenticated: () => {
    const { token } = useAuthStore.getState();
    return !!token;
  },
}));

export const useCartStore = create((set, get) => ({
  items: [],
  
  addItem: (product) => {
    const { items } = get();
    const existingItem = items.find(item => item._id === product._id);
    
    if (existingItem) {
      set({
        items: items.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      });
    } else {
      set({ items: [...items, { ...product, quantity: 1 }] });
    }
  },
  
  removeItem: (productId) => {
    set(state => ({
      items: state.items.filter(item => item._id !== productId)
    }));
  },
  
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
    } else {
      set(state => ({
        items: state.items.map(item =>
          item._id === productId ? { ...item, quantity } : item
        )
      }));
    }
  },
  
  clearCart: () => set({ items: [] }),
  
  getTotalPrice: () => {
    const { items } = get();
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },
}));

export const useThemeStore = create((set) => ({
  theme: 'light',
  
  setTheme: (theme) => set({ theme }),
  toggleTheme: () => set(state => ({
    theme: state.theme === 'light' ? 'dark' : 'light'
  })),
}));
