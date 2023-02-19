import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5Wck0mKgmqt9fKroWYOk8JQfLCnSXutw",
  authDomain: "pos-3642f.firebaseapp.com",
  databaseURL: "https://pos-3642f-default-rtdb.firebaseio.com",
  projectId: "pos-3642f",
  storageBucket: "pos-3642f.appspot.com",
  messagingSenderId: "154084322714",
  appId: "1:154084322714:web:cbd3946ce4cbfad88b9e23",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };