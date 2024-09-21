import React, {useState} from "react";
import Header from "./components/Header";
import "./Attendance.css";


export default function Attendance(props) {
  const [attended, setAttended] = useState("");
  const [missed, setMissed] = useState("");
  const [score, setScore] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const attendedNum = parseInt(attended) || 0; //praseInt is needed here, even though the submit type="number", it's still saved as a string
    const missedNum = parseInt(missed) || 0;
    
    //Bit of validation checking for negative values
    if (attendedNum < 0 || missed < 0) {
      setScore(-999);
    } else {
      const points = attendedNum - missedNum;
      setScore(points);
    }

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
    {score !== null && ( //Uses wack && operator where if score is not null, then it does the following
    <h2>
        {(() => {
            if (score === -999) {
                return `You can't have negative inputs.`;
            } else if (score < 0) {
                return `Lost points! ${score}`;
            } else if (score > 0) {
                return `Gained points! ${score}`;
            } else {
                return `Bruh nothing happened`;
            }
        })()}
    </h2>
    )}

    </div>
  );
};

