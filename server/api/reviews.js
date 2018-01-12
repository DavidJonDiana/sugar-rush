const router = require('express').Router();
const { Review } = require('../db/models');


router.param('id', (req, res, next, id) => {
  Review.findById(id)
    .then(review => {
      if (!review) {
        let error = new Error('Review not found')
        throw error;
      } else {
        req.review = review;
        next();
      }
    })
    .catch(next);
})

router.get('/', (req, res, next) => {
  Review.findAll()
    .then(reviews => res.json(reviews))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Review.create(req.body)
    .then(review => res.json(review))
    .catch(next);
});


router.delete('/:id', (req, res, next) => {
  req.review.destroy()
    .then(() => res.sendStatus(204))
    .catch(next);
})



module.exports = router;
