import React, { useEffect, useState } from "react";
import Header from "./components/Header";

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
    <table cellPadding="10">
      <thead>
        <tr>
          <th>Name</th>
          <th>Score</th>
          <th>Streak</th>
        </tr>
      </thead>
      <tbody>
        {sortedStudents.map((student) => (
          <tr key={student.id}>
            <td>{student["student_email"]}</td>
            <td>{student.score}</td>
            <td>{student.streak}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Leaderboard;
