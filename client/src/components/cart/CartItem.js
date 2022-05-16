import React, { Fragment, useContext } from 'react';
import AlertContext from '../../alert/alertContext';
import ReactToolTip from 'react-tooltip';

const CartItem = ({
  item: { image, name, price, quantity, id },
  removeProduct,
}) => {
  const { setAlert } = useContext(AlertContext);

  const priceWithQuantity = price.formatted * quantity;

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
            <h3>Price: ${priceWithQuantity}.00</h3>
          </div>
          <button
            className='badge btn-primary removeItemBtn'
            data-tip
            data-for='removeToolTip'
            onClick={() => {
              removeProduct(id);
              setAlert('Item has been removed from your cart');
            }}
          >
            X
          </button>
          <ReactToolTip id='removeToolTip' place='top' effect='solid'>
            Remove item from cart
          </ReactToolTip>
          <div>
            <h3>Quantity: {quantity}</h3>
          </div>
          <div>
            <h3>Available: </h3>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CartItem;
