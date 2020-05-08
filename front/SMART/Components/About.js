import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

class About extends React.Component{
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text>Application réalisée par l'hexanome H4211 lors du projet SMART.</Text>
        <Text></Text>
        <Text>L'équipe est composée de 6 membres :</Text>
        <Text>- Margaux Cavagna</Text>
        <Text>- Marius Lelouard</Text>
        <Text>- Manon Moreira</Text>
        <Text>- Mathieu Richelmy</Text>
        <Text>- Yoan Simiand-Cossin</Text>
        <Text>- Arthur Tondereau</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})


export default About