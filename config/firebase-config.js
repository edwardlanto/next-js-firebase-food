// config/fire-config.js
import firebase from 'firebase';
const firebaseConfig = {
  apiKey: 'AIzaSyCBpTImDWyXBe2BJt5Np7EBaB4LSfdNiQ0',
  authDomain: 'byte-fb.firebaseapp.com',
  databaseURL: 'https://byte-fb.firebaseio.com',
  projectId: 'byte-fb',
  storageBucket: 'byte-fb.appspot.com',
  messagingSenderId: '677081791337',
  appId: '1:677081791337:web:4b2a4ce78d2b3ca60f1bf8',
  measurementId: 'G-JNFV34YZLN',
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}

const fire = firebase;
export default fire;
