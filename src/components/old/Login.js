import React from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity, ImageBackground, TextInput, Image } from 'react-native';
import { createStackNavigator, StackNavigator } from 'react-navigation';
import { Screenas } from './two';
import styles from './styles';

export class Login extends React.Component {
static navigationOptions = {
      header: null,

      }
  render() {
  <Screenas />
    return (

       <View style={styles.container}>
       <Image
               style ={{ width: 200, height: 200, marginVertical: 60}}
               source ={{uri: 'https://cdn1.iconfinder.com/data/icons/business-life-4/2126/68-512.png'}}
               />

      <TextInput
            style={styles.inputStyle}
            placeholder={'Username'}
            placeholderTextColor={'white'}
            underlineColorAndroid ='transparent'
            />
            <TextInput
                        style={styles.inputStyle}
                        placeholder={'Password'}
                        secureTextEntry ={true}
                        placeholderTextColor={'white'}
                        underlineColorAndroid ='transparent'
                        />
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Screen')}>
                             <Text style = {styles.button}>
                                Log in
                             </Text>
                          </TouchableOpacity>
                     <View style ={styles.signupTextContr}>
                     <Text> Don't have an account? </Text>
                     <Text
                     style ={styles.signupText}
                     onPress={() => this.props.navigation.navigate('Reg')}>
                     Sign up now! </Text>
                     </View>
      </View>
    );
  }
}
