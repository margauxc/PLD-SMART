import React from 'react'
import { StyleSheet, View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native'

import { getArtworkDeposit } from '../API/APIGetArtworkDeposits'

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

                        <TouchableOpacity style={styles.cancelButton} onPress={() => { this.props.navigation.goBack() }}>
                                <Text style={styles.buttonText}>Signaler le texte</Text>
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
                            <Image
                                style={styles.logo}
                                source={{ uri: this.state.artworkDeposit.pictureLink }}
                            />
                            <Text style={styles.dateText}>{this.state.artworkDeposit.name} - {this.state.artworkDeposit.artist}</Text>
                        </View>

                        {this._displayMusicAlbum()}

                        {this._displayMusicDescription()}

                        <TouchableOpacity style={styles.cancelButton} onPress={() => { this.props.navigation.goBack() }}>
                                <Text style={styles.buttonText}>Signaler le texte</Text>
                        </TouchableOpacity>

                    </View>
                )
            } else { // TODO : les autres catégories
                return (
                    <View style={styles.mainContainer}>
                        <Text>TODO : les autres catégories</Text>
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
        fontWeight: "bold"
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
        width: "50%",
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