import React from 'react'
import { View , Text , Image , StyleSheet, Button} from 'react-native'
import {searchById} from '../API/APISearch'

class MusicDetails extends React.Component {

    constructor(props){
        super(props)
    }

    render() {
        const artwork = this.props.navigation.state.params.artwork
        return(
            <View style = {styles.main_container}>
                <Image source = {{uri : artwork.pictureLink}} style = {styles.image}/>
                <View style = {styles.text_container}>
                    <Text style = {styles.name_text} numberOfLines = {2}>{artwork.name}</Text>
                    <Text style = {styles.artist_text} numberOfLines = {1}>{artwork.artist}</Text>
                    <Text style = {styles.year_text}>2016</Text>    
                    <Text style = {styles.album_text} numberOfLines = {1}>{artwork.album}</Text> 
                </View> 
                <Button title = "Ajouter à la carte" color = '#e67e22'/>       
            </View>
        )
    }

    
}

const styles = StyleSheet.create({
    main_container : {
        flex : 1,
        alignItems : 'center',
    },
    text_container : {
        alignItems : 'flex-start',
        alignSelf : 'stretch',
        padding : 30,
        marginBottom : 20
    },
    image : {
        height : "45%",
        aspectRatio : 1,
        resizeMode : 'contain',
        margin : 40,
        marginBottom : 20
    },
    name_text : {
        fontSize : 35,
        flexWrap : 'wrap',
        overflow : 'scroll'
    },
    artist_text : {
        fontSize : 25,
        color : '#e67e22'

    },
    year_text : {
        fontSize : 20,
    },
    album_text : {
        fontSize : 20,
    },
})


export default MusicDetails