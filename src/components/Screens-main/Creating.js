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

// Skelbimų kūrimo klasė, funkcijos
let UIDK // vartotojo unikalus id
let sessionId // nuotraukos id, kuri bus nustatoma pagal dabartinį laiką
const Blob = RNFetchBlob.polyfill.Blob; // Blob'ai bus naudojami siunčiant nuotraukas į saugyklą
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
let UriResponse
const maxLength = 200;
let adUIDK // skelbimo id
let otherArgs = 1
let numberOfAds = 0
const uploadImage = (uri, mime = 'application/octet-stream') => { // upload funkcija
   return new Promise((resolve, reject) => { // promises (failas uploadinamas iki tol, kol jis yra uploadintas arba atsiranda kažkoks erroras)
     const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
     sessionId = new Date().getTime() // gaunamas laikas
     let uploadBlob = null
     const imageRef = stor.ref('images/' +sessionId) // imageRef yra vieta saugykloje

     fs.readFile(uploadUri, 'base64')
       .then((data) => {
         return Blob.build(data, { type : `${'image/jpg'};BASE64` }) //buildinamas blob'as jpg tipo
       })
       .then((blob) => {
         uploadBlob = blob
         return imageRef.put(uploadBlob,  { type: 'image/jpg' }) // uploadinamas blob'as
       })
       .then(() => {
         uploadBlob.close()
         return imageRef.getDownloadURL() //gaunamas url
       })
       .then((url) => {
         resolve(url) //promise išsprendžiama su gautu error
       })
       .catch((error) => {
         reject(error) // jeigu yra erroras
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
    this.handleSubmit = this.handleSubmit.bind(this); // submit funkcijos bindinimas
    this.Recursion = this.Recursion.bind(this); // rekursijos funkcijos bindinimas
  }
  state = { currentUser: null } // dabartinis vartotojas


   componentDidMount() {
    const { currentUser } = firebase.auth() // gaunamas dabartinis naudotojas iš firebase
                          this.setState({ currentUser })
                AsyncStorage.getItem('UID').then((value) => { // gaunamas unikalus vartotojo id (jis yra saugomas pačio vartotojo įrenginyje)
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

                               db.ref('/users/'+UIDK).once('value', snapshot => { //gaunamas telefono numeris, kuris bus įrašomas kartu su skelbimu
                                                                           data = snapshot.val();
                                                                             this.setState({
                                                                                 Phone: data.phone,
                                                                             })
                                                                             })

                            numberOfAds = 0 // nustatomi vartotojo turimi skelbimai (skaičius)
                     var dbref = db.ref('Adverts/').orderByChild("UserId").equalTo(UIDK); // skaičiuojama kiek paskyra turi skelbimų
                                          this.setState ( {dbulref: dbref});
                                             dbref.once('value', (e) => {
                                                 e.forEach((child) => {
                                                 numberOfAds +=1 // forEach skaičiuoja skelbimų sk ir pliusuoja +1
                                                 if(numberOfAds >= 7){ // jeigu skelbimų skaičius daugiau arba lygu nei 7
                                                  Alert.alert( // alertas, kad yra viršytas limitas
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
  handleSubmit() { //funkcija siunčianti duomenis
   let time = 10 // 10 bandymų
    this.setState({ uploadURL: ''})
    if(this.state.Title == '' || this.state.DescriptionStyle == '' || this.state.City == '' || this.state.uri == ''){ // jeigu yra tuščių langų išmetamas perspėjimas
        Alert.alert(
        'Warning',
         'Please enter all fields to continue',
           [
             { text: 'Ok', onPress: () => {}, style: 'cancel'},
           ]

        );
    }
    else { // jeigu visi langai atitinka reikalavimus
            this.setState({
                       animating: true }) // pradedama animacija

                       uploadImage(UriResponse) // uploadinama nuotrauka
                                          .then(url =>{
                                           let imgURL = url
                                            this.setState({
                                            uploadURL: imgURL,
                                          })
                                          })
        this.Recursion(time, 3000, this.state.uploadURL); // iškviečiamaa rekursijos funkcija
    }
    }
     Recursion(time, ms, upload){ // gaunamas time = bandymų kiekis, ms = kiek sekundžių trunka kiekvienas bandymas ir upload = upload url stadija (ar uploadinta ar ne)
          if(upload === '' || upload === undefined){ //jeigu dar nėra nuotrauka uploadinta į saugyklą
                        setTimeout(()=>{
                            this.Recursion(time-1, 3000, this.state.uploadURL); // iškviečiama ta pati funkcija tik dabar 1 mažiau bandymu
                        }, ms)

                    }
                    else {
                 addAdvertItems(this.state.Title, this.state.Description, this.state.City, this.state.UID, this.state.uploadURL, this.state.Phone, sessionId) // nuotrauka uploadinta tai galima siųsti duomenis į duomenų bazę
                      this.setState({
                        animating: false, // animacija išjungiama
                          })
                            Alert.alert( // alertas su pasirinkimais
                                     'Success',
                                     'Your advertisement has been successfully placed',
                            [
                                   { text: 'Search screen', onPress: () => this.props.navigation.navigate('Search')},
                                   { text: 'Profile screen', onPress: () => this.props.navigation.navigate('Profile')}
                            ],
                            { cancelable: false} // alerto neggalima skippinti
                            )
                    }

          }



     handleChange1(item) {
                  this.setState({Title: item});

            }
       handleChange2(item){
       this.setState({
       itemLength: maxLength-(maxLength-item.length), //skaičiuojamas simbolių skaičius description'e
       Description: item,
       });
       }

 _pickImage() { // iššaukia kamerą android telefonuose ( naudojama image-picker biblioteka)

      ImagePicker.launchCamera({}, response  => {
      UriResponse = response.uri
      this.setState({
        Uri: response.uri,
        uri: response.uri // uri telefone atmintyje
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
//miestai
const Cities = ['Vilnius', 'Kaunas', 'Klaipėda', 'Šiauliai', 'Panevėžys', 'Alytus', 'Marijampolė', 'Mažeikiai', 'Jonava', 'Utena', 'Kėdainiai', 'Telšiai', 'Visaginas', 'Tauragė', 'Ukmergė', 'Plungė', 'Šilutė', 'Kretinga', 'Radviliškis', 'Druskininkai', 'Palanga', 'Rokiškis', 'Biržai', 'Gargždai', 'Kuršėnai', 'Elektrėnai', 'Jurbarkas', 'Garliava', 'Vilkaviškis', 'Molėtai', 'Raseiniai', 'Anykščiai', 'Lentvaris', 'Prienai', 'Joniškis', 'Kupiškis', 'Zarasai', 'Ignalina'];

//funkcija siunčianti duomenis į firebase
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
