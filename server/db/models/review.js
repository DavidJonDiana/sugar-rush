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
    allowNull: false,
    validate: {
      len: [40, 400]
    }
  },
  recommended: {
    type: Sequelize.BOOLEAN
  },
  title: {
    type: Sequelize.VIRTUAL,
    get() {
      return this.getDataValue('textReview').slice(0, 25) + '...'
    }
  }
})

module.exports = Review;
