import React from 'react'
import { StyleSheet, View, Text, Image, ActivityIndicator, TouchableOpacity, Alert } from 'react-native'

import { getArtworkDeposit } from '../API/APIGetArtworkDeposits'
import { reportDeposit } from '../API/APIReport'


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
            this.setState({ artworkDeposit: data, isLoading: false })
        })
    }

    _displayMusicAlbum() {
        if (this.state.artworkDeposit.album !== null) {
            return (
                <Text style={styles.musicAlbumText}>Album : {this.state.artworkDeposit.album}</Text>
            )
        }
    }

    _displayMusicDescription() {
        if (this.state.artworkDeposit.description !== null) {
            return (
                <Text>{this.state.artworkDeposit.description}</Text>
            )
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
            if (this.state.artworkDeposit.category == "freeText") {
                return (
                    <View style={styles.mainContainer}>

                        <View style={styles.borderText}>
                            <Text style={styles.dateText}>Ajoutée le {createdAt.getDate()}/{createdAt.getMonth() + 1}/{createdAt.getFullYear()}</Text>
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
                            <Text style={styles.dateText}>Ajoutée le {createdAt.getDate()}/{createdAt.getMonth() + 1}/{createdAt.getFullYear()}</Text>
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
            } else {
                return (
                    <View style={styles.mainContainer}>

                        <View style={styles.borderText}>
                            <Text style={styles.dateText}>Ajoutée le {createdAt.getDate()}/{createdAt.getMonth() + 1}/{createdAt.getFullYear()}</Text>
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
    borderText: {
        padding: "3%",
        borderWidth: 1,
        borderRadius: 10,
        alignItems: "center"
    },
    borderImage: {
        padding: "3%",
        alignItems: "center"
    },
    dateText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 90,
        height: 130,
        marginBottom: 10
    },
    loadingContainer: {
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 0,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    musicAlbumText: {
        marginBottom: 10
    },
    cancelButton: {
        height: "5%",
        width: "25%",
        backgroundColor: "red",
        borderRadius: 15,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "white",
        
    }
})

export default Consult