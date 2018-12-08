import React, { Component } from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity, ImageBackground, BackHandler } from 'react-native';
import { DrawerNavigator, createDrawerNavigator, createStackNavigator, StackNavigator } from 'react-navigation';
import styles from './src/components/styles';
import firebase from 'react-native-firebase';

import Loading from './src/components/Loading';
import SignUp from './src/components/SignUp';
import Logges from './src/components/Logges';
import Main from './src/components/Main';

import { addItem, addItem1} from './src/Services/ItemService';
import Icon from 'react-native-vector-icons/Octicons';
import Creating from './src/components/Screens-main/Creating';
import Searching from './src/components/Screens-main/SearchScreen';
import Logout from './src/components/Screens-main/Logout';


const MenuIcon = ({ navigate }) => <Icon
    name='three-bars'
    size={30}
    color='#000'
    onPress={() => navigate('DrawerOpen')}
/>;

const Home = createStackNavigator(
  {

    Loading,
    SignUp,
    Logges,
    },
    {
     headerMode: 'none',
      initialRouteName: 'Loading',
    }
 );
const AppDrawerNavigator = createDrawerNavigator({
    Profile: {
    screen: Main,

      navigationOptions: ({ navigation }) => ({
                headerRight: MenuIcon(navigation)
            })
    },
    Create: {screen: Creating},
    Search: {screen: Searching},
    Logout: {screen: Logout},
},
 {
 drawerBackgroundColor: '#E9F8F7',
 headerMode: 'screen' }
);
const newRoute = StackNavigator({
     home: {screen: Home},
     Notifications: {screen: AppDrawerNavigator},
},{headerMode:'none'}
);
export default newRoute;