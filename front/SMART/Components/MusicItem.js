import React from 'react'
import { StyleSheet, View,TouchableOpacity, Image, Text } from 'react-native'

class MusicItem extends React.Component {
    render() {
        const artwork = this.props.music
        const onPress = () => console.log('détails de l\'oeuvre ' + artwork.title)
        return (
            <TouchableOpacity style = {styles.image_item_container} onPress = {onPress}>
                <View style = {styles.text_box}>
                    <Image source = {{uri : artwork.image}} style = {styles.image_preview}/>
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
        height : 100,
        padding : 10,
    },
    image_preview  : {
        flex : 1,
        marginRight : 10,
        height : 80,
        width : 80,
        resizeMode : 'cover'
    },
    text_box : {
        flex : 3,
        flexDirection : 'column',
        justifyContent : 'space-evenly'
    },
    title_text : {
        fontSize : 20,
        flexWrap : 'wrap',
        color : 'black',
        
    },
    artist_text : {
        fontSize : 16,
        flexWrap : 'wrap',
        color : 'grey'
    },

})

export default MusicItem

