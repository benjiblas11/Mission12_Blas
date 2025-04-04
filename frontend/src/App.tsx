import './App.css'
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';
import PricePage from './pages/PricePage';
import BooksPage from './pages/BooksPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/projects" element={<BooksPage />} />
            <Route
              path="/donate/:projectName/:projectId"
              element={<PricePage />}
            />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  ) 

}

export default App
