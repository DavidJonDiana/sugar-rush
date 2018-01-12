const ADD_TO_CART = 'ADD_PRODUCT_TO_CART';
const GET_CART = 'GET_CART'

const initialState = {};


export const addToCart = (productId, quantity) => ({ type: ADD_TO_CART, productId, quantity });
export const getCart = () => ({type: GET_CART})

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
        default:
            return state;
    }
}
