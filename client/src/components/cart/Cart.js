import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import AlertContext from '../../alert/alertContext';
import Spinner from '../layout/Spinner';

const Cart = ({
  cartContent,
  emptyCart,
  removeProduct,
  totalCost,
  loading,
}) => {
  const { setAlert } = useContext(AlertContext);

  // If not content return spinner
  if (loading) return <Spinner />;

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
            return (
              <CartItem
                item={item}
                key={item.id}
                removeProduct={removeProduct}
              />
            );
          })}
          <div className='subtotal alert'>
            <h3>Subtotal: {totalCost}</h3>
          </div>
          <Link to='/checkout' className='btn btn-success'>
            Checkout
          </Link>
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
