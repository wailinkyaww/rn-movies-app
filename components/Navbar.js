import React, { PureComponent } from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

var movieLogo = require('../assets/images/movies.png');

var propTypes = {
  main: PropTypes.bool
};

var defaultProps = {
  main: false
};

var styles = StyleSheet.create({
  mainNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center'
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 50
  }
});

class Navbar extends PureComponent {
  render() {
    var { navigation, main } = this.props;

    return (
      <SafeAreaView>
        {main ? (
          <View style={styles.mainNav}>
            <Image style={styles.logo} source={movieLogo} />
            <TouchableOpacity>
              <Icon
                name={'search-outline'}
                size={30}
                onPress={() => {
                  navigation.navigate('Search');
                }}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity>
              <Icon
                name={'chevron-back'}
                size={40}
                onPress={() => navigation.goBack()}
              />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

Object.assign(Navbar, { propTypes });
Object.assign(Navbar, { defaultProps });

export default Navbar;
