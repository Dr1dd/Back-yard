import React, {
  Component
} from 'react';
import {
  AppRegistry,
   StyleSheet,
   Text,
   View,
   AsyncStorage,
   TouchableOpacity,
   Platform,
   Image,
   ActivityIndicator,
   ListView,
   TextInput,
   ToolbarAndroid
} from 'react-native';
import styles from '../styles.js';
import Searching from './SearchScreen';
import { stor, db } from '../../Services/db';
import { createDrawerNavigator, createStackNavigator, StackNavigator } from 'react-navigation';
import HeaderComponent from './HeaderComponent';
import * as firebase from 'firebase';


class PostsList extends Component {
     constructor(props) {
         super(props);
         this.state = {
             posts: []
         }
     }

      componentDidMount() {
         const { currentUser } = firebase.auth()
                this.setState({ currentUser })
                AsyncStorage.getItem('user_data').then((user_data_json) => {
                          let user_data = JSON.parse(user_data_json);
           AsyncStorage.getItem('UID').then((value) => {
               UIDK = value
              this.setState({
               UID: value,
                  });
           });
           this.setState({
                       user: user_data,
                       loaded: true

                     });
                     });
         db.ref('Adverts/').on('value', function(data) {
         console.log(data.val()+"kkk")
                     this.setState({ posts: data.val() });
                 });
      }
  render() {
    return <PostsList posts={this.state.posts}/>

  }
 }
