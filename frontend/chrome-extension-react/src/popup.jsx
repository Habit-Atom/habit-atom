import React from "react";
import { createRoot } from "react-dom/client";
import './popup.css'
import logo from "../public/logo.png"
import { Habit } from './Components/Habit.jsx';

function Popup() {
  return (
    <div id='popup-container'>
        <img src={logo} alt="Logo" id="background" />
        <a href="http://localhost:3000/" id='logo-container' target="_blank">
          <img src={logo} alt="Logo" id="logo"/>
          <h1>Habit Atom</h1>
        </a>
        <div id="popup-habits-container">
            <p>Habits</p>
            <div>
              <Habit />
            </div>
        </div>
        <div id="popup-tasks-container">
            <p>Tasks</p>
            <div></div>
        </div>
    </div>
  );
}

createRoot(document.getElementById("react-target")).render(<Popup />);