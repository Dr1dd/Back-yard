import React, { Component } from 'react';
import Button from 'react-native-button';
import {Text, View, Image, TouchableHighlight} from 'react-native';
import { Navigation, DrawerNavigator, createDrawNavigator, createStackNavigator, StackNavigator } from 'react-navigation';


export default class HeaderComponent extends Component {
    render(){
        return(<View style={{
            height: 35,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
        }}>
            <TouchableHighlight style={{ marginLeft: 10, marginTop: 6 }}
                onPress={() => {
                this.props.navigation.openDrawer();
                 }}>
                <Image
                    style={{ width: 35, height: 25 }}
                    source={{uri: 'https://tutorialscapital.com/wp-content/uploads/2017/11/hamburger.png'}}
                   />
            </TouchableHighlight>
         </View>

        );
    }
}