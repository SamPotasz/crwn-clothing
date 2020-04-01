import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBwidUBnpfCiRpex7-JfwRKVvRGOOhbocI",
    authDomain: "crwn-db-e4f5e.firebaseapp.com",
    databaseURL: "https://crwn-db-e4f5e.firebaseio.com",
    projectId: "crwn-db-e4f5e",
    storageBucket: "crwn-db-e4f5e.appspot.com",
    messagingSenderId: "56905897645",
    appId: "1:56905897645:web:8f098960fe76e919359824"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//setup google auth
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;