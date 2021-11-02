import React, { PureComponent } from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

var placeholderImage = require('../assets/images/placeholder.png');

var styles = StyleSheet.create({
  container: {
    padding: 5,
    position: 'relative',
    alignItems: 'center',
    height: 200,
    marginBottom: 7
  },
  movieImage: {
    height: 200,
    width: 120,
    borderRadius: 15
  },
  movieName: {
    position: 'absolute',
    width: 100,
    textAlign: 'center',
    top: 10
  }
});

var propTypes = {
  item: PropTypes.object,
  navigation: PropTypes.object
};

class Card extends PureComponent {
  render() {
    var { item: movie, navigation } = this.props;

    var imageSource = movie.poster_path
      ? { uri: 'https://image.tmdb.org/t/p/w500'.concat(movie.poster_path) }
      : placeholderImage;

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate('Detail', { movieId: movie.id })}>
        <Image
          resizeMethod="auto"
          style={styles.movieImage}
          source={imageSource}
        />
        {!movie.poster_path && (
          <Text style={styles.movieName}>{movie.title}</Text>
        )}
      </TouchableOpacity>
    );
  }
}

Card.propTypes = propTypes;

export default Card;
