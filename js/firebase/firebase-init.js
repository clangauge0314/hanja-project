import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const firebaseConfig = {

    apiKey: "AIzaSyCDuENgp6Sl4SNjM-GOFg-b-0ATSLvbOa8",
    authDomain: "learn-hanja-a3518.firebaseapp.com",
    projectId: "learn-hanja-a3518",
    storageBucket: "learn-hanja-a3518.firebasestorage.app",
    messagingSenderId: "820495587248",
    appId: "1:820495587248:web:7b645445eb0beb34bca875"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
