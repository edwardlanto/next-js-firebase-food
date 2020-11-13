import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
export const firebaseConfig = {
  apiKey: 'AIzaSyCuVirikuS-JKibi-MwzN_ACbSuxx10r_U',
  authDomain: 'v1-2020-11-12-next-app.firebaseapp.com',
  databaseURL: 'https://v1-2020-11-12-next-app.firebaseio.com',
  projectId: 'v1-2020-11-12-next-app',
  storageBucket: 'v1-2020-11-12-next-app.appspot.com',
  messagingSenderId: '412616893796',
  appId: '1:412616893796:web:5d207f4180ed720f518671',
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const app = firebase.app();
const auth = firebase.auth();
const db = firebase.firestore();
const now = firebase.firestore.Timestamp.now();
const storage = firebase.storage();
export { auth, db, now, storage };
console.log(app.name ? 'Firebase Mode Activated!' : 'Firebase not working :(');
