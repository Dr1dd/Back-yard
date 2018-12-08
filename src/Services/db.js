import Firebase from 'firebase';
 let config = {
    apiKey: "AIzaSyCcVDgMUODnqnzY-5fVrlaesLJ2wsoDKs4",
    authDomain: "https://nugarinis-jardas.firebaseapp.com",
    databaseURL: "https://nugarinis-jardas.firebaseio.com",
    projectId: "nugarinis-jardas",
    storageBucket: "gs://nugarinis-jardas.appspot.com",
    messagingSenderId: "17867734620"
  };
let app = Firebase.initializeApp(config);
export const db = app.database();
export const stor = app.storage();