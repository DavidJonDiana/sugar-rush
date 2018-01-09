import React from 'react';

import { Card, Icon, Image, Button } from 'semantic-ui-react'

const ProductListItem = (props) => {
  const {imageUrl, name, price, description} = props.product;
  return (
    <Card>
      <Image src={imageUrl} />
      <Card.Content>
        <Card.Header>
          {name}
        </Card.Header>
        <Card.Meta>
          <span className='price'>
            {price}
          </span>
        </Card.Meta>
        <Card.Description>
          {description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button>
          <Icon name='cart' />
          Add to Cart
        </Button>
      </Card.Content>
    </Card>
  )
}

export default ProductListItem;
