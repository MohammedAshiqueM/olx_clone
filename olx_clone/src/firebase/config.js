import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyASwL6WPZg5Y-l16cLPs8gXHmtfl4h6blI",
  authDomain: "olx-clone-a8591.firebaseapp.com",
  projectId: "olx-clone-a8591",
  storageBucket: "olx-clone-a8591.appspot.com",
  messagingSenderId: "544003398078",
  appId: "1:544003398078:web:aeaf33661ef1495e3401ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

export { app, auth };
