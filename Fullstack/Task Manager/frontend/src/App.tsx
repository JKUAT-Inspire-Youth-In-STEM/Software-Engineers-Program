import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Landingpage } from "./components/Landingpage";
import { SignUp } from "./components/Signup";
import { SignIn } from "./components/SignIn";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />}/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  )
}

export default App
