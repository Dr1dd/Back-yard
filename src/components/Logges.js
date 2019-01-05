import React, { Component} from 'react';
import { StyleSheet, Platform, AsyncStorage, Text, TextInput, View, Button, TouchableOpacity, BackHandler, Alert } from 'react-native';
import { createStackNavigator, StackNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';
import Main from './Main';
import styles from './styles';
import HandleBack from './HandleBack';
import { db } from '../Services/db';
//Login, viskas yra labai panašiai kaip ir SignUp klasėje
export default class Logges extends React.Component {
constructor(props) { // konstruktorius
      super(props);
      this.state ={
        email: '',
        password: '',

      }
        this.LoginInfo = this.LoginInfo.bind(this);
      }

  state = { errorMessage: null, ErrorStatus: true, editing: true,};

    static navigationOptions = {
            header: null,

            }


handleLogin = () => { //
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(()=> {this.LoginInfo()})
        .then(() => {this.props.navigation.navigate('Search')})
        .catch(error => this.setState({ errorMessage: error.message }))
    }
    LoginInfo=() =>{
        var dbref = db.ref('users/').orderByChild("email").equalTo(this.state.email);
        dbref.once('value', snapshot => {
        snapshot.forEach(function(childSnapshot) {
         var UIDK = childSnapshot.key;
         AsyncStorage.setItem('UID', UIDK);
        })
        })

    }

     OnChangeTextFunction = (email) =>{
         if(email.trim() != 0){
                 this.setState({ email: email });
                 this.setState({ ErrorStatus : true}) ;
               }else{
                  this.setState({ email: "" })
                  this.setState({ ErrorStatus : false}) ;
               }
         }
             OnChangeTextFunPassword = (password) =>{
                 if(password.trim() != 0){
                         this.setState({ password: password });
                         this.setState({ ErrorStatus : true}) ;
                       }else{
                           this.setState({ password: "" })
                           this.setState({ ErrorStatus : false}) ;
                       }
                 }

           buttonClickFunction = () => {
           const {password} = this.state;
           const {email} = this.state;
              if (password == "" && email != ""){
               Alert.alert("Please enter the password to proceed");
                }
               if (email == "" && password != ""){
                  Alert.alert("Please enter the email to proceed");
               }
               if (email == "" && password == ""){
                             Alert.alert("Please enter both the email and password to proceed");
                          }
                         if( email != "" && password != "") {
                         this.handleLogin();
                         }
              }
              onBack = () => {
                          if (this.state.editing) {
                       {()=>this.props.navigation.navigate('SignUp')}
                       return true;
                     }

                     return false;

                   };
  render() {
    return (
      <View style={styles.LoginAndSignup}>
        {this.state.errorMessage &&
          <Text style={styles.error}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.inputStyle}
          autoCapitalize="none"
          placeholder="Email"
          placeholderTextColor={'white'}
          keyboardType = "email-address"
          onChangeText={this.OnChangeTextFunction.bind(this)}
          value={this.state.email}
          maxLength = {35}
        />
        <TextInput
          secureTextEntry
          style={styles.inputStyle}
          autoCapitalize="none"
          placeholder="Password"
          placeholderTextColor={'white'}
          onChangeText={this.OnChangeTextFunPassword.bind(this)}
          value={this.state.password}
          maxLength = {25}
        />

               { this.state.ErrorStatus == false ? (
                             <Text style={styles.errorMessage}>
                               * Please enter the text to proceed.
                             </Text>
                            ) : null  }

            <TouchableOpacity onPress={this.buttonClickFunction.bind(this)}>
               <Text style = {styles.button}>
                 Login
              </Text>
             </TouchableOpacity>

         <View style ={styles.signupTextContr}>
                  <Text style ={styles.signupTextgray}> Don't have an account? </Text>
                   <Text
                   style ={styles.signupText}
                   onPress={() => this.props.navigation.navigate('SignUp')}>
                   Sign Up </Text>
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
