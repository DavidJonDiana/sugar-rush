import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const GET_REVIEWS = 'GET_REVIEWS'


/**
 * INITIAL STATE
 */

const initialState = [];


/**
 * ACTION CREATORS
 */

const getReviews = reviews => ({ type: GET_REVIEWS, reviews });

/**
 * THUNK CREATORS
 */

export function getReviewsThunk() {
  return function thunk(dispatch) {
    return axios.get('/api/reviews')
      .then(res => res.data)
      .then(reviews => {
        console.log('REVIEWS IN THUNK', reviews)
        dispatch(getReviews(reviews))
      })
  }
}


/**
 * REDUCER
 */

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews;
    default:
      return state;
  }
}
