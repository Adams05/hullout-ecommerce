import React from 'react';
import { findCountryByShortCode } from '../layout/CountryList';

const fields = [
  {
    countryName: 'country',
    label: 'Country',
    placeholder: 'Select Country',
    rules: 'required|string',
    value: findCountryByShortCode('IT'),
    output: (country) => country && country.value,
  },
];

console.log(fields);

const CheckoutForm = () => {
  return (
    <div className='container'>
      <div className='checkout-card p-2'>
        <form>
          <h3 className='text-center'>Please fill out your shipping details</h3>
          <hr className='my-1' />
          <div className='grid-2'>
            <input
              type='text'
              placeholder='First Name *'
              className='form-text'
            ></input>
            <input
              type='text'
              placeholder='Last Name *'
              className='form-text'
            ></input>
            <input
              type='email'
              placeholder='Email *'
              className='form-text'
            ></input>
            <input
              type='text'
              placeholder='Address line 1 *'
              className='form-text'
            ></input>
            <input type='text' className='form-text' placeholder='City *' />
            <input
              type='text'
              className='form-text'
              placeholder='Zip/Postal Code *'
            />
            <div>
              <select name='countries'>
                <option>{fields.value}</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
