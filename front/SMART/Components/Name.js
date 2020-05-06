import React from 'react'
import {Button , View , Text , TextInput , StyleSheet , Image} from 'react-native'
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
            <View style = {styles.main_container}>
                {this.state.usernameSet ? (
                    <View style = {styles.main_container}>
                        <Image source = {require('../assets/sm_art.png')} style = {styles.logo_big}/>
                        <Text style = {styles.welcome_text}>Bienvenue {this.username} !</Text>
                    </View>
                ) : (
                    <View style = {styles.main_container}>
                        <Image source = {require('../assets/sm_art.png')} style = {styles.logo_small}/>
                        <Text style = {styles.name_text}>Pour commencer, entrez votre nom</Text>
                        <TextInput placeholder = 'Votre nom'
                                    textAlign = 'center' 
                                    style = {styles.text_input}
                                    onChangeText = {(text) => this._onChangeText(text)}
                                    onSubmitEditing = {() => this._submitUsername()}/>
                        <Button title = 'Valider' color = 'orange' onPress = {() => this._submitUsername()}/>
                    </View>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    welcome_text : {
        fontSize : 22,
        color : 'gray',
    },
    name_text : {
        marginTop : 20,
        fontSize : 16
    },
    text_input : {
        fontSize : 16
    },
    logo_big : {
        height : '10%',
        resizeMode : 'contain'
    },
    logo_small : {
        height : '7%',
        resizeMode : 'contain'
    }
})

export default Name