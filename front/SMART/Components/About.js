import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

class About extends React.Component{
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text>Et là on peut mettre ce qu'on veut pour se vanter</Text>
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