import React from 'react'
import {Button , View , Text , TextInput} from 'react-native'
import DefaultPreferences from 'react-native-default-preference'

class Name extends React.Component{

    constructor(props){
        super(props)
        this.state = {usernameSet : false}
        this.username = ""
    }

    componentDidUpdate(){
        if(this.state.usernameSet){
            setTimeout(() => {
                this.props.navigation.navigate("Home")
            }, 2000)
        }
    }

    _onChangeText = (text) => {
        this.username = text
        console.log(this.username)
    }

    _submitUsername = () => {
        if(this.username.length > 0 ){
            DefaultPreferences.set('username', this.username).then(() => {
                this.props.navigation.navigate("Home")
            }).catch((error) => console.log(error))
        }   
    }

    render(){
        if(!this.state.usernameSet){
            DefaultPreferences.get('username').then((username) => {
                if(username != null && username.length > 0){
                    this.username = username
                    this.setState({usernameSet : true})
                }
            })
        }
        return (
            <View style = {{flex:1}}>
                {this.state.usernameSet ? (
                    <Text>Bienvenue {this.username} !</Text>
                ) : (
                    <View style = {{flex : 1}}>
                        <Text>Bienvenue dans SMART</Text>
                        <Text>Pour commencer, entrez votre nom</Text>
                        <TextInput placeholder = 'Votre nom' 
                                    onChangeText = {(text) => this._onChangeText(text)}
                                    onSubmitEditing = {() => this._submitUsername()}/>
                        <Button title = 'Valider' onPress = {() => this._submitUsername()}/>
                    </View>
                )}
            </View>
        )
    }
}

export default Name