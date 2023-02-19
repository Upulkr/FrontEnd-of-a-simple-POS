import { db } from "../firebase";
import {
  addDoc,
  collection,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const saveOrder = async (data) => {
  await addDoc(collection(db, "orders"), data)
    .then((docRef) => {
      alert("Data Successfully Submitted");
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

export { saveOrder };
