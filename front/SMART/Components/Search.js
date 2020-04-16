import React from 'react'
import { StyleSheet, View, TextInput, FlatList } from 'react-native'
import ImageItem from './ImageItem'
import MusicItem from './MusicItem'

import {oeuvres} from '../assets/data'

class Search extends React.Component {
    render() {
        const textChanged = (text) => console.log(text)
        const chooseRender = (item) => {
            if(item.type == 'image') return <ImageItem image={item}/>
            if(item.type == 'music') return <MusicItem music={item}/>
        }
        return (
            <View style = {styles.main_container}>
                <TextInput style = {styles.search_bar} placeholder = "Rechercher une oeuvre..." onChangeText = {textChanged}/>
                <FlatList 
                    data={oeuvres}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => 
                        chooseRender(item)
                    }
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    main_container : {
        flex : 1,
    },
    search_bar : {
        marginTop : 20,
        marginHorizontal : 10,
        padding : 10,
        borderWidth : 2,
        borderColor : 'darkgrey',
        borderRadius : 5,  
        fontSize : 16      
    }
})

export default Search