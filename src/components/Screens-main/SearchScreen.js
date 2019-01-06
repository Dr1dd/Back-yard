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
// Skelbimai
const WORow = ({name, city, url, navigation, UID}) => ( //Skelbimų funkcija (gaunamas skelbimo title, miestas, nuotraukos url, unikalus naudotojo id
        <View style={styles.SearchListing}>
        <View style={{flexDirection: 'row', justifyContent: 'center', flex: 1.5}}>
        {/* Skelbimo komponentai: nuotrauka, tekstas (Title) ir miestas*/}
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
export default class Searching extends Component {


static navigationOptions = {
       drawerLabel: 'Search',
       header: null, // išjungiama antraštė
        drawerIcon: () => (
                    <MaterialIcons name={'search'} size={25} /> // drawer navigacijos pasirinkimai: 'search' ikona, naudojama vector-icons biblioteka
                    )
     };

      constructor(props) {
             super(props);
             this.state = {
                 dataSource: new ListView.DataSource({
                     rowHasChanged: (row1, row2) => row1 !== row2,
                 }),
                 loading: true,
                 AdKey: '',
                 animating: false,
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

                       var dbref = db.ref('Adverts/');
                                 this.setState ( {dbulref: dbref});
                                         dbref.on('value', (e) => { // gaunami visi duomenys iš Adverts

                                             var rows = [];  //sukuriamas masyvas
                                             e.forEach((child) => { //Kiekvienam 'vaikui' iš Adverts/
                                             rows.push({  // į masyva 'įstumiami' duomenys gauti iš firebase
                                                title: child.val().Title,
                                                city: child.val().City,
                                                url: child.val().imgUrl,
                                                AdKey: child.val().AdKey,
                                             })

                                             rows = rows.reverse() // apkeičiamos šio masyvo elementų vietos, tam, kad skelbimus rodytų nuo naujausio iki seniausio
                                             });
                                             var ds = this.state.dataSource.cloneWithRows(rows); // naudojama ListView iš react-native, tam, kad sukurtume "grid view"
                                             this.setState({
                                                 dataSource: ds,
                                                 loading: false
                                             });
                                         });

                     });

      }
      SendData = (AdKey) =>{
      let key = AdKey
      return(
        this.props.navigation.navigate('AdvertScreen'),
        this.DataSend(key)
      )
      }
     DataSend(AdKey){
        AsyncStorage.setItem('AdKey', AdKey)
     }



       componentDidUnMount() {
              this.state.dbulref.off('value'); //išimama ar unmountinama dbulref vertė
          }
          renderRow (rd) { // renderinima elementų eilė

              return <WORow name={rd.title} city={rd.city} url={rd.url} navigation={() => this.SendData(rd.AdKey)} UID = {rd.AdKey}/>; // funkcijai perduodami iš row masyvo gauti duomenys
          }




          render() {
              if ( this.state.loading ) { // jeigu loading būsena yra true, tada yra 'renderinami' šie komponentai:
                  return (
                          <View style={{flex: 1, justifyContent:'center', backgroundColor: '#5F6A74'}}>
                          <ActivityIndicator size="large"/>
                          <Text style={{textAlign: 'center'}}>Loading</Text>
                          </View>
                  );
              }
              return (
                      <View style={styles.Main}>
                         <View style={styles.Hambutton}>
                                        <HeaderComponent {...this.props} />
                                 <View style={styles.HeaderName}>
                                            <Text style={styles.HeaderText}>
                                                Listings
                                            </Text>
                                            </View>
                                            </View>
                                            <View
                                            style={{
                                             borderBottomColor: '#28343E',
                                              borderBottomWidth: 6,
                                                    }}
                                                 />
                             {/*renderinamas listas*/}
                      <ListView dataSource={this.state.dataSource} style={styles.Main}
                  renderRow={(rowData) => this.renderRow(rowData)}
                      />

                      </View>
              );
          }


}
