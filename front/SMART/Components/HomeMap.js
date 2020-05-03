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
            latitude : 0,
            longitude : 0,
        }
        Geolocation.getCurrentPosition((position => {
            this.fillData(Number(position.coords.latitude), Number(position.coords.longitude));
            console.log(position.coords.latitude)
            console.log(position.coords.longitude)
        }))
       
    }

    fillData(lat, long){
        this.setState({latitude:Number(lat), longitude:Number(long)})
        console.log(this.state.latitude)
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
                region={{
                    latitude: Number(this.state.latitude),
                    longitude: Number(this.state.longitude),
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