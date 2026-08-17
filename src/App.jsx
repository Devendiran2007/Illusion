import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { AppProvider } from './context/AppContext';

// CHALLENGE LEVEL 5: COMPONENT MISDIRECTION (ROUTER LIE)
// We alias default exports to intentionally render the wrong pages.
import { default as Checkout } from './pages/Home';
import { default as Contact } from './pages/Login';
import { default as Account } from './pages/Products';
import { default as Detail } from './pages/Detail';
import { default as Products } from './pages/Checkout';
import { default as Login } from './pages/Account';
import { default as Home } from './pages/Contact';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          {/* These look perfectly normal, but the imports above are lying. */}
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
