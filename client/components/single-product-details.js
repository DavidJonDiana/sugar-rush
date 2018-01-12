import React, { Component } from 'react';
import { Item, Button, Form, Grid, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux'
import { getCurrentProductThunk } from '../store/currentProduct';
import { ReviewList, ReviewForm } from './index'



export class SingleProductDetails extends Component {

    componentDidMount() {
        this.props.getCurrentProduct(this.props.match.params.id)
    }

    render () {
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
                        <Form.Field>
                            <label>Quantity</label>
                            <input placeholder='Quantity' />
                        </Form.Field>
                        <Button type='submit'>Add To Cart</Button>
                    </Form>
                </Grid.Column>
            </Grid>
          <ReviewList />
          <ReviewForm product={this.props.currentProduct} />
          </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentProduct: state.currentProduct
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCurrentProduct: (currentProductId) => {
            dispatch(getCurrentProductThunk(currentProductId))
        }
    }
}

const SingleProductDetailsContainer = connect(mapStateToProps, mapDispatchToProps)(SingleProductDetails)

export default SingleProductDetailsContainer;
