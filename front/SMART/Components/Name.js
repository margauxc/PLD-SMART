import React from 'react'
import {Button , View , Text} from 'react-native'
import DefaultPreferences from 'react-native-default-preference'

class Name extends React.Component{

    constructor(props){
        super(props)
    }

    _onPress(){
        DefaultPreferences.set('username', 'Manon').then(()=> {
            DefaultPreferences.get('username').then((username) => {
                console.log(username)
            })
        }).catch((error) => console.log(error))
        this.props.navigation.navigate("Home")
    }

    render(){
        return (
            <View style = {{flex:1}}>
                <Text>Ceci est la page Name</Text>
                <Button title = "Go to Home" onPress = {() => this._onPress()}/>
            </View>
        )
    }
}

export default Name