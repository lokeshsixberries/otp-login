import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCUxVuKQc3aPZBK6T3LJd-VexfvResQiLQ",
  authDomain: "otp-login-fc720.firebaseapp.com",
  projectId: "otp-login-fc720",
  storageBucket: "otp-login-fc720.appspot.com",
  messagingSenderId: "291122562632",
  appId: "1:291122562632:web:9cc35a56e4700593cc3a7d"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
export default firebase
