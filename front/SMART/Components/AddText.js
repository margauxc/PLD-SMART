import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import {sendText} from '../API/APIAddText'
import { depositArtwork } from '../API/APIDeposit'

class AddText extends React.Component {

    constructor(props) {
        super(props)
        this.author = ""
        this.name = ""
        this.searchedText = ""
    }

    _titleInputChanged(title) {
        this.name = title
    }

    _textInputChanged(text) {
        this.searchedText = text
    }

    _nameInputChanged(name) {
        this.author = name
    }

    _createAlertOK() {
        Alert.alert(
            "Succès",
            "L'oeuvre " + this.name + " a été ajoutée à la map ! ",
            [
                { text: "OK", onPress: () => this.props.navigation.navigate('Home') }
            ],
            { cancelable: false }
        )
    }

    _createAlertError() {
        Alert.alert(
            "Échec",
            "Une erreur s'est produite. L'oeuvre " + this.name + " n'a pas été ajoutée à la map.",
            [
                { text: "OK" }
            ],
            { cancelable: false }
        )
    }
    
    _sendText() {
        Geolocation.getCurrentPosition((position => {
            sendText(this.name, this.searchedText, this.author).then((response) => {
                depositArtwork(response, position).then((response) => {
                    if (response.ok) {
                        this._createAlertOK()
                    } else {
                        this._createAlertError()
                    }
                }).catch((error) => {
                    this._createAlertError()
                })
            }).catch((error) => {
                this._createAlertError()
            })
        }))
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.Text}>Nom de l'auteur</Text>

                <TextInput style={styles.nameField} 
                onChangeText = {(name) => this._nameInputChanged(name)}/>

                <Text style={styles.Text}>Nom de l'oeuvre</Text>
                <TextInput style={styles.nameField} 
                onChangeText = {(title) => this._titleInputChanged(title)}/>

                <Text style={styles.Text}>Saisissez votre texte</Text>

                <TextInput multiline={true} numberOfLines={5} style={styles.textField} 
                onChangeText = {(text) => this._textInputChanged(text)}/>
                
                <TouchableOpacity style={styles.Button} onPress={() => {this._sendText()}}>
                    <View style={styles.otherView}>
                        <Text style={styles.buttonText}>Valider</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelButton} onPress={() => {this.props.navigation.goBack()}}>
                    <View style={styles.otherView}>
                        <Text style={styles.buttonText}>Annuler</Text>
                    </View>
                </TouchableOpacity>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center', justifyContent: 'center', height: 500, width: "100%"
    },
    nameField: {
        textAlignVertical: 'top',
        marginBottom: '2%',
        padding: '2%',
        height: '10%',
        width: '90%',
        backgroundColor :'white',
        borderRadius : 10,
    },
    textField: {
        textAlignVertical: 'top',
        marginBottom: '3%',
        padding: '2%',
        height: '20%',
        width: '90%',
        backgroundColor :'white',
        borderRadius : 10,
    },
    otherView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
        marginBottom : "2%"
    },
    Text: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: "2%",
        textAlign: "center",
        color: "black",
    },
    Button: {
        height: "8%",
        width: "85%",
        marginBottom: "2%",
        backgroundColor: "orange",
        borderRadius: 15,
    },
    cancelButton: {
        height: "8%",
        width: "85%",
        backgroundColor: "red",
        borderRadius: 15,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "white",
        
    }
});


export default AddText;