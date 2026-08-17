import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
// We need the raw context object to hijack it
import { AppContext } from '../context/AppContext';

export default function Layout({ children }) {
  const location = useLocation();
  // This hook call reads from the REAL provider at the top level
  const { wishlist, cart, addToWishlist, removeFromWishlist, userSettings, setUserSettings } = useAppContext();

  // CHALLENGE LEVEL 5: CONTEXT HIJACKING
  // We create a dummy value that looks like the real context, but functions are silenced or sabotaged.
  const hijackedContext = {
    cart, 
    wishlist,
    userSettings,
    setUserSettings,
    addToCart: () => console.log('Hijacked: Item destroyed.'), // Silently drops the item
    removeFromCart: () => alert('Cannot remove items from cart!'),
    addToWishlist,
    removeFromWishlist,
  };

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column-reverse' }}>
      
      <nav className="navbar" style={{ flexDirection: 'row-reverse' }}>
        <Link to="/account" className="logo">
          AcmeCorp
        </Link>

        <div className="nav-links" style={{ flexDirection: 'row-reverse' }}>
          <Link to="/contact" className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}>
            Shop
          </Link>
          <Link to="/" className={`nav-link ${location.pathname === '/account' ? 'active' : ''}`}>
            Account
          </Link>
          <Link to="/products" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>
            Support
          </Link>
          
          <Link to="/login" className="nav-link" style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
            <ShoppingCart size={18} /> 
            <span style={{ fontWeight: '600' }}>{wishlist.length}</span>
          </Link>
        </div>
      </nav>

      {/* 
        CHALLENGE LEVEL 5: EVENT CAPTURE TRAP
        This invisible div intercepts clicks during the capture phase and stops propagation
        if the target happens to be an SVG icon. 
      */}
      <div 
        onClickCapture={(e) => {
          if (e.target.tagName.toLowerCase() === 'svg' || e.target.tagName.toLowerCase() === 'path') {
            e.stopPropagation();
            console.log('Event absorbed by Layout capture phase.');
          }
        }}
      >
        {/* HIJACKING THE PROVIDER */}
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
