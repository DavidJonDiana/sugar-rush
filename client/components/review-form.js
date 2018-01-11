import React, { Component } from 'react'
import { Form, Rating } from 'semantic-ui-react'

class ReviewForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: 0,
      textReview: '',
      recommended: false,
    }

    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

}



  handleSubmit() {
    const { rating, textReview, recommended } = this.state

    // onSubmit will trigger thunk which will be an axios POST request
  }

  render() {
    const { rating, textReview, recommended  } = this.state

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
            <Rating maxRating={5} type='rating' rating={this.state.rating} onChange={this.handleChange} />
            <Form.Input placeholder='Review' name='review' type='text' value={textReview} />
          <Form.Checkbox name='recommended' label='Recommended'/>
            <Form.Button content='Submit' />
        </Form>
      </div>
    )
  }
}

export default ReviewForm;


