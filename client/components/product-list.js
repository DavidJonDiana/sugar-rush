import React from 'react';
import ProductListItem from './product-list-item';
import { Card } from 'semantic-ui-react'

const dummyproducts = [{
  name: 'dummy',
  imageUrl: 'http://www.fillmurray.com/200/250',
  description: 'a great candy',
  id: 1,
  price: 10.00
},
  {
    name: 'data',
    imageUrl: 'http://www.fillmurray.com/200/250',
    description: 'yum',
    id: 2,
    price: 10.00
  }]


const ProductList = (props) => {
  return (
    <div>
      <div className="title">
        <h3>Products</h3>
      </div>
     <Card.Group>
        {dummyproducts.map(product => <ProductListItem product={product} key={product.id} />
        )}
      </Card.Group>
    </div>
  )
}

export default ProductList;
