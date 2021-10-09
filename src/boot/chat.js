import { boot } from 'quasar/wrappers'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAblqME_ZQczEAtBQwVPuxjuqiMiyFtdXE",
  authDomain: "firechat--quasar-8056d.firebaseapp.com",
  projectId: "firechat--quasar-8056d",
  storageBucket: "firechat--quasar-8056d.appspot.com",
  messagingSenderId: "383414088882",
  appId: "1:383414088882:web:05b512a30901a1968485ab"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

const time = firebase.firestore.FieldValue.serverTimestamp;

export { db, auth, time };



export default boot(async (/* { app, router, ... } */) => {
  // something to do
})
