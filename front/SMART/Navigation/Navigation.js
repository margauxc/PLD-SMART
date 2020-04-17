import { createDrawerNavigator } from 'react-navigation-drawer'
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

const RootDrawerNavigator = createDrawerNavigator({
    "Accueil": {
        screen: HomeStack
    },
    "À propos": {
        screen: AboutStack
    }
})

export default createAppContainer(RootDrawerNavigator)