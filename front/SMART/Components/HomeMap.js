import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native'
import { withNavigationFocus } from 'react-navigation'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import Geolocation from 'react-native-geolocation-service'
import { getDistance } from 'geolib'

import { getArtworkDeposits } from '../API/APIGetArtworkDeposits'

class HomeMap extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            artworkDeposits: [],
            latitude: 0,
            longitude: 0,
            coordsComputed : false
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
        Geolocation.getCurrentPosition((position => {
            const distance = 2000
            getArtworkDeposits(Number(position.coords.latitude), Number(position.coords.longitude), distance).then((data) => {
                this.setState({ artworkDeposits: data })
            })
        }))
    }

    _fillData(lat, long) {
        this.setState({ latitude: Number(lat), longitude: Number(long), coordsComputed : true })
    }

    _consultDeposit(id, lat, long) {
        Geolocation.getCurrentPosition((position => {
            const distance = getDistance(
                { latitude: lat, longitude: long },
                { latitude: Number(position.coords.latitude), longitude: Number(position.coords.longitude) }
            )
            if(distance < 50) {
                this.props.navigation.navigate('Consult', { depositId: id })
            } else {
                Alert.alert(
                    "Plus près !",
                    "Vous devez être à proximité d'une oeuvre pour pouvoir la consulter.",
                    [
                        { text: "OK" }
                    ],
                    { cancelable: false }
                )
            }
        }))
    }

    render() {
        if(!this.state.coordsComputed){
            Geolocation.getCurrentPosition((position => {
                    this._fillData(Number(position.coords.latitude), Number(position.coords.longitude));
            }))
        }
        return (
            <View style={{flex: 1}}>
                <MapView
                    style={{flex: 1}}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation
                    region={{
                        latitude: Number(this.state.latitude),
                        longitude: Number(this.state.longitude),
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                >
                    {this.state.artworkDeposits.map(marker => (
                        <Marker
                            key={marker.depositId}
                            coordinate={{ latitude: marker.lat, longitude: marker.long}}
                            onPress={() => this._consultDeposit(marker.depositId, marker.lat, marker.long)}
                        />
                    ))}
                </MapView>
                <TouchableOpacity style={styles.addButton} onPress={() => { this.props.navigation.navigate('ArtworkChoice') }}>
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

export default withNavigationFocus(HomeMap)