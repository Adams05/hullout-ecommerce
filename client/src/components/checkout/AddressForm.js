import React, { useState, useEffect } from 'react';
import Commerce from '@chec/commerce.js';

const commerce = new Commerce(
  'pk_test_4021682ffdcdfb1028e4229f68443824e7d9d79e6ceb3'
);

// Create state for countries and individual country
const AddressForm = ({ checkoutToken }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubDivisions, setShippingSubDivisions] = useState([]);
  const [shippingSubDivision, setShippingSubDivision] = useState('');

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );

    console.log(subdivisions);
    setShippingSubDivisions(subdivisions);
    setShippingSubDivision(Object.keys(subdivisions)[0]);
  };

  const countries = Object.entries(shippingCountries).map(
    ([code, countryName]) => ({ id: code, label: countryName })
  );

  const subdivisions = Object.entries(shippingSubDivisions).map(
    ([code, countryName]) => ({ id: code, label: countryName })
  );

  // Fetch countries
  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setShippingCountries(countries);
    // Get Array of countries
    setShippingCountry(Object.keys(countries)[0]);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  return (
    <div className='container'>
      <div className='checkout-card p-2'>
        <form>
          <h3 className='text-center'>Please fill out your shipping details</h3>
          <hr className='my-1' />
          <div className='grid-2'>
            <div>
              <label>First Name *</label>
              <input
                type='text'
                placeholder='John...'
                className='form-text'
              ></input>
            </div>
            <div>
              <label>Last Name*</label>
              <input
                type='text'
                placeholder='Smith...'
                className='form-text'
              ></input>
            </div>
            <div>
              <label>Email *</label>
              <input
                type='email'
                placeholder='jsmith@gmail.com...'
                className='form-text'
              ></input>
            </div>
            <div>
              <label>Address line 1*</label>
              <input
                type='text'
                placeholder='123 Main st...'
                className='form-text'
              ></input>
            </div>
            <div>
              <label>City *</label>
              <input
                type='text'
                className='form-text'
                placeholder='Cleveland...'
              />
            </div>
            <div>
              <label>Zip / Postal Code *</label>
              <input type='text' className='form-text' />
            </div>
            <div>
              <label>State *</label>
              <select
                value={shippingSubDivision}
                name='subdivisons'
                onChange={(e) => setShippingSubDivision(e.target.value)}
              >
                {subdivisions.map((subdivison) => (
                  <option key={subdivison.id} value={subdivison.id}>
                    {subdivison.label}
                  </option>
                ))}
              </select>
            </div>
            <div className='hide'>
              <label>Shipping Country *</label>
              <select
                value={shippingCountry}
                name='countries'
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;
