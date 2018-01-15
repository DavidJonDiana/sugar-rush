import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Item, Button } from 'semantic-ui-react';
import CartListItem from './cart-list-item';
import { getCart, updateCart } from '../store/cart';
import { getProductsThunk } from '../store/products';
import OrderModal from './order-modal';

export class CartList extends Component {

    componentDidMount() {
        this.props.getCart();
        this.props.getProducts()
    }



    render() {
        let cartIds = Object.keys(this.props.cart);
        return (
            <Grid>
                <Grid.Column width={10}>
                    <Item.Group>
                        {
                            cartIds.map(singleId => {
                                let cartItem = this.props.products.find(product => product.id === +singleId)
                                return <CartListItem key={singleId}
                                            product={cartItem}
                                            quantity={this.props.cart[singleId]}
                                            updateCart={this.props.updateCart}
                                            />
                            })
                        }
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={6}>
                    <OrderModal />
                </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        products: state.products
    }
}

const mapDispatchToProps = { getCart, getProducts: getProductsThunk, updateCart }

const CartListContainer = connect(mapStateToProps, mapDispatchToProps)(CartList);
export default CartListContainer;

