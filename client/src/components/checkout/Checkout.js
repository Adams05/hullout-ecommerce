import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { commerce } from '../../lib/commerce';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Spinner from '../layout/Spinner';
import {
  Stepper,
  Step,
  StepLabel,
  Paper,
  Typography,
  Divider,
  Button,
} from '@material-ui/core';

const CheckoutForm = ({
  cartContent,
  order,
  onCaptureCheckout,
  orderError,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const [checkoutToken, setCheckoutToken] = useState(null);
  const navigate = useNavigate();

  // Create function because cannot use async await in useEffect
  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cartContent.id, {
          type: 'cart',
        });

        console.log(token);
        setCheckoutToken(token);
      } catch (error) {
        console.log(error);
      }
    };
    generateToken();
  }, [cartContent]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  console.log(checkoutToken);

  const steps = ['Shipping address', 'Payment details'];

  if (!checkoutToken) return <Spinner />;

  let Confirmation = () =>
    order.customer ? (
      <>
        <div>
          <Typography variant='h5' style={{ padding: '20px' }}>
            Thank you for your purchase, {order.customer.firstname}{' '}
            {order.customer.lastname}
          </Typography>
          <Divider />
          <Typography variant='subtitle2' style={{ padding: '20px' }}>
            Please check your inbox for a confirmation email.
          </Typography>
          <Typography variant='subtitle2' style={{ marginLeft: '20px' }}>
            Order ref: {order.customer_reference}
          </Typography>
        </div>
        <br />
        <Button
          variant='outlined'
          type='button'
          style={{ marginLeft: '20px' }}
          component={Link}
          to='/'
        >
          Back to Home
        </Button>
      </>
    ) : (
      <div>
        <Spinner />
      </div>
    );

  if (orderError) {
    <>
      <Typography variant='h5'>Error: {orderError}</Typography>
      <Button variant='outlined' type='button' component={Link} to='/'>
        Back to Home
      </Button>
    </>;
  }

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        backStep={backStep}
        nextStep={nextStep}
        onCaptureCheckout={onCaptureCheckout}
      />
    );

  return (
    <>
      <div className='checkout-card'>
        <Paper className='paper'>
          <Typography variant='h4' align='center'>
            Checkout
          </Typography>
          <Stepper activeStep={activeStep}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : <Form />}
        </Paper>
      </div>
    </>
  );
};

export default CheckoutForm;
