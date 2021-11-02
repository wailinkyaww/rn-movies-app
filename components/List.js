import React, { PureComponent } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Card from './Card';

var styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    paddingBottom: 10
  },
  list: {
    marginTop: 25
  }
});

var propTypes = {
  title: PropTypes.string,
  content: PropTypes.arrayOf(PropTypes.object)
};

class List extends PureComponent {
  render() {
    var { title, content, navigation } = this.props;

    return (
      <View style={styles.list}>
        <View>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View>
          <FlatList
            data={content}
            horizontal={true}
            renderItem={({ item: movie }) => (
              <Card item={movie} navigation={navigation} />
            )}
          />
        </View>
      </View>
    );
  }
}

Object.assign(List, { propTypes });

export default List;
