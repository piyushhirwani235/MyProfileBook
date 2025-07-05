import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBf_2onmioamllb0i_JeJg2rjFJrKjw0qg",
  authDomain: "user-details-website.firebaseapp.com",
  projectId: "user-details-website",
  storageBucket: "user-details-website.firebasestorage.app",
  messagingSenderId: "395065232537",
  appId: "1:395065232537:web:59010ebb3c7b2813db7c08",
  measurementId: "G-1CZHNS1R3Z"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
