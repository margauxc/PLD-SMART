import { createStackNavigator } from 'react-navigation-stack'
import React from 'react'

import Header from '../Shared/Header'
import Home from '../Components/Home'
import ArtworkChoice from '../Components/ArtworkChoice'

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
            }
        }
    }
}

const HomeStack = createStackNavigator(screens)

export default HomeStack