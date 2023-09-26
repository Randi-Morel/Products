import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

const config = {
  apiKey: "AIzaSyAPJumNVxQsx-1RyGFfxCuYIH5Do9w8FOY",
  authDomain: "admin-cda66.firebaseapp.com",
  projectId: "admin-cda66",
  storageBucket: "admin-cda66.appspot.com",
  messagingSenderId: "423566490596",
  appId: "1:423566490596:web:c626cc4062eb281cf5e5f1",
};

firebase.initializeApp(config);

const { auth, firestore, storage } = firebase;

export { firebase, auth, firestore, storage };
