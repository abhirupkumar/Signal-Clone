// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAv-7GLFv6HFQ3Z3bF8V1nAhtOx7miU628",
    authDomain: "signal-clone-f05df.firebaseapp.com",
    projectId: "signal-clone-f05df",
    storageBucket: "signal-clone-f05df.appspot.com",
    messagingSenderId: "578007813289",
    appId: "1:578007813289:web:8f23bcce5bc48e388aadb8"
};

// Initialize Firebase
let app;
if (firebase.apps.length == 0) {
    app = initializeApp(firebaseConfig);
}
else {
    app = firebase.app();
}

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app);

export { auth, db };