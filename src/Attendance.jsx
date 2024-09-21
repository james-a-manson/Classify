import React, {useState} from "react";
import Header from "./components/Header";
import "./Attendance.css";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";


export default function Attendance(props) {
  const [attended, setAttended] = useState("");
  const [missed, setMissed] = useState("");
  const [score, setScore] = useState(null);

  const handleSubmit = async (event) => { //What does async mean here?
    event.preventDefault();
    const attendedNum = parseInt(attended) || 0; //praseInt is needed here, even though the submit type="number", it's still saved as a string
    const missedNum = parseInt(missed) || 0;
    
    //Bit of validation checking for negative values
    if (attendedNum < 0 || missedNum < 0) {
      setScore(-999);
    } else {
      const points = attendedNum - missedNum;
      setScore(points);

      try {
        const scoresCollection = collection(db, 'scores'); // Reference to 'scores' collection
        await addDoc(scoresCollection, {
            attended: attendedNum,
            missed: missedNum,
            score: points,
            createdAt: Date.now() // Optional: to track when the score was created
        });
        console.log("Score saved successfully!");
    } catch (error) {
        console.error("Error saving score: ", error);
    }

    }
  };


  return (
    <div className = "attendance">
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

