import React, {useState} from "react";
import Header from "./components/Header";
import "./Attendance.css";


export default function Attendance(props) {
  const [attended, setAttended] = useState("");
  const [missed, setMissed] = useState("");
  const [score, setScore] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const attendedInt = parseInt(attended) || 0; //praseInt is needed here, even though the submit type="number", it's still saved as a string
    const missedNum = parseInt(missed) || 0;
    const points = attendedInt - missedNum;

    setScore(points);
    //After this, also use the score state and store that shit in the database somehow, so far I've just done the UI/user-side feedback part.
  };


  return (
    <div>
      <h1>How many classes did you attend or miss today?</h1>
      <form onSubmit={handleSubmit}>
      <div className = "LoginElements">
      <label>Attended:
        <input 
          type="number"
          value={attended}
          onChange={(e) => setAttended(e.target.value)}
        />
      </label>
      <label>Missed:
        <input 
          type="number" 
          value={missed}
          onChange={(e) => setMissed(e.target.value)}
        />
      </label>
      <input type="submit" />
      </div>
    </form>
    {score !== null && ( //Using the wack && conditional thing where it's "if score is not null" THEN do brackets
      <h2>
        {score > 0 ? `Gained points! ${score}` : score < 0 ? `lost points! ${score}` : `bruh nothing happened`}
      </h2>
      //So, backticks ` are needed instead of regular quotes " because it allows 'string interpolation', which is what enables embedding variables into the string directly.
      //Additionally, to signal that a variable is being presented (so it doesn't literally print {score}), a $ should be used before the variable.
    )}

    </div>
  );
};

