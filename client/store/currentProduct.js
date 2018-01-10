import axios from 'axios'
import history from '../history'

// ACTION TYPES

const GET_CURRENT_PRODUCT = 'GET_CURRENT_PRODUCT'

//INITIAL STATE

const intitalState = {};

//ACTION CREATORS

const getCurrentProduct = currentProduct => ({ type: GET_CURRENT_PRODUCT, currentProduct });


//THUNKS

export function getCurrentProductThunk(currentProductId) {
    return function thunk(dispatch) {
        return axios.get(`/api/products/${currentProductId}`)
            .then(res => res.data)
            .then(currentProduct => {
                dispatch(getCurrentProduct(currentProduct))
            })
    }
}

//REDUCER

export default function (state = intitalState, action) {
    switch(action.type) {
        case GET_CURRENT_PRODUCT:
            return action.currentProduct;
        default:
            return state;
    }
}