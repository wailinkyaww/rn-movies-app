import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  ScrollView
} from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import List from '../components/List';
import Error from '../components/Error';
import {
  getPopularMovies,
  getPopularTV,
  getFamilyMovies,
  getDocumentaryMovies
} from '../services/services';

var dimensions = Dimensions.get('screen');

var styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sliderDotStyle: {
    display: 'none'
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

var getData = () =>
  Promise.all([
    getPopularMovies(),
    getFamilyMovies(),
    getPopularTV(),
    getDocumentaryMovies()
  ]);

function Home({ navigation }) {
  var [popularMovies, setPopularMovies] = useState([]);
  var [familyMovies, setFamilyMovies] = useState([]);
  var [documentaryMovies, setDocumentaryMovies] = useState([]);
  var [popularTv, setPopularTv] = useState([]);
  var [error, setError] = useState(null);
  var [loading, setLoading] = useState(true);

  useEffect(() => {
    getData()
      .then(([popularMovies, familyMovies, popularTv, documentaryMovies]) => {
        setPopularMovies(popularMovies);
        setFamilyMovies(familyMovies);
        setPopularTv(popularTv);
        setDocumentaryMovies(documentaryMovies);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  var sliderImages = popularMovies.map(m =>
    'https://image.tmdb.org/t/p/w500'.concat(m.poster_path)
  );

  var carouselList = [
    {
      title: 'Popular Movies',
      movies: popularMovies
    },
    {
      title: 'Popular TV Shows',
      movies: popularTv
    },
    {
      title: 'Family Movies',
      movies: familyMovies
    },
    {
      title: 'Documentary Movies',
      movies: documentaryMovies
    }
  ];

  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <Error />
      ) : (
        <ScrollView>
          {sliderImages && (
            <View style={styles.sliderContainer}>
              {error && <Text>{error.message}</Text>}
              <SliderBox
                images={sliderImages}
                sliderBoxHeight={dimensions.height / 1.5}
                dotStyle={styles.sliderDotStyle}
                autoplay
                circleLoop
              />
            </View>
          )}

          {carouselList.map(
            ({ title, movies }) =>
              movies.length > 0 && (
                <View style={styles.carousel} key={title}>
                  <List
                    title={title}
                    content={movies}
                    navigation={navigation}
                  />
                </View>
              )
          )}
        </ScrollView>
      )}
    </>
  );
}

export default Home;
