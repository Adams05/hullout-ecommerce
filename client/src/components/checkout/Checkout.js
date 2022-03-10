import React, { useEffect, useState } from 'react';
import Commerce from '@chec/commerce.js';
import AddressForm from '../checkout/AddressForm';
import Spinner from '../layout/Spinner';

const commerce = new Commerce(
  'pk_test_4021682ffdcdfb1028e4229f68443824e7d9d79e6ceb3'
);

const CheckoutForm = ({ cartContent }) => {
  const [checkoutToken, setCheckoutToken] = useState(null);

  // Create function because cannot use asyn await in useEffect
  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cartContent.id, {
          type: 'cart',
        });
        console.log(token);
        setCheckoutToken(token);
      } catch (error) {}
    };

    generateToken();
  }, [cartContent]);

  return (
    <>
      {!checkoutToken ? (
        <Spinner />
      ) : (
        checkoutToken && <AddressForm checkoutToken={checkoutToken} />
      )}
    </>
  );
};

export default CheckoutForm;
