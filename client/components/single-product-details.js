import React, { Component } from 'react';
import { Item, Button, Form, Grid, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux'

//import directly from the store due to *
import { getCurrentProductThunk } from '../store/currentProduct';
import { addToCart } from '../store/cart'
import { ReviewList, ReviewForm } from './index'



export class SingleProductDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            quantity: 0
        }

        //OB/AZ - Can use arrow functions instead of binding
        this.handleAddToCart = this.handleAddToCart.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
    }

    componentDidMount() {
        this.props.getCurrentProduct(this.props.match.params.id)
    }

    //OB/AZ - Class arrow function syntax - Not necessary - Need stage 2? preset for babel
    handleAddToCart = () => {
        this.props.addToCart(this.props.currentProduct.id, this.state.quantity)
    }

    handleSelectChange = (e, o) => {
        this.setState({quantity: o.value})
    }

    render () {
        //OB/AZ - remove category if not using it
        const { imageUrl, title, description, category, price } = this.props.currentProduct
        return (
          <div>
            <Grid columns={3} relaxed>
                <Grid.Column>
                    <Item>
                        <Item.Image size='medium' src={imageUrl} />
                    </Item>
                </Grid.Column>
                <Divider vertical>Or</Divider>
                <Grid.Column>
                    <Item>
                        <Item.Header as="a">
                            <h2>
                                {title}
                            </h2>
                        </Item.Header>
                        <Item.Description>
                            <p>{description}</p>
                        </Item.Description>
                    </Item>
                </Grid.Column>
                <Divider vertical>And</Divider>
                <Grid.Column>
                    <h3>Price</h3>
                    <h4>{price}</h4>
                    <Form>
                        <Form.Select onChange={this.handleSelectChange} placeholder='Select Amount' options={[{ text: 1, value: 1 }, { text: 2, value: 2 }, { text: 3, value: 3 }, { text: 4, value: 4 }, { text: 5, value: 5 }]} />
                        <Button onClick={this.handleAddToCart} type='submit'>Add To Cart</Button>
                    </Form>
                </Grid.Column>
            </Grid>
          <ReviewList />
          <ReviewForm product={this.props.currentProduct} user={this.props.user} />
          </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      currentProduct: state.currentProduct,
      user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCurrentProduct: (currentProductId) => {
            dispatch(getCurrentProductThunk(currentProductId))
        },
        addToCart: (productId, quantity) => {
            dispatch(addToCart(productId, quantity))
        }
    }
}

const SingleProductDetailsContainer = connect(mapStateToProps, mapDispatchToProps)(SingleProductDetails)

export default SingleProductDetailsContainer;
