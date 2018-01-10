const {expect} = require('chai')
const db = require('../index')
const OrderedProducts = db.model('orderedProducts')

describe('Ordered Products model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('subtotal getter', () => {
    let newOrder
    beforeEach(() => {
      return OrderedProducts.create({
        quantity: 3,
        itemPrice: 1.50
      })
        .then(o => {
          newOrder = o
        })
    })

    it('gets the correct order subtotal', function() {
      expect(newOrder.subtotal).to.equal(4.5)
    })
  })
})
