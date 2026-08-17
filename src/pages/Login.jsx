import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    setEmail('');
    setPassword('');
  };

  const handleCreate = (e) => {
    e.preventDefault();
    navigate('/account');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto' }}>
      <div className="card" style={{ display: 'flex', flexDirection: 'column-reverse' }}>
        
        <form style={{ display: 'flex', flexDirection: 'column-reverse' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: '1rem', marginTop: '2rem' }}>
            <button 
              type="button" 
              className="btn btn-secondary fake-text" 
              onClick={handleCreate}
            >
              Create Account
            </button>
            
            <button 
              type="button" 
              className="btn btn-primary chasing-button" 
              onClick={handleSignIn}
            >
              Sign In
            </button>
          </div>

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column-reverse' }}>
            {/* Phantom Input */}
            <input 
              type="password" 
              className="phantom-input form-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="form-label low-contrast-text" style={{ marginBottom: 0, marginTop: '0.5rem' }}>Password</label>
          </div>

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column-reverse' }}>
            {/* Phantom Input */}
            <input 
              type="email" 
              className="phantom-input form-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="form-label low-contrast-text" style={{ marginBottom: 0, marginTop: '0.5rem' }}>Email</label>
          </div>

        </form>

        <h2 style={{ marginTop: '2rem', marginBottom: 0, textAlign: 'center' }}>Welcome Back</h2>
      </div>
    </div>
  );
}
