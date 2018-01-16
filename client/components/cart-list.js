import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Item, Button } from 'semantic-ui-react';
import CartListItem from './cart-list-item';
import { getProductsThunk } from '../store/products';
import OrderModal from './order-modal';

export class CartList extends Component {
    constructor() {
        super()
        this.state = {
            cart: sessionStorage
        }
    }

    componentDidMount() {
        this.props.getProducts()
    }

    removeItem = (id) => {
        sessionStorage.removeItem(id)
        this.setState({cart: sessionStorage})
    }

    updateItem = (id, quantity) => {
        sessionStorage.setItem(id, quantity)
        this.setState({cart: sessionStorage})
    }

    render() {
        let cartIds = Object.keys(this.state.cart);
        return (
            <Grid>
                <Grid.Column width={10}>
                    {cartIds.length ?
                    <Item.Group>
                        {this.props.products.length &&
                            cartIds.map(singleId => {
                                let cartItem = this.props.products.find(product => product.id === +singleId)
                                return (<CartListItem key={singleId}
                                            product={cartItem}
                                            removeItem={this.removeItem}
                                            updateItem={() => this.updateItem}
                                            quantity={this.state.cart[singleId]}
                                            updateCart={this.props.updateCart}
                                        />)
                            })
                        }
                    </Item.Group>
                    : <h2>Nothing in your cart yet</h2>
                    }
                </Grid.Column>
                <Grid.Column width={6} textAlign="center">
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

const mapDispatchToProps = { getProducts: getProductsThunk }

const CartListContainer = connect(mapStateToProps, mapDispatchToProps)(CartList);
export default CartListContainer;

