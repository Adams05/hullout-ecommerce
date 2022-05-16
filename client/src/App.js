import './App.css';
import { useState, useEffect } from 'react';
import Nav from './components/layout/Nav';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { commerce } from './lib/commerce';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Cart from './components/cart/Cart';
import Alert from './components/layout/Alert';
import AlertState from './alert/AlertState';
import NotFound from './components/layout/NotFound';
import Item from './components/pages/Item';
import Checkout from './components/checkout/Checkout';
import Review from './components/checkout/Review';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cartContent, setCartContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState({});
  const [orderError, setOrderError] = useState('');

  // Fetch products
  const fetchProducts = async () => {
    const response = await commerce.products.list();
    setProducts((response && response.data) || {});
    setLoading(false);
  };

  // Fetch cart content
  const fetchCartContent = async (cartId) => {
    const response = await commerce.cart.retrieve(cartId);
    setCartContent(response);
    setLoading(false);
  };

  // Add products to cart
  const addProduct = async (productId, quantity) => {
    const response = await commerce.cart.add(productId, quantity);
    setCartContent(response.cart);
  };

  // Remove single item from cart
  const removeProduct = async (productId) => {
    const response = await commerce.cart.remove(productId);
    setCartContent(response.cart);
  };

  // Empty entire cart
  const emptyCart = async () => {
    const response = await commerce.cart.empty();
    setCartContent(response.cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCartContent(newCart);
  };

  // Handle Checkout
  const handleCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setOrderError(
        (error.data && error.data.error && error.data.error.message) ||
          'An error has occured'
      );
    }
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
              element={
                <Home
                  products={products}
                  addProduct={addProduct}
                  loading={loading}
                />
              }
            />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<NotFound />} />
            <Route
              exact
              path='/item/:id'
              element={<Item addProduct={addProduct} />}
            />
            <Route
              exact
              path='/cart'
              element={
                <Cart
                  totalCost={
                    cartContent.subtotal &&
                    cartContent.subtotal.formatted_with_symbol
                  }
                  cartContent={cartContent}
                  addProduct={addProduct}
                  emptyCart={emptyCart}
                  removeProduct={removeProduct}
                  loading={loading}
                />
              }
            />
            <Route
              exact
              path='/checkout'
              element={
                <Checkout
                  cartContent={cartContent}
                  order={order}
                  orderError={orderError}
                  onCaptureCheckout={handleCheckout}
                />
              }
            />
            <Route exact path='/review' element={<Review />} />
          </Routes>
        </div>
      </Router>
    </AlertState>
  );
};

export default App;
