import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyCaimatc4sFXQGU4cchzX7T43Q0SqpRMB8",
    authDomain: "exampleeee-5f208.firebaseapp.com",
    databaseURL: "https://exampleeee-5f208.firebaseio.com",
    projectId: "exampleeee-5f208",
    storageBucket: "exampleeee-5f208.appspot.com",
    messagingSenderId: "323335924575",
    appId: "1:323335924575:web:7cbe29dc137ca59c4a64ea",
    measurementId: "G-R3M59W1EJ7"
  };

  firebase.initializeApp(config);

  export default firebase;