import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firebase-analytics'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDC4ec4D8Nrsy7HePPwvZ4aj4TaYk1-XMU",
  authDomain: "resto-6b127.firebaseapp.com",
  databaseURL: "https://resto-6b127.firebaseio.com",
  projectId: "resto-6b127",
  storageBucket: "gs://resto-6b127.appspot.com/",
  messagingSenderId: "336889404396",
  appId: "1:336889404396:web:e21de093c202eed717fec9",
  measurementId: "G-53BJ5RMG0D"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

  // buat auth dan firestore
const db = firebase.firestore()

export default db;
