const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  // OB/AZ: one "status" field that is a string (ENUM), instead of many booleans
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  shipped: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  comments: {
    type: Sequelize.TEXT
  }
})

//instance methods

Order.prototype.getTotal = function() {
  return this.getOrderedProducts()
    .then(ops => {
      return ops.map(op => op.subtotal).reduce((a, b) => a + b)
    })
}

module.exports = Order
