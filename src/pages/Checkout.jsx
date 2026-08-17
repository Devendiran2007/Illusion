import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cart } = useAppContext();
  const [zip, setZip] = useState('');
  const [shipping, setShipping] = useState(0);
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);

  const handlePay = () => {
    navigate('/account');
  };

  return (
    <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
      <div style={{ flex: '1 1 600px' }}>
        <h1 style={{ marginBottom: '2rem' }}>Checkout</h1>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Shipping Address</h2>
          <div className="form-group">
            <label className="form-label low-contrast-text">Address Line 1</label>
            <input type="text" className="phantom-input form-input" />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label low-contrast-text">City</label>
              <input type="text" className="phantom-input form-input" />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label low-contrast-text">ZIP Code</label>
              <input 
                type="text" 
                className="phantom-input form-input" 
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="card">
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Shipping Method</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* EXTREME UI: Label behaves normally, but input is fake or weird */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer' }}>
              <input type="radio" name="ship" onChange={() => setShipping(0)} />
              <div style={{ flexGrow: 1 }} className="low-contrast-text">Standard Shipping</div>
              <div className="low-contrast-text">Free</div>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer' }}>
              <input type="radio" name="ship" onChange={() => setShipping(25)} />
              <div style={{ flexGrow: 1 }} className="low-contrast-text">Expedited (2-Day)</div>
              <div className="low-contrast-text">$25.00</div>
            </label>
          </div>
        </div>
      </div>

      <div style={{ flex: '1 1 400px' }}>
        <div className="card" style={{ position: 'sticky', top: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Order Summary</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            {cart.length === 0 ? (
              <p className="low-contrast-text">Cart is empty.</p>
            ) : (
              cart.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: '500' }}>{item.name}</div>
                    <div className="low-contrast-text" style={{ fontSize: '0.85rem' }}>Qty: 1</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span>${item.price}</span>
                    <button 
                      style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}
                      className="chasing-button"
                      onClick={() => navigate('/contact')} 
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span className="low-contrast-text">Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span className="low-contrast-text">Shipping</span>
              <span>${shipping}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '1.25rem' }}>
              <span>Total</span>
              <span>${subtotal + shipping}</span>
            </div>
          </div>

          <button 
            className="btn btn-primary chasing-button" 
            style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
            onClick={handlePay}
          >
            Complete Purchase
          </button>
        </div>
      </div>
    </div>
  );
}
