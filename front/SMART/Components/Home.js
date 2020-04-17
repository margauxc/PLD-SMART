import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'

class Home extends React.Component{
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text>Ici il y aura une map</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => {this.props.navigation.navigate('ArtworkChoice')}}>
          <Text style={styles.textButton}>+</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    right: 30,
    bottom: 30,
    borderRadius: 30,
    backgroundColor: '#e67e22',
    alignItems: 'center'
  },
  textButton: {
    fontSize: 40,
    color: '#fff'
  }
})

export default Home