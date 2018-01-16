const Sequelize = require('sequelize')
const db = require('../db')
const crypto = require('crypto')
const OrderedProducts = require('./orderedProducts')
const Product = require('./product')

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
    type: Sequelize.STRING
  }
})

//instance methods

Order.prototype.getTotal = function() {
  return this.getOrderedProducts()
    .then(ops => {
      return ops.map(op => op.subtotal).reduce((a, b) => a + b)
    })
}

Order.prototype.createOrderedProducts = function(cart) {
  const productIds = Object.keys(cart)
  //get all products to see price
  const promisedProducts = productIds.map(id => Product.findById(id))
  return Promise.all(promisedProducts)
    .then(products => {
      //create ordered Products
      const promisedOrderedProducts = products.map(product => {
        const quantity = cart[product.id]
        return OrderedProducts.create({
          quantity,
          itemPrice: product.price,
          orderId: this.id,
          productId: product.id
        })
      })
      return Promise.all(promisedOrderedProducts)
    })
    .then(ops => ops)
    .catch(console.error)
}

  //   productIds.forEach(productId => {
  //     Product.findById(Number(productId))
  //       .then(product => {
  //         const OP = OrderedProducts.create({
  //           quantity,
  //           itemPrice: product.price,
  //         })
  //         .then(op => op.setOrder(order))
  //         .then(op => op.setProduct(product))
  //       })
  //       .catch(console.error)
  //     })
  //   })
  // })
  // .then(() => res.sendStatus(201))
  // .catch(console.error)

//class methods

Order.createPayment = function(cardNumber, expDate) {

  let encryptedCardNumber = crypto
      .createHash('RSA-SHA256')
      .update(cardNumber)
      .digest('hex')

  return encryptedCardNumber + ' - ' + expDate
}


module.exports = Order
