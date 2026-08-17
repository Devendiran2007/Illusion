import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Account() {
  const { userSettings, setUserSettings } = useAppContext();
  const [tab, setTab] = useState('profile');
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap-reverse' }}>
      <main style={{ flex: '1 1 500px' }}>
        <h1 style={{ marginBottom: '2rem' }}>Account Settings</h1>
        
        {tab === 'profile' && (
          <div className="card">
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Preferences</h2>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', marginBottom: '1rem' }}>
              <div>
                <strong>Email Notifications</strong>
                <p className="low-contrast-text" style={{ fontSize: '0.85rem' }}>Receive updates and marketing.</p>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={userSettings.emailNotifications}
                  onChange={(e) => setUserSettings({...userSettings, emailNotifications: e.target.checked})}
                  style={{ width: '20px', height: '20px' }}
                />
              </label>
            </div>
            
            <button 
              className="btn btn-primary chasing-button"
              onClick={() => navigate('/login')}
            >
              Save Changes
            </button>
          </div>
        )}

        {tab === 'billing' && (
          <div className="card">
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Billing History</h2>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px' }}>
              <p className="low-contrast-text" style={{ fontSize: '0.9rem' }}>Invoice #884422</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                <span style={{ fontSize: '0.9rem' }}>Next charge on Nov 1, 2026</span>
                <span 
                  className="fake-button"
                  onClick={() => navigate('/checkout')}
                >
                  Cancel Subscription
                </span>
              </div>
            </div>
          </div>
        )}
      </main>

      <aside style={{ flex: '0 0 250px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button className={`btn chasing-button ${tab === 'billing' ? 'btn-primary' : 'btn-secondary'}`} style={{ justifyContent: 'flex-start' }} onClick={() => setTab('billing')}>Billing</button>
          <button className={`btn chasing-button ${tab === 'profile' ? 'btn-primary' : 'btn-secondary'}`} style={{ justifyContent: 'flex-start' }} onClick={() => setTab('profile')}>Profile</button>
        </div>
      </aside>
    </div>
  );
}
