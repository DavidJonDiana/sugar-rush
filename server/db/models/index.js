const User = require('./user')
const Review = require('./review')
const Product = require('.product')
const Order = require('./order')
const OrderedProduct = require('./orderedProduct')

Review.belongsTo(User);
User.hasMany(Review);

Review.belongsTo(Product);
Product.hasMany(Review);

Order.belongsTo(User);

OrderedProduct.belongsTo(Order);
Order.hasMany(OrderedProduct);


OrderedProduct.belongsTo(Product);


/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User
}
