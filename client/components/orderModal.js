import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import OrderForm from 'order-form'

const OrderFormModal = () => (
  <Modal trigger={<Button>Show Modal</Button>}>
    <Modal.Header>Order</Modal.Header>
    <Modal.Content><OrderForm /></Modal.Content>
  </Modal>
)

export default OrderFormModal
