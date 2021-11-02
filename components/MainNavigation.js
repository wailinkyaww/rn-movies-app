import React, { PureComponent } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Navbar from './Navbar';
import Home from '../screens/Home';
import Detail from '../screens/Detail';
import Search from '../screens/Search';

var Stack = createNativeStackNavigator();

export default class MainNavigation extends PureComponent {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTransparent: true,
            header: props => <Navbar {...props} main={true} />
          }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            headerTransparent: true,
            header: props => <Navbar {...props} />
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerTransparent: true,
            header: props => <Navbar {...props} />
          }}
        />
      </Stack.Navigator>
    );
  }
}
