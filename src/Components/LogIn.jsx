import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GoogleLogIn from "./GoogleLogIn";

export default function LogIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const navigate = useNavigate();
  const { email, password } = formData;
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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/home");
      }
    } catch (error) {
      toast.error("Bad user credential");
    }
  }

  return (
    <div class='flex items-center min-h-screen bg-gray-50 bg-gradient-to-r from-cyan-500 to-blue-500'>
      <form onSubmit={onSubmit}>
        <div class='flex h-full max-w-4xl mx-auto bg-neutral-300 rounded-lg shadow-xl'>
          <div class='flex flex-col md:flex-row '>
            <div class='  grid h-screen place-items-center md:h-auto md:w-1/2'>
              <img
                class='object-cover w-full h-full padding-right: 3px'
                src='./images/pexels-imintechnology12935074.jpg'
                alt='img'
              />
            </div>
            <div class='grid place-items-center h-screen flex items-center justify-center p-6 sm:p-12 md:w-1/2'>
              <div class='w-full'>
                <div class='flex justify-center'></div>
                <h1 class='mb-4 text-2xl font-bold text-center text-gray-700'>
                  Login to Your Account
                </h1>
                <div>
                  <label class='block text-sm'>Email</label>
                  <input
                    type='email'
                    id='email'
                    value={email}
                    onChange={onChange}
                    class='w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'
                    placeholder=''
                  />
                </div>
                <div>
                  <label class='block mt-4 text-sm'>Password</label>
                  <input
                    value={password}
                    id='password'
                    onChange={onChange}
                    class='w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'
                    placeholder=''
                    type='password'
                  />
                </div>

                <button
                  class='block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue'
                  href='#'
                >
                  Log in
                </button>
                <br></br>
                <p className='mb-6'>
                  Dont'have an account?
                  <Link
                    to='/sign-up'
                    className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1'
                  >
                    Sign up
                  </Link>
                </p>

                <hr class='my-8' />

                <GoogleLogIn />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
