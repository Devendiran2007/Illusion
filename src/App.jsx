import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { AppProvider } from './context/AppContext';

// Restored correct routing (removed the Level 5 component aliases)
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/Products';
import Detail from './pages/Detail';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import Contact from './pages/Contact';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Login />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<Detail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account" element={<Account />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;
