import { createStackNavigator } from 'react-navigation-stack'
import React from 'react'

import Header from '../Shared/Header'
import Home from '../Components/Home'
import ArtworkChoice from '../Components/ArtworkChoice'
import AddText from '../Components/AddText'


const screens = {
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => {
            return {
                header: () => <Header navigation={navigation} title='SMART'/>
            }
        }
    },

    ArtworkChoice: {
        screen: ArtworkChoice,
        navigationOptions: {
            title: "Choix de l'œuvre",
            headerStyle: {
                backgroundColor: '#e67e22'
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center'
        }
    },

    AddText: {
        screen: AddText,
        navigationOptions: {
            title: "Ajout du texte",
            headerStyle: {
                backgroundColor: '#e67e22'
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center'
        }
    }
}

const HomeStack = createStackNavigator(screens)

export default HomeStack