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
    clear: '',
  };

  handleClick = async () => {
    const { name } = this.state;
    this.setState({ isLoading: true });
    const banda = await searchAlbumsAPI(name);
    this.setState({ clear: name, name: '', albuns: banda, isLoading: false });
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
    const { isDisable, name, isLoading, albuns, clear } = this.state;
    return (
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
        { isLoading ? (
          <Loading />
        ) : (
          <h1>
            Resultado de álbuns de:
            {' '}
            { clear }
          </h1>
        )}
        {albuns.length === 0 ? (
          <h2> Nenhum álbum foi encontrado </h2>
        ) : (
          albuns.map((disco, key) => (
            <div key={ key }>
              { disco.collectionName }
            </div>
          ))
        )}
      </div>
    );
  }
}

export default Search;
