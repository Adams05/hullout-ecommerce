import React from 'react';
import Products from '../products/Products';
import Spinner from '../layout/Spinner';

const Home = ({ products, addProduct, loading }) => {
  if (loading) return <Spinner />;

  return (
    <div>
      <Products products={products} addProduct={addProduct} />
    </div>
  );
};

export default Home;
