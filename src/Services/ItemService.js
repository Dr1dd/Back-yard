import { db } from './db';
import firebase from 'firebase';
import { AsyncStorage } from "react-native"

let newPostKey
export const addItem =  (item) => {
  AsyncStorage.removeItem('UID')
            let postData = {
                email: item,
              };

              newPostKey = firebase.database().ref().child('users').push().key;
              AsyncStorage.setItem('UID', newPostKey);
            let updates = {};
              updates['/users/' + newPostKey] = postData;
              return firebase.database().ref().update(updates);

             }

export const addItem1 = (first, last, UIDK) => {
              db.ref('/users/' + UIDK).update({
                fname: first,
                lname: last,
                });
             }

