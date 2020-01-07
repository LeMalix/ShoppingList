import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginModal from './auth/LoginModal';
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/logout';

class AppNavbar extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  }

  render() {
    const { auth: { isAuthenticated, user } } = this.props;
    const authLinks = (
      <>
        <NavItem>
          <Logout />
        </NavItem>
      </>
    );
    const guestLinks = (
      <>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </>
    );
    const welcome = (
      <>
        {user ? (
          <NavItem>
            <span className="navbar-text">
              <strong>{`Welcome ${user.name}`}</strong>
            </span>
          </NavItem>
        ) : null }
      </>
    );
    const { isOpen } = this.state;
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">ShoppingList</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                { welcome }
                <NavItem>
                  <NavLink href="https://github.com/LeMalix/ShoppingList" target="_blank">
                    GitHub
                  </NavLink>
                </NavItem>
                { isAuthenticated ? authLinks : guestLinks }
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

AppNavbar.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(AppNavbar);
