import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCE2tYzRZ2pAq83sOjGPFulHXwT3Bg5kCw",
    authDomain: "crown-db-ee5ff.firebaseapp.com",
    databaseURL: "https://crown-db-ee5ff.firebaseio.com",
    projectId: "crown-db-ee5ff",
    storageBucket: "crown-db-ee5ff.appspot.com",
    messagingSenderId: "1075544688234",
    appId: "1:1075544688234:web:7d4f031d021bd69ecfac13",
    measurementId: "G-5CMQXXB3D6"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName, email, createdAt, ...additionalData
            });
        }
        catch (error) {
            console.log("Error Creating user", error.message);
        }
    }
   return userRef;
}
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;