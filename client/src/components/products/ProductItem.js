import React, { useContext } from 'react';
import AlertContext from '../../alert/alertContext';

const ProductItem = ({ product: { image, price, name, id }, addProduct }) => {
  const { setAlert } = useContext(AlertContext);

  return (
    <div className='card text-center'>
      <div>
        <h3>{name}</h3>
      </div>
      <div>
        <img
          src={image.url}
          alt={name}
          style={{ width: '100%', height: '200px' }}
        />
      </div>
      <div className='my-2'>
        <h3>{price.formatted_with_symbol}</h3>
      </div>
      <div className='my-2'>
        <button
          className='btn btn-primary'
          onClick={() => {
            addProduct(id, 1);
            setAlert('Item has been added to your cart');
          }}
        >
          Buy Now
        </button>
        <button className='btn btn-dark'>View Product</button>
      </div>
    </div>
  );
};

export default ProductItem;