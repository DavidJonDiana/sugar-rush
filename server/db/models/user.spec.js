/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('name getter', () => {
    let cody
    beforeEach(() => {
      return User.create({
        firstName: 'Cody',
        lastName: 'Coder',
        email: 'cody@puppybook.com',
        password: 'bones'
      })
        .then(user => {
          cody = user
        })
    })

    it('returns the correct value for name', () => {
      expect(cody.name).to.be.equal('Cody Coder')
    })

  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(() => {
        return User.create({
          firstName: 'Cody',
          lastName: 'Coder',
          email: 'cody@puppybook.com',
          password: 'bones'
        })
          .then(user => {
            cody = user
          })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
