import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0WB4UFWNO1YfKa5m791ehuT7a90CBvcs",
  authDomain: "catalog-board-games.firebaseapp.com",
  projectId: "catalog-board-games",
  storageBucket: "catalog-board-games.firebasestorage.app",
  messagingSenderId: "568933594728",
  appId: "1:568933594728:web:fdf1e316e8f674b34b6ddd",
  measurementId: "G-XZ4JM0H8L4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
