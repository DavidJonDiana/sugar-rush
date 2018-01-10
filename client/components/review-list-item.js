import React from 'react'
import { Item, Rating } from 'semantic-ui-react'

const ReviewListItem = (props) => {
  const { textReview, rating, title } = props.review;

  return (
    <Item>
      <Item.Content>
        <Item.Header as='a'>Title</Item.Header>
        <Item.Meta>
          <Rating icon='star' defaultRating={rating} maxRating={5} disabled />
        </Item.Meta>
        <Item.Description>
          {textReview}
        </Item.Description>
        <Item.Extra>Additional Details</Item.Extra>
      </Item.Content>
    </Item>
  )
}

export default ReviewListItem;
