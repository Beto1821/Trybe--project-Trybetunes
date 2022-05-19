import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    name: '',
    isDisable: true,
  };

  valiHandle = () => {
    const { name } = this.state;
    const number = 2;
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
    const { isDisable, name } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form className="login_form">
          <input
            name="name"
            value={ name }
            type="text"
            placeholder="Banda"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isDisable }
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
