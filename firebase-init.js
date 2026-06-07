// Importa le funzioni necessarie dagli SDK di Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// La tua configurazione (quella che hai trovato)
const firebaseConfig = {
  apiKey: "AIzaSyDBM3myyS1a-NgkXyTpqmaz5EMvNU6338Q",
  authDomain: "guest-f7fcd.firebaseapp.com",
  projectId: "guest-f7fcd",
  storageBucket: "guest-f7fcd.firebasestorage.app",
  messagingSenderId: "301133402239",
  appId: "1:301133402239:web:cc7dfbb3bd60de732cef4a",
  measurementId: "G-N8PHG6X3S9"
};

// Inizializza Firebase
const app = initializeApp(firebaseConfig);

// Inizializza Firestore (il nostro database) e lo esportiamo per usarlo altrove
export const db = getFirestore(app);