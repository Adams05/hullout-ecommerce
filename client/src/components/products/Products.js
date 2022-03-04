import React from 'react';
import ProductItem from './ProductItem';

const Products = ({ products, addProduct }) => {
  return (
    <div className='grid-3'>
      {products.map((product) => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            addProduct={addProduct}
          />
        );
      })}
    </div>
  );
};

export default Products;
