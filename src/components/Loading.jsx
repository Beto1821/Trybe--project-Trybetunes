import React from 'react';
import loadingGIF from '../assets/loading.gif';

class Loading extends React.Component {
  render() {
    return (
      <div className="loading">
        <img src={ loadingGIF } alt="carregando" />
        <p>Carregando...</p>
      </div>
    );
  }
}

export default Loading;
