import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Rating } from 'semantic-ui-react'
import { addReviewThunk } from '../store/reviews'

class ReviewForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: 0,
      textReview: '',
      recommended: false
    }


    this.handleRecommendedChange = this.handleRecommendedChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);

  }


  handleRecommendedChange(event, object) {
    this.setState({recommended: object.checked})
  }

  handleRatingChange(event, object) {
    this.setState({ rating: object.rating })
  }

  handleTextChange(event, object) {
    this.setState({ textReview: object.value })
  }

  handleSubmit() {
    this.props.addReviewThunk({
      rating: this.state.rating,
      textReview: this.state.textReview,
      recommended: this.state.recommended,
      userId: this.props.user.id,
      productId: this.props.product.id
    })
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Rating maxRating={5} type='rating' onRate={this.handleRatingChange} />
          <Form.Input placeholder='Review' name='review' type='text' onChange={this.handleTextChange} />
          <Form.Checkbox name='recommended' label='Recommended' onChange={this.handleRecommendedChange}/>
            <Form.Button content='Submit' />
        </Form>
      </div>
    )
  }
}

const mapDispatchToProps = { addReviewThunk }

const mapStateToProps = (state) => {
  return {};
}

//OB/AZ - MapStateToProps = null
const ReviewFormContainer = connect(mapStateToProps, mapDispatchToProps)(ReviewForm)

export default ReviewFormContainer;


