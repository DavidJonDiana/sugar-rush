const router = require('express').Router();
const { Product, Review } = require('../db/models');


router.param('id', (req, res, next, id) => {
    Product.findById(id)
        .then(product => {
            if (!product) {
              let error = new Error('Product not found')
              error.status(404);
              throw error;
            } else {
              req.product = product;
              next();
            }
        })
        .catch(next);
})

router.get('/', (req, res, next) => {
    Product.findAll()
        .then(products => res.json(products))
        .catch(next);
});

router.get('/:id', (req, res, next) => {
    res.send(req.product)
})

router.post('/:id/review', (req, res, next) => {
    Review.create(req.body)
      .then(review => res.json(review))
      .catch(next);
});

router.delete('/:id', (req, res, next) => {
    req.product.destroy()
        .then(() => res.sendStatus(204))
        .catch(next);
})



module.exports = router;
