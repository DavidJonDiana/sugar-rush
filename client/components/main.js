import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link } from 'react-router-dom'
import { Menu, Button, Header } from 'semantic-ui-react';
import {logout} from '../store'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
export class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeItem: ''
    }
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  handleItemClick(event, { name }) {
    this.setState({ activeItem: name })
  }

  render() {
    const {children, handleClick, isLoggedIn} = this.props
    const { activeItem } = this.state
    return (
      <div>
        <Header as="h1" textAlign="center">Sugar Rush</Header>
        <Header as="h2" textAlign="center">Online Candy Shop</Header>
        <Menu stackable size="huge">
          <Menu.Item>
            <img src="/Lollipop.png" />
          </Menu.Item>
          <Menu.Item as={ Link } to="/"
            name="Home"
            active={activeItem === 'Home'}
            onClick={this.handleItemClick}
          />
          {
            isLoggedIn
              ? <Menu.Menu>
                  <Menu.Item as={ Link } to="/my-profile"
                    name="My Profile"
                    active={activeItem === 'My Profile'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item as={ Link } to="/my-cart"
                    name="My Cart"
                    active={activeItem === 'My Cart'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item floated="right">
                    <Button primary onClick={handleClick} floated="right">Log Out</Button>
                  </Menu.Item>
                </Menu.Menu>
              : <Menu.Menu>
                <Menu.Item as={ Link } to="/login"
                  name="Login"
                  active={activeItem === 'Login'}
                  onClick={this.handleItemClick}
                />
                <Menu.Item as={ Link } to="/signup"
                  name="Signup"
                  active={activeItem === 'Signup'}
                  onClick={this.handleItemClick}
                />
              </Menu.Menu>
          }
        </Menu>
        <hr />
        {children}
      </div>
    )

  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
