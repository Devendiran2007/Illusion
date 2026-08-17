import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useEffect } from 'react';

export default function Layout({ children }) {
  const location = useLocation();
  const { wishlist } = useAppContext();

  // EXTREME UI/UX: SCROLL INVERSION (Kept for UX challenge)
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      window.scrollBy({
        top: -e.deltaY,
        left: -e.deltaX,
        behavior: 'auto'
      });
    };
    
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
          {/* Button actions are still scrambled */}
          <Link to="/contact" className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}>Shop</Link>
          <Link to="/" className={`nav-link ${location.pathname === '/account' ? 'active' : ''}`}>Account</Link>
          <Link to="/products" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>Support</Link>
          <Link to="/login" className="nav-link" style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
            <ShoppingCart size={18} /> 
            <span style={{ fontWeight: '600' }}>{wishlist.length}</span>
          </Link>
        </div>
      </nav>

      {/* Removed the onClickCapture Event Trap and Hijacked Provider */}
      <main className="main-content">
        {children}
      </main>

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
