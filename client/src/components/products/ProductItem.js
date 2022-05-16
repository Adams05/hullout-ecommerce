import React, { useContext } from 'react';
import AlertContext from '../../alert/alertContext';
import { Link } from 'react-router-dom';

const ProductItem = ({
  product: {
    image,
    price,
    name,
    id,
    inventory: { available },
  },
  addProduct,
}) => {
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
            if (available <= 0) {
              setAlert('Product is out of stock');
            } else {
              addProduct(id, 1);
              setAlert('Item has been added to your cart');
            }
          }}
        >
          Buy Now
        </button>
        <Link to={`/item/${id}`} className='btn btn-dark'>
          View Product
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
