import React from 'react';
import { View, Button, Text, StyleSheet, ActivityIndicator, AsyncStorage, TouchableOpacity, ImageBackground, BackHandler } from 'react-native';
import { createDrawerNavigator, createStackNavigator, StackNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Main from '../Main';


export default class Logout extends React.Component {
constructor(props) {
                  super(props); // būsenos
                  this.state = {
                   fname: '',
                   lname: '',
                   phone: '',

                  }
                }
  static navigationOptions = {
    drawerLabel: 'Logout',
    header: null,
       drawerIcon: () => (
             <MaterialIcons name={'exit-to-app'} size={25} /> // ikona
             )
  };

  componentDidMount() { // komunikacija su firebase, reikalinga logout'ui
                    firebase
                   .auth()
                   .signOut()
                   .then(() => this.props.navigation.navigate('Logges'))
                   .catch(error => this.setState({ errorMessage: error.message }))
    }
    //Paprasčiausias activity indicator (animacija)
  render() {

     return (
       <View style={styles.container}>
         <Text style = {{fontSize: 24}}>Logging out</Text>
         <ActivityIndicator size="large" color="#FFFFFF"/>
       </View>
     )
   }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5F6A74',
    padding: 20
  }
})