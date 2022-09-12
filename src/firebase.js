import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBNnRymBEPvXxwtytmbtQkKAyhTqqsELrA",
  authDomain: "otp-login-fc720.firebaseapp.com",
  projectId: "otp-login-fc720",
  storageBucket: "otp-login-fc720.appspot.com",
  messagingSenderId: "291122562632",
  appId: "1:291122562632:web:9cc35a56e4700593cc3a7d",
  clientId:
    "156920536460-eqc26kq8ppcu4btrtr02la0orsc7p7jb.apps.googleusercontent.com",
  scope: "",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
