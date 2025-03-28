import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Landingpage } from "./components/Landingpage";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import Dashboard from "./components/Dashboard";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />}/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
