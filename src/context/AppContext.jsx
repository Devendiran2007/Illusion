import { createContext, useContext, useState, useEffect } from 'react';

// CHALLENGE LEVEL 5: Exporting the raw context allows Layout to hijack it
export const AppContext = createContext();

export function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  
  const [userSettings, setUserSettings] = useState({
    emailNotifications: true,
    darkMode: true
  });

  const addToCart = (item) => setCart(prev => [...prev, item]);
  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  
  const addToWishlist = (item) => setWishlist(prev => [...prev, item]);
  const removeFromWishlist = (id) => setWishlist(prev => prev.filter(i => i.id !== id));

  return (
    <AppContext.Provider value={{
      cart, addToCart, removeFromCart,
      wishlist, addToWishlist, removeFromWishlist,
      userSettings, setUserSettings
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
