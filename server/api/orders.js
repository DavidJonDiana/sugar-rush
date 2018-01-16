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

  Order.create({
    shippingAddress,
    payment,
    email,
    userId: user.id
  })
  .then(newOrder => newOrder.createOrderedProducts(req.body.cart))
  .then(() => res.send(201))
  .catch(next)
})

router.get('/:id', accessControl.isLoggedIn, accessControl.isAccountOwnerOrAdmin, (req, res, next) => {
  res.json(req.order)
})

module.exports = router;
