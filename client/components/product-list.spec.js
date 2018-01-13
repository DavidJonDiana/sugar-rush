import { expect } from 'chai'
import { makeCategories } from './product-list'

describe('create categories function', () => {
  const products = [
    {
      title: 'A Candy',
      category: 'chocolate'
    },
    {
      title: 'B Candy',
      category: 'chocolate'
    },
    {
      title: 'C Candy',
      category: 'sweet'
    }]

  const categories = makeCategories(products)

  it('returns an array of all the categories', () => {
    expect(categories).to.be.deep.equal(['chocolate', 'sweet'])
  })
})
