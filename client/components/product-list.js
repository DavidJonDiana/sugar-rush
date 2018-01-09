import React from 'react';
import ProductListItem from './product-list-item';

const dummyproducts = [{
  name: 'dummy',
  imageUrl: 'http://www.fillmurray.com/200/250',
  description: 'a great candy',
  id: 1,
  price: 10.00
}]


const ProductList = (props) => {
  return (
    <div>
      <h3>Products</h3>
      {dummyproducts.map(product => <ProductListItem product={product} key={product.id} />
      )}
    </div>
  )
}

export default ProductList;
