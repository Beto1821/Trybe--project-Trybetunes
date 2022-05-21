import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Album extends React.Component {
  state = {
    isLoading: false,
    musicDetails: [],
  };

 componentDidMount = async () => {
   this.getMusicList();
 }

  getMusicList = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.setState({ isLoading: true });
    const musicsList = await getMusics(id);
    const musicDetails = musicsList
      .map(
        ({
          previewUrl,
          trackName,
          artworkUrl100,
          collectionName,
          artistName,
          trackId,
        }) => ({
          previewUrl, trackName, artworkUrl100, collectionName, artistName, trackId,
        }),
      );
    this.setState({ isLoading: false, musicDetails });
  };

  render() {
    const { isLoading, musicDetails } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { isLoading && (
          <Loading />
        )}
        { musicDetails.length > 0 && (
          <div>
            <img src={ musicDetails[0].artworkUrl100 } alt="you knowww!" />
            <h1 data-testid="album-name">{ musicDetails[0].collectionName }</h1>
            <h1 data-testid="artist-name">{ musicDetails[0].artistName }</h1>
          </div>
        )}
        { musicDetails
          .filter(({ previewUrl }) => previewUrl)
          .map(({ trackName, previewUrl, trackId }, index) => (
            <MusicCard
              key={ index }
              trackName={ trackName }
              previewUrl={ previewUrl }
              trackId={ trackId }
            />
          ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
