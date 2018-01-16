/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Product = db.model('product');

describe('Product routes', () => {
    beforeEach(() => {
        return db.sync({force: true})
    })

    describe('/api/products/', () => {

        beforeEach(() => {
            return Product.create({
                title: 'test product',
                price: 3.99,
                imageUrl: 'http://fillmurray.com/200/300',
                inventoryQuantity: 100,
                category: 'dont matter'
            })
        })
    //OB/AZ - Maybe make more products to test
        it('GET /api/products', () => {
            return request(app)
            .get('/api/products')
            .expect(200)
            .then(res => {
              expect(res.body).to.be.an('array')
              expect(res.body.length).to.equal(1)
              expect(res.body[0].title).to.equal('test product')
              expect(res.body[0].price).to.equal(3.99)
            })
        })
    })

})
