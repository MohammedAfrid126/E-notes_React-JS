import './App.css';
import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Navbar from './Components/Navbar';
import NoteState from './context/notes/NoteState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import SignUP from './Components/SignUp';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = ( message,type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  return (
    <div className='wholeContainer'>
      <NoteState>
        <Router>
          <Navbar/>
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>}/>
              <Route exact path="/about" element={<About />}/>
              <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
              <Route exact path="/signup" element={<SignUP showAlert={showAlert}/>}/>
            </Routes>
          </div>
        </Router>
        </NoteState>
    </div>
  );
}

export default App;