import firebase from 'firebase/app';
import 'firebase/database';


var firebaseConfig = {
    apiKey: "AIzaSyAWybngZhkoluPxnBFI9-Dr0UqBwiT3ajE",
    authDomain: "utfpr-8e0b2.firebaseapp.com",
    projectId: "utfpr-8e0b2",
    storageBucket: "utfpr-8e0b2.appspot.com",
    messagingSenderId: "155275931636",
    appId: "1:155275931636:web:20e432ec2062f63e9c13a1",
    measurementId: "G-KQDRL3LPJ5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  if(!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
  }

  export default firebase;
i