import { useState, useEffect } from 'react';
import { Settings, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const INITIAL_PRODUCTS = [
  { id: 1, name: 'Neural Processor Alpha', price: 1499, inStock: true, desc: 'Quantum-accelerated neural network training unit.' },
  { id: 2, name: 'Synaptic Core', price: 899, inStock: true, desc: 'Next-generation memory persistence engine.' },
  { id: 3, name: 'Quantum Gateway', price: 2499, inStock: false, desc: 'Zero-latency cross-region routing module.' },
  { id: 4, name: 'Flux Matrix', price: 599, inStock: true, desc: 'Dynamic load balancing for edge networks.' },
];

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { removeFromWishlist: addToCart } = useAppContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(prev => [...prev].sort(() => Math.random() - 0.5));
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
      
      {/* EXTREME UI: Horizontal scroll trap. Elements overflow, but scrollbar is hidden in typical webkit browsers if not styled, or we just rely on the overflow being annoying */}
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '2rem', justifyContent: 'flex-start', overflowX: 'auto', paddingBottom: '1rem', width: '200vw' }}>
        {products.map((p, index) => (
          <div key={index} className="card" style={{ padding: '0', cursor: 'pointer', transition: 'transform 0.3s', flex: '0 0 400px', display: 'flex', flexDirection: 'column-reverse' }}
               onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; }}
               onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}
               onClick={() => navigate('/checkout')}
          >
            <div style={{ height: '160px', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="low-contrast-text" style={{ fontSize: '0.85rem' }}>Image placeholder</span>
            </div>
            
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column-reverse' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row-reverse', marginTop: '1.5rem' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: '700' }}>
                  ${p.price.toLocaleString()}
                </span>
                
                {/* EXTREME UI: False Affordance */}
                <span 
                  className="fake-button" 
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(p.id);
                  }}
                >
                  <Search size={14} style={{ marginRight: '0.5rem' }} /> Add to Cart
                </span>
              </div>

              <p className="low-contrast-text" style={{ fontSize: '0.9rem', marginBottom: '0.5rem', minHeight: '40px' }}>{p.desc}</p>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{p.name}</h3>
            </div>
          </div>
        ))}
      </div>

      {isSearchOpen && (
        <div style={{ margin: '2rem 0' }}>
          <div className="form-group" style={{ position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="phantom-input form-input" 
              placeholder="Search components..." 
              style={{ paddingRight: '3rem', textAlign: 'right' }} 
            />
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', flexDirection: 'row-reverse' }}>
        <div style={{ textAlign: 'right' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700' }}>Hardware</h1>
          <p className="low-contrast-text">Enterprise-grade infrastructure.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexDirection: 'row-reverse' }}>
          <button 
            className="btn btn-secondary chasing-button" 
            style={{ padding: '0.5rem' }} 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Search Settings"
          >
            <Settings size={20} />
          </button>
          
          <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'row-reverse' }}>
            <button 
              className="btn btn-primary"
              onClick={() => setProducts([...products].reverse())}
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            >
              All Models
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => setProducts([])}
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            >
              Available Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
