const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
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
