import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    name: '',
    isDisable: true,
    isLoading: false,
  };

  handleClick = async () => {
    const { name } = this.state;
    const { history } = this.props;
    this.setState({ isLoading: true });
    await createUser({ name });
    history.push('search');
  }

  valiHandle = () => {
    const { name } = this.state;
    const number = 3;
    if (name.length < number) {
      return this.setState({ isDisable: true });
    }
    return this.setState({ isDisable: false });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.valiHandle());
  };

  render() {
    const { isDisable, name, isLoading } = this.state;
    return (
      <div data-testid="page-login">
        { isLoading ? <p>Carregando...</p> : (
          <form>
            <input
              name="name"
              value={ name }
              type="text"
              placeholder="Nome"
              data-testid="login-name-input"
              onChange={ this.handleChange }
            />
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ isDisable }
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    );
  }
}
Login.propTypes = {
  history: PropTypes.string.isRequired,
};

export default Login;
