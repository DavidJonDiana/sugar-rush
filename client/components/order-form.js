import React, {Component} from 'react'
import {Form, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {makeOrder} from '../store/cart'

export class OrderForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      firstName: this.props.user.firstName || '',
      lastName: this.props.user.lastName || '',
      email: this.props.user.email || '',
      shippingAddress: '',
      cardNumber: '',
      expDate: '',
      cart: this.props.cart || {}
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    this.props.makeOrder({...this.state, user: this.props.user, cart: this.props.cart})
    //OB/AZ - Remove console.log
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
            <input placeholder='First Name' value={this.state.firstName} onChange={e => this.setState({firstName: e.target.value})} />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input placeholder='Last Name' value={this.state.lastName} onChange={e => this.setState({lastName: e.target.value})}/>
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Field>
            <label>Address</label>
            <input placeholder='Street, City, and State' value={this.state.shippingAddress} onChange={e => this.setState({shippingAddress: e.target.value})}/>
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input placeholder='Email' value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>
          </Form.Field>
        </Form.Group>

        <Form.Group>
          <Form.Field>
            <label>Credit Card Number</label>
            <input type='password' placeholder='1234123412341234' value={this.state.cardNumber} onChange={e => this.setState({cardNumber: e.target.value})}/>
          </Form.Field>
          <Form.Field>
            <label>Expiration Date</label>
            <input type='password' placeholder='MM/YYYY' value={this.state.expDate} onChange={e => this.setState({expDate: e.target.value})}/>
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
    makeOrder(order) {
      dispatch(makeOrder(order))
    },
    //OB/AZ - Unnecessary => Will naturally make way to component
    toggleModal: ownProps.toggleModal
})

//OB/AZ - Be consistent with exports and naming
export default connect(mapState, mapDispatch)(OrderForm)
