import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDvcO8J0vKoCLRuKr0LkQrGfwN0w71ZBM0",
  authDomain: "discord-clone-bb155.firebaseapp.com",
  projectId: "discord-clone-bb155",
  storageBucket: "discord-clone-bb155.firebasestorage.app",
  messagingSenderId: "330946551473",
  appId: "1:330946551473:web:e8708677ed014abef68c90",
  measurementId: "G-0Y6ZCRX0TX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };
