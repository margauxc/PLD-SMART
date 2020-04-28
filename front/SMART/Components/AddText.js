import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import {sendText} from '../API/APIAddText'

class AddText extends React.Component {

    constructor(props){
        super(props)
        this.state = {name : "", searchedText : "",
                      author : ""}
    }

    _titleInputChanged(title){
        this.setState({name : title})
    }

    _textInputChanged(text){
        this.setState({searchedText : text})
    }

    _nameInputChanged(name){
        this.setState({author : name})
    }
    

    _sendText(){
        Geolocation.getCurrentPosition((position => {
            sendText(this.state.name, this.state.searchedText, this.state.author, this.props.navigation, position)
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