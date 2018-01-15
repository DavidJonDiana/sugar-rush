const Sequelize = require('sequelize')
const db = require('../db')
const crypto = require('crypto')

const Order = db.define('order', {
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  shipped: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  shippingAddress: {
    type: Sequelize.TEXT
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  payment: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

//instance methods

Order.prototype.getTotal = function() {
  return this.getOrderedProducts()
    .then(ops => {
      return ops.map(op => op.subtotal).reduce((a, b) => a + b)
    })
}

//class methods

Order.createPayment = function(cardNumber, expDate) {

  let encryptedCardNumber = crypto
      .createHash('RSA-SHA256')
      .update(cardNumber)
      .digest('hex')

  return encryptedCardNumber + ' - ' + expDate
}


module.exports = Order
