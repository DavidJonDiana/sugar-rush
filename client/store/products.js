import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'


/**
 * INITIAL STATE
 */

const initialState = [{
    name: 'dummy',
    imageUrl: 'http://www.fillmurray.com/200/250',
    description: 'a great candy',
    id: 1,
    price: 10.00
  },
  {
    name: 'data',
    imageUrl: 'http://www.fillmurray.com/200/250',
    description: 'yum',
    id: 2,
    price: 10.00
  }]


/**
 * ACTION CREATORS
 */

const getProducts = products => ({ type: GET_PRODUCTS, products })
const getSingleProduct = singleProduct => ({ type: GET_SINGLE_PRODUCT, singleProduct })

/**
 * THUNK CREATORS
 */

export function getProductsThunk() {
  return function thunk(dispatch) {
    return axios.get('/api/products')
      .then(res => res.data)
      .then(products => {
        dispatch(getProducts(products))
    })
  }
}



/**
 * REDUCER
 */

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case GET_SINGLE_PRODUCT:
      return action.singleProduct
    default:
      return state
  }
}
