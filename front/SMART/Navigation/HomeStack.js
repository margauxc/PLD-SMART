import { createStackNavigator } from 'react-navigation-stack'
import React from 'react'

import Header from '../Shared/Header'
import Home from '../Components/Home'
import ArtworkChoice from '../Components/ArtworkChoice'
import AddText from '../Components/AddText'
import Search from '../Components/Search'


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
            title: "Choix de l'œuvre"
        }
    },

    AddText: {
        screen: AddText,
        navigationOptions: {
            title: "Ajout du texte"
        }
    },

    Search: {
        screen: Search,
        navigationOptions: {
            title: "Rechercher une oeuvre"
        }
    },
}

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#e67e22'
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center'
    }
})

export default HomeStack