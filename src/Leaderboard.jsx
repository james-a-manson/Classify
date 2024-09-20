import React from "react";
import Header from "./components/Header";
import "./Leaderboard.css";

function Leaderboard() {
  return (
    <div>
      <Header title="Leaderboard" />
      <table className="leaderboard-table">
        <tr>
          <th>Position</th>
          <th>Name</th>
          <th>Score</th>
          <th>Current Streak</th>
        </tr>
        <tr>
          <td>1</td>
          <td>James</td>
          <td>99999</td>
          <td>-100</td>
        </tr>
      </table>
    </div>
  );
}

export default Leaderboard;
