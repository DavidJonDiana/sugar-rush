const router = require('express').Router();
const { Product } = require('../db/models');

// OB/AZ: nice!
router.param('id', (req, res, next, id) => {
    Product.findById(id)
        .then(product => {
            if (!product) {
                let error = new Error('Product not found')
                // OB/AZ: consider attaching a 404 status
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

router.delete('/:id', (req, res, next) => {
    req.product.destroy()
        .then(() => res.sendStatus(204))
        .catch(next);
})



module.exports = router;
