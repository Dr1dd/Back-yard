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


let UIDK
let sessionId
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
let UriResponse
const maxLength = 200;
let adUIDK
let otherArgs = 1
let numberOfAds = 0
const uploadImage = (uri, mime = 'application/octet-stream') => {
   return new Promise((resolve, reject) => {
     const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
     sessionId = new Date().getTime()
     let uploadBlob = null
     const imageRef = stor.ref('images/' +sessionId)

     fs.readFile(uploadUri, 'base64')
       .then((data) => {
         return Blob.build(data, { type : `${'image/jpg'};BASE64` })
       })
       .then((blob) => {
         uploadBlob = blob
         return imageRef.put(uploadBlob,  { type: 'image/jpg' })
       })
       .then(() => {
         uploadBlob.close()
         return imageRef.getDownloadURL()
       })
       .then((url) => {
         resolve(url)
       })
       .catch((error) => {
         reject(error)
     })
   })
 }


export default class Creating extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Create',
    header: null,
     drawerIcon: () => (
                 <MaterialIcons name={'add-circle-outline'} size={25} />
                 )
  };
constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      Title: '',
      Description: '',
      City: '',
      UID: '',
      uri: '',
      URL: '',
      Phone: '',
      timePassed: false,
      animating: false,
      itemLength: 0,
      itemLength1: 0,
      Load: false,
      uploadURL: '',
      checking: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.Recursion = this.Recursion.bind(this);
  }
  state = { currentUser: null }


   componentDidMount() {
    const { currentUser } = firebase.auth()
                          this.setState({ currentUser })
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

                               db.ref('/users/'+UIDK).once('value', snapshot => {
                                                                           data = snapshot.val();
                                                                             this.setState({
                                                                                 Phone: data.phone,
                                                                             })
                                                                             })

                            numberOfAds = 0
                     var dbref = db.ref('Adverts/').orderByChild("UserId").equalTo(UIDK);
                                          this.setState ( {dbulref: dbref});
                                             dbref.once('value', (e) => {
                                                 e.forEach((child) => {
                                                 numberOfAds +=1
                                                 if(numberOfAds >= 7){
                                                  Alert.alert(
                                                                       'You have exceeded your maximum number of listing',
                                                               'Please remove some of the listings before proceeding',
                                                                       [
                                                                      { text: 'My Listings', onPress: () => this.props.navigation.navigate('MyListings')},
                                                                        { text: 'Profile screen', onPress: () => this.props.navigation.navigate('Profile')}
                                                                       ],
                                                                       { cancelable: false}
                                                                  );
                                                               }
                                                 });
                                                 });
                      });


    }
 componentDidUnMount() {
              this.state.dbulref.off('value');
          }
setTimePassed() {
   this.setState({timePassed: true});
}
  handleSubmit() {
   let time = 10
    this.setState({ uploadURL: ''})
    if(this.state.Title == '' || this.state.DescriptionStyle == '' || this.state.City == '' || this.state.uri == ''){
        Alert.alert(
        'Warning',
         'Please enter all fields to continue',
           [
             { text: 'Ok', onPress: () => {}, style: 'cancel'},
           ]

        );
    }
    else {
            this.setState({
                       animating: true })

                       uploadImage(UriResponse)
                                          .then(url =>{
                                           let imgURL = url
                                            this.setState({
                                            uploadURL: imgURL,
                                          })
                                          })
        this.Recursion(time, 3000, this.state.uploadURL);
    }
    }
     Recursion(time, ms, upload){
          if(upload === '' || upload === undefined){
                        setTimeout(()=>{
                            this.Recursion(time-1, 3000, this.state.uploadURL);
                        }, ms)

                    }
                    else {
                 addAdvertItems(this.state.Title, this.state.Description, this.state.City, this.state.UID, this.state.uploadURL, this.state.Phone, sessionId)
                      this.setState({
                        animating: false,
                          })
                            Alert.alert(
                                     'Success',
                                     'Your advertisement has been successfully placed',
                            [
                                   { text: 'Search screen', onPress: () => this.props.navigation.navigate('Search')},
                                   { text: 'Profile screen', onPress: () => this.props.navigation.navigate('Profile')}
                            ],
                            { cancelable: false}
                            )
                    }

          }



     handleChange1(item) {
                  this.setState({Title: item});

            }
       handleChange2(item){
       this.setState({
       itemLength: maxLength-(maxLength-item.length),
       Description: item,
       });
       }

 _pickImage() {

      ImagePicker.launchCamera({}, response  => {
      UriResponse = response.uri
      this.setState({
        Uri: response.uri,
        uri: response.uri
      })
      })
    }


  render() {

  const { currentUser } = this.state;

    return (
    <View style={styles.Main}>
         <View style={styles.Hamburger1}>
                <HeaderComponent {...this.props} />
         <View style={styles.HeaderName}>
                    <Text style={styles.HeaderText}>
                        Create
                    </Text>
         </View>
         </View>
                    <View
                    style={{

                     borderBottomColor: '#28343E',
                      borderBottomWidth: 6,
                            }}
                         />
            <ScrollView style={styles.Main}>
                <View style={ styles.ImageBlock }>
                       {
                     (() => {
                       switch (this.state.Uri) {
                         case null:
                           return null
                         case '':
                           return <ActivityIndicator />
                         default:
                           return (
                             <View>
                               <Image
                                 source={{ uri: this.state.Uri }}
                                 style={ styles.ImageStyle }
                               />

                             </View>
                           )
                       }
                     })()
                    }
                         </View>
           <View style={{ flex: 5}}>
                             <TouchableOpacity onPress={ () => this._pickImage() }>
                             <Text style={ styles.button }>
                               Take a photo
                             </Text>
                           </TouchableOpacity>

           </View>
            <View style={{ flex: 2}}>
             <Text style={styles.TitleStyle}>
                    Title:
                    </Text>


                    <TextInput
                      placeholder="Place your title here..."
                      autoCapitalize="none"
                      style={styles.TitleInputStyle}
                      onChangeText={this.handleChange1.bind(this)}
                      placeholderTextColor={'#778190'}
                      maxLength= {65}
                      maxHeight= {50}

                    />


                    <Text style={styles.TitleStyle}>
                                        Description:
                                        </Text>
                                <Text style={{
                                                  fontSize:15,
                                                  paddingRight: 55,
                                                  color:'lightgrey',
                                                  textAlign: 'right'
                                              }}>
                                                  {this.state.itemLength}/200
                                              </Text>

                         <TextInput
                           placeholder='Place your description here...'
                           autoCapitalize="none"
                           style={styles.DescriptionStyle}
                           onChangeText={this.handleChange2.bind(this)}
                           placeholderTextColor={'#778190'}
                           editable = {true}
                           multiline
                           minHeight = {150}
                           maxLength = {200}
                           maxHeight = {200}
                           numberOfLines={10}
                           blurOnSubmit={true}



                                  />
                    <Text style={styles.TitleStyle}>
                                        City:
                                        </Text>
                         <TouchableOpacity
                         style={styles.TitleInputStyle}
                          onPress={() => this.setState({isVisible: true})}>
                            <Text style={styles.WhiteText}>
                            {this.state.City || 'Select'}
                            </Text>
                      </TouchableOpacity>

                        <ListPopover
                          style ={{flex: 2}}
                         list={Cities}
                         isVisible = {this.state.isVisible}
                         onClick={(item)=> this.setState({City: item})}
                         onClose={() => this.setState({isVisible: false})}/>


                {this.state.animating &&
                  <View>
                      <ActivityIndicator
                         color = 'white'
                         size = "large"
                              />
                  </View>
                          }
                          <TouchableOpacity onPress={this.handleSubmit}>
                                       <Text style = {styles.button}>
                                     Publish
                                      </Text>
                                     </TouchableOpacity>


            </View>
            </ScrollView>
    </View>

    );
  }
}

const Cities = ['Vilnius', 'Kaunas', 'Klaipėda', 'Šiauliai', 'Panevėžys', 'Alytus', 'Marijampolė', 'Mažeikiai', 'Jonava', 'Utena', 'Kėdainiai', 'Telšiai', 'Visaginas', 'Tauragė', 'Ukmergė', 'Plungė', 'Šilutė', 'Kretinga', 'Radviliškis', 'Druskininkai', 'Palanga', 'Rokiškis', 'Biržai', 'Gargždai', 'Kuršėnai', 'Elektrėnai', 'Jurbarkas', 'Garliava', 'Vilkaviškis', 'Molėtai', 'Raseiniai', 'Anykščiai', 'Lentvaris', 'Prienai', 'Joniškis', 'Kupiškis', 'Zarasai', 'Ignalina'];


const addAdvertItems = (title, description, city, UID, URL, Phone, PicName) => {
            AsyncStorage.removeItem('AdKey')

              newAdPostKey = firebase.database().ref().child('Adverts').push().key;
              AsyncStorage.setItem('AdKey', newAdPostKey);

              db.ref('/Adverts/' + newAdPostKey).update({
                Title: title,
                Description: description,
                City: city,
                UserId: UID,
                imgUrl: URL,
                AdKey: newAdPostKey,
                PhoneNum: Phone,
                PicId: PicName,
                });
             }
