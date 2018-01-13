import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductListItem from './product-list-item';
import { Card } from 'semantic-ui-react'
import { getProductsThunk } from '../store/products'
import { Search } from 'semantic-ui-react'

class ProductList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      searchTerm: '',
      isLoading: false
    }

    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  componentDidMount() {
    this.props.getProducts()
  }

  handleSearchChange(e, { value }) {
    this.setState({ isLoading: true, searchTerm: value })

    setTimeout(() => {
      this.setState({ isLoading: false})
    }, 500)
  }

  render() {

    let products = this.props.products;

    if (this.state.searchTerm) {
      products = products.filter((product) => product.title.toLowerCase().startsWith(this.state.searchTerm.toLowerCase()))
    }

    return (
      <div>
        <div className="title">
          <h3>Products</h3>
        </div>
        <div>
         <Search
            loading={this.state.isLoading}
            onSearchChange={this.handleSearchChange}
            value={this.state.searchTerm}
            showNoResults={false}
          />
        </div>
        <Card.Group style={{ margin: 5 }}>
          {products.map(product => <ProductListItem product={product} key={product.id} />
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
