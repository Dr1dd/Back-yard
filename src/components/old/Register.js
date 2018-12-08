import React from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity, ImageBackground, TextInput, Image } from 'react-native';
import { createStackNavigator, StackNavigator } from 'react-navigation';
import { Screenas } from './two';
import styles from './styles';



import t from 'tcomb-form-native';


export class Register extends React.Component {

   constructor(props){
    super(props);
    this.state = {};
   }

static navigationOptions = {
      header: null,

      }
  render() {
  <Screenas />
    return (

       <View style={styles.container1}>
      <TextInput
            style={styles.inputStyle}
            placeholder={'Username'}
            placeholderTextColor={'white'}
            underlineColorAndroid ='transparent'
            />
             <TextInput
             style={styles.inputStyle}
             placeholder={'Email'}
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
                                Register
                             </Text>
                          </TouchableOpacity>

      </View>
    );
  }
}