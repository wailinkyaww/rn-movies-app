import React, { PureComponent } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

var styles = StyleSheet.create({
  playButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: 'blue',
    padding: 9
  }
});

export default class PlayButton extends PureComponent {
  render() {
    var { handlePress = v => v } = this.props;

    return (
      <Pressable onPress={handlePress} style={styles.playButton}>
        <Icon name={'caret-forward-outline'} size={30} color={'white'} />
      </Pressable>
    );
  }
}
