import React from 'react'
import {Button , View , Text} from 'react-native'
import DefaultPreferences from 'react-native-default-preference'

class Name extends React.Component{

    constructor(props){
        super(props)
        this.state = {usernameSet : false}
        this.username = ""
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
                    <Text>Il faut entrer un nom</Text>
                )}
            </View>
        )
    }
}

export default Name