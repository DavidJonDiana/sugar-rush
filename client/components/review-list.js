import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReviewListItem from './review-list-item';
import { Item } from 'semantic-ui-react'
import { getReviewsThunk } from '../store/reviews'

class ReviewList extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getReviews()
  }

  render() {
    console.log('propssssss', this.props)
    return (
      <div>
        <div className="title">
          <h3>Reviews</h3>
        </div>
        <Item.Group style={{ margin: 5 }}>
          {this.props.reviews && this.props.reviews.map(review => <ReviewListItem review={review} key={review.id} />
          )}
        </Item.Group>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getReviews: () => {
      dispatch(getReviewsThunk())
    }
  }
}

const mapStateToProps = (state) => {
  console.log('STATEEEEE', state)
  return {
    reviews: state.reviews
  }
}

const ReviewListContainer = connect(mapStateToProps, mapDispatchToProps)(ReviewList)

export default ReviewListContainer;
