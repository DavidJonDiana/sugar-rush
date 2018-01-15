import axios from 'axios'
import toastr from 'toastr'
import history from '../history'

const ADD_TO_CART = 'ADD_PRODUCT_TO_CART';
const GET_CART = 'GET_CART'
const CLEAR_CART = 'CLEAR_CART'
const MAKE_ORDER = 'MAKE_ORDER'

const initialState = {};


export const addToCart = (productId, quantity) => ({ type: ADD_TO_CART, productId, quantity });

export const getCart = () => ({type: GET_CART})

export const clearCart = () => ({type: CLEAR_CART})

export const makeOrder = order => dispatch => {
    console.log('hi Im a thunk')
    axios.post('/api/orders', order)
        //need to redirect to user homepage
        .then(res => {
            toastr.success('Order Completed!')
            dispatch(clearCart)
            history.push('/')
        })
        .catch(() => toastr.error('Whoops - please make sure all fields are complete and try again'))
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART:
            if (state[action.productId]) {
                const newState = {...state}
                newState[action.productId] = state[action.productId] + action.quantity
                return newState
            } else {
                const newState = {...state}
                newState[action.productId] = action.quantity
                return newState
            }
        case GET_CART:
            return state;
        case CLEAR_CART:
            return initialState;
        default:
            return state;
    }
}
