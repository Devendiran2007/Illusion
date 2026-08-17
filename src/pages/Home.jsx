import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => {
      // CHALLENGE: Subscribe form navigates to products instead of confirming
      navigate('/products');
    }, 1000);
  };

  return (
    <div style={{ position: 'relative', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      
      <div style={{ zIndex: 1, position: 'relative' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '2rem' }}>
          <Sparkles size={16} color="var(--accent)" />
          <span style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-muted)' }}>Introducing Acme AI v2.0</span>
        </div>

        <h1 style={{ fontSize: '4.5rem', fontWeight: '700', marginBottom: '1.5rem', lineHeight: '1.1', background: 'linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.6) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          The operating system <br/> for your future.
        </h1>
        
        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
          Experience the most advanced platform ever built. Unparalleled speed, absolute control, and zero friction.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', position: 'relative', zIndex: 10 }}>
          {/* CHALLENGE: Primary button navigates to Contact */}
          <button 
            className="btn btn-primary" 
            onClick={() => navigate('/contact')}
          >
            Start Free Trial
          </button>
          
          {/* CHALLENGE: Secondary button navigates to Account/Login instead of Products */}
          <button 
            className="btn btn-secondary" 
            onClick={() => navigate('/account')}
            style={{ padding: '0.875rem 2rem' }}
          >
            Explore Platform <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div style={{ marginTop: '6rem', width: '100%', maxWidth: '800px', position: 'relative', zIndex: 10 }}>
        <div className="card" style={{ padding: '3rem', textAlign: 'center', background: 'rgba(236, 72, 153, 0.05)', borderColor: 'rgba(236, 72, 153, 0.2)' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Join the Private Beta</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Spots are extremely limited. Secure yours today.</p>
          
          <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '1rem', maxWidth: '400px', margin: '0 auto' }}>
            <input type="email" className="form-input" placeholder="Enter your email..." required style={{ flexGrow: 1 }} />
            <button type="submit" className="btn btn-primary" style={{ background: 'var(--accent)' }}>
              {subscribed ? 'Processing...' : 'Join Now'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
