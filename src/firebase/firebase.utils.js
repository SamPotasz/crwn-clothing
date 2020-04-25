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

/**
 * takes and array of objects and stores them on firebase with the given key
 * @param {string} collectionKey: name of collection to store on firebase
 * @param {array} objectsToAdd: array of objects to add to firebase
 */
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    // console.log(collectionRef);

    //need to do a batch-write to make sure all the objects get added even if internet fails
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();  //get a blank document in this collection
        batch.set(newDocRef, obj);
    })

    return await batch.commit();
}

/**
 * 
 * @param {array} collections 
 */
export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map( doc => {
        const { title, items } = doc.data();
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title, 
            items
        }
    });
    
    //create an object keyed by title
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    },  {});
};

//mimicking backend until we have one
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged( userAuth => {
      unsubscribe();
      resolve( userAuth );  //if succeed, resolve to returned userAuth
    }, reject ) //if fails, reject
  })
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//setup google auth
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;