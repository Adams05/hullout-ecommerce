import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import AlertContext from '../../alert/alertContext';

const Cart = ({ cartContent, emptyCart }) => {
  const { setAlert } = useContext(AlertContext);

  return (
    <div>
      {cartContent.line_items <= 0 ? (
        <Fragment>
          <h3>Your cart is Empty</h3>
          <Link to='/' className='btn btn-dark my-2'>
            Go Back
          </Link>
        </Fragment>
      ) : (
        <>
          {cartContent.line_items?.map((item) => {
            return <CartItem item={item} key={item.id} />;
          })}
          <div className='subtotal alert'>
            <h3>Subtotal: </h3>
          </div>
          <button className='btn btn-success'>Checkout</button>
          <button
            className='btn btn-danger'
            onClick={() => {
              emptyCart();
              setAlert('Cart Cleared');
            }}
          >
            Empty Cart
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
