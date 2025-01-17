// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCviTSPeijKEhaSI0KIVxjnqWjE08AzI-8",
    authDomain: "to-do-list-e8bac.firebaseapp.com",
    projectId: "to-do-list-e8bac",
    storageBucket: "to-do-list-e8bac.firebasestorage.app",
    messagingSenderId: "553171650663",
    appId: "1:553171650663:web:e784b17eb627811b53ecc2",
    measurementId: "G-DZJK22DV5S"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
