import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyC7M5cyzXrV5xSd08j6XTvj2GDZ79hfE_A",
    authDomain: "react-curso-fb29a.firebaseapp.com",
    databaseURL: "https://react-curso-fb29a.firebaseio.com",
    projectId: "react-curso-fb29a",
    storageBucket: "react-curso-fb29a.appspot.com",
    messagingSenderId: "970276927340",
    appId: "1:970276927340:web:571919a6fa6ca27a2ae549",
    measurementId: "G-NM7XYCBPNN"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //referencia a la base de datos
  const db = firebase.firestore()
  //referencia al auth(puede ser varias)
  var googleProvider = new firebase.auth.GoogleAuthProvider();

  export{
      db,
      googleProvider,
      firebase
  }