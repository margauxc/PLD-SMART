import React from 'react'
import MusicDetails from './MusicDetails'
import { StyleSheet, View,TouchableOpacity, Image, Text } from 'react-native'

class ImageItem extends React.Component {

    _getImage(){
        if(this.props.artwork.pictureLink == null) {
            return '../assets/imageFiller.jpg'
        }else{
            return this.props.artwork.pictureLink
        }
    }

    _onPress(){
        if(this.props.artwork.category == 'music'){
            this.props.navigation.navigate('MusicDetails', {id : this.props.artwork.ArtworkId.toString()})
        }
    }

    render() {
        const {artwork, displayDetail} = this.props
        return (
            <TouchableOpacity style = {styles.image_item_container} onPress = {() => displayDetail(artwork.ArtworkId)}>
                <Image source = {{uri : this._getImage()}} style = {styles.image_preview}/>
                <View style = {styles.text_box}>
                    <Text style = {styles.title_text} numberOfLines = {2}>{artwork.name}</Text>
                    <Text style = {styles.artist_text} numberOfLines = {2}>{artwork.artist}</Text>
                    <Text style = {styles.description_text} numberOfLines = {3}>{artwork.description}</Text>
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

    description_text : {
        fontSize : 14,
        flexWrap : 'wrap',
        color : 'grey'
    }

})

export default ImageItem

