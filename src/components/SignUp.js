import React, { Component} from 'react';
import { StyleSheet, Text, Platform, AsyncStorage, TextInput, View, Button, TouchableOpacity, BackHandler, Alert } from 'react-native';
import { createStackNavigator, StackNavigator } from 'react-navigation';
import styles from './styles';
import Logges from './Logges';
import firebase from 'react-native-firebase';
import HandleBack from './HandleBack';


import { db } from '../Services/db';
import { addItem } from '../Services/ItemService';
//Registracija
export default class SignUp extends React.Component { // exportuojama (kitiems failams pasiekiama) Signup klasė, kuri yra pagrindinė šiame faile.
constructor(props) { // konstruktorius
      super(props); // kviečiamas 'parent' elementas
      this.state = { // state, būsena?
        mail: '', // mail būsena pradinė yra nustatoma tuščia t.y. ''
        fname: 'First name',
        lname: 'Last name',
        phone: 'Phone number',
        email: '',
        password: '',
        editing: true, // boolean tipo būsena,

      }
      this.handleChange = this.handleChange.bind(this); // bindinimas prie 'parent' elemento
     // this.handleSubmit = this.handleSubmit.bind(this);
    }

  state = {errorMessage: null, ErrorStatus: true}

  static navigationOptions = { // navigacijos pasirinkimai
        header: null, // nėra antraštės

        }

          handleChange(e) { // funkcija, kuri reaguoja tada, kai yra kreipiamasi į ją
                this.setState({ // setState nustato būseną
                  mail: e.nativeEvent.text // mail būsenai nustatomi įrašomi simboliai
                });
              }

handleSignUp = (newPostKey) => { // Komunikacija su Firebase duombaze.
      firebase //Naudojama 'promise'
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password) // kūriama vartotojo paskyra
      .then(() => {addItems1(this.state.email, newPostKey)}) // Kreipiamasi į funkciją, su email būsena ir paskyros unikaliu kodu.
      .then(() => {this.props.navigation.navigate('Search', { // po registracijos pereinama į Search langą
      UID: newPostKey,
      name: 'First name',
      lname: 'Last name',
      phone: 'Phone number',

      });

      })

      .catch(error => this.setState({ errorMessage: error.message })) // jeigu randamas error, tada į errorMessage įrašoma error.mesage žinutė (šiuo atveju tai yra firebase žinutė)
    }

     OnChangeTextFun = (email) =>{ // funkcija, kuri tikrina ar įvedamame email lange nėra tuščių tarpų
     if(email.trim() != 0){
             this.setState({ email: email });
             this.setState({ ErrorStatus : true}) ;
           }else{
              this.setState({ email: null })
               this.setState({ ErrorStatus : false}) ;
           }
     }
         OnChangeTextFunPass = (password) =>{ //funkcija, kuri tikrina ar įvedamame slaptažodžio lange nėra tuščių tarpų
             if(password.trim() != 0){
                     this.setState({ password: password });
                     this.setState({ ErrorStatus : true}) ;
                   }else{
                      this.setState({ password: null })
                       this.setState({ ErrorStatus : false}) ;
                   }
             }

       buttonClickFun = () => { // Ši funkcija bus naudojama paspaudus Signup mygtuką

       const {password} = this.state; // į const įrašome password būsena
       const {email} = this.state;
          if (password == null && email != null){ // Jeigu slaptažodis ir emailas yra tušti langai
           Alert.alert("Please enter the password to proceed"); //
            }
           if (email == null && password != null){ //Jeigu slaptažodis yra tuščias, o emailas ne:
              Alert.alert("Please enter the email to proceed");
           }
           if (email == null && password == null){
                         Alert.alert("Please enter both the email and password to proceed");
                      }
                     if( email != null && password != null){ // jeigu viskas atitinka
                     let newPostKey = firebase.database().ref().child('users').push().key; //Duombazėje sukuriamas unikalus paskyros kodas
                     this.handleSignUp(newPostKey); // kreipiamasi į Registracijos funkcija, kuri kuria paskyras
                     }
          }

  onBack = () => { // Funkcija, kuri yra naudojama paspaudus atgal mygtuką pačiam mobiliąjame įrenginyje
            if (this.state.editing) {
         Alert.alert( // Alert, išsokstantis langas su žinute ir pasirinkimais
           "You're going back",
           "Are you sure you want to close the app?",
           [
             { text: "Go back", onPress: () => {}, style: "cancel" }, // grįžtama į tą patį langą
             { text: "Exit", onPress: () => BackHandler.exitApp() }, //išeinama iš programėlės
           ],
           { cancelable: false }, // nustatoma, kad negalima paspausti už alerto ir taip išeiti, būtina pasirinkti kažką iš alert siūlomų pasirinkimų
         );
         return true;
       }

       return false;

     };
//Renderimas, t.y. viskas ką matome ekrane
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

const addItems1 =  (item, newPostKey) => { //funkcija komunikuojanti su Firebase duombaze


                 AsyncStorage.setItem('UID', newPostKey); // su Asyncstorage nustatomas UID, kuris išlieka tik vartotojo telefone


             db.ref('/users/' +newPostKey).update({ // db yra importuota konfiguracija iš Services/db.js (su Api key ir t.t). ref -reference t.y. kur bus įvedama informacija, update t.y. atnaujinama jau esanti informacija, arba sukuriamos atitinkamos vietos duomenims
                            email: item, //įrašomi atitinkami duomenys į duombaze
                            fname: 'First name',
                            lname: 'Last name',
                            phone: 'Phone number'
                            });

             }


