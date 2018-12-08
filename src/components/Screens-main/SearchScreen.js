import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
  ActivityIndicator
} from 'react-native';

import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker';
import { stor } from '../../Services/db';
import RNFetchBlob from 'rn-fetch-blob';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles';
import HeaderComponent from './HeaderComponent';
import { createDrawerNavigator, createStackNavigator, StackNavigator } from 'react-navigation';



const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const uploadImage = (uri, mime = 'application/octet-stream') => {
   return new Promise((resolve, reject) => {
     const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
     const sessionId = new Date().getTime()
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

class Searching extends Component {
static navigationOptions = {
       drawerLabel: 'Search',
       header: null,
        drawerIcon: () => (
                    <MaterialIcons name={'search'} size={25} />
                    )
     };
  constructor(props) {
    super(props)

    this.state = {}
  }

  _pickImage() {
    this.setState({ uploadURL: '' })

    ImagePicker.launchCamera({}, response  => {
      uploadImage(response.uri)
        .then(url => this.setState({ uploadURL: url }))
        .catch(error => console.log(error))

        console.log(this.state.uploadURL)
    })
  }

  render() {
    return (
      <View style={ styless.container }>
        {
          (() => {
            switch (this.state.uploadURL) {
              case null:
                return null
              case '':
                return <ActivityIndicator />
              default:
                return (
                  <View>
                    <Image
                      source={{ uri: this.state.uploadURL }}
                      style={ styless.image }
                    />
                    <Text>{ this.state.uploadURL }</Text>
                  </View>
                )
            }
          })()
        }
        <TouchableOpacity onPress={ () => this._pickImage() }>
          <Text style={ styless.upload }>
            Upload
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styless = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    height: 200,
    resizeMode: 'contain',
  },
  upload: {
    textAlign: 'center',
    color: '#333333',
    padding: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: 'gray'
  },
})

export default Searching