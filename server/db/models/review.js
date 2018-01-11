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
      len: [40, 400]
    }
  },
  recommended: {
    type: Sequelize.BOOLEAN
  }
  // OB/AZ: dead code below, keep it out of master, you might put the code below into an issue
  // title: {
  //   type: Sequelize.VIRTUAL,
  //   get() {
  //     return this.dataValue('textReview').slice(0, 25) + '...'
  //   }
  // }
})

module.exports = Review;
