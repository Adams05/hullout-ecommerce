import './App.css';
import { useState, useEffect } from 'react';
import Nav from './components/layout/Nav';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Commerce from '@chec/commerce.js';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Cart from './components/cart/Cart';
import Alert from './components/layout/Alert';
import AlertState from './alert/AlertState';

// let apiKey = process.env.REACT_APP_API_KEY;

const commerce = new Commerce(
  'pk_test_4021682ffdcdfb1028e4229f68443824e7d9d79e6ceb3'
);

const App = () => {
  const [products, setProducts] = useState([]);
  const [cartContent, setCartContent] = useState([]);

  const fetchProducts = async () => {
    const response = await commerce.products.list();
    setProducts((response && response.data) || {});
  };

  const fetchCartContent = async () => {
    const response = await commerce.cart.retrieve();
    setCartContent(response);
  };

  const addProduct = async (productId, quantity) => {
    const response = await commerce.cart.add(productId, quantity);
    setCartContent(response.cart);
  };

  const emptyCart = async () => {
    const response = await commerce.cart.empty();
    setCartContent(response.cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCartContent();
  }, []);

  return (
    <AlertState>
      <Router>
        <Nav cartContent={cartContent.total_items} />
        <div className='container'>
          <Alert />
          <Routes>
            <Route
              exact
              path='/'
              element={<Home products={products} addProduct={addProduct} />}
            />
            <Route path='/about' element={<About />} />
            <Route
              path='/cart'
              element={
                <Cart
                  cartContent={cartContent}
                  addProduct={addProduct}
                  emptyCart={emptyCart}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </AlertState>
  );
};

export default App;
