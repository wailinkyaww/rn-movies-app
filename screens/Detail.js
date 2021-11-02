import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  View,
  Modal
} from 'react-native';
import StarRating from 'react-native-star-rating';
import dateFormat from 'dateformat';
import PlayButton from '../components/PlayButton';
import Video from '../components/Video';
import Error from '../components/Error';
import { getMovie } from '../services/services';

var placeholderImage = require('../assets/images/placeholder.png');
var dimensions = Dimensions.get('screen');

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  movieImage: {
    height: dimensions.height / 3
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10
  },
  genresContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 15,
    marginBottom: 15
  },
  genre: {
    marginRight: 10,
    fontWeight: 'bold'
  },
  overview: {
    padding: 15
  },
  releaseDate: {
    fontWeight: 'bold'
  },
  playButton: {
    position: 'absolute',
    top: -25,
    right: 20
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default function Detail({ route, navigation }) {
  var { movieId } = route.params;

  var [movie, setMovie] = useState();
  var [loading, setLoading] = useState(true);
  var [error, setError] = useState(false);
  var [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getMovie(movieId)
      .then(setMovie)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [movieId]);

  function showVideo() {
    setModalVisible(true);
  }

  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <Error />
      ) : (
        <View>
          <ScrollView>
            <Image
              resizeMethod="auto"
              style={styles.movieImage}
              source={
                movie.poster_path
                  ? {
                      uri: 'https://image.tmdb.org/t/p/w500'.concat(
                        movie.poster_path
                      )
                    }
                  : placeholderImage
              }
            />
            <View style={styles.container}>
              <View style={styles.playButton}>
                <PlayButton handlePress={showVideo} />
              </View>
              <Text style={styles.movieTitle}>{movie.title}</Text>
              {movie.genres && (
                <View style={styles.genresContainer}>
                  {movie.genres.map(({ id, name }) => (
                    <Text style={styles.genre} key={id}>
                      {name}
                    </Text>
                  ))}
                </View>
              )}
              <StarRating
                disabled
                maxStars={5}
                starSize={30}
                rating={movie.vote_average / 2}
                fullStarColor={'gold'}
              />
              <Text style={styles.overview}>{movie.overview}</Text>
              <Text style={styles.releaseDate}>
                Release date: {dateFormat(movie.release_date, 'mmmm dd, yyyy')}
              </Text>
            </View>
          </ScrollView>
          <Modal animationType="slide" visible={modalVisible}>
            <View style={styles.videoModal}>
              <Video
                onClose={() => {
                  setModalVisible(false);
                }}
              />
            </View>
          </Modal>
        </View>
      )}
    </>
  );
}
