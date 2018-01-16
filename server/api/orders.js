const router = require('express').Router();
const { Order, OrderedProducts, Product, User } = require('../db/models');
const accessControl = require('../utils/accessControl')


router.param('id', (req, res, next, id) => {
  Order.findById(id)
      .then(order => {
          if (!order) {
            let error = new Error('Order not found')
            error.status(404);
            throw error;
          } else {
            req.order = order;
            next();
          }
      })
      .catch(next);
})

router.get('/', accessControl.isAccountOwnerOrAdmin, (req, res, next) => {
  Order.findAll()
    .then(orders => res.json(orders))
    .catch(console.error)
})

router.post('/', (req, res, next) => {
  const payment = Order.createPayment(req.body.cardNumber, req.body.expDate)
  const {shippingAddress, email, user} = req.body

  //req.body.cart = shopping cart object
  Order.create({
    shippingAddress,
    payment,
    email
  })
  .then(newOrder => {
    console.log('user.id is' + user.id)
    newOrder.setUser(user.id)
    .then(order => {
    let productIds = Object.keys(req.body.cart)
    //create a join table for each product ordered
    productIds.forEach(productId => {
      let quantity = req.body.cart[productId]
      Product.findById(Number(productId))
        .then(product => {
          const OP = OrderedProducts.create({
            quantity,
            itemPrice: product.price,
          })
          .then(op => op.setOrder(order))
          .then(op => op.setProduct(product))
        })
        .catch(console.error)
      })
    })
  })
  .then(() => res.sendStatus(201))
  .catch(console.error)
})

router.get('/:id', accessControl.isLoggedIn, accessControl.isAccountOwnerOrAdmin, (req, res, next) => {
  res.json(req.order)
})

module.exports = router;
