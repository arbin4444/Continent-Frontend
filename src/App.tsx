import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ContinentDetails } from "./components/continent/continentDetails";
import { BrowserRouter as Router, Route,  Routes, Navigate } from "react-router-dom";
import {ContinentDashboard} from "./components/continent/continentDashboard";
import {ComponentEdit} from "./components/continent/componentEdit";
import {AddComponent} from "./components/continent/addComponent";
import {UserLogin} from "./components/login/userLogin";
import {UserSignup} from "./components/signup/userSignup"

function App() {
  return (
    <div className="App">

        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/overview"/>}/>
            <Route path="/dashboard" element={<ContinentDashboard/>}/>
            <Route path="/overview" element={<ContinentDetails/>}/>
            <Route path="/edit-component" element={<ComponentEdit/>}/>
            <Route path="/add-component" element={<AddComponent/>}/>
            <Route path="/login" element={<UserLogin/>}/>
            <Route path="/signup" element={<UserSignup/>}/>
          </Routes>
        </Router>
      
    </div>
  );
}

export default App;
