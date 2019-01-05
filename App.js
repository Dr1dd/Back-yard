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
import AdvertScreen from './src/components/Screens-main/AdvertScreen';
import MyListings from './src/components/Screens-main/MyListings';
import MyAds from './src/components/Screens-main/MyAds';
import Logout from './src/components/Screens-main/Logout';

//Pagrindinis js failiukas

const MenuIcon = ({ navigate }) => <Icon
    name='three-bars'
    size={30}
    color='#000'
    onPress={() => navigate('DrawerOpen')}
/>;
// Navigacija
const Home = createStackNavigator( //Stack navigator t.y. paprasta navigacija tarp langų. Šiuo atveju tai yra pirmi programėlės langai:
  {

    Loading, //1 Loading langas, kuris yra rodomas tik pajungus programėlę.
    SignUp, // Registracijos langas, kuris eina po Loading lango.
    Logges, // Prisijungimo langas
    },
    {
     headerMode: 'none', // išjungiama antraštė
      initialRouteName: 'Loading', // čia nustatomas pradinis langas
    }
 );
const AppDrawerNavigator = createDrawerNavigator({ // Kuriama Drawer navigator, t.y. navigacija, kurią galima pasiekti perbraukus pirštą (atsidaro kaip stalčius)

    Profile: { // Profilio langas - pavadinimas
    screen: Main, // Profilio klasės pavadinimas - Main

      navigationOptions: ({ navigation }) => ({
                headerRight: MenuIcon(navigation)
            })
    },
    Create: {screen: Creating}, // Skelbimų kūrimo langas.
    Search: {screen: Searching}, // Skelbimų langas
    MyListings: {screen: MyListings}, // Mano skelbimai
    Logout: {screen: Logout}, // Išėjimas iš programėlės
    AdvertScreen, // langas, kuris atsiranda paspaudus ant skelbimo
    MyAds, // langas, kuris atsiranda paspaudus ant savo skelbimo
},
 {
 drawerBackgroundColor: '#E9F8F7', // "stalčiaus' spalva
 headerMode: 'screen' }
);
const newRoute = StackNavigator({ // Nustatoma navigacijos eiga
     home: {screen: Home}, // Pirma 'home' navigacija, t.y. Loading, Signup, Logges
     Drawer: {screen: AppDrawerNavigator}, // Antra 'Drawer' navigacija
},{headerMode:'none'}
);
export default newRoute;