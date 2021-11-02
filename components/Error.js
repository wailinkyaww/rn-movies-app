import React, { PureComponent } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

var propTypes = {
  errorText1: PropTypes.string,
  errorText2: PropTypes.string
};

var defaultProps = {
  errorText1: 'Oops! Something went wrong.',
  errorText2: 'Make sure you are online and restart the App.'
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontWeight: 'bold'
  }
});

class Error extends PureComponent {
  render() {
    var { errorText1, errorText2 } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{errorText1}</Text>
        <Text style={styles.text}>{errorText2}</Text>
      </View>
    );
  }
}

Object.assign(Error, { propTypes, defaultProps });

export default Error;
