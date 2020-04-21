
import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'


class Consult extends React.Component {
    render() {
        return (
            <View style={styles.mainContainer}>

                <View style={styles.borderText}>
                    <Text style={styles.dateText}>Ajouté le</Text>
                </View>

                <View style={styles.borderImage}>
                    <Image
                        style={styles.logo}
                        source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
                    />
                    <Text style={styles.dateText}>BLA BLA BLA AUTEUR</Text>
                </View>

                <Text>Détails de l'oeuvre</Text>

                <Text></Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    borderText: {
        padding: "3%",
        borderWidth: 1,
        borderRadius: 10,
        alignItems : "center",
    },
    borderImage: {
        padding: "3%",
        alignItems : "center",
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
    },
})

export default Consult