import React, { useEffect, useState, useContext } from 'react';
import { commerce } from '../../lib/commerce';
import AlertContext from '../../alert/alertContext';
import Spinner from '../layout/Spinner';

const Item = ({ addProduct }) => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  // Bring in alert context
  const { setAlert } = useContext(AlertContext);

  // Fetch single product
  const fetchProduct = async (productId) => {
    const response = await commerce.products.retrieve(productId);
    setLoading(false);
    const {
      id,
      name,
      price,
      quantity,
      description,
      image,
      inventory: { available },
    } = response;

    setProduct({
      id,
      image: image.url,
      name,
      quantity,
      price: price.formatted_with_symbol,
      description,
      available,
    });
  };

  useEffect(() => {
    const productId = window.location.pathname.split('/');
    fetchProduct(productId, [2]);
  }, []);

  // If loading return spinner
  if (loading) return <Spinner />;

  // Increase quantity
  const handleQuantityIncrease = (param) => {
    if (param === 'increase' && quantity < product.available) {
      setQuantity(quantity + 1);
    } else {
      setAlert('Quantity cannot be more than whats available');
    }
  };

  // Decrease Quantity
  const handleQuantityDecrease = (param) => {
    if (param === 'decrease' && quantity >= 2) {
      setQuantity(quantity - 1);
    } else {
      setAlert('Quantity must be at least one');
    }
  };

  return (
    <div className='container'>
      <div className='grid-2'>
        <div className='card'>
          <img
            src={product.image}
            alt={product.description}
            style={imgStyles}
          />
        </div>
        <div className='card'>
          <h3>{product.name}</h3>
          <h3 className='my-2'>Price: {product.price}</h3>
          <h3>Quantity: {quantity}</h3>
          <button
            className='btn btn-success'
            onClick={() => {
              handleQuantityIncrease('increase');
            }}
          >
            +
          </button>
          <button
            className='btn btn-danger'
            onClick={() => {
              handleQuantityDecrease('decrease');
            }}
          >
            -
          </button>
          <h3 className='my-2'>Available: {product.available}</h3>
          <button
            className='btn btn-light'
            onClick={() => {
              if (quantity > product.available) {
                setAlert('Quantity cannot be more than whats available');
              } else {
                addProduct(product.id, quantity);
                setAlert('Item has been added to your cart');
              }
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

const imgStyles = {
  width: '300px',
  height: '300px',
  marginRight: 'auto',
  marginLeft: 'auto',
  display: 'block',
};

export default Item;
