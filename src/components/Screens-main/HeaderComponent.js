import React, { Component } from 'react';
import Button from 'react-native-button';
import {Text, View, Image, TouchableHighlight} from 'react-native';
import { Navigation, DrawerNavigator, createDrawNavigator, createStackNavigator, StackNavigator } from 'react-navigation';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';


export default class HeaderComponent extends Component {
    render(){
        return(<View style={{
            height: responsiveHeight(6),
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
        }}>
            <TouchableHighlight style={{ marginLeft: 23, marginTop: 6, alignItems: 'center', justifyContent: 'center' }}
                onPress={() => {
                this.props.navigation.openDrawer();
                 }}>
                <Image
                    style={{ width: 35, height: 25, alignItems: 'center', justifyContent: 'center' }}
                    source={{uri: 'https://tutorialscapital.com/wp-content/uploads/2017/11/hamburger.png'}}
                   />
            </TouchableHighlight>
         </View>

        );
    }
}