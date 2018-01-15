const router = require('express').Router();
const {Order, OrderedProducts, Product} = require('../db/models');

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

router.get('/', (req, res, next) => {
  Order.findAll()
    .then(orders => res.json(orders))
    .catch(console.error)
})

router.post('/', (req, res, next) => {
  req.body.payment = Order.createPayment(req.body.cardNumber, req.body.expDate)

  //req.body.cart = shopping cart object
  Order.create(req.body)
    .then(order => {
      let productIds = Object.keys(req.body.cart)
      //create a join table for each product ordered
      productIds.forEach(productId => {
        let quantity = req.body.cart[productId]
        Product.findById(Number(productId))
          .then(product => {

            OrderedProducts.create({
              quantity,
              itemPrice: product.price,
              order,
              product
            })
          })
        })
      })
    .then(() => res.sendStatus(201))
    .catch(console.error)
})

router.get('/:id', (req, res, next) => {
  res.json(req.order)
})

