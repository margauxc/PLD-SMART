import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
/* Code temporaire qui sera remplacé par la map */
import { FlatList } from 'react-native'
/* -------------------------------------------- */

import { getArtworkDeposits } from '../API/APIGetArtworkDeposits'

class Home extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      artworkDeposits: []
    }
  }

  componentDidMount() {
    this._getArtworkDeposits()
  }

  _getArtworkDeposits() {
    getArtworkDeposits().then((data) => {
      this.setState({artworkDeposits : data})
    })
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        {/* Code temporaire qui sera remplacé par la map */}
        <FlatList
          data={this.state.artworkDeposits}
          keyExtractor={(item) => item.depositId}
          renderItem={({item}) => <Text>{item.depositId}</Text>}
        />
        {/* -------------------------------------------- */}
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