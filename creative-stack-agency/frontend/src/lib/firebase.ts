import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC2bdNV6fwbQy-isDh0qg821vFhPfvIXwA",
  authDomain: "creativestackagency-a1763.firebaseapp.com",
  projectId: "creativestackagency-a1763",
  storageBucket: "creativestackagency-a1763.firebasestorage.app",
  messagingSenderId: "904297076312",
  appId: "1:904297076312:web:ee7e962afb3c5a66d9dc2d",
  measurementId: "G-J161RDNL6T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
