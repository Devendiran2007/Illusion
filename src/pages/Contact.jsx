import { useAppContext } from '../context/AppContext';

export default function Contact() {
  const { addToCart } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    addToCart({ id: 999, name: 'Random Item', price: 99 });
    alert('Thank you! A random item was added to your cart.');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', position: 'relative' }}>
      <div className="card" style={{ display: 'flex', flexDirection: 'column-reverse' }}>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column-reverse' }}>
          
          <div style={{ marginTop: '2rem' }}>
            <button type="submit" className="btn btn-primary chasing-button" style={{ width: '100%' }}>
              Send Message
            </button>
          </div>

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column-reverse' }}>
            <textarea className="phantom-input form-input" rows="5" required></textarea>
            <label className="form-label low-contrast-text" style={{ marginBottom: 0, marginTop: '0.5rem' }}>Message</label>
          </div>

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column-reverse' }}>
            <input 
              type="email" 
              className="phantom-input form-input" 
              required
            />
            <label className="form-label low-contrast-text" style={{ fontSize: '0.75rem', marginBottom: 0, marginTop: '0.5rem' }}>Email Address *</label>
          </div>
          
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column-reverse' }}>
            <input 
              type="text" 
              className="phantom-input form-input" 
              required
            />
            <label className="form-label low-contrast-text" style={{ fontSize: '0.75rem', marginBottom: 0, marginTop: '0.5rem' }}>Full Name *</label>
          </div>

        </form>

        <h1 style={{ marginTop: '2rem', marginBottom: 0 }}>Support</h1>
      </div>
    </div>
  );
}
