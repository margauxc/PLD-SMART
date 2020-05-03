import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { withNavigationFocus } from 'react-navigation'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
/* Code temporaire qui sera remplacé par la map */
import { FlatList } from 'react-native'
/* -------------------------------------------- */

import { getArtworkDeposits } from '../API/APIGetArtworkDeposits'

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            artworkDeposits: [],
        }
    }

    componentDidMount() {
        this._getArtworkDeposits()
    }

    componentDidUpdate(prevProps) {
        if (this.props.isFocused && !prevProps.isFocused) {
            this._getArtworkDeposits()
        }
    }

    _getArtworkDeposits() {
        getArtworkDeposits().then((data) => {
            this.setState({ artworkDeposits: data })
        })
    }

    render() {
        return (
            <MapView
                style={{ flex: 1 }}
                provider={PROVIDER_GOOGLE}
                showsUserLocation
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
            />
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

export default withNavigationFocus(Home)