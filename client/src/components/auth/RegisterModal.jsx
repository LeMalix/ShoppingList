import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from 'reactstrap';
import { connect } from 'react-redux';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends Component {
  state = {
    modal: false,
    name: '',
    email: '',
    password: '',
    msg: null,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    const { modal } = this.state;
    if (error !== prevProps.error) {
      if (error.id === 'REGISTER_FAIL') {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ msg: error.msg });
      } else {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ msg: null });
      }
    }

    // If authenticated, close modal
    if (modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    const { modal } = this.state;
    if (modal) {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.clearErrors();
      this.setState({
        name: '',
        email: '',
        password: '',
      });
    }
    this.setState({
      modal: !modal,
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;

    const newUser = { name, email, password };

    // attempt to register
    // eslint-disable-next-line react/destructuring-assignment
    this.props.register(newUser);

    // If authenticated, close modal
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      this.toggle();
    }
  }

  render() {
    const {
      modal,
      name,
      email,
      password,
      msg,
    } = this.state;
    return (
      <div>
        <NavLink onClick={this.toggle} href="#!">
          Register
        </NavLink>

        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Register
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              { msg ? <Alert color="danger">{msg}</Alert> : null }
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  onChange={this.onChange}
                  value={name}
                />
              </FormGroup>

              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@email.com"
                  onChange={this.onChange}
                  value={email}
                />
              </FormGroup>

              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={this.onChange}
                  value={password}
                />
              </FormGroup>

              <FormGroup>
                <Button
                  color="dark"
                  block
                >
                  Register
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

RegisterModal.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.PropTypes.shape({
    msg: PropTypes.string,
    status: PropTypes.number,
    id: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(
  mapStateToProps,
  { register, clearErrors },
)(RegisterModal);
