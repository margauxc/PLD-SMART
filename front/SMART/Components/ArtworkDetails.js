import React from 'react'
import { View, Text, Image, StyleSheet, Button, ScrollView, ActivityIndicator, Alert, Linking } from 'react-native'
import { depositArtwork } from '../API/APIDeposit'
import Geolocation from 'react-native-geolocation-service'
import {linkText} from '../Utils/ExternalLink'

class ArtworkDetails extends React.Component {

    constructor(props) {
        super(props)
        this.state = { isLoading: true }
    }

    componentDidMount() {
        this.setState({
            isLoading: false
        })
    }

    _displayLoading() {
        if (this.state.isLoading) {
            // Si isLoading vaut true, on affiche le chargement à l'écran
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    _createAlertOK = () => {
        Alert.alert(
            "Succès",
            "L'oeuvre " + this.props.navigation.state.params.artwork.name + " a été ajoutée à la map ! ",
            [
                { text: "OK", onPress: () => this.props.navigation.navigate('Home') }
            ],
            { cancelable: false }
        )
    }

    _createAlertError = () => {
        Alert.alert(
            "Échec",
            "Une erreur s'est produite. L'oeuvre " + this.props.navigation.state.params.artwork.name + " n'a pas été ajoutée à la map.",
            [
                { text: "OK", onPress: () => this.props.navigation.navigate('Home') }
            ],
            { cancelable: false }
        )
    }

    _onPress = (artwork) => {
        Geolocation.getCurrentPosition((position) => {
            depositArtwork(artwork.ArtworkId, position).then((response) => {
                if (response.ok) {
                    this._createAlertOK()
                } else {
                    this._createAlertError()
                }
            })
        }, (error) => {
            this._createAlertError()
        })
    }

    _displayLink = (artwork) => {
        if('url' in artwork && artwork.url != null && artwork.url.length>0) {
            return <Text style = {{color : 'blue', textDecorationLine : 'underline'}} onPress = {() => Linking.openURL(artwork.url)}>{linkText[artwork.category]}</Text>
        }
    }

    render() {
        const artwork = this.props.navigation.state.params.artwork
        return (
            <View style={styles.main_container}>

                {artwork.pictureLink == null ?
                    <Image source={require('../assets/imagefiller.jpg')} style={styles.image} />
                    : <Image source={{ uri: artwork.pictureLink }} style={styles.image} />
                }

                <ScrollView contentContainerStyle={styles.scroll_view}>
                    <View style={styles.text_container}>
                        <Text style={styles.name_text}>{artwork.name}</Text>
                        <Text style={styles.artist_text}>{artwork.artist}</Text>
                        <Text style={styles.year_text}>{artwork.year}</Text>
                        <Text style={styles.more_info}>{artwork.more_info}</Text>
                        {this._displayLink(artwork)}
                    </View>
                    <Button title="Ajouter à la carte" color='orange' onPress={() => this._onPress(artwork)} />
                </ScrollView>

                {this._displayLoading()}

                
            </View>
        )
    }


}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    otherView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
    },
    image: {
        height: "45%",
        aspectRatio: 1,
        marginTop: 20,
        marginBottom: 20
    },
    scroll_view: {
        flexGrow: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
        padding: '10%'
    },
    text_container: {
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        marginBottom: 30
    },
    name_text: {
        fontSize: 35,
        color: 'orange'
    },
    artist_text: {
        fontSize: 25
    },
    year_text: {
        fontSize: 20,
        color: 'darkgrey'
    },
    more_info: {
        fontSize: 20,
        color: 'darkgrey',
        marginBottom : 10
    },
    loading_container: {
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 0,
        top: 100,
        alignItems: 'center',
        justifyContent: 'center'
    }

})


export default ArtworkDetails