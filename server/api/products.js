const router = require('express').Router();
const { Product } = require('../db/models');


router.param('id', (req, res, next, id) => {
    Product.findById(id)
        .then(product => {
            if (!product) {
                let error = new Error('Product not found')
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
        .catch(next);
})

router.delete('/:id', (req, res, next) => {
    req.product.destroy()
        .then(() => res.sendStatus(204))
        .catch(next);
})



module.exports = router;