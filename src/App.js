import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import Main from "./Main/Main";
import Signup from "./Signup/Signup";
import "./output.css";
const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mainpage" element={<Main />} />
      </Routes>
    </div>
  );
};

export default App;
