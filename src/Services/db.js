import firebase from 'firebase';
 let config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "nugarinis-jardas",
    storageBucket: "gs://nugarinis-jardas.appspot.com",
    messagingSenderId: ""
  };
let app = firebase.initializeApp(config);
export const db = app.database();
export const stor = app.storage();
