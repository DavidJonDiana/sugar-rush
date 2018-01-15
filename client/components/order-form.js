import React, {Component} from 'react'
import {Form, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {clearCart} from '../store/cart'

export class OrderForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      firstName: this.props.user.firstName || '',
      lastName: this.props.user.lastName || '',
      shippingAddress: '',
      cardNumber: '',
      expDate: '',
      cart: this.props.cart || {}
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    console.log('submitted', this.state)
  }

  render() {
    return (
      <Form onSubmit={() => {
        this.handleSubmit()
        this.props.toggleModal()
      }}>
        <Form.Group>
          <Form.Field>
            <label>First Name</label>
            <input placeholder='First Name' value={this.state.firstName} onChange={(e, {value}) => this.setState({firstName: value})} />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input placeholder='Last Name' value={this.state.lastName} onChange={(e, {value}) => this.setState({lastName: value})}/>
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Field>
            <label>Address</label>
            <input placeholder='Last Name' value={this.state.shippingAddress} onChange={(e, {value}) => this.setState({shippingAddress: value})}/>
          </Form.Field>
        </Form.Group>

        <Form.Group>
          <Form.Field>
            <label>Credit Card Number</label>
            <input placeholder='Last Name' value={this.state.cardNumber} onChange={(e, {value}) => this.setState({cardNumber: value})}/>
          </Form.Field>
          <Form.Field>
            <label>Expiration Date</label>
            <input placeholder='Last Name' value={this.state.expDate} onChange={(e, {value}) => this.setState({expDate: value})}/>
          </Form.Field>
        </Form.Group>
        <Button type='submit' positive>Complete</Button>
        <Button negative onClick={this.props.toggleModal}>Cancel</Button>
    </Form>
    )
  }
}

const mapState = state => ({
  cart: state.cart,
  user: state.user
})

const mapDispatch = (dispatch, ownProps) => ({
    clearCart: dispatch(clearCart),
    toggleModal: ownProps.toggleModal
})

export default connect(mapState, mapDispatch)(OrderForm)
