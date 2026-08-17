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
        
        {/* Form is at the top of the DOM, but visually below the header */}
        <form style={{ display: 'flex', flexDirection: 'column-reverse' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: '1rem', marginTop: '2rem' }}>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={handleCreate}
            >
              Create Account
            </button>
            
            <button 
              type="button" 
              className="btn btn-primary" 
              onClick={handleSignIn}
            >
              Sign In
            </button>
          </div>

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column-reverse' }}>
            {/* Input at the top of DOM, label below */}
            <input 
              type="password" 
              className="form-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="form-label" style={{ marginBottom: 0, marginTop: '0.5rem' }}>Password</label>
          </div>

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column-reverse' }}>
            {/* Input at the top of DOM, label below */}
            <input 
              type="email" 
              className="form-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="form-label" style={{ marginBottom: 0, marginTop: '0.5rem' }}>Email</label>
          </div>

        </form>

        <h2 style={{ marginTop: '2rem', marginBottom: 0, textAlign: 'center' }}>Welcome Back</h2>
      </div>
    </div>
  );
}
