import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    isChecked: false,
    isLoading: false,
  }

  componentDidMount = async () => {
    const { isFavorite } = this.props;
    this.setState({
      isChecked: isFavorite,
    });
  }

  handleChange = async ({ target }) => {
    const { checked } = target;
    const { trackId } = this.props;
    this.setState({ isChecked: checked, isLoading: true });
    const trackSong = await getMusics(trackId);
    if (checked) {
      await addSong(trackSong[0]);
    } else {
      await removeSong(trackSong[0]);
    }
    this.setState({ isLoading: false });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isLoading, isChecked } = this.state;
    return (
      isLoading ? <Loading /> : (
        <div className="music_card">
          <span>{ trackName }</span>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <label htmlFor="favorite_music">
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              name="favorite_music"
              onChange={ this.handleChange }
              checked={ isChecked }
            />
            Favorita
          </label>
        </div>
      )
    );
  }
}
MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

export default MusicCard;
