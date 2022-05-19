import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    name: '',
    isDisable: true,
    isLoading: false,
    albuns: [],
  };

  handleClick = async () => {
    const { name } = this.state;
    this.setState({ isLoading: true });
    const banda = await searchAlbumsAPI(name);
    this.setState({ albuns: banda, isLoading: false });
  }

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
    const { isDisable, name, isLoading, albuns } = this.state;
    console.log(albuns);
    return isLoading ? (
      <Loading />
    ) : (
      <div>
        <div data-testid="page-search">
          <Header />
          <form className="login_form">
            <input
              name="name"
              value={ name }
              type="text"
              placeholder="Nome da Banda"
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
        { albuns.map((disco) => disco.collectionName)}
      </div>
    );
  }
}

export default Search;
