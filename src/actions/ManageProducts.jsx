import { db } from "../firebase";
import {
  addDoc,
  collection,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const addProduct = async (name) => {
  await addDoc(collection(db, "products"), { name: name })
    .then((docRef) => {
      alert("Data Successfully Submitted");
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

const getProducts = async () => {
  const q = query(collection(db, "products"));
  onSnapshot(q, (querySnapshot) => {
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
  });
};

export { addProduct, getProducts };
