import React from "react";
import Header from "./components/Header";
import "./Streaks.css";

export default function Streaks(props) {
  return (
    <div>
      <h1>Your streak count:</h1>
      <h1>{props.streak}</h1>
    </div>
  );
};

Streaks.defaultProps = {
  streak: "Streak value not found"
}
