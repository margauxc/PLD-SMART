import React from 'react'
import { StyleSheet, View, Text, Image, ActivityIndicator, TouchableOpacity, Alert , ScrollView , Linking , Button} from 'react-native'

import { getArtworkDeposit } from '../API/APIGetArtworkDeposits'
import { reportDeposit } from '../API/APIReport'
import {standardizeArtwork} from '../Utils/StandardizeArtworks'

import {linkText} from '../Utils/ExternalLink'


class Consult extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            artworkDeposit: []
        }
    }

    componentDidMount() {
        this._getArtworkDepositDetails(this.props.navigation.getParam('depositId'))
    }

   

    _createAlertOK() {
        Alert.alert(
            "Succès",
            "L'oeuvre a été signalée",
            [
                { text: "OK", onPress: () => this.props.navigation.navigate('Home') }
            ],
            { cancelable: false }
        )
    }

    _createAlertError() {
        Alert.alert(
            "Échec",
            "Une erreur s'est produite. L'oeuvre n'a pas été signalée",
            [
                { text: "OK" }
            ],
            { cancelable: false }
        )
    }

    _reportDeposit(){
        reportDeposit(this.props.navigation.getParam('depositId'), "name").then((response) => {
                if (response.ok) {
                    this._createAlertOK()
                } else {
                    this._createAlertError()
                }
            }).catch((error) => {
                this._createAlertError()
            });
    }

    _getArtworkDepositDetails(id) {
        getArtworkDeposit(id).then((data) => {
            console.log("data = " + JSON.stringify(data))
            var result = {}
            result = standardizeArtwork(data)
            result.createdAt = data.createdAt
            result.owner = result.owner
            console.log("result = " , result)
            this.setState({ artworkDeposit: result, isLoading: false })
        })
    }

    _displayLink = (artworkDeposit) => {
        if('url' in artworkDeposit && artworkDeposit.url != null && artworkDeposit.url.length>0) {
            return <Text style = {{color : 'blue', textDecorationLine : 'underline'}} onPress = {() => Linking.openURL(artworkDeposit.url)}>{linkText[artworkDeposit.category]}</Text>
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size='large' />
                </View>
            )
        } else {

            var createdAt = new Date(this.state.artworkDeposit.createdAt)
            const artworkDeposit = this.state.artworkDeposit
            return(
            <View style={styles.main_container}>

                <Text style={styles.dateText}>Ajoutée le {createdAt.getDate()}/{createdAt.getMonth() + 1}/{createdAt.getFullYear()} par {this.state.artworkDeposit.owner}</Text>    

                {(artworkDeposit.category != "freeText") && (
                    artworkDeposit.pictureLink == null ?
                    <Image source={require('../assets/imagefiller.jpg')} style={styles.image} />
                    : <Image source={{ uri: artworkDeposit.pictureLink }} style={styles.image} />
                
                )
                }

                <ScrollView contentContainerStyle={styles.scroll_view}>
                    <View style={styles.text_container}>
                        <Text style={styles.name_text}>{artworkDeposit.name}</Text>
                        <Text style={styles.artist_text}>{artworkDeposit.artist}</Text>
                        <Text style={styles.year_text}>2020</Text>
                        <Text style={styles.more_info}>{artworkDeposit.more_info}</Text>
                        {this._displayLink(artworkDeposit)}
                    </View>
                    <Button title="Signaler cette oeuvre" color = 'red' onPress={() => { this._reportDeposit() }}/>
                </ScrollView>                
            </View>
            )










            var createdAt = new Date(this.state.artworkDeposit.createdAt)
            if (this.state.artworkDeposit.category == "freeText") {
                return (
                    <View style={styles.mainContainer}>

                        <View style={styles.borderText}>
                            <Text style={styles.dateText}>Ajoutée le {createdAt.getDate()}/{createdAt.getMonth() + 1}/{createdAt.getFullYear()} par {this.state.artworkDeposit.owner}</Text>
                        </View>

                        <View style={styles.borderImage}>
                            <Text style={styles.dateText}>{this.state.artworkDeposit.name} - {this.state.artworkDeposit.author}</Text>
                        </View>

                        <Text style={{marginBottom : "5%"}}>{this.state.artworkDeposit.text}</Text>

                        <TouchableOpacity style={styles.cancelButton} onPress={() => { this._reportDeposit() }}>
                                <Text style={styles.buttonText}>Signaler</Text>
                        </TouchableOpacity>

                    </View>
                )
            } else if (this.state.artworkDeposit.category == "music") {
                return (
                    <View style={styles.mainContainer}>

                        <View style={styles.borderText}>
                            <Text style={styles.dateText}>Ajoutée le {createdAt.getDate()}/{createdAt.getMonth() + 1}/{createdAt.getFullYear()} par {this.state.artworkDeposit.owner}</Text>
                        </View>

                        <View style={styles.borderImage}>
                            { this.state.artworkDeposit.pictureLink == null ?
                                <Image source={require('../assets/imagefiller.jpg')} style={styles.logo} />
                                : <Image
                                    style={styles.logo}
                                    source={{ uri: this.state.artworkDeposit.pictureLink }}
                                />
                            }
                            <Text style={styles.dateText}>{this.state.artworkDeposit.name} - {this.state.artworkDeposit.artist}</Text>
                        </View>

                        {this._displayMusicAlbum()}

                        {this._displayMusicDescription()}

                        <TouchableOpacity style={styles.cancelButton} onPress={() => { this._reportDeposit() }}>
                                <Text style={styles.buttonText}>Signaler</Text>
                        </TouchableOpacity>

                    </View>
                )
            } else if(this.state.artworkDeposit.category == "movie") {
                return (
                    <View style={styles.mainContainer}>

                        <View style={styles.borderText}>
                            <Text style={styles.dateText}>Ajoutée le {createdAt.getDate()}/{createdAt.getMonth() + 1}/{createdAt.getFullYear()} par {this.state.artworkDeposit.owner}</Text>
                        </View>

                        <View style={styles.borderImage}>
                            { this.state.artworkDeposit.pictureLink == null ?
                                <Image source={require('../assets/imagefiller.jpg')} style={styles.logo} />
                                : <Image
                                    style={styles.logo}
                                    source={{ uri: this.state.artworkDeposit.pictureLink }}
                                />
                            }
                            <Text style={styles.dateText}>{this.state.artworkDeposit.name} - {this.state.artworkDeposit.director}</Text>
                        </View>

                        <Text style={{width : "90%", marginBottom : "5%"}}>{this.state.artworkDeposit.description}</Text>

                        <TouchableOpacity style={styles.cancelButton} onPress={() => { this._reportDeposit() }}>
                                <Text style={styles.buttonText}>Signaler</Text>
                        </TouchableOpacity>

                    </View>
                )
            } else if(this.state.artworkDeposit.category == "museum") {
                return (
                    <View style={styles.mainContainer}>
                        
                        <View style={styles.borderText}>
                            <Text style={styles.dateText}>Ajoutée le {createdAt.getDate()}/{createdAt.getMonth() + 1}/{createdAt.getFullYear()} par {this.state.artworkDeposit.owner}</Text>
                        </View>

                        <View style={styles.borderImage}>
                            { this.state.artworkDeposit.pictureLink == null ?
                                <Image source={require('../assets/imagefiller.jpg')} style={styles.logo} />
                                : <Image
                                    style={styles.logo}
                                    source={{ uri: this.state.artworkDeposit.pictureLink }}
                                />
                            }
                            <Text style={styles.dateText}>{this.state.artworkDeposit.name} - {this.state.artworkDeposit.artist}</Text>
                        </View>

                        <Text>Classification : {this.state.artworkDeposit.classification}</Text>

                        <Text>Medium : {this.state.artworkDeposit.medium}</Text>

                        <Text style={{marginBottom : "5%"}}>{this.state.artworkDeposit.description}</Text>

                        <TouchableOpacity style={styles.cancelButton} onPress={() => { this._reportDeposit() }}>
                                <Text style={styles.buttonText}>Signaler</Text>
                        </TouchableOpacity>

                    </View>
                )
            }
        }
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
    dateText : {
        fontSize : 25,
        margin : '5%'
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
    loadingContainer: {
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 0,
        top: 100,
        alignItems: 'center',
        justifyContent: 'center'
    }

})

export default Consult