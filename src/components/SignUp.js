import React, { Component} from 'react';
import { StyleSheet, Text, Platform, AsyncStorage, TextInput, View, Button, TouchableOpacity, BackHandler, Alert } from 'react-native';
import { createStackNavigator, StackNavigator } from 'react-navigation';
import styles from './styles';
import Logges from './Logges';
import firebase from 'react-native-firebase';
import HandleBack from './HandleBack';


import { db } from '../Services/db';
import { addItem } from '../Services/ItemService';

export default class SignUp extends React.Component {
constructor(props) {
      super(props);
      this.state = {
        mail: '',
        fname: 'First name',
        lname: 'Last name',
        phone: 'Phone number',
        email: '',
        password: '',
        editing: true,

      }
      this.handleChange = this.handleChange.bind(this);
     // this.handleSubmit = this.handleSubmit.bind(this);
    }

  state = {errorMessage: null, ErrorStatus: true}

  static navigationOptions = {
        header: null,

        }

          handleChange(e) {
                this.setState({
                  mail: e.nativeEvent.text
                });
              }

handleSignUp = (newPostKey) => {
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {addItems1(this.state.email, newPostKey)})
      .then(() => {this.props.navigation.navigate('Search', {
      UID: newPostKey,
      name: 'First name',
      lname: 'Last name',
      phone: 'Phone number',

      });

      })

      .catch(error => this.setState({ errorMessage: error.message }))
    }

     OnChangeTextFun = (email) =>{
     if(email.trim() != 0){
             this.setState({ email: email });
             this.setState({ ErrorStatus : true}) ;
           }else{
              this.setState({ email: null })
               this.setState({ ErrorStatus : false}) ;
           }
     }
         OnChangeTextFunPass = (password) =>{
             if(password.trim() != 0){
                     this.setState({ password: password });
                     this.setState({ ErrorStatus : true}) ;
                   }else{
                      this.setState({ password: null })
                       this.setState({ ErrorStatus : false}) ;
                   }
             }

       buttonClickFun = () => {

       const {password} = this.state;
       const {email} = this.state;
          if (password == null && email != null){
           Alert.alert("Please enter the password to proceed");
            }
           if (email == null && password != null){
              Alert.alert("Please enter the email to proceed");
           }
           if (email == null && password == null){
                         Alert.alert("Please enter both the email and password to proceed");
                      }
                     if( email != null && password != null){
                     let newPostKey = firebase.database().ref().child('users').push().key;
                     this.handleSignUp(newPostKey);
                     }
          }

  onBack = () => {
            if (this.state.editing) {
         Alert.alert(
           "You're going back",
           "Are you sure you want to close the app?",
           [
             { text: "Go back", onPress: () => {}, style: "cancel" },
             { text: "Exit", onPress: () => BackHandler.exitApp() },
           ],
           { cancelable: false },
         );
         return true;
       }

       return false;

     };

render() {
if(this.state.isLoading){
    return <View><Text> loading... </Text></View>
}

    return (
      <View style={styles.LoginAndSignup}>
        {this.state.errorMessage &&
          <Text style={styles.error}>
            {this.state.errorMessage}
          </Text>}

        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.inputStyle}
          placeholderTextColor={'white'}
          keyboardType = "email-address"
          onChangeText={this.OnChangeTextFun.bind(this)}
          onChange={this.handleChange}
          value={this.state.email}
          maxLength = {35}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.inputStyle}
          placeholderTextColor={'white'}
          onChangeText={this.OnChangeTextFunPass.bind(this)}
          value={this.state.password}
          maxLength = {25}
        />

             { this.state.ErrorStatus == false ? (
                     <Text style={styles.errorMessage}>
                       * Please enter the text to proceed.
                     </Text>
                    ) : null  }


         <TouchableOpacity
         onPress={this.buttonClickFun.bind(this)}>
            <Text style = {styles.button}>
            Sign Up
          </Text>
          </TouchableOpacity>

          <View style ={styles.signupTextContr}>
          <Text style ={styles.signupTextgray}> Already have an account? </Text>
           <Text
           style ={styles.signupText}
           onPress={() => this.props.navigation.navigate('Logges')}>
           Login </Text>
           </View>

<HandleBack onBack={this.onBack}>
                  <View>
                         <TouchableOpacity onPress={() => this.setState( {editing: true})}>
                              <Text>  </Text>
                            </TouchableOpacity>
                          </View>
                        </HandleBack>


      </View>
    );
  }
}

const addItems1 =  (item, newPostKey) => {


                 AsyncStorage.setItem('UID', newPostKey);


             db.ref('/users/' +newPostKey).update({
                            email: item,
                            fname: 'First name',
                            lname: 'Last name',
                            phone: 'Phone number'
                            });

             }


