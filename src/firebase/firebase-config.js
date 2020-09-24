import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
const firebaseConfig = {
    apiKey:process.env.REACT_APP_apiKey,
    authDomain:process.env.REACT_APP_authDomain,
    databaseURL:process.env.REACT_APP_databaseURL,
    projectId:process.env.REACT_APP_projectId,
    storageBucket:process.env.REACT_APP_storageBucket,
    messagingSenderId:process.env.REACT_APP_messagingSenderId,
    appId:process.env.REACT_APP_appId,
    measurementId:process.env.REACT_APP_measurementId,
};
// //para testing usamos otra base de datos(mira variables de entorno)
// const firebaseConfigTesting = {
//     apiKey: "AIzaSyCwngfRDv56ILjsUj6dxyvBQRM-MuFrcWg",
//     authDomain: "test-appreact.firebaseapp.com",
//     databaseURL: "https://test-appreact.firebaseio.com",
//     projectId: "test-appreact",
//     storageBucket: "test-appreact.appspot.com",
//     messagingSenderId: "392050295203",
//     appId: "1:392050295203:web:03941c7ec4adb85c091a16",
//     measurementId: "G-ME6QN4ZR7B"
// };
// //si estamos en testing usamos una o sino la otra
// if (process.env.NODE_ENV === 'test') {
//     firebase.initializeApp(firebaseConfigTesting)

// } else {

//     // Initialize Firebase
//     firebase.initializeApp(firebaseConfig);
// }

firebase.initializeApp(firebaseConfig);

//referencia a la base de datos
const db = firebase.firestore()
//referencia al auth(puede ser varias)
var googleProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleProvider,
    firebase
}