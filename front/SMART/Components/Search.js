import React from 'react'
import { StyleSheet, View, TextInput, FlatList } from 'react-native'
import ImageItem from './ImageItem'
import RNPickerSelect from 'react-native-picker-select'

import {categories} from '../assets/SearchUtils'
import {searchRequest, searchById} from '../API/APISearch'

class Search extends React.Component {

    constructor(props){
        super(props)
        this.state = {artworks : [], 
                    searchedText : "",
                    searchedCategory : ""}
    }

    _searchArtworks() {
        searchRequest(this.state.searchedText, this.state.searchedCategory).then( (data) => {
            this.setState({artworks : data})
        })
    }
    _textInputChanged(text){
        this.setState({searchedText : text})
    }

    _categoryPickerChanged(value){
        this.setState({searchedCategory : value})
    }

    _displayDetail = (id) => {
        searchById(id).then((artwork) => {
            //standardize artwork
            const museumCategories = ['museum', 'painting', 'sculpture']
            if(museumCategories.includes(artwork.category)){
                artwork['more_info']  = artwork.medium
            } else if (artwork.category == 'music') {
                artwork['more_info'] = artwork.album
            } else if (artwork.category == 'movie'){
                artwork['more_info'] = artwork.description
            }
            this.props.navigation.navigate("ArtworkDetails", {artwork : artwork}) 
        })
    }

    render() {
        return (
            <View style = {styles.main_container}>
                <TextInput 
                    style = {styles.search_bar} 
                    placeholder = "Rechercher une oeuvre..." 
                    onChangeText = {(text) => this._textInputChanged(text)} 
                    onSubmitEditing = {()=>this._searchArtworks()}/>
                <RNPickerSelect 
                    style = {pickerSelectStyles} 
                    placeholder = {{}} 
                    items = {categories} 
                    onValueChange = {value => this._categoryPickerChanged(value)} />
                <FlatList 
                    data={this.state.artworks}
                    keyExtractor={(item) => item.ArtworkId.toString()}
                    renderItem={({item}) => 
                        <ImageItem artwork={item} navigation = {this.props.navigation} displayDetail = {this._displayDetail}/>
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