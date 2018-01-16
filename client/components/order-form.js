import React, {Component} from 'react'
import {Form, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import axios from 'axios'
import toastr from 'toastr'
import history from '../history'

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
      cart: sessionStorage
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    const order = {...this.state, user: this.props.user}
    axios.post('/api/orders', order)
    .then(res => {
      toastr.success('Order Completed!')
      sessionStorage.clear()
      //need to redirect to user homepage
      return history.push('/')
    })
    .catch(() => toastr.error('Whoops - please make sure all fields are complete and try again'))
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
  user: state.user
})

export default connect(mapState, null)(OrderForm)
