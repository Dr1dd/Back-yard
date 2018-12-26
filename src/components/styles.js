import { StyleSheet, Dimensions, Platform, PixelRatio } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';



const {
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');
const { width: WIDTH } = Dimensions.get('window')
const scale = WIDTH / 320;

export function normalize(size) {
  const newSize = size * scale
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}


let iconSize = 24;
export default StyleSheet.create({

  container1:{
             flex: 1,
             flexDirection: 'column',
             backgroundColor: '#5F6A74',


  },
  LoginAndSignup:{
                flex: 1,
               flexDirection: 'column',
               backgroundColor: '#5F6A74',
               justifyContent: 'center',
               alignItems: 'center',


  },
  HeaderName:{
             flex: 13,

             overflow: 'visible',



  },
  HeaderName1:{
               flex: 1,
              alignSelf: 'center',
              alignItems: 'center',
               justifyContent: 'center',


    },
  HeaderText:{
             flex: 5,
             fontSize: responsiveFontSize(5.5),
             fontWeight: 'bold',
             color: 'white',
             justifyContent: 'center',
             overflow: 'visible',
              textAlign:'center',
              alignSelf: 'center',

  },
  button: {
              width: WIDTH -55,
              height: 50,

              borderColor: 'black',
              textAlign: 'center',
              fontWeight: 'bold',
              color: 'white',
              borderRadius: 30,
              fontSize: responsiveFontSize(4.5),
              marginHorizontal: 25,
              margin: 15,
              backgroundColor: '#28343E',
              alignItems: 'center',
              justifyContent: 'center'

      },
  inputStyle: {
              width: WIDTH - 55,
              height: 50,
              borderRadius: 30,
              fontSize: responsiveFontSize(3),
              paddingLeft: 30,
              backgroundColor: '#415362',
              color: 'white',
              marginHorizontal: 25,
              margin: 15,
              shadowOffset: { width: 0, height: 3},
              shadowColor: 'black',
              shadowRadius: 5,
              shadowOpacity: 1.0,
  },
  signupText: {
              color: 'white',
              fontSize: responsiveFontSize(2)
  },
  signupTextContr: {
              flexDirection: 'row',
              fontSize: responsiveFontSize(2)
  },
  signupTextgray: {
                fontSize: responsiveFontSize(2)
    },
  error:{
        color: 'red',
        alignItems: 'center',
        justifyContent: 'center',

  },
    errorMessage: {
      fontSize: responsiveFontSize(2),
      color:"red",
      marginLeft:-80,
    },
    icon: {
        width: 24,
        height: 24,
      },
    Hamburger: {
    height: SCREEN_HEIGHT/11,
    backgroundColor: '#5F6A74',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
    },
    Hamburger1:{
    height: SCREEN_HEIGHT/11,
     backgroundColor: '#5F6A74',
        flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
        margin: 0,
    },
    Main: {
        flex: 1,
        flexGrow: 1,
         backgroundColor: '#5F6A74'
    },
    Line: {
        borderBottomWidth: 3,
        borderColor:'#17557E',
        marginHorizontal:50,
        padding: 0,
        borderColor: 'black',

    },

    FLNameStyle: {
                  width: WIDTH - 55,
                  height: 75,
                  borderRadius: 0,
                  fontSize: responsiveFontSize(3.5),
                  paddingLeft: 10,
                  paddingRight: 5,
                  fontWeight: 'bold',
                  color: '#28343E',
                  marginHorizontal: 10,
                  margin: 0,
                  paddingBottom: 0,
                  overflow: 'visible',


      },
        FLNameStyleWhite: {
                        width: WIDTH - 55,
                        height: 70,
                        borderRadius: 0,
                        fontSize: responsiveFontSize(2.5),
                        paddingLeft: 25,
                        fontWeight: 'bold',
                        color: 'white',
                        marginHorizontal: 10,
                        margin: 0,
                        paddingBottom: 0,

                        overflow: 'visible',


            },
     TStyle: {
          color: 'white',
          fontSize: responsiveFontSize(2),
          paddingLeft: 40,
          marginHorizontal: 10,
          margin: 0,
          padding: 0,
          justifyContent: 'flex-end'
     },
     TitleInputStyle: {
                   width: WIDTH - 55,
                   height: 50,
                   borderRadius: 30,
                   fontSize: responsiveFontSize(3),
                   paddingLeft: 30,
                   paddingRight: 7,
                   backgroundColor: '#415362',
                   color: 'white',
                   marginHorizontal: 25,
                   margin: 15,

       },
        TitleStyle: {
                         width: WIDTH - 55,
                         height: 35,
                         borderRadius: 0,
                         fontSize: responsiveFontSize(3.5),
                         paddingLeft: 10,
                         fontWeight: 'bold',
                         color: '#28343E',
                         marginHorizontal: 20,


             },
        DescriptionStyle: {
                           justifyContent: 'flex-start',
                           textAlignVertical: 'top',
                           alignItems: 'flex-start',
                           width: WIDTH - 55,
                           borderRadius: 30,
                           flex: 1,
                           fontSize: responsiveFontSize(3),
                           paddingLeft: 20,
                           paddingTop: 1,
                           paddingRight: 8,
                           backgroundColor: '#415362',
                           color: 'white',
                           marginHorizontal: 25,
                           margin: 5,
        },
        WhiteText:{
            color: 'white',
            fontSize: 20,
            justifyContent: 'center',
             height: 40,
              borderRadius: 0,
              fontSize: normalize(25),
            paddingTop: 5,
            paddingLeft: 10,

        },
        ImageStyle:{
            width: WIDTH - 55,
            borderRadius: 30,
            height: 300,

            resizeMode: 'stretch',
        },
        ImageBlock:{
        width: WIDTH - 55,
         height: 300,
          flex: 4,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 30,
          backgroundColor: '#415362',

            margin: 30,
        },
      listView: {
            flex: 1,
          },
          listItem: {
            borderBottomColor: '#eee',
            borderColor: 'gray',
            flexDirection:'row',
            alignItems:'center',
            borderWidth: 1,
            padding:20
          },
          listItemTitle: {
            flex: 6,
            color: '#000',
            fontSize: normalize(16),
          },
          listItemAction: {
            flex: 1,
            width: 40,
            height: 40
          },
          navbar: {
            alignItems: 'center',
            backgroundColor: '#fff',
            borderBottomColor: '#eee',
            borderColor: 'transparent',
            borderWidth: 1,
            justifyContent: 'center',
            height: 54,
            flexDirection: 'row'
          },
          navbarTitle: {
            color: '#444',
            fontSize: normalize(16),
            fontWeight: "500"
          },
          SearchListing: {
                     margin: 8,

                     height: 150,
                     flex: 2,
                     flexDirection: 'row',
                     borderRadius: 30,
                     backgroundColor: '#415362',

          },
           toolbar: {
             backgroundColor: '#2196F3',
             height: 56,
             textAlign: 'center',
             alignItems: 'center',
             flexDirection: 'row',
           },
            ListingImageStyle:{
                        width: WIDTH/2.5,
                        borderRadius: 30,
                        borderColor: 'black',
                        height: 135,
                       marginLeft: 10,

                        marginVertical: 7.5,
                    },
           Hambutton:{
             backgroundColor: '#5F6A74',
                flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                height: SCREEN_HEIGHT/11,
        },
         Hambutton1:{
                     backgroundColor: '#5F6A74',
                        flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        height: SCREEN_HEIGHT/11,
                },
         AdvertImageBlock:{
                width: WIDTH - 55,
                resizeMode: 'stretch',
                 height: 400,
                  flex: 4,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 30,
                  backgroundColor: '#415362',

                    margin: 30,
                    marginVertical: 10,
                },
          ImageStyle2:{
                     width: WIDTH - 53,
                     borderRadius: 30,
                     height: 405,

                     resizeMode: 'stretch',
                 },
         AdvertWhite:{
                                        paddingLeft: 40,
                                        paddingRight: 30,
                                        fontSize: normalize(21),
                                        fontWeight: 'bold',
                                        color: 'white',

         },
           AdDescriptionStyle: {
                                    justifyContent: 'flex-start',
                                    textAlignVertical: 'top',
                                    alignItems: 'flex-start',
                                    width: WIDTH - 55,
                                    borderRadius: 30,
                                    fontSize: normalize(20),
                                    paddingLeft: 20,
                                    paddingTop: 5,
                                    paddingRight: 8,
                                    paddingBottom: 5,
                                    backgroundColor: '#415362',
                                    color: 'white',
                                    marginHorizontal: 25,
                                    margin: 15,
                 },
                 MainOnCreate: {
                        flex: 7,
                         flexGrow: 1,
                          backgroundColor: '#5F6A74'
                 },
               ListText: {
                fontSize: responsiveFontSize(2.5),
                           fontWeight: '500',
                           textAlign: 'left',
                           color: 'black',
                           flex: 7,
                           margin: 7,
                           paddingLeft: WIDTH-(WIDTH-7),
               }

});

