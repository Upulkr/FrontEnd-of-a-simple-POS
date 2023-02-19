
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import './App.css';

import { ToastContainer } from 'react-toastify';
import DropDown from './Components/DropDown';
import GoogleLogIn from './Components/GoogleLogIn';
import LogIn from './Components/LogIn';
import NewTable from './Components/NewTable';
import SignUp from './Components/SignUp';

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path='/home' element={<DropDown />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/googleLogIn' element={<GoogleLogIn />} />
          <Route path='/newTable' element={<NewTable />} />

          <Route path='/' element={<LogIn />} />
        </Routes>
      </Router>
      <ToastContainer
        position='bottom-center'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </>
  );
}

export default App;
