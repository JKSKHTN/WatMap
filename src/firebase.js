import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBRl8-OYi1pObT-AqoBWm4OS3NPbnsGGPI",
  authDomain: "htn-project-b0cf4.firebaseapp.com",
  projectId: "htn-project-b0cf4",
  storageBucket: "htn-project-b0cf4.appspot.com",
  messagingSenderId: "215312886852",
  appId: "1:215312886852:web:a2bfcac87e15f10033a011",
});

export const auth = app.auth();
export default app;
