import React, { useState } from "react";
import { toast } from "react-toastify";
import GoogleLogIn from "./GoogleLogIn";

import {
  createUserWithEmailAndPassword, getAuth, updateProfile
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";


export default function LogIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const navigate = useNavigate();

  
  const { email, password, name } = formData;

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(auth.currentUser, { displayName: name });
      const user = userCredential.user;
      const formDataCopy={...formData}
      delete formDataCopy.password
      formDataCopy.timestamp=serverTimestamp();

      await setDoc(doc(db,'users',user.uid),formDataCopy)
      navigate('./')
      toast.success('Sign up was successful')
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  return (
    <div class='transition-x-10 item justify-center min-h-screen transition-y-14 bg-gray-50 bg-gradient-to-r from-cyan-500 to-blue-500'>
      <form onSubmit={onSubmit}>
        <div class='flex-1 h-full max-w-4xl mx-auto bg-neutral-300 rounded-lg shadow-xl'>
          <div class='flex flex-col md:flex-row'>
            <div class='h-32 md:h-auto md:w-1/2'>
              <img
                class='object-cover w-full h-full'
                src='./images/pexels-imintechnology12935074.jpg'
                alt='img'
              />
            </div>
            <div class='flex items-center justify-center p-6 sm:p-12 md:w-1/2'>
              <div class='w-full'>
                <div class='flex justify-center'></div>
                <h1 class='mb-4 text-2xl font-bold text-center text-gray-700'>
                  Sign-Up to your new Account
                </h1>
                <div>
                  <label class='block text-sm'>Name</label>
                  <input
                    onChange={onChange}
                    value={name}
                    id='name'
                    type='name'
                    class='w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'
                    placeholder='Name'
                  />
                </div>
                <div>
                  <label class='block text-sm'>Email</label>
                  <input
                    type='email'
                    id='email'
                    value={email}
                    onChange={onChange}
                    class='w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'
                    placeholder='email'
                  />
                </div>
                <div>
                  <label class='block  text-sm'>Password</label>
                  <input
                    value={password}
                    id='password'
                    onChange={onChange}
                    class='w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'
                    placeholder='Password'
                    type='password'
                  />
                </div>

                <button
                  onSubmit={onSubmit}
                  class='block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue'
                  href='#'
                >
                  Sign Up
                </button>

                <hr class='my-8' />
                <h className='flex items-center justify-center mt-4 text-sm '>
                  Sign-Up with with google
                </h>
                <br></br>

               <GoogleLogIn/>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
