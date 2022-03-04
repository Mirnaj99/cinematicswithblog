import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA4K0Q7Bn_9cl4F_Knyy3yem6TksDrCWS4",
  authDomain: "cinematics-d925e.firebaseapp.com",
  projectId: "cinematics-d925e",
  storageBucket: "cinematics-d925e.appspot.com",
  messagingSenderId: "610022290818",
  appId: "1:610022290818:web:1ba8b15d961f98be628b9b",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
