import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import ArtworkChoice from '../Components/ArtworkChoice'

const screens = {
    ArtworkChoice: {
        screen: ArtworkChoice,
        navigationOptions: {
            title:"Choix de l'œuvre"
        }
    }
}

const MainStack = createStackNavigator(screens)

export default createAppContainer(MainStack)