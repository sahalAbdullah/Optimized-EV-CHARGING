// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBXrm3HF-ZkHDamq1U6FS4JHthRmb9pSBI',
  authDomain: 'react-native-course-cb023.firebaseapp.com',
  databaseURL: 'https://react-native-course-cb023-default-rtdb.firebaseio.com',
  projectId: 'react-native-course-cb023',
  storageBucket: 'react-native-course-cb023.appspot.com',
  messagingSenderId: '115272121557',
  appId: '1:115272121557:web:eb1ebc28145fc550f8f65c',
  measurementId: 'G-NYG51K4BDK',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
