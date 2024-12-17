import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


/**
 * Firebase Configuration
 *
 * @type {{ apiKey: string; authDomain: string; projectId: string; storageBucket: string; messagingSenderId: string; appId: string; measurementId: string; }}
 */
const firebaseConfig = {
  apiKey: "AIzaSyDr7F3iYKfHa5HLqSMI3hZr8t-bNredsZE",
  authDomain: "rentscout-ad42d.firebaseapp.com",
  projectId: "rentscout-ad42d",
  storageBucket: "rentscout-ad42d.firebasestorage.app",
  messagingSenderId: "1061800983284",
  appId: "1:1061800983284:web:4859ac4a434adcb515bca1",
  measurementId: "G-6TZDD6MZ23"
};

/**
 * Initialize Firebase
 *
 * @type {*}
 */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, app, db };

