import React, {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";

export default function GoogleLogIn() {
  const navigate = useNavigate();
  async function onGoogleClick() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
      //check for user
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }

      navigate("/home");
      toast.success("Sign up was successful");
    } catch (error) {
      // toast.error("Could not authorize with Google");
      console.log(error);
    }
  }
  return (
    <button
      type='button'
      onClick={onGoogleClick}
      className='flex items -center justify-center w-full leading-5 text-center text-black py-2 transition-colors duration-150 bg-white border border-transparent rounded-lg active:white-blue-600 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue'
      href='#'
    >
      <FcGoogle className='text-xl bg-white rounded-full mr-2 mt-13'></FcGoogle>
      Continue with Google
    </button>
  );
}
