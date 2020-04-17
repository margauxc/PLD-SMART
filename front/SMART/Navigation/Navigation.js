import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import ArtworkChoice from '../Components/ArtworkChoice'
import AddText from '../Components/AddText'


const screens = {
    AddText: {
        screen: AddText,
        navigationOptions: {
            title:"Ajout du texte"
        }
    },
    
    ArtworkChoice: {
        screen: ArtworkChoice,
        navigationOptions: {
            title:"Choix de l'œuvre"
        }
    }
}

const MainStack = createStackNavigator(screens)

export default createAppContainer(MainStack)