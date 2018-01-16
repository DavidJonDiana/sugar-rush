import axios from 'axios'
import history from '../history'
import toastr from 'toastr'

/**
 * ACTION TYPES
 */

const GET_REVIEWS = 'GET_REVIEWS'
const ADD_REVIEW = 'ADD_REVIEW'


/**
 * INITIAL STATE
 */

const initialState = [];


/**
 * ACTION CREATORS
 */

const getReviews = reviews => ({ type: GET_REVIEWS, reviews });
const addReview = review => ({type: ADD_REVIEW, review})

/**
 * THUNK CREATORS
 */

export function getReviewsThunk() {
  return function thunk(dispatch) {
    return axios.get('/api/reviews')
      .then(res => res.data)
      .then(reviews => {
        dispatch(getReviews(reviews))
      })
      .catch(()  => toastr.error('Sorry! Reviews cannot be displayed.'))
  }
}

export function addReviewThunk(reviewData) {
  return function thunk(dispatch) {
    // OB/AZ - consider changing to just POST /api/reviews
    return axios.post(`/api/products/${reviewData.userId}/review`, reviewData)
      .then(res => res.data)
      .then(review => {
        dispatch(addReview(review))
      })
      .catch(() => toastr.error('Sorry! Your review was not added. Please fill in the form.'))
  }
}


/**
 * REDUCER
 */

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews;
    case ADD_REVIEW:
      return [...state, action.review]
    default:
      return state;
  }
}
