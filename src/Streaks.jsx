import React from "react";
import Header from "./components/Header";
import "./Streaks.css";
import firePNG from "./assets/fire.png";


export default function Streaks(props) {
  return (
    <div>
      <h1 id="Phrase">Your streak count:</h1>
      <h1 id="Number">{props.streak}</h1>
      <img src={firePNG} alt=":fire emoji:"></img>
    </div>
  );
};

Streaks.defaultProps = {
  streak: "Streak value not found"
}
