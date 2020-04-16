// In App.js in a new project

import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ArtworkChoice from './Components/ArtworkChoice'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ArtworkChoice" component={ArtworkChoice} options={{ title: 'Choix de l\'oeuvre' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;