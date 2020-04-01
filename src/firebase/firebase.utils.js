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

export const createUserProfileDocument = async (userAuth, addlData) => {
    if(!userAuth) return;

    const userRef = firestore.doc('users/' + userAuth.uid);
    const snapshot = await userRef.get();
    
    //new user! put them in the db
    if(!snapshot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName, 
                email,
                createdAt,
                ...addlData
            })
        } catch (err) {
            console.error('error creating user', err.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//setup google auth
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;