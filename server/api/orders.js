const router = require('express').Router();
const {Order, OrderedProducts, Product, User} = require('../db/models');

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

//OB/AZ - Consider refactoring into a model method i.e instance
router.post('/', (req, res, next) => {
  const payment = Order.createPayment(req.body.cardNumber, req.body.expDate)
  const {shippingAddress, email, user} = req.body
  
  //OB/AZ - Nice commenting
  //req.body.cart = shopping cart object
  Order.create({
    shippingAddress,
    payment,
    email
  })

  //OB/AZ - Be careful of nested .then();  
  .then(newOrder => {
    //OB/AZ - Remove console.log(s)
    console.log('user.id is' + user.id)
    return newOrder.setUser(user.id)
  })
  .then(order => {
  let productIds = Object.keys(req.body.cart)

  //OB/AZ - Nice commenting
  //create a join table for each product ordered

  //OB/AZ - Implement to make an array of promises then use Promise.all
  productIds.forEach(productId => {
    let quantity = req.body.cart[productId]
    //OB/AZ - Use as one query using the IN operator
    Product.findById(Number(productId))
      .then(product => {
        const OP = OrderedProducts.create({
          quantity,
          itemPrice: product.price,
        })
        .then(op => op.setOrder(order))
        .then(op => op.setProduct(product))
      })
      //OB/AZ - recommend doing .catch(next);
      .catch(console.error)
    })
  })
  .then(() => res.sendStatus(201))
  //OB/AZ - recommend doing .catch(next);  
  .catch(console.error)
})

router.get('/:id', (req, res, next) => {
  res.json(req.order)
})

module.exports = router;
