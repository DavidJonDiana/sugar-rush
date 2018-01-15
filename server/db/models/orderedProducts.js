const Sequelize = require('sequelize')
const db = require('../db')

const OrderedProducts = db.define('orderedProducts', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  itemPrice: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  subtotal: {
    type: Sequelize.VIRTUAL,
    get() {
      return this.getDataValue('quantity') * this.getDataValue('itemPrice')
    }
  }
})

module.exports = OrderedProducts;
