import React from 'react'
import { View, Text } from 'react-native'

class About extends React.Component{
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>Et là on peut mettre ce qu'on veut pour se vanter</Text>
            </View>
          );
        }
}

export default About;