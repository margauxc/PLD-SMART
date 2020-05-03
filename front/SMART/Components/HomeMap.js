import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { withNavigationFocus } from 'react-navigation'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service'

/* Code temporaire qui sera remplacé par la map */
import { FlatList } from 'react-native'
/* -------------------------------------------- */

import { getArtworkDeposits } from '../API/APIGetArtworkDeposits'

class Home extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            artworkDeposits: [],
            latitude: 0,
            longitude: 0,
        }
        Geolocation.getCurrentPosition((position => {
            this.fillData(Number(position.coords.latitude), Number(position.coords.longitude));

        }))

    }

    fillData(lat, long) {
        this.setState({ latitude: Number(lat), longitude: Number(long) })
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
                style={{ flex: 1, elevation : 1}}
                provider={PROVIDER_GOOGLE}
                showsUserLocation
                region={{
                    latitude: Number(this.state.latitude),
                    longitude: Number(this.state.longitude),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
            />
                /*<TouchableOpacity style={{position : 'absolute', bottom: 0, elevation : 10}} onPress={() => { this.props.navigation.navigate('ArtworkChoice') }}>
                    <Text style={styles.textButton}>+</Text>
                </TouchableOpacity>*/
            

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