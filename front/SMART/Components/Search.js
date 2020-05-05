import React from 'react'
import { StyleSheet, View, TextInput, FlatList, ActivityIndicator , Text} from 'react-native'
import ImageItem from './ImageItem'
import RNPickerSelect from 'react-native-picker-select'

import {categories} from '../Utils/SearchUtils'
import {standardizeArtwork} from '../Utils/StandardizeArtworks'
import {searchRequest, searchById} from '../API/APISearch'

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            artworks : [], 
            isLoading : false,
            alreadySearched : false
        }
        this.searchedText = ""
        this.searchedCategory = ""
    }

    _searchArtworks() {
        this.setState({isLoading : true})
        searchRequest(this.searchedText, this.searchedCategory).then((data) => {
            this.setState({artworks : data, isLoading : false, alreadySearched : true})
        })
    }

    _textInputChanged(text) {
        this.searchedText = text
    }

    _categoryPickerChanged(value) {
        this.searchedCategory = value
    }

    _displayDetail = (id) => {
        searchById(id).then((artwork) => {
            artwork = standardizeArtwork(artwork)
            this.props.navigation.navigate("ArtworkDetails", {artwork : artwork}) 
        })
    }

    _displayLoading() {
        if (this.state.isLoading) {
          return (
            <View style={styles.loading_container}>
              <ActivityIndicator size='large' />
            </View>
          )
        }
      }

    _displayNoResults() {
        if (this.state.isLoading == false && this.state.alreadySearched == true && this.state.artworks.length == 0){
            return(
                <View style = {styles.no_result}>
                    <Text>Aucun résultat</Text>
                </View>
            )
        }
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
                        <ImageItem artwork={item} navigation={this.props.navigation} displayDetail={this._displayDetail}/>
                    }
                />
                {this._displayLoading()}
                {this._displayNoResults()}
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
    loading_container : {
        position : 'absolute',
        right : 0,
        left : 0,
        bottom : 0,
        top : 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    no_result : {
        position : 'absolute',
        right : 0,
        left : 0,
        bottom : 0,
        top : 100,
        alignItems: 'center',
        justifyContent: 'center'
    }
    
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