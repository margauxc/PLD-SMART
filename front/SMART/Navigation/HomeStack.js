import { createStackNavigator } from 'react-navigation-stack'
import React from 'react'

import Header from '../Shared/Header'
import Consult from '../Components/Consult'
import HomeMap from '../Components/HomeMap'
import ArtworkChoice from '../Components/ArtworkChoice'
import AddText from '../Components/AddText'
import Search from '../Components/Search'
import ArtworkDetails from '../Components/ArtworkDetails'
import Name from '../Components/Name'

const screens = {
    
    Name : {
        screen : Name,
        navigationOptions : {
            headerShown : false,
            headerMode : 'screen'
        }
    },

    Home: {
        screen: HomeMap,
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
    },

    Search: {
        screen: Search,
        navigationOptions: {
            title: "Rechercher une oeuvre"
        }
    },

    ArtworkDetails : {
        screen : ArtworkDetails,
        navigationOptions : {
            title : "Ajouter une oeuvre"
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