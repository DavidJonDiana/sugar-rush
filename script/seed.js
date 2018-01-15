/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {User, Product, Order, OrderedProducts} = require('../server/db/models')
const chance = require('chance').Chance()
const Promise = require('bluebird')

function createUsers(num) {
  const userModelArray = []
  let admin = User.build({
    firstName: 'Big',
    lastName: 'O',
    email: 'big@o.com',
    password: '123',
    isAdmin: true
  })

  userModelArray.push(admin)
  for (let i = 0; i < num; i++) {
    let user = User.build({
      firstName: chance.first(),
      lastName: chance.last(),
      email: chance.email(),
      password: '123'
    })
    userModelArray.push(user)
  }

  return userModelArray
}

function createProducts(num) {
  const productModelArray = []
  for (let i = 0; i < num; i++) {
    let product = Product.build({
      title: chance.animal() + ' candy',
      description: chance.sentence(),
      price: chance.integer({min: 100, max: 20000}),
      inventoryQuantity: chance.integer({min: 0, max: 500}),
      category: chance.pickone(['chocolate', 'sweet', 'strange', 'gum', 'normal'])
    })
    productModelArray.push(product)
  }
  return productModelArray
}

function createOrders(num, users, products) {
  const orderModelArray = []
  for (let i = 0; i < num; i++) {
    const order = Order.build({
      completed: chance.bool(),
      shipped: false,
      shippingAddress: chance.address(),
    })
    order.payment = Order.createPayment('1234123412341234', '12/2010')
    const user = chance.pickone(users)
    order.setUser(user)
    order.email = user.email
    orderModelArray.push(order)
  }
  return orderModelArray
}

function createOrderedProducts(orders, products) {
  const OrderedProductsArray = []
  let product1 = chance.pickone(products)
  let product2 = chance.pickone(products)
  orders.forEach(order => {
    let orderedProduct1 = OrderedProducts.build({
      quantity: chance.integer({min: 1, max: 10}),
      itemPrice: product1.price
    })
    orderedProduct1.setProduct(product1)
    orderedProduct1.setOrder(order)
    OrderedProductsArray.push(orderedProduct1)

    let orderedProduct2 = OrderedProducts.build({
      quantity: chance.integer({min: 1, max: 10}),
      itemPrice: product2.price
    })
    orderedProduct2.setProduct(product2)
    orderedProduct2.setOrder(order)
    OrderedProductsArray.push(orderedProduct2)
  })
  return OrderedProductsArray
}

function createReviews(num) {

}

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.map(createUsers(10), instance => instance.save())

  const products = await Promise.map(createProducts(30), instance => instance.save())

  const orders = await Promise.map(createOrders(10, users, products), instance => instance.save())

  const orderedProducts = await Promise.map(createOrderedProducts(orders, products), instance => instance.save())

  const orderTotals = await Promise.map(orders, order => order.getTotal())

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users and ${products.length} products`)
  console.log('order totals: ', orderTotals)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
