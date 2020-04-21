import React from 'react'
import { StyleSheet, View, Text, Button, TouchableOpacity, Card } from 'react-native'

class ArtworkChoice extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.Text}>Vous souhaitez ajouter</Text>


                <TouchableOpacity style={styles.Button} onPress={() => {this.props.navigation.navigate('AddText')}}>
                    <View style={styles.otherView}>
                        <Text style={styles.buttonText}>Un texte</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Button}>
                    <View style={styles.otherView}>
                        <Text style={styles.buttonText} onPress={() => {this.props.navigation.navigate('Search')}}>Une oeuvre d'art existante</Text>
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
    otherView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
    },
    Text: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: "5%",
        textAlign: "center",
        color: "black",
    },
    Button: {
        height: "10%",
        width: "85%",
        marginBottom: "4%",
        backgroundColor: "orange",
        borderRadius: 15,
    },
    cancelButton: {
        height: "5%",
        width: "75%",
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


export default ArtworkChoice;