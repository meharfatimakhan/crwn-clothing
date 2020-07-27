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


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;