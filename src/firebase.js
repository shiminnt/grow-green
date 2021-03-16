import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBtij6YdHCUNu-KtkJZR0RMBzFUBjMfEXo",
    authDomain: "growgreen-db239.firebaseapp.com",
    projectId: "growgreen-db239",
    storageBucket: "growgreen-db239.appspot.com",
    messagingSenderId: "306955028646",
    appId: "1:306955028646:web:817efd688cf1bc2df68c67",
    measurementId: "G-C6QFLSBFHW"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
var auth = firebase.auth();
export {
    database,
    auth
};