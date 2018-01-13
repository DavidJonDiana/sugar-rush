import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductListItem from './product-list-item';
import { Card } from 'semantic-ui-react'
import { getProductsThunk } from '../store/products'

class ProductList extends Component {

  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    return (
      <div>
        <div className="title">
          <h3>Products</h3>
        </div>
        <Card.Group style={{ margin: 5 }}>
          {this.props.products.map(product => <ProductListItem product={product} key={product.id} />
          )}
        </Card.Group>
      </div>
    )
  }
}

const mapDispatchToProps = {getProducts: getProductsThunk}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

const ProductListContainer = connect(mapStateToProps, mapDispatchToProps)(ProductList)

export default ProductListContainer;
