// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: 'AIzaSyBzlzZEnHavrUvZV8KFVaQtP6gLfDhyMps',
   authDomain: 'fast-company-69553.firebaseapp.com',
   databaseURL: 'https://fast-company-69553-default-rtdb.europe-west1.firebasedatabase.app',
   projectId: 'fast-company-69553',
   storageBucket: 'fast-company-69553.firebasestorage.app',
   messagingSenderId: '675892153982',
   appId: '1:675892153982:web:3447222391ec39d40a522f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
