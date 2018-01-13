import React from 'react';
import { Item, Button, Label } from 'semantic-ui-react';

const CartListItem = (props) => {
    const { imageUrl, name, price, description, id, category } = props.product;
    return (
        <Item>
            <Item.Image src={imageUrl} />

            <Item.Content>
                <Item.Header as='a'>{name}</Item.Header>
                <Item.Meta>
                    <span className='category'>{category}</span>
                </Item.Meta>
                <Item.Description>{description}</Item.Description>
                <Item.Extra>
                    <Button primary floated='right'>
                        Remove From Cart
                    </Button>
                    <Label>Quantity</Label>
                </Item.Extra>
            </Item.Content>
        </Item>
    )
}

export default CartListItem;