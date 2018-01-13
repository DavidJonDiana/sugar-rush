import axios from 'axios'
import history from '../history'
import toastr from 'toastr'

/**
 * ACTION TYPES
 */

const GET_PRODUCTS = 'GET_PRODUCTS'


/**
 * INITIAL STATE
 */

const initialState = [];


/**
 * ACTION CREATORS
 */

const getProducts = products => ({ type: GET_PRODUCTS, products });

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
      .catch(() => toastr.error('Sorry! Products cannot be displayed.'))
  }
}


/**
 * REDUCER
 */

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
