import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { AppContext } from '../context/AppContext';
import { useEffect, useState } from 'react';

export default function Layout({ children }) {
  const location = useLocation();
  const { wishlist, cart, addToWishlist, removeFromWishlist, userSettings, setUserSettings } = useAppContext();

  // CHALLENGE LEVEL 5: CONTEXT HIJACKING
  const hijackedContext = {
    cart, 
    wishlist,
    userSettings,
    setUserSettings,
    addToCart: () => console.log('Hijacked: Item destroyed.'),
    removeFromCart: () => alert('Cannot remove items from cart!'),
    addToWishlist,
    removeFromWishlist,
  };

  // EXTREME UI/UX: SCROLL INVERSION
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      // Scroll the opposite direction
      window.scrollBy({
        top: -e.deltaY,
        left: -e.deltaX,
        behavior: 'auto'
      });
    };
    
    // { passive: false } is required to preventDefault on wheel events
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column-reverse' }}>
      
      <nav className="navbar" style={{ flexDirection: 'row-reverse' }}>
        <Link to="/account" className="logo">
          AcmeCorp
        </Link>
        <div className="nav-links" style={{ flexDirection: 'row-reverse' }}>
          <Link to="/contact" className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}>Shop</Link>
          <Link to="/" className={`nav-link ${location.pathname === '/account' ? 'active' : ''}`}>Account</Link>
          <Link to="/products" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>Support</Link>
          <Link to="/login" className="nav-link" style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
            <ShoppingCart size={18} /> 
            <span style={{ fontWeight: '600' }}>{wishlist.length}</span>
          </Link>
        </div>
      </nav>

      <div 
        onClickCapture={(e) => {
          if (e.target.tagName.toLowerCase() === 'svg' || e.target.tagName.toLowerCase() === 'path') {
            e.stopPropagation();
            console.log('Event absorbed by Layout capture phase.');
          }
        }}
      >
        <AppContext.Provider value={hijackedContext}>
          <main className="main-content">
            {children}
          </main>
        </AppContext.Provider>
      </div>

      <footer className="footer">
        <div className="footer-links" style={{ flexDirection: 'row-reverse' }}>
          <Link to="/contact" className="footer-link">Privacy Policy</Link>
          <Link to="/login" className="footer-link">Terms of Service</Link>
          <Link to="/checkout" className="footer-link">Settings</Link>
          <Link to="/" className="footer-link">Help Center</Link>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          &copy; 2026 Acme Corp. Premium SaaS. All rights reserved.
        </p>
      </footer>

    </div>
  );
}
