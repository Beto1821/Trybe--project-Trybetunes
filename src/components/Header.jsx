import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    user: '',
    isLoading: false,
  };

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    const retornUser = await getUser();
    this.setState({ user: retornUser, isLoading: false });
  };

  render() {
    const {
      user: { name },
      isLoading,
    } = this.state;

    return isLoading ? (
      <Loading />
    ) : (
      <header data-testid="header-component">
        <nav>
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
          <span>|</span>
          <nav data-testid="header-user-name">{name}</nav>
        </nav>
      </header>
    );
  }
}

export default Header;
