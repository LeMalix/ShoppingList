/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { logout } from '../../actions/authActions';

const Logout = (props) => (
  <>
    <NavLink onClick={props.logout} href="#!">
      Logout
    </NavLink>
  </>
);

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(
  null,
  { logout },
)(Logout);
