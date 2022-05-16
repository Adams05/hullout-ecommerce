import React from 'react';
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from '@stripe/react-stripe-js';
import { Typography, Button, Divider } from '@material-ui/core';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';
import Spinner from '../layout/Spinner';

const stripePromise = loadStripe(
  'pk_test_51KsuiWDFGCVwD4N5rTSdkSSmtdnhag9d5XPjjmhTqeUqIAq5qSE3qG9mKDH1fuZLA7ylmk2GVbK5gYzJHHWJRM7u00gzgvkpEt'
);

const PaymentForm = ({
  checkoutToken,
  backStep,
  nextStep,
  onCaptureCheckout,
  shippingData,
}) => {
  console.log(shippingData);
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: 'Primary',
          street: shippingData.address1,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      onCaptureCheckout(checkoutToken.id, orderData);

      nextStep();
    }
  };

  if (!checkoutToken) return <Spinner />;

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography
        variant='h6'
        gutterBottom
        style={{ margin: '20px 0', padding: '0 20px' }}
      >
        Payment Method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form
              onSubmit={(e) => handleSubmit(e, elements, stripe)}
              style={{ padding: '0 20px' }}
            >
              <CardElement />
              <br />
              <br />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='outlined' onClick={backStep}>
                  Back
                </Button>
                <Button
                  type='submit'
                  variant='contained'
                  disabled={!stripe}
                  color='primary'
                >
                  Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;
