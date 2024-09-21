import React, { useEffect, useState } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

import "./Leaderboard.css";

const Leaderboard = () => {
  const [students, setStudents] = useState([]); // holds array of students
  const [loading, setLoading] = useState(true); // tells if still loading

  //get students from database
  useEffect(() => {
    const fetchStudents = async () => {
      const colRef = collection(db, "students");
      try {
        const snapshot = await getDocs(colRef);
        let studentsList = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setStudents(studentsList); // Set the fetched data in state
        setLoading(false); // Turn off loading after data is fetched
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []); // Empty dependency array means this will only run when the component is first loaded

  if (loading) {
    return <div>Loading...</div>; // Show loading while data is being fetched
  }

  //sort in descending order
  const sortedStudents = [...students].sort((a, b) => b.score - a.score);

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <table cellPadding="10">
        <thead>
          <tr>
            <th>Email</th>
            <th>Score</th>
            <th>Streak</th>
          </tr>
        </thead>
        <tbody>
          {sortedStudents.map((student, index) => {
            let className = "default";
            if (index === 0) className = "gold";
            else if (index === 1) className = "silver";
            else if (index === 2) className = "bronze";

            console.log(
              `Student: ${student["student_email"]}, Class: ${className}`
            ); // Debugging line

            return (
              <tr key={student.id} className={className}>
                <td>{student["student_email"]}</td>
                <td>{student.score}</td>
                <td>{student.streak}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
