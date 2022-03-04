import React, { Fragment } from 'react';

const CartItem = ({ item: { image, name, price, quantity } }) => {
  return (
    <Fragment>
      <div className='card'>
        <div className='grid-4'>
          <img
            src={image.url}
            alt={name}
            style={{ width: '100px', height: '100px' }}
          />
          <div>
            <h3>Item: {name}</h3>
          </div>
          <div>
            <h3>Price: {price.formatted_with_symbol}</h3>
          </div>
          <button className='badge btn-primary removeItemBtn'>X</button>
          <div>
            <h3>Quantity: {quantity}</h3>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CartItem;
