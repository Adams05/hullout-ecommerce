import React from 'react';
import Products from '../products/Products';

const Home = ({ products, addProduct }) => {
  return (
    <div>
      <Products products={products} addProduct={addProduct} />
    </div>
  );
};

export default Home;
