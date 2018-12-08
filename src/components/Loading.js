import React from 'react';
import { View, Text, AsyncStorage, ActivityIndicator, StyleSheet } from 'react-native';

import firebase from 'react-native-firebase';

export default class Loading extends React.Component {

componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Profile' : 'SignUp')
    })
  }

static navigationOptions = {
      header: null,

      }
      constructor(){
      super();
      }


  render() {
    return (
      <View style={styles.container}>

        <Text style = {{fontSize: 24}}>Loading</Text>
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

