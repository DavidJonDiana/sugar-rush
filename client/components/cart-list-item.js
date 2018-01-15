import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Item, Button, Label } from 'semantic-ui-react';
import { getCurrentProductThunk } from '../store/currentProduct'

class CartListItem extends Component {

    componentDidMount() {
        this.props.getCurrentProduct(this.props.productId);
    }

    render () {
        const { title, description, imageUrl, category } = this.props.currentProduct
        return (
            <Item>
                <Item.Image size='small' src={imageUrl} />
                <Item.Content>
                    <Item.Header as='a'>{title}</Item.Header>
                    <Item.Meta>
                        <span className='category'>{category}</span>
                    </Item.Meta>
                    <Item.Description>{description}</Item.Description>
                    <Item.Extra>
                        <Button primary floated='right'>
                            Remove From Cart
                    </Button>
                        <Label>Quantity: {this.props.quantity}</Label>
                    </Item.Extra>
                </Item.Content>
            </Item>
        )
    }
}
   

const mapStateToProps = (state) => {
    return {
        currentProduct: state.currentProduct
    }
}

const mapDispatchToProps = { getCurrentProduct: getCurrentProductThunk}

const CartListItemContainer = connect(mapStateToProps, mapDispatchToProps)(CartListItem);

export default CartListItemContainer;
