import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductListItem from './product-list-item';
import { Card } from 'semantic-ui-react'
import { getProductsThunk } from '../store/products'
import { Search, Dropdown } from 'semantic-ui-react'

export const makeCategories = (products) => products.map(product => product.category).filter((cat, index, arr) => arr.indexOf(cat) === index)

class ProductList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      searchTerm: '',
      isLoading: false,
      filterCategories: []
    }

    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleCategoryFilter = this.handleCategoryFilter.bind(this)
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

  handleCategoryFilter(e, { value }) {
    this.setState({ filterCategories: value})
  }

  render() {

    let products = this.props.products;
    let selectedCategories = this.state.filterCategories
    let categories = makeCategories(products)

    if (this.state.searchTerm) {
      products = products.filter((product) => product.title.toLowerCase().startsWith(this.state.searchTerm.toLowerCase()))
    }

    if (selectedCategories.length) {
      products = products.filter(product => selectedCategories.includes(product.category))
    }

    const options = categories.map((category, index) => ({
      key: index,
      value: category,
      text: category
    }))

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
          <Dropdown
            onChange={this.handleCategoryFilter}
            options={options}
            placeholder='Filter by category'
            fluid
            multiple
            selection
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
