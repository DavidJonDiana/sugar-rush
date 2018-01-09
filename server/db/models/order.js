const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  products: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
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

module.exports = Order
