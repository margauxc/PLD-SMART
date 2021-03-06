import { createStackNavigator } from 'react-navigation-stack'
import React from 'react'

import Header from '../Shared/Header'
import About from '../Components/About'

const screens = {
    About: {
        screen: About,
        navigationOptions: ({ navigation }) => {
            return {
                header: () => <Header navigation={navigation} title='À propos'/>
            }
        }
    }
}

const AboutStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#e67e22'
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center'
    }
})

export default AboutStack