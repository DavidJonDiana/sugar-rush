import React, {Component} from 'react'
import { Button, Modal } from 'semantic-ui-react'
import OrderForm from './order-form'

class OrderFormModal extends Component {
  constructor() {
    super()
    this.state = {
      isOpen: false
    }
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal() {
    this.setState({isOpen: !this.state.isOpen})
  }

  render() {
    return (
      <Modal
        trigger={<Button positive onClick={this.toggleModal}>Checkout</Button>}
        open={this.state.isOpen}
      >
        <Modal.Header>Order</Modal.Header>
        <Modal.Content>
          <OrderForm toggleModal={this.toggleModal} />
        </Modal.Content>
      </Modal>
    )
  }
}

export default OrderFormModal
