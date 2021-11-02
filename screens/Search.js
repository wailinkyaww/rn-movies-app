import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  FlatList
} from 'react-native';
import Card from '../components/Card';
import Error from '../components/Error';
import { searchMovieOrTv } from '../services/services';

var styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingTop: 30
  },
  input: {
    height: 50,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 4
  },
  searchItems: {
    alignItems: 'center',
    marginTop: 20
  },
  empty: {
    fontWeight: 'bold'
  }
});

export default function Search({ navigation }) {
  var [text, onChangeText] = useState('');
  var [searchResults, setSearchresults] = useState([]);
  var [error, setError] = useState(null);

  useEffect(() => {
    if (text && typeof text == 'string' && text.length > 0) {
      setTimeout(() => {
        searchMovieOrTv(text)
          .then(setSearchresults)
          .catch(error => {
            console.log('error:', error);
            setError(error);
          });
      }, 250);
    }
  }, [text]);

  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <TextInput
            onChangeText={onChangeText}
            style={styles.input}
            placeholder={'Search movie, tv shows etc...'}
          />
        </View>
        <View style={styles.searchItems}>
          {text == '' ? (
            <View>
              <Text>Type something to search.</Text>
            </View>
          ) : searchResults.length > 0 ? (
            <FlatList
              numColumns={3}
              data={searchResults}
              keyExtractor={item => item.id}
              renderItem={({ item: movie }) => {
                return <Card navigation={navigation} item={movie} />;
              }}
            />
          ) : (
            <View style={styles.empty}>
              <Text>No results matching your keyword.</Text>
              <Text>Try searching different keywords.</Text>
            </View>
          )}

          {error && <Error />}
        </View>
      </SafeAreaView>
    </>
  );
}
