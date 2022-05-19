import React, { Component } from 'react';
import { getUser } from '../../services/userAPI';

class Header extends Component {
  state = {
    user: '',
    isLoading: false,
  };

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    const retornUser = await getUser();
    this.setState({ user: retornUser, isLoading: false });
  }

  render() {
    const { user: { name }, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        <div data-testid="header-user-name">
          { isLoading ? <p>Carregando...</p> : (
            <p>{ name }</p>
          )}
        </div>
      </header>
    );
  }
}

export default Header;