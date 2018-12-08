import React from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { createStackNavigator, StackNavigator } from 'react-navigation';
import styles from './styles';

export class HomeScreen extends React.Component {
 static navigationOptions = {
    headerStyle: {
      height: 0,
    },
    }
  render() {
    return (
      <ImageBackground source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQndnmZHFloiWzlZg6wPYXpX5RLFExR00sxjuCf4VZeTUo_kKGE'}}
       style={{width: '100%', height: '100%', flex: 1, alignItems: 'center', justifyContent: 'center' }}
       resizeMode="stretch"
       >
         <TouchableOpacity onPress={() => this.props.navigation.navigate('Log')}>
                     <Text style = {styles.button}>
                        LOGIN
                     </Text>
                  </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Reg')}>
                              <Text style = {styles.button}>
                                 REGISTER
                              </Text>
                           </TouchableOpacity>
      </ImageBackground>
    );
  }
}
/*export default class App extends React.Component {
  render() {
    return <styles />; // //<RootStack />
  }
}
*/

