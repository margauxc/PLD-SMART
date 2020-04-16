import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'

class ArtworkChoice extends React.Component{
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>Vous souhaitez ajouter</Text>
              <Button title="Un texte"></Button>
              <Button title="Une oeuvre d'art existante"></Button>
              <Button title="Annuler"></Button>
            </View>
          );
        }
}

export default ArtworkChoice;