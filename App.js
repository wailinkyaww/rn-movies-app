import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainNavigation from './components/MainNavigation';

var App = () => {
  return (
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
  );
};

export default App;
