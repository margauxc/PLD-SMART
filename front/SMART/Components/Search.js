import React from 'react'
import { StyleSheet, View, TextInput, FlatList } from 'react-native'
import ImageItem from './ImageItem'
import MusicItem from './MusicItem'
import RNPickerSelect from 'react-native-picker-select'
import Icon from 'react-native-vector-icons/FontAwesome'

import {oeuvres, categories} from '../assets/SearchUtils'
import {searchRequest} from '../API/APISearch'

class Search extends React.Component {

    _searchArtworks() {
        searchRequest("Bohemian", "all")
    }
    render() {
        const onSubmitEditing = (text) => console.log(text.nativeEvent.text)
        const chooseRender = (item) => {
            return <ImageItem artwork={item}/>
        }
        return (
            <View style = {styles.main_container}>
                <TextInput style = {styles.search_bar} placeholder = "Rechercher une oeuvre..." onSubmitEditing = {this._searchArtworks()}/>
                <RNPickerSelect style = {pickerSelectStyles} placeholder = {{}} items = {categories} onValueChange = {value => {console.log(value)}} />
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
    },
    
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      color: 'blue',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      color: 'blue',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  })

export default Search