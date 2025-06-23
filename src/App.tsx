import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ContinentDetails } from "./components/continent/continentDetails";
import { BrowserRouter as Router, Route,  Routes, Navigate } from "react-router-dom";
import {ContinentDashboard} from "./components/continent/continentDashboard"



function App() {
  return (
    <div className="App">

        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/overview"/>}/>
            <Route path="/dashboard" element={<ContinentDashboard/>}/>
            <Route path="/overview" element={<ContinentDetails/>}/>
          </Routes>
        </Router>
      
    </div>
  );
}

export default App;
