import React, {Component} from 'react';
import { View, Button, Text, Image, TextInput, NestedScrollView, ToolbarAndroid, AsyncStorage, ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, ImageBackground, BackHandler, Platform, Alert } from 'react-native';
import { createDrawerNavigator, createStackNavigator, StackNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles';
import HeaderComponent from './HeaderComponent';
import ListPopover from 'react-native-list-popover';
import { db, stor } from '../../Services/db';
import firebase from 'react-native-firebase';
import RNFetchBlob from 'rn-fetch-blob';
import ImagePicker from 'react-native-image-picker';
import HandleBack from '../HandleBack';
import MyListings from './MyListings';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

let adUIDK

let UIDK
let picID
// Mano skelbimai
export default class MyAds extends React.Component { // My ads klasė, kuri yra beveik identiška AdvertScreen.js failiuko klasei AdvertScreen  skirtumas: pridėtas delete mygtukas
static navigationOptions = {
      header: null,
drawerLabel: () => null
      }
constructor(props) {
    super(props);
    this.state = {
       Title: '',
       URL: '',
       City: '',
       Phone: '',
       Name: '',
       User: '',
       Description: '',
       ADUIDK: '',
       picId: '',
       animating: false,

    };

  }
  state = { currentUser: null }


   componentDidMount() {
    const { currentUser } = firebase.auth()
                          this.setState({ currentUser })
                          AsyncStorage.getItem('AdKey').then((value) => { // gaunamas skelbimo id
                                                         adUIDK = value
                                                        this.setState({
                                                         ADUIDK: value,
                                                            });
                                                     });
             AsyncStorage.getItem('UID').then((value) => { // gaunamas user id
                                      UIDK = value
                                     this.setState({
                                      UID: value,
                                         });
                                  });
                          AsyncStorage.getItem('user_data').then((user_data_json) => {
                                    let user_data = JSON.parse(user_data_json);

                     this.setState({
                                 user: user_data,
                                 loaded: true

                               });
         db.ref('/Adverts/'+adUIDK).once('value', snapshot => { // gaunami skelbimo duomenys
                                  data = snapshot.val();
                                    this.setState({
                                        City: data.City,
                                        Title: data.Title,
                                        Description: data.Description,
                                        URL: data.imgUrl,
                                        picId: data.PicId,
                                        Phone: data.PhoneNum

                                    })
                                    picID = JSON.stringify(data.PicId)
                                     console.log(picID)

                                   })




                               });

    }

   Del = () =>{ // delete funkcija, kuri trina skelbimus iš firebase duombazės ir nuotraukų saugyklos
     this.setState({
                          animating: true }) // pradeda animaciją.
    AsyncStorage.getItem('AdKey').then((value) => {
              adUIDK = value // gaunamas skelbimo unikalus raktas
            })
    stor.ref('images').child(picID).delete(); // ištrinama skelbimo nuotrauka
    db.ref('Adverts').child(adUIDK).remove(); // iš duomenų bazės ištrinamas skelbimas
   AsyncStorage.removeItem('AdKey') // ištrinamas iš įrenginio unikalus skelbimo id
   setTimeout( ()=> {
   this.setState({
                             animating: false }) // animacija išjungiama
      this.props.navigation.navigate('MyListings') // grįžtama atgal
   },3000) // delay 3 sekundžių
   }
  render() {

  const { currentUser } = this.state;
    return (
        <ScrollView style={styles.Main}>


              <View style={{flex: 2, flexDirection: 'column'}}>
                            <Text style={{
                                              fontSize: responsiveFontSize(3.5),
                                              paddingLeft: 10,
                                              fontWeight: 'bold',
                                              color: '#28343E',
                                              justifyContent: 'center',
                                              alignItems: 'center',
                            }}>
                            Title:
                            </Text>
                            <Text style={styles.AdvertWhite}>
                             {this.state.Title}
                            </Text>
                         </View>
                         {/* responisveFontSize yra dydis, kuris yra suskaičiuojamas kiekvienam įrenginiui skirtingai (pagal ekrano dydį) */}
               <View style={{flex: 2, flexDirection: 'column'}}>
               <Text style={{
               fontSize: responsiveFontSize(3.5),
                  paddingLeft: 10,
                  paddingTop: 20,
                  fontWeight: 'bold',
                  color: '#28343E',
                  justifyContent: 'center',
                  alignItems: 'center',
               }}>
                Photo:
               </Text>
               </View>

           <View style={styles.AdvertImageBlock}>
            {/* Tas pats kaip ir AdvertScreen.js*/}
  {
                           (() => {
                              switch (this.state.URL) {
                                  case '':
                                     return null
                                  default:
                                     return (
                                        <Image
                                             source= {{uri : this.state.URL}}
                                              style= {styles.ImageStyle2}
                                                     />
                                                                        )
                                                }
                                              })()
                                             }

           </View>
           <View style={{flex: 2, flexDirection: 'column'}}>
                          <Text style={{
                          fontSize: responsiveFontSize(3.5),
                             paddingLeft: 10,
                             paddingTop: 20,
                             fontWeight: 'bold',
                             color: '#28343E',
                             justifyContent: 'center',
                             alignItems: 'center',
                          }}>
                           Description:
                          </Text>
                          </View>
           <View style={styles.AdDescriptionStyle}>
            <Text style={{
             fontSize: responsiveFontSize(3),
              fontWeight: 'bold',
              color: 'white',
            }}>
            {this.state.Description}
            </Text>
           </View>
           <View style={{flex: 2, flexDirection: 'row'}}>
           <Text style={{
                                          fontSize: responsiveFontSize(3.5),
                                             paddingLeft: 10,
                                             paddingTop: 10,
                                             fontWeight: 'bold',
                                             color: '#28343E',
                                             justifyContent: 'center',
                                             alignItems: 'center',
                                          }}>
              City:
              </Text>
              <Text style={{
              paddingLeft: 10,
              fontSize: responsiveFontSize(2),
              paddingTop: 20,
              fontWeight: 'bold',
              color: 'white',
              }}>
                 {this.state.City}
                </Text>
           </View>

           {/* Viskas tas pats kaip ir AdverScreen.js, {this.state.City} į ekraną rašo city būseną */}
           <View style={{flex: 2, flexDirection: 'row'}}>
                      <Text style={{
                              fontSize: responsiveFontSize(3),
                             paddingLeft: 10,
                            paddingTop: 10,
                          fontWeight: 'bold',
                          color: '#28343E',
                          justifyContent: 'center',
                          alignItems: 'center',
                         }}>
                         Phone number:
                         </Text>
                          {
                                              (() => {
                                                switch (this.state.Phone) {
                                                  case 'Phone number':
                                                    return this.setState({ Phone: 'No phone number given'})
                                                  case null:
                                                    return this.setState({ Phone: 'No phone number given'})
                                                  case '':
                                                    return this.setState({ Phone: 'No phone number given'})
                                                  default:
                                                    return (
                                                    <Text style={{
                                                                            paddingLeft: 10,
                                                                            fontSize: responsiveFontSize(2),
                                                                            paddingTop: 17,
                                                                            fontWeight: 'bold',
                                                                            color: 'white',
                                                                            }}>
                                                      {this.state.Phone}
                                                                                 </Text>
                                                    )
                                                }
                                              })()
                                             }


                      </View>
                      {/* Animacija + Delete mygtukas, kuris iššaukia funkciją Del */}
                    <View style={{flex: 2, flexDirection: 'column'}}>
                    {this.state.animating &&
                                      <View>
                                          <ActivityIndicator
                                             color = 'white'
                                             size = "large"
                                                  />
                                       </View>
                                                  }
                        <TouchableOpacity  onPress={() => this.Del()}>
                                     <Text style = {styles.button}>
                                   Delete
                                    </Text>
                                   </TouchableOpacity>
                    </View>
        </ScrollView>

    );
  }
}


