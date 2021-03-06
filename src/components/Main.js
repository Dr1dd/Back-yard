import React, { Component } from 'react';
import { Animated, ActivityIndicator, Easing, StyleSheet, ScrollView, Platform, TextInput, KeyboardAvoidingView, Image, Text, View, AsyncStorage, TouchableOpacity, Button, BackHandler, Alert } from 'react-native';
import Logges from './Logges';
import styles from './styles';
import firebase from 'react-native-firebase';

import HandleBack from './HandleBack';

import { Navigation, DrawerNavigator, createDrawNavigator, createStackNavigator, StackNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Container, Content, Header, Body, Icon, Left} from 'native-base';

import HeaderComponent from './Screens-main/HeaderComponent';

import { addItem} from '../Services/ItemService';

import { db } from '../Services/db';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { UIDKey } from './Loading';
import {UID} from './SignUp';


let UIDK
let news
let data
const NON_DIGIT = '/[^\d]/g'
// Profilis
export default class Main extends React.Component {
  constructor(props) {
                  super(props);
                  this.state = {
                   fname: '',
                   lname: '',
                   phone: '',
                   editing: true,
                   stateEdit: false,
                   animating: false,
                  }
                  this.handleChange = this.handleChange.bind(this);
                  this.handleSubmit = this.handleSubmit.bind(this);
                             AsyncStorage.getItem('UID').then((value) => (UIDK = value))


                }

    static navigationOptions = {
            drawerLabel: 'Profile',
            drawerFontSize: '24',
             drawerIcon: () => (
                             <MaterialIcons name={'account-circle'} size={25} />
                             ),

            };


  state = { currentUser: null }

          state = {
             editing: true,
           };

handleChange(e) { //Tiesiog funkcija, kuri reaguoja, kai naudotojas pradeda rašyti

      this.setState({
        fname: e.nativeEvent.text // į fname būsena įrašomi simboliai iš įvesties
      });

    };
    handleChange1(item) {

          this.setState({
            lname: item
          });

        }
   handleChange2(text){ // funkcija, kuri reaguoja, kai naudotojas pradeda rašyti
    this.setState({phone: text.replace(/[^0-9]/g, ''),}) // į phone būseną įrašomi skaičiai, jeigu yra simbolių ne skaičių - jie paprasčiausiai yra ignoruojami
   }




  retrieveData(){
   AsyncStorage.getItem('UID').then((value) => (UIDK = value))
  }

   handleSubmit() { // funkcija, kuri bus panaudota paspaudus Save mygtuką
   this.setState({
    animating: true, // pradedama animacija
   })
    AsyncStorage.getItem('UID').then((value) => (UIDK = value)) // gaunamas Naudotojo Unikalus id
    addItems(this.state.fname, this.state.lname, this.state.phone, UIDK) // Kreipiamasi į funkciją, kuri nusiųs duomenis į duombazę
         setTimeout(() => { // nustatomas laiko tarpas, po kurio bus pakeista animating būsena
              this.setState({
              animating: false,
              })
            }, 1500); // nustatyta 1500 ms
        }





          onBack = () => { // atgal mygtuko funkcija
                if (this.state.editing) {
                  Alert.alert(
                    "You're going back",
                    "Are you sure you want to close the app?",
                    [
                      { text: "Go back", onPress: () => {}, style: "cancel" },
                      { text: "Exit", onPress: () => BackHandler.exitApp()  },
                    ],
                    { cancelable: false },
                  );
                  return true;
                }

                return false;

}
componentDidMount() { //Komponentų 'Užmountinimas"
      const { currentUser } = firebase.auth() // gaunamas dabartinis naudotojas is firebase

      this.setState({ currentUser })
        AsyncStorage.getItem('UID').then((value) => (UIDK = value)) // gaunamas naudotojo Unikalus id

        AsyncStorage.getItem('user_data').then((user_data_json) => { // gaunami naudotojo duomenys
          let user_data = JSON.parse(user_data_json);
                db.ref('/users/'+UIDK).once('value', snapshot => { // kreipiamasi į duombazę su unikaliu vartotojo id
                                       if(snapshot.val() !=null){ // jei gauti duomenys egzistuoja
                                       data = snapshot.val();

                                        this.setState({
                                                     fname: data.fname,
                                                     phone: data.phone, // šie duomenys bus naudojami render()
                                                     lname: data.lname,
                                                     });
                                       }
                                          else{
                                            this.setState({
                                            fname: 'First name',
                                            lname: 'Last name',
                                            phone: 'Phone number',
                                            })
                                           }
                                        })
          this.setState({
                           user: user_data,
                           loaded: true
                          });





        });
  }


render() {
    const { currentUser } = this.state;
    const { navigation } = this.props;
    const UIDK = navigation.getParam('UID');

return (



 <View style={styles.Main}>
{/* Hamburger icona, kuri yra naudojama atidaryti drawer (stalčių)*/}
 <View style={styles.Hamburger}>
        <HeaderComponent {...this.props} />
        {/* Antraštės pavadinimas */}
 <View style={styles.HeaderName}>
            <Text style={styles.HeaderText}>
                Profile
            </Text>
            </View>
            </View>
            <View
              style={{
                borderBottomColor: '#28343E',
                borderBottomWidth: 6,
              }}
            />
            <View style={{flex: 1}}/>
{/* Vardas */}
 <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.FLNameStyle}>
        First name:
        <Text style={styles.FLNameStyleWhite}>
        {this.state.fname}
        </Text>
        </Text>

</View>
{/* Vardo įvestis, limitacija: 21 simbolių*/}
 <View style={{flex: 1}}>

        <TextInput


          autoCapitalize="none"
          style={styles.TStyle}
          placeholderTextColor={'white'}
          onChange={this.handleChange}
          onChangeText={this.retrieveData}
          maxLength={21}
        />
                         <View
                            style={{
                               borderBottomColor: '#4B4154',
                                 borderBottomWidth: 3,
                                    marginHorizontal:50,
                                   }}
                                   />
      </View>
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>

<Text style={styles.FLNameStyle}>
        Last name:
<Text style={styles.FLNameStyleWhite}>
                        {this.state.lname}
                        </Text>
        </Text>

        </View>
         <View style={{flex: 1}}>
         {/* Pavardės įvestis, 21 simbolių max */}
   <TextInput

          autoCapitalize="none"
          style={styles.TStyle}
          placeholderTextColor={'white'}
          onChangeText={this.handleChange1.bind(this)}
          maxLength={21}
                />
                   <View
                                 style={{
                                   borderBottomColor: '#4B4154',
                                   borderBottomWidth: 3,
                                     marginHorizontal:50,
                                 }}
                               />
                </View>
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
{/* Telefono numeris*/}
 <Text style={styles.FLNameStyle}>
         Phone number:
         <Text style={styles.FLNameStyleWhite}>
                         {this.state.phone}
                         </Text>
         </Text>
</View>
{/* Telefono numerio įvestis
    Max 10 simbolių,
    klaviatūros tipas: numeriai
*/}
          <View style={{flex: 1}}>
            <TextInput

                      autoCapitalize="none"
                     keyboardType='phone-pad'
                      style={styles.TStyle}
                      placeholderTextColor={'white'}
                      onChangeText={this.handleChange2.bind(this)}
                      maxLength={10}

                            />
                         <View
                            style={{
                               borderBottomColor: '#4B4154',
                                 borderBottomWidth: 3,
                                    marginHorizontal:50,
                                   }}
                                   />
           </View>
          <View style={{flex: 4}}>
{/* Save mygtukas */}
           <TouchableOpacity  onPress={this.handleSubmit}>
              <Text style = {styles.button}>
            Save
             </Text>
            </TouchableOpacity>
        {/* Animacija, kuri trunka 1.5 sec*/}
             {this.state.animating &&
                              <View>
                                  <ActivityIndicator
                                     color = '#4B4154'
                                     size = "small"
                                          />
                              </View>
                                      }
             <HandleBack onBack={this.onBack}>
                      <View>
                      <TouchableOpacity onPress={() => this.setState( {editing: true})}>
                           <Text>  </Text>
                         </TouchableOpacity>
                       </View>

                     </HandleBack>
                </View>
                </View>
    );
  }
  }
const addItems = (first, last, phone, UIDK) => {
              db.ref('/users/' + UIDK).update({ // duomenys įrašomi į duombazę
                fname: first,
                lname: last,
                phone: phone,
                });
             }