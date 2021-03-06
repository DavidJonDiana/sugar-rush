import React from 'react'
import { NavLink } from 'react-router-dom'
import { Card, Icon, Image, Button } from 'semantic-ui-react'

const ProductListItem = (props) => {
  const {imageUrl, price, description, id, title} = props.product;
  return (
    <Card>
      <Image src={imageUrl} />
      <Card.Content>
        <Card.Header>
          {title}
        </Card.Header>
        <Card.Meta>
          <span className='price'>
            ${price}
          </span>
        </Card.Meta>
        <Card.Description>
          {description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <NavLink to={`/products/${id}`}>
          <Button >
            View Item
          </Button>
        </NavLink>
      </Card.Content>
    </Card>
  )
}

export default ProductListItem;
