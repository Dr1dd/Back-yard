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
import Searching from './SearchScreen';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

let adUIDK

let UIDK
export default class AdvertScreen extends React.Component {
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
       loading: true,

    };

  }
  state = { currentUser: null }


   componentDidMount() {
    const { currentUser } = firebase.auth()
                          this.setState({ currentUser })
                          AsyncStorage.getItem('AdKey').then((value) => {
                                                         adUIDK = value
                                                        this.setState({
                                                         ADUIDK: value,
                                                            });
                                                     });
             AsyncStorage.getItem('UID').then((value) => {
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
         db.ref('/Adverts/'+adUIDK).once('value', snapshot => {
                                  data = snapshot.val();
                                    this.setState({
                                        City: data.City,
                                        Title: data.Title,
                                        Description: data.Description,
                                        URL: data.imgUrl,
                                        Phone: data.PhoneNum

                                    })


                                   })



                               });
                               this.setState({
                               loading: false,
                               })

    }


  render() {
                if ( this.state.loading ) {
                    return (
                            <View style={{flex: 1, justifyContent:'center', backgroundColor: '#5F6A74'}}>
                            <ActivityIndicator size="large"/>
                            <Text style={{textAlign: 'center'}}>Loading</Text>
                            </View>
                    );
                }
  const { currentUser } = this.state;
    return (
        <ScrollView style={styles.Main}>


              <View style={{flex: 2, flexDirection: 'column'}}>
                            <Text style={{
                                              fontSize: 27,
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
               <View style={{flex: 2, flexDirection: 'column'}}>
               <Text style={{
               fontSize: 27,
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
                          fontSize: 27,
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
                                          fontSize: 27,
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
              fontSize: 17,
              paddingTop: 20,
              fontWeight: 'bold',
              color: 'white',
              }}>
                 {this.state.City}
                </Text>
           </View>
           <View style={{flex: 2, flexDirection: 'row'}}>
                      <Text style={{
                              fontSize: 22,
                             paddingLeft: 10,
                            paddingTop: 13,
                            paddingBottom: 20,
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
                                                                            paddingTop: 20,
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
            <View style={{flex: 2, flexDirection: 'row', height: 50}}>

            </View>
        </ScrollView>

    );
  }
}


