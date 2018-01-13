import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { SingleProductDetails } from './single-product-details'


const adapter = new Adapter()
enzyme.configure({ adapter })

describe('SingleProductDetails component', () => {

  let fakeComponent, currentProduct;
  beforeEach('', () => {
    currentProduct = {
      imageUrl: 'http://fillmurray.com/200/300',
      title: 'Some Title',
      description: 'this is a description',
      category: 'apples',
      price: 4.99
    };
    fakeComponent = shallow(<SingleProductDetails currentProduct={currentProduct} getCurrentProduct={(id)=> id} match={{params: {id: 1}}} />)
  });

  it('renders correct title', () => {
    expect(fakeComponent.find('h2').text()).to.be.equal('Some Title');
  })

})

