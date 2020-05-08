import * as React from 'react'
import Navigation from './Navigation/Navigation'
import { PermissionsAndroid , Text } from 'react-native'
import Geolocation from 'react-native-geolocation-service';


// request geoloc permission on Android
const requestGeolocAndroid = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION , {
        title : "Accès à la localisation",
        message : "L'utilisation de SM'ART nécessite l'accès à votre localisation pour fonctionner.",
        buttonPositive : "OK",
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the location");
    } else {
      console.log("Location permission denied");
    }

    return granted
    
  } catch (err) {
    console.warn(err);
  } 
}

function App() {
  
  //android geoloc

    requestGeolocAndroid()
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    .then((granted) => {
      console.log("geoloc permission : " + granted)
    }).catch((err) => {
      console.log(err)
    })

  //ios geoloc 
    Geolocation.setRNConfiguration({
      authorizationLevel : "whenInUse"
    })

    Geolocation.requestAuthorization()

  return <Navigation/>
}

export default App