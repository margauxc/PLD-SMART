import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native'

class AddText extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.Text}>Saisissez votre texte</Text>

                <TextInput multiline={true} numberOfLines={10} style={styles.textField} />
                <TouchableOpacity style={styles.Button}>
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
    textField: {
        textAlignVertical: 'top',
        marginBottom: '4%',
        padding: '2%',
        height: '25%',
        width: '90%',
        backgroundColor :'white',
        borderRadius : 10,
    },
    otherView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
        marginBottom : "4%"
    },
    Text: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: "5%",
        textAlign: "center",
        color: "black",
    },
    Button: {
        height: "8%",
        width: "85%",
        marginBottom: "4%",
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