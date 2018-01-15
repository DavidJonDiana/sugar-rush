import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import CartListItem from './cart-list-item';
import { getCart } from '../store/cart';

export class CartList extends Component {

    componentDidMount() {
        this.props.getCart();

    }

    render() {
        let cartIds = Object.keys(this.props.cart);
        return (
            <Grid>
                <Grid.Column width={11}>
                    {
                        cartIds.map(singleId => {
                            return <CartListItem key={singleId} productId={singleId} quantity={this.props.cart[singleId]} />
                        })
                    }
                </Grid.Column>
                <Grid.Column width={5}>
                    checkout 
                </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = { getCart }

const CartListContainer = connect(mapStateToProps, mapDispatchToProps)(CartList);
export default CartListContainer;

