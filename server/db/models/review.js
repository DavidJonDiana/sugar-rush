const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 5
    }
  },
  textReview: {
    type: Sequelize.TEXT,
    validate: {
      len: [0, 400]
    }
  },
  recommended: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = Review;