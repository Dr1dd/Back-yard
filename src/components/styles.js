import { StyleSheet, Dimensions } from 'react-native';

const { width: WIDTH } = Dimensions.get('window')
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
             flex: 4,
             marginLeft: 110,

  },
  HeaderText:{
             flex: 4,
             alignItems: 'center',
             fontSize: 35,
             fontWeight: 'bold',
             color: 'white',

  },
  button: {
              width: WIDTH -55,
              height: 50,
              padding: 5,
              borderColor: 'black',
              textAlign: 'center',
              fontWeight: 'bold',
              color: 'white',
              borderRadius: 25,
              fontSize: 30,
              margin: 20,
              backgroundColor: '#28343E',
              alignItems: 'center',
              justifyContent: 'center',
              shadowOffset: { width: 0, height: 3 },
              shadowRadius: 5,
              shadowColor: 'black',
              shadowOpacity: 1.0,
      },
  inputStyle: {
              width: WIDTH - 55,
              height: 50,
              borderRadius: 30,
              fontSize: 25,
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
              fontSize: 20
  },
  signupTextContr: {
              flexDirection: 'row',
              fontSize: 20
  },
  signupTextgray: {
                fontSize: 20
    },
  error:{
        color: 'red',
        alignItems: 'center',
        justifyContent: 'center',

  },
    errorMessage: {
      fontSize: 20,
      color:"red",
      marginLeft:-80,
    },
    icon: {
        width: 24,
        height: 24,
      },
    Hamburger: {
    flex: 0.8,
    backgroundColor: '#5F6A74',
    flexDirection: 'row',
    padding: 0,
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
                  height: 50,
                  borderRadius: 0,
                  fontSize: 25,
                  paddingLeft: 10,
                  fontWeight: 'bold',
                  color: '#28343E',
                  marginHorizontal: 10,
                  margin: 0,
                  paddingBottom: 0,
                  overflow: 'visible',


      },
        FLNameStyleWhite: {
                        width: WIDTH - 55,
                        height: 50,
                        borderRadius: 0,
                        fontSize: 17,
                        paddingLeft: 25,
                        fontWeight: 'bold',
                        color: 'white',
                        marginHorizontal: 10,
                        margin: 10,
                        paddingBottom: 0,

                        overflow: 'visible',


            },
     TStyle: {
          color: 'white',
          fontSize: 24,
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
                   fontSize: 20,
                   paddingLeft: 30,
                   backgroundColor: '#415362',
                   color: 'white',
                   marginHorizontal: 25,
                   margin: 15,

       },
        TitleStyle: {
                         width: WIDTH - 55,
                         height: 30,
                         borderRadius: 0,
                         fontSize: 25,
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
                           height: 200,
                           borderRadius: 30,
                           fontSize: 20,
                           paddingLeft: 30,
                           backgroundColor: '#415362',
                           color: 'white',
                           marginHorizontal: 25,
                           margin: 15,
        },
        WhiteText:{
            color: 'white',
            fontSize: 20,
            justifyContent: 'center',
             height: 40,
              borderRadius: 0,
              fontSize: 25,
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
            fontSize: 16,
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
            fontSize: 16,
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
                        width: 135,
                        borderRadius: 60,
                        borderColor: 'black',
                        height: 135,
                       marginLeft: 12,

                        marginVertical: 7.5,
                        resizeMode: 'stretch',
                    },
           Hambutton:{
             backgroundColor: '#5F6A74',
                flexDirection: 'row',
                flex: 0.08,
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
                                        fontSize: 21,
                                        fontWeight: 'bold',
                                        color: 'white',

         },
           AdDescriptionStyle: {
                                    justifyContent: 'flex-start',
                                    textAlignVertical: 'top',
                                    alignItems: 'flex-start',
                                    width: WIDTH - 55,
                                    borderRadius: 30,
                                    fontSize: 20,
                                    paddingLeft: 30,
                                    backgroundColor: '#415362',
                                    color: 'white',
                                    marginHorizontal: 25,
                                    margin: 15,
                 },
});

