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
  total: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  comments: {
    type: Sequelize.TEXT
  }
})

//order.getOrderProducts() returns a promise for an array of all the order's ordered products

module.exports = Order
