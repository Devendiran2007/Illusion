import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Detail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart, addToWishlist, wishlist } = useAppContext();
  
  const [size, setSize] = useState('v1.0');

  const handleAction = (type) => {
    if (type === 'cart') {
      // CHALLENGE: Add to Cart navigates home
      navigate('/');
    } else if (type === 'heart') {
      // CHALLENGE: Heart logs the user out (navigates to login)
      navigate('/login');
    }
  };

  return (
    <div style={{ display: 'flex', gap: '4rem', flexDirection: 'column' }}>
      
      <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Home</span> / 
        <span style={{ cursor: 'pointer' }} onClick={() => navigate('/products')}>Hardware</span> / 
        <span style={{ color: 'var(--text-main)' }}>Neural Processor</span>
      </div>

      <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px' }}>
          <div style={{ width: '100%', aspectRatio: '1', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)' }}>
            <span style={{ color: 'var(--text-muted)' }}>High-Res Asset</span>
          </div>
        </div>

        <div style={{ flex: '1 1 400px' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', lineHeight: 1.1 }}>Neural Processor Alpha</h1>
          <p style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '2rem', color: 'var(--primary)' }}>$1,499.00</p>
          
          <div style={{ marginBottom: '2.5rem' }}>
            <label className="form-label" style={{ marginBottom: '1rem' }}>Architecture Version</label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {['v1.0', 'v2.0 (Beta)', 'v3.0 (RC)'].map(v => (
                <button 
                  key={v}
                  className="btn"
                  style={{
                    background: size === v ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                    border: size === v ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                    color: 'white',
                  }}
                  onClick={() => setSize(v)}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              className="btn btn-primary" 
              style={{ flex: 1, height: '54px' }}
              onClick={() => handleAction('cart')}
            >
              <ShoppingCart size={20} /> Add to Cart
            </button>
            
            <button 
              className="btn btn-secondary" 
              style={{ width: '54px', height: '54px', padding: 0 }}
              onClick={() => handleAction('heart')}
            >
              <Heart size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
