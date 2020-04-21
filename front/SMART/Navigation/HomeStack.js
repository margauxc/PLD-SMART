import { createStackNavigator } from 'react-navigation-stack'
import React from 'react'

import Header from '../Shared/Header'
import Consult from '../Components/Consult'
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

    Consult: {
        screen: Consult,
        navigationOptions: {
            title: "Consultation d'une oeuvre"
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
    }
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