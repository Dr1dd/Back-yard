import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
  ActivityIndicator,
  ListView,
  AsyncStorage,
  TextInput,
  ToolbarAndroid,
  TouchableHighlight,
} from 'react-native';


import { stor, db } from '../../Services/db';
import PostsList from './ConponentPush.js';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Toolbar } from 'react-native-material-ui'
import styles from '../styles';
import * as firebase from 'firebase';
import FloatingActionButton from 'react-native-action-button';
import HeaderComponent from './HeaderComponent';
import AdvertScreen from './AdvertScreen';
import Main from '../Main';
import HandleBack from '../HandleBack';
import { createDrawerNavigator, createStackNavigator, StackNavigator } from 'react-navigation';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';


let navigation
let numberOfAds = 0
const WORow = ({name, city, url, navigation, UID}) => (
        <View style={styles.SearchListing}>
        <View style={{flexDirection: 'row', justifyContent: 'center', flex: 1.5}}>
         <Image
                  source= {{uri : url}}
                     style={ styles.ListingImageStyle }
                     />
           </View>
          <View style={{flexDirection: 'column', flex: 2}}>

        <Text style={styles.ListText}
        onPress= {navigation}
        numberOfLines={4}
        >
        {name}
    </Text>

        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end'}}>

        <Text style={{textAlign: 'right', color: 'black', fontSize: responsiveFontSize(2), margin: 5, paddingRight: 15, fontWeight: 'bold'}}>{city}</Text>

        </View>
        </View>
        </View>
);

let UIDK
// Mano skelbimai
export default class MyListings extends Component { // Ši klasė yra labai panaši kaip ir SearchScreen.js failiuke esanti Searching klasė.


static navigationOptions = {
       drawerLabel: 'My Listings',
       header: null,
        drawerIcon: () => (
                    <MaterialIcons name={'list'} size={25} />
                    )
     };

      constructor(props) { // tas pats kaip ir Searching klasė (SearchScreen.js)
             super(props);
             this.state = {
                 dataSource: new ListView.DataSource({
                     rowHasChanged: (row1, row2) => row1 !== row2,
                 }),
                 loading: true,
                 AdKey: '',
             }
             this.SendData = this.SendData.bind(this);
         }

     getDataSource(posts: Array<any>): ListView.DataSource {
            if(!posts) return;
            return this.state.dataSource.cloneWithRows(posts);
        }

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
                                numberOfAds = 0
                                var dbref = db.ref('Adverts/').orderByChild("UserId").equalTo(UIDK); //pagrindinis skirtumas: Ieškomi visi skelbimai, kurie turie atitinkamą Unikalų skelbimo id

                                   this.setState ( {dbulref: dbref});
                                           dbref.on('value', (e) => {
                                               var rows = [];// SearchScreen.js tas pats
                                               e.forEach((child) => {// SearchScreen.js tas pats
                                               numberOfAds +=1// SearchScreen.js tas pats
                                               rows.push({// SearchScreen.js tas pats
                                                  title: child.val().Title,// SearchScreen.js tas pats
                                                  city: child.val().City,// SearchScreen.js tas pats
                                                  url: child.val().imgUrl,// SearchScreen.js tas pats
                                                  AdKey: child.val().AdKey, // SearchScreen.js tas pats
                                               })

                                               rows = rows.reverse()
                                               });
                                               var ds = this.state.dataSource.cloneWithRows(rows);// SearchScreen.js tas pats
                                               this.setState({
                                                   dataSource: ds,// SearchScreen.js tas pats
                                                   loading: false
                                               });
                                           });


                                         });


      }
      SendData = (AdKey) =>{
      let key = AdKey
      return(// SearchScreen.js tas pats
        this.props.navigation.navigate('MyAds'),
        this.DataSend(key)
      )
      }// SearchScreen.js tas pats
     DataSend(AdKey){// SearchScreen.js tas pats
        AsyncStorage.setItem('AdKey', AdKey)
     }
onBack = () => {
       return this.props.navigation.navigate('Profile')


     };

       componentDidUnMount() { // SearchScreen.js tas pats
              this.state.dbulref.off('value');
          }
          renderRow (rd) {
              return <WORow name={rd.title} city={rd.city} url={rd.url} navigation={() => this.SendData(rd.AdKey)} UID = {rd.AdKey}/>;// SearchScreen.js tas pats
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
              return (
                      <View style={styles.Main}>
                         <View style={styles.Hambutton1}>
                                        <HeaderComponent {...this.props} />
                                 <View style={styles.HeaderName}>
                                            <Text style={styles.HeaderText}>
                                               My Listings
                                            </Text>
                                            </View>
                                            </View>
                                            <View
                                            style={{
                                             borderBottomColor: '#28343E',
                                              borderBottomWidth: 6,
                                                    }}
                                                 />

                      <ListView dataSource={this.state.dataSource} style={styles.Main}
                  renderRow={(rowData) => this.renderRow(rowData)}
                      />
                                <View
                                            style={{
                                             borderBottomColor: '#28343E',
                                              borderBottomWidth: 3,
                                                    }}
                                                 />
                       <View style={{ height: 5, alignItems: 'center', flexDirection:'column'}}>

                             <Text style={{
                                alignItems: 'center',
                                color:'white'
                             }}>

                                Total listings: {numberOfAds}/7
                                 </Text>
                                    </View>
                          <HandleBack onBack={this.onBack}>
                                                <View>
                                                       <TouchableOpacity onPress={() => this.setState( {editing: true})}>
                                                            <Text>  </Text>
                                                          </TouchableOpacity>
                                                        </View>
                                                      </HandleBack>

                      </View>
              );
          }


}
