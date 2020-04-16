// In App.js in a new project

import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ArtworkChoice from './Components/ArtworkChoice'
import Search from './Components/Search'

const Stack = createStackNavigator();

function App() {
  return (
    <Search/>
    /*<NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Search" component = {Search} options = {{title : 'Rechercher une oeuvre'}} />
      </Stack.Navigator>
    </NavigationContainer>*/
  );
}


export default App;