import React from 'react'
import { StyleSheet, View,TouchableOpacity, Image, Text } from 'react-native'

class MusicItem extends React.Component {
    render() {
        const artwork = this.props.music
        const onPress = () => console.log('détails de l\'oeuvre ' + artwork.title)
        return (
            <TouchableOpacity style = {styles.image_item_container} onPress = {onPress}>
                <View style = {styles.text_box}>
                    <Text style = {styles.title_text} numberOfLines = {2}>{artwork.title}</Text>
                    <Text style = {styles.artist_text} numberOfLines = {2}>{artwork.artist}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    image_item_container : {
        flexDirection : 'row',
        height : 70,
        padding : 10,
    },
    text_box : {
        flex : 1,
        flexDirection : 'column',
        justifyContent : 'center'
    },
    title_text : {
        fontSize : 20,
        flexWrap : 'wrap',
        color : 'black',
        
    },
    artist_state : {
        fontSize : 16,
        flexWrap : 'wrap'
    },

})

export default MusicItem

